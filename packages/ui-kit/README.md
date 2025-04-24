# @healthify/ui-kit

The UI component library for the Healthify Global application.

## Overview

This package contains a collection of reusable UI components that are used across all Healthify portal applications (patient, doctor, and admin). The components are built using React and styled with Tailwind CSS.

## Components

The library includes:

- Basic UI components (Button, Card, Input, Label, etc.)
- Authentication components (LoginForm, RegisterForm)
- Layout components
- Form components
- Healthcare-specific components

## Usage

Import components directly from the package:

```tsx
import { Button, Card, Input } from '@healthify/ui-kit';

function MyComponent() {
  return (
    <Card>
      <h2>My Form</h2>
      <Input placeholder="Enter your name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Development

To add a new component to the library:

1. Create a new file in the `src` directory
2. Export the component in `src/index.ts`
3. Add any necessary styles
4. Add tests for the component

## Building

```
yarn workspace @healthify/ui-kit build
```

## Architecture Decisions

- Uses Radix UI primitives for accessibility
- Implements class-variance-authority for variant management
- Follows a consistent naming convention for components
- Uses TypeScript for type safety 