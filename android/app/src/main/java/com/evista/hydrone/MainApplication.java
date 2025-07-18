package com.evista.hydrone;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.evista.hydrone.newarchitecture.MainApplicationReactNativeHost;
import com.secneo.sdk.Helper;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import android.content.res.Configuration;
import android.util.DisplayMetrics;
import android.view.WindowManager;
public class MainApplication extends Application implements ReactApplication {
  @Override
  protected void attachBaseContext(Context paramContext) {
    super.attachBaseContext(paramContext);
    Helper.install(this);
  }

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new DJIGoPackage());

          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }


      };

  private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }


  @Override
  public void onCreate() {
    super.onCreate();
    adjustFontScale(getResources().getConfiguration());
//    Helper.install(MainApplication.this);
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }


//  @Override
//  protected void attachBaseContext(Context paramContext) {
//    super.attachBaseContext(paramContext);
//
//  }

  public void adjustFontScale(Configuration configuration){

    configuration.fontScale = (float) 1.0;
    
    DisplayMetrics metrics = getResources().getDisplayMetrics();
    
    WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
    
    wm.getDefaultDisplay().getMetrics(metrics);
    metrics.scaledDensity = configuration.fontScale * metrics.density;
    getBaseContext().getResources().updateConfiguration(configuration, metrics);
  }
  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.evista.hydrone.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
