package com.evista.hydrone;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.image.ReactImageView;
import com.evista.hydrone.R;




public class DJIGo  extends LinearLayout{
    private Context context;

    public DJIGo(Context context) {
        super(context);
        this.context = context;
        init();
    }

    public void init() {
        inflate(this.context, R.layout.dji_go, this);
        Log.i("Inflated XML", "ANDROID_SAMPLE_UI");
    }


}