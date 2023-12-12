# Vite Externalizer

This is very simple plugin to externalize all dependencies within your package,
so they're not being bundled. You don't have to define `rollupOptions.external`
within your `vite.config.ts`.

## What's the purpose

When developing some complex packages with quite large amount of dependencies 
we have found that's really hard to exclude all of them from bundling, mainly 
because some of those dependencies also might have another dependencies, 
and it's a nightmare to exclude them all manually.

## How to use

Simply add the plugin to your vite config file and that's it. There are 
no options available, as with our approach we don't need any as we always
want to exclude all third party dependencies.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { externalizer } from '@plenny/vite-externalizer';

export default defineConfig({
  plugins: [
    externalizer(),
  ],
});
```
