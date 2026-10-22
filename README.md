# Nazar (FalApp)

Nazar is a React Native fortune-telling app prototype with a Liquid Glass-inspired visual style. The current app includes a home experience for choosing a fortune type, entering a question, and viewing fortune history.

## Tech stack

- React Native 0.84 and TypeScript
- React Navigation bottom tabs
- AsyncStorage for local data
- Image Picker for selecting images
- Reanimated and Linear Gradient for UI effects

## Setup

Requirements: Node.js 22.11 or later and a React Native environment for Android or iOS.

```sh
npm install
npm start
```

In another terminal, run the app:

```sh
npm run android
# or
npm run ios
```

For iOS, install native dependencies when needed:

```sh
cd ios && pod install && cd ..
```

See the [React Native environment setup guide](https://reactnative.dev/docs/set-up-your-environment).

## AI integration

The current project is a client-side app. If you connect it to an AI provider, send requests through a backend service and keep provider API keys on the server. Do not embed secret API keys in the mobile app.

## Available scripts

```sh
npm start
npm run android
npm run ios
npm run lint
npm test
```