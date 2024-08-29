package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import android.webkit.WebView;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Enable WebView debugging
        WebView.setWebContentsDebuggingEnabled(true);
    }
}
