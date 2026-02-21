# ElevenLabs Rotom Assistant (React + Capacitor Android)

Production-oriented starter repository for a voice assistant client that supports multiple local profiles:
- **Profile = face + voice + ElevenLabs agent config**
- Built with **Vite + React + TypeScript + Tailwind + Zustand**
- Persists profiles using **IndexedDB** via `idb-keyval`
- Packaged to Android via **Capacitor**

## Features

- Home screen with a Rotom-inspired face area, mic control, and status transitions (`idle → listening → thinking → speaking`).
- Top-left settings drawer for active profile + per-profile ElevenLabs config.
- Profiles screen with create/edit/delete flows.
- Face catalog and voice catalog infrastructure for future expansion.
- Mocked ElevenLabs service methods in one location for easy API wiring.

## Project Structure

```text
src/
  app/            # bootstrap + routes
  assets/         # static catalogs + placeholder faces
  components/     # reusable UI
  screens/        # Home, Settings, Profiles
  services/       # storage, audio, ElevenLabs
  store/          # Zustand global store
  types/          # shared app types
  utils/          # helpers
android/          # Capacitor Android project
```

## Local Development

```bash
npm install
npm run dev
```

Build web assets:

```bash
npm run build
```

Lint and format:

```bash
npm run lint
npm run format
```

## Capacitor Android Workflow

Sync web build to Android project:

```bash
npm run build
npx cap sync android
```

Open in Android Studio:

```bash
npx cap open android
```

## APK Export

### Debug APK

In Android Studio:
1. Open `android/` project.
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
3. Debug APK is generated under `android/app/build/outputs/apk/debug/`.

### Signed Release APK

Create a keystore (once):

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore rotom-release-key.keystore -alias rotom -keyalg RSA -keysize 2048 -validity 10000
```

In `android/gradle.properties`, add:

```properties
RELEASE_STORE_FILE=../rotom-release-key.keystore
RELEASE_STORE_PASSWORD=your_password
RELEASE_KEY_ALIAS=rotom
RELEASE_KEY_PASSWORD=your_password
```

In `android/app/build.gradle`, create a `signingConfigs.release` block and apply it to `buildTypes.release`, then in Android Studio use:
- **Build > Generate Signed Bundle / APK**

Output path will be `android/app/build/outputs/apk/release/`.

## De-Googled Android Compatibility Notes

- No Google Play Services dependency is required.
- Uses standard Web APIs (`MediaRecorder`, `Web Audio`, IndexedDB) within Capacitor WebView.
- Keep Android System WebView updated for best codec support.
- If `audio/webm;codecs=opus` is unavailable, app falls back to alternative MIME options.

## Security Notes

- API keys are stored locally in IndexedDB on-device.
- This is a pragmatic mobile-webview baseline; for hardened security, move secrets behind your own backend/proxy.

## TODO for Real ElevenLabs Integration

Update `src/services/elevenLabsService.ts`:
- `transcribeAudio`
- `sendToAgent`
- `generateSpeech`
- `testConnection`

These methods already define the shape of config and responses for future production wiring.
