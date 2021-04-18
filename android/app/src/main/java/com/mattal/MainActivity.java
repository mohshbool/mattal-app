package com.shbool.mattal;

import com.facebook.react.ReactActivity;

// https://dev.to/brunolemos/adding-notch-support-to-your-react-native-android-app-3ci3
import android.view.WindowManager;
import android.os.Build;
import android.os.Bundle;

//https://stackoverflow.com/questions/35964078/how-to-disable-font-scaling-in-rn-for-android
import android.content.res.Configuration;
import android.content.Context;
import android.util.DisplayMetrics;
// import android.view.View;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "mattal";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
      WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
      layoutParams.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
      getWindow().setAttributes(layoutParams);
      getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
      getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
      // getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
    }
    super.onCreate(savedInstanceState);
    adjustFontScale(getApplicationContext(),getResources().getConfiguration());
  }

  public void adjustFontScale(Context context, Configuration configuration) {
    if (configuration.fontScale != 1) {
        configuration.fontScale = 1;
        DisplayMetrics metrics = context.getResources().getDisplayMetrics();
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        wm.getDefaultDisplay().getMetrics(metrics);
        metrics.scaledDensity = configuration.fontScale * metrics.density;
        context.getResources().updateConfiguration(configuration, metrics);
    }
}
}
