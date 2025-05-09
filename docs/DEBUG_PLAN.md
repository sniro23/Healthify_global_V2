# UI Kit Debug Plan

## Current Issues
1. ❌ Type Resolution Problems:
   - Cannot find module '@healthify/types'
   - Path aliases not working correctly between tsup and TypeScript

2. ❌ Build Configuration Issues:
   - 'use client' directive warnings in bundled output
   - Incremental build errors
   - DTS build failures

3. ❌ Module Resolution:
   - Missing or incorrect file paths in imports
   - Inconsistent path aliases between tsup and tsconfig

## Implementation Steps

### 1. Types Package Setup ❌
```bash
# In types directory
rm -rf dist node_modules tsconfig.tsbuildinfo
npm install
npm run build
```

### 2. UI Kit Configuration Updates ❌

#### a. tsconfig.json
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@healthify/types": ["../../types/dist"],
      "@healthify/types/*": ["../../types/dist/*"],
      "@/*": ["./src/*"]
    },
    "jsx": "react-jsx",
    "lib": ["dom", "ES2015"],
    "module": "ESNext",
    "target": "ES2020",
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### b. tsup.config.ts
```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/ui/index.ts',
    'src/components/auth/index.ts',
    'src/auth-module/index.ts',
    'src/components/ehr/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  clean: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/*',
    '@supabase/supabase-js',
    'lucide-react',
  ],
  treeshake: true,
  sourcemap: true,
  splitting: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
    options.jsx = 'automatic';
    options.jsxImportSource = 'react';
    options.alias = {
      '@/*': './src/*',
      '@healthify/types': '../../types/dist'
    };
  }
});
```

### 3. UI Kit Rebuild ❌
```bash
# In packages/ui-kit directory
rm -rf dist node_modules tsconfig.tsbuildinfo
npm install
npm run build
```

## Verification Steps ❌

1. Types Package:
   - [ ] Check dist folder exists
   - [ ] Verify index.d.ts exists
   - [ ] Verify type declarations are correct

2. UI Kit:
   - [ ] Check ESM output
   - [ ] Check CJS output
   - [ ] Verify type declarations
   - [ ] Verify source maps

3. Import Verification:
   - [ ] @healthify/types imports work
   - [ ] Component imports work
   - [ ] Type information is available

## Progress Tracking
- [ ] Step 1: Types Package Setup
- [ ] Step 2a: UI Kit tsconfig.json update
- [ ] Step 2b: UI Kit tsup.config.ts update
- [ ] Step 3: UI Kit rebuild
- [ ] Verification complete 