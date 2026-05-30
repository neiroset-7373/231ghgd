import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.wintozo.wintoblox',
  appName: 'WintoBlox - Alpha Version',
  webDir: 'client/version 0.1.0-alpha/static',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  android: {
    minSdkVersion: 26,
    targetSdkVersion: 36,
    compileSdkVersion: 36,
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK',
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
    },
  },
};

export default config;
