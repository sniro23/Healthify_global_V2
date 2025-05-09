#!/bin/bash

# Update React imports
find src -type f -name "*.tsx" -exec sed -i '' 's/import React from '\''react'\''/import * as React from '\''react'\''/g' {} +
find src -type f -name "*.tsx" -exec sed -i '' 's/import React, { \([^}]*\) } from '\''react'\''/import * as React from '\''react'\''\nimport { \1 } from '\''react'\''/g' {} +

# Update clsx imports
find src -type f -name "*.tsx" -exec sed -i '' 's/import clsx from '\''clsx'\''/import * as clsx from '\''clsx'\''/g' {} + 