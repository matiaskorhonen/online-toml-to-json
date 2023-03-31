# Online TOML to JSON converter

A simple tool for converting [TOML][toml] to JSON, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

> **TOML** (Tom's Obvious, Minimal Language) aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.

This might be pretty rough and certainly isn't the prettiest site out there but it should largely work.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
