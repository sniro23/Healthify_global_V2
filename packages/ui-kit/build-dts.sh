#!/bin/bash

# Build declarations for each entry point separately to avoid memory issues
echo "Building TypeScript declarations one by one to avoid memory issues"

# Build declarations for each entry point
for entry in \
  "src/index.ts" \
  "src/components/ui/index.ts" \
  "src/components/auth/index.ts" \
  "src/auth-module/index.ts" \
  "src/components/ehr/index.ts" \
  "src/components/navigation/index.ts" \
  "src/api/index.ts"
do
  echo "Building declarations for $entry"
  tsc "$entry" --declaration --emitDeclarationOnly --jsx react-jsx --skipLibCheck --outDir dist
done

echo "TypeScript declarations built successfully" 