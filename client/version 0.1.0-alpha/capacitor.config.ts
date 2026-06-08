import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.wintozo.wintoblox',
  appName: 'Wintoblox Alpha',
  webDir: 'mobile-static',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: '../keystore/release.keystore',
      keystorePassword: '',
      keystoreAlias: '',
      keystoreAliasPassword: ''
    },
    minVersion: '27'
  }
};

export default config;
