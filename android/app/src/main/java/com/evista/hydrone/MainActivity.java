package com.evista.hydrone;


import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

import dji.common.error.DJIError;
import dji.common.error.DJISDKError;
import dji.sdk.base.BaseComponent;
import dji.sdk.base.BaseProduct;
import dji.sdk.sdkmanager.DJISDKInitEvent;
import dji.sdk.sdkmanager.DJISDKManager;
import dji.thirdparty.afinal.core.AsyncTask;

public class MainActivity extends ReactActivity {


  private static final String TAG = MainActivity.class.getName();
  public static final String FLAG_CONNECTION_CHANGE = "dji_sdk_connection_change";
  private static BaseProduct mProduct;
  private Handler mHandler;

  private static final String[] REQUIRED_PERMISSION_LIST = new String[]{
          Manifest.permission.VIBRATE,
          Manifest.permission.INTERNET,
          Manifest.permission.ACCESS_WIFI_STATE,
          Manifest.permission.WAKE_LOCK,
          Manifest.permission.ACCESS_COARSE_LOCATION,
          Manifest.permission.ACCESS_NETWORK_STATE,
          Manifest.permission.ACCESS_FINE_LOCATION,
          Manifest.permission.CHANGE_WIFI_STATE,
          Manifest.permission.WRITE_EXTERNAL_STORAGE,
          Manifest.permission.BLUETOOTH,
          Manifest.permission.BLUETOOTH_ADMIN,
          Manifest.permission.READ_EXTERNAL_STORAGE,
  };
  private List<String> missingPermission = new ArrayList<>();
  private AtomicBoolean isRegistrationInProgress = new AtomicBoolean(false);
  private static final int REQUEST_PERMISSION_CODE = 12345;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // When the compile and target version is higher than 22, please request the following permission at runtime to ensure the SDK works well.
   if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
     checkAndRequestPermissions();
   }

//    setContentView(R.layout.activity_main);

    //Initialize DJI SDK Manager
    mHandler = new Handler(Looper.getMainLooper());

  }

  /**
   * Checks if there is any missing permissions, and
   * requests runtime permission if needed.
   */
  private void checkAndRequestPermissions() {
    // Check for permissions
    for (String eachPermission : REQUIRED_PERMISSION_LIST) {
      if (ContextCompat.checkSelfPermission(this, eachPermission) != PackageManager.PERMISSION_GRANTED) {
        missingPermission.add(eachPermission);
      }
    }
    // Request for missing permissions
    if (missingPermission.isEmpty()) {
      startSDKRegistration();
    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      showToast("Need to grant the permissions!");
      ActivityCompat.requestPermissions(this,
              missingPermission.toArray(new String[missingPermission.size()]),
              REQUEST_PERMISSION_CODE);
    }

  }

  /**
   * Result of runtime permission request
   */
  @Override
  public void onRequestPermissionsResult(int requestCode,
                                         @NonNull String[] permissions,
                                         @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    // Check for granted permission and remove from missing list
    if (requestCode == REQUEST_PERMISSION_CODE) {
      for (int i = grantResults.length - 1; i >= 0; i--) {
        if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
          missingPermission.remove(permissions[i]);
        }
      }
    }
    // If there is enough permission, we will start the registration
    if (missingPermission.isEmpty()) {
      startSDKRegistration();
    } else {
      showToast("Missing permissions!!!");
    }
  }

  private void startSDKRegistration() {
    if (isRegistrationInProgress.compareAndSet(false, true)) {
      AsyncTask.execute(new Runnable() {
        @Override
        public void run() {
          Log.d(TAG,"registering, pls wait...");

          DJISDKManager.getInstance().registerApp(getApplicationContext(), new DJISDKManager.SDKManagerCallback() {

            @Override
            public void onRegister(DJIError djiError) {
              if (djiError == DJISDKError.REGISTRATION_SUCCESS) {
                Log.d(TAG,"Register Success");
               DJISDKManager.getInstance().startConnectionToProduct();
              } else {
                Log.d(TAG,"Register sdk fails, please check the bundle id and network connection!");
              }
              Log.v(TAG, djiError.getDescription());
            }

            @Override
            public void onProductDisconnect() {
              Log.d(TAG, "onProductDisconnect");
              showToast("Product Disconnected");
              notifyStatusChange();

            }
            @Override
            public void onProductConnect(BaseProduct baseProduct) {
              Log.d(TAG, String.format("onProductConnect newProduct:%s", baseProduct));
              showToast("Product Connected");
              notifyStatusChange();

            }

            @Override
            public void onProductChanged(BaseProduct baseProduct) {
              Log.d(TAG, "onProductChange");
              showToast("Product Changed");
              notifyStatusChange();
            }

            @Override
            public void onComponentChange(BaseProduct.ComponentKey componentKey, BaseComponent oldComponent,
                                          BaseComponent newComponent) {

              if (newComponent != null) {
                newComponent.setComponentListener(new BaseComponent.ComponentListener() {

                  @Override
                  public void onConnectivityChange(boolean isConnected) {
                    Log.d(TAG, "onComponentConnectivityChanged: " + isConnected);
                    notifyStatusChange();
                  }
                });
              }
              Log.d(TAG,
                      String.format("onComponentChange key:%s, oldComponent:%s, newComponent:%s",
                              componentKey,
                              oldComponent,
                              newComponent));

            }
            @Override
            public void onInitProcess(DJISDKInitEvent djisdkInitEvent, int i) {

            }

            @Override
            public void onDatabaseDownloadProgress(long l, long l1) {
              Log.d(TAG, "onDatabaseDownload");
              showToast("downloading...");
            }
          });
        }
      });
    }
  }
  private void notifyStatusChange() {
    mHandler.removeCallbacks(updateRunnable);
    mHandler.postDelayed(updateRunnable, 500);
  }

  private Runnable updateRunnable = new Runnable() {

    @Override
    public void run() {
      Intent intent = new Intent(FLAG_CONNECTION_CHANGE);
      sendBroadcast(intent);
    }
  };

  private void showToast(final String toastMsg) {

    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(getApplicationContext(), toastMsg, Toast.LENGTH_LONG).show();
      }
    });

  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "hydrone";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
