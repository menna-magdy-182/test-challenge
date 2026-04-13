# TestChallengeApp

A React Native mobile application built with React Native 0.85 and TypeScript.

## Tech Stack

| Category             | Library                            |
| -------------------- | ---------------------------------- |
| Framework            | React Native 0.85 / React 19       |
| Language             | TypeScript                         |
| Navigation           | React Navigation v7 (Native Stack) |
| Data Fetching        | TanStack React Query v5            |
| HTTP Client          | Axios                              |
| Forms                | React Hook Form + Zod              |
| Storage              | react-native-mmkv                  |
| Internationalization | i18next + react-i18next            |
| Icons                | react-native-vector-icons          |

## Project Structure

```
src/
├── api/                  # Axios client and API layer
├── app/
│   ├── navigation/       # Root navigator and route definitions
│   └── providers/        # App-level providers (QueryClient, i18n, etc.)
├── components/
│   └── common/           # Shared UI components (AppButton, AppInput, AppText, AppScreen)
├── contexts/             # React contexts
├── features/
│   ├── auth/             # Login screen, auth hooks, validation, token store
│   └── tests/            # Tests list screen, test card, hooks, utils
├── i18n/
│   └── locales/          # Translation files
├── storage/              # MMKV storage helpers
├── theme/                # Colors, typography, spacing
├── types/                # Shared TypeScript types
└── test-utils/           # Custom render helpers for testing
```

## Getting Started

### Prerequisites

- Node >= 22.11.0
- Ruby (for CocoaPods on iOS)
- Android Studio / Xcode

### Install dependencies

```sh
yarn install
```

### iOS — install native dependencies

```sh
bundle install
bundle exec pod install
```

### Start Metro

```sh
yarn start
```

### Run on device / simulator

```sh
# iOS
yarn ios

# Android
yarn android
```

## Available Scripts

| Script           | Description                    |
| ---------------- | ------------------------------ |
| `yarn start`     | Start Metro bundler            |
| `yarn ios`       | Build and run on iOS           |
| `yarn android`   | Build and run on Android       |
| `yarn test`      | Run Jest test suite            |
| `yarn lint`      | Run ESLint                     |
| `yarn lint:fix`  | Run ESLint with auto-fix       |
| `yarn format`    | Format all files with Prettier |
| `yarn typecheck` | Run TypeScript type checking   |

## Code Quality

- **ESLint** with React, React Native, React Hooks, and Prettier plugins
- **Prettier** for consistent formatting
- **Husky** pre-commit hooks with **lint-staged** (lint + format on staged files)
- **Commitlint** enforcing Conventional Commits
