// detox.config.js

module.exports = {
  configurations: {
    ios: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15'
      },
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/YOUR_APP.app',
      build: 'xcodebuild -workspace ios/YOUR_APP.xcworkspace -scheme YOUR_APP -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      artifacts: {
        rootDir: 'e2e/artifacts/ios',
        plugins: {
          log: 'all',
          screenshots: {
            enabled: true,
            timestamp: true,
            quality: 90
          },
          video: {
            enabled: true,
            name: 'demo',
            codec: 'h264'
          }
        }
      }
    },
    android: {
      device: {
        avdName: 'Pixel_7_Pro_API_34',
        type: 'android.emulator'
      },
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      artifacts: {
        rootDir: 'e2e/artifacts/android',
        plugins: {
          log: 'all',
          screenshots: {
            enabled: true,
            timestamp: true,
            quality: 90
          },
          video: {
            enabled: true,
            name: 'demo',
            codec: 'h264'
          }
        }
      }
    }
  }
};
