## ElevenLabs Android Demo App Foundation

This repository is now intentionally trimmed down to the **demo Android app** so it can be used as a clean foundation for custom applications.

## What remains

- `example-app`: Android application module used as the starting point for your own UI and product logic.

The app depends on the published ElevenLabs Android SDK artifact:

```kotlin
implementation("io.elevenlabs:elevenlabs-android:0.7.2")
```

## Build the APK

```bash
./gradlew example-app:assembleDebug
```

The generated debug APK will be under:

```text
example-app/build/outputs/apk/debug/
```
