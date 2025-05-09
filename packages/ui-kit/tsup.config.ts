import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/api/index.ts',
    'src/auth-module/index.ts',
    'src/components/auth/index.ts',
    'src/components/ehr/index.ts',
    'src/components/navigation/index.ts',
    'src/components/ui/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  minify: false,
  sourcemap: true,
  target: 'es5',
  esbuildOptions(options) {
    options.jsx = 'automatic';
    options.jsxImportSource = 'react';
  },
  tsconfig: 'tsconfig.json',
  external: ['react', 'react-dom', 'next', '@supabase/supabase-js', 'clsx'],
  banner: {
    js: '"use client";'
  }
}); 