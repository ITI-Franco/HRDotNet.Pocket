import 'dotenv/config'

export default {
  "expo": {
    "name": "HRDotNet",
    "slug": "hndrx-hrdotnet-mobile",
    "scheme": "app",
    "version": "1.0.0",
    "userInterfaceStyle": "light",
    "primaryColor": "#72A7FF",
    "orientation": "portrait",
    "newArchEnabled": true,
    "icon": "./src/assets/images/icon.png",
    "platforms": [
      "ios",
      "android",
      "web"
    ],   
    "splash": {
      "image": "./src/assets/images/splash.png",
      "icon": "./src/assets/images/splash.png",
      "backgroundColor": "#FFFFFF"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "config": {
        "googleMapsApiKey":  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
      },
      "userInterfaceStyle": "light",
      "supportsTablet": false,
      "infoPlist": {
        "CFBundleAllowMixedLocalizations": true,
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true,
          "NSAllowsLocalNetworking": true,
          "NSExceptionDomains": {
            "10.0.1.26:7001": {
              "NSIncludesSubdomains": true,
              "NSTemporaryExceptionAllowsInsecureHTTPLoads": true,
              "NSTemporaryExceptionMinimumTLSVersion": "TLSv1.1"
            },
            "10.0.1.26:7008": {
              "NSIncludesSubdomains": true,
              "NSTemporaryExceptionAllowsInsecureHTTPLoads": true,
              "NSTemporaryExceptionMinimumTLSVersion": "TLSv1.1"
            },
            "exp.direct": {
              "NSIncludesSubdomains": true,
              "NSExceptionAllowsInsecureHTTPLoads": true,
              "NSTemporaryExceptionMinimumTLSVersion": "TLSv1.1"
            }
          }
        },
        "ITSAppUsesNonExemptEncryption": false,
        "NSLocationWhenInUseUsageDescription": "This app needs access to your location to display maps and your current position.",
        "NSCameraUsageDescription": "This app needs access to your camera to take photos.",
        "NSPhotoLibraryUsageDescription": "This app needs access to your photo library to upload or save photos."
      },
      "bundleIdentifier": "com.hndrx022.HNDRXHRDotNetMobile"
    },
    "android": {
        "config": {
            "googleMaps": {
              "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
            }
      },
      "userInterfaceStyle": "light",
      "permissions": [
        "READ_EXTERNAL_STORAGE",
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA_ROLL"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/images/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.hndrx022.HNDRXHRDotNetMobile"
    },
    "web": {
      "favicon": "./src/assets/images/icon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      [
        "expo-build-properties",
        {
          "android": {
            "enableProguardInReleaseBuilds": true,
            "enableShrinkResourcesInReleaseBuilds": true,
              "config": {
                "googleMaps": {
                  "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
                    }
                }
          },
          "ios": {
              "config": {
              "googleMapsApiKey":  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
             },
            "infoPlist": {
              "CFBundleAllowMixedLocalizations": true,
              "NSCameraUsageDescription": "This app needs access to your camera to take photos.",
              "NSPhotoLibraryUsageDescription": "This app needs access to your photo library to upload or save photos.",
              "NSAppTransportSecurity": {
                "NSAllowsArbitraryLoads": true,
                "NSAllowsLocalNetworking": true,
                "NSExceptionDomains": {
                  "NSIncludesSubdomains": true,
                  "NSTemporaryExceptionAllowsInsecureHTTPLoads": true,
                  "NSTemporaryExceptionMinimumTLSVersion": "TLSv1.1"
                }
              }
            }
          }
        }
      ],
    ],
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "7301b43b-3ef4-497e-80ad-56ec0f67c604"
      }
    },
    "owner": "itifranco08"
  }
}
