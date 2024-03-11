package com.evista.hydrone;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by mmpkl05 on 12/14/17.
 */

public class DJIGoManager extends SimpleViewManager<DJIGo> {

    public static final String REACT_CLASS = "DJIGoManager";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public DJIGo createViewInstance(ThemedReactContext context) {
        Log.i("Create View Instance", "DJIGO");
        return new DJIGo(context); //If your customview has more constructor parameters pass it from here.
    }




}