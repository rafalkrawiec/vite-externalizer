import type { Plugin, UserConfig } from 'vite';
import { join, normalize } from 'node:path';

/**
 * This plugin externalizes all imports which are not relative imports within
 * packages. Meaning it won't bundle any 3rd party packages.
 *
 * @public
 */
export const externalizer = (): Plugin => {
  return {
    name: 'externalizer',
    config(config) {
      // Imports are resolved to absolute paths, so we need to match our
      // parsed entry points to absolute paths as well.
      let entries = resolveEntryPoints(config).map((entry) => {
        return join(process.cwd(), entry);
      });

      return {
        build: {
          rollupOptions: {
            external(source) {
              // Check if source is not an entry point.
              // These might differ, and not always starts with "."
              if (isEntryModule(source, entries)) {
                return false;
              }

              // Check for all relative imports starting with "."
              // These should be bundled.
              if (isRelative(source)) {
                return false;
              }

              // Some imports come as absolute paths.
              // We check if they are within the package directory.
              return !isIncluded(source);
            },
          },
        },
      };
    },
  };
};

function isEntryModule(source: string, entries: string[]) {
  return entries.includes(normalize(source));
}

function isRelative(source: string) {
  return source.startsWith('.');
}

function isIncluded(source: string) {
  return normalize(source).startsWith(process.cwd());
}

function resolveEntryPoints(config: UserConfig): string[] {
  if (!config.build?.lib) {
    return [];
  }

  if (typeof config.build.lib.entry === 'string') {
    return [config.build.lib.entry];
  }

  if (config.build.lib.entry instanceof Array) {
    return config.build.lib.entry;
  }

  return Object.values(config.build.lib.entry);
}
