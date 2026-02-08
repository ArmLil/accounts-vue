# vue-accounts-manager-simple

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev:all
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Vue Accounts Manager

Приложение для управления учетными записями с валидацией и автосохранением.

## 📋 Требования

- **Node.js**: v18+ или v20+ (LTS)
- **npm**: v9+

## 🚀 Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone <repository-url>
cd vue-accounts-manager

# 2. Установить зависимости
npm install

# 3. Запустить проект
npm run dev:all


Приложение: http://localhost:5173

API: http://localhost:3000/accounts

🛠 Технологии
Vue 3 + Composition API + TypeScript

Pinia для управления состоянием

Vuetify 3 для UI компонентов

Vue Router для маршрутизации

JSON Server для mock API

Axios для HTTP запросов
```
