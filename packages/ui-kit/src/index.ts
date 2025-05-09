'use client';

// Export base components directly
export { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
  type CardTitleProps
} from './components/ui/card/Card';

export { 
  Button, 
  type ButtonProps 
} from './components/ui/button/Button';

export { 
  Badge, 
  type BadgeProps 
} from './components/ui/badge/Badge';

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from './components/ui/tabs/Tabs';

// Export components
export * from './components';

// Export hooks
export * from './hooks';

// Export auth module
export * from './auth-module';

// Export EHR components
export * from './components/ehr';

// Re-export utils
export * from './lib/utils';
