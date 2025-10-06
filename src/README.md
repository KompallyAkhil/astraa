# Source Directory Structure

This directory contains the restructured source code following modern React/Next.js best practices with proper separation of concerns.

## Directory Structure

```
src/
├── components/          # React components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── tools/          # Tool-specific components
│   ├── shared/         # Shared business components
│   └── layout/         # Layout components (header, footer, etc.)
├── lib/                # Business logic and utilities
│   ├── core/           # Core utilities and services
│   ├── tools/          # Tool-specific logic
│   ├── services/       # External service integrations
│   └── utils/          # Utility functions
├── types/              # TypeScript type definitions
├── config/             # Configuration files and constants
├── hooks/              # Custom React hooks
└── README.md           # This file
```

## Import Patterns

With the new path mappings in `tsconfig.json`, you can use clean imports:

```typescript
// Instead of: import { Button } from '../../../components/ui/button'
import { Button } from '@/components/ui/button';

// Instead of: import { cn } from '../../../lib/utils'
import { cn } from '@/lib/utils';

// Types
import { ToolPlugin, UserPreferences } from '@/types';

// Configuration
import { APP_CONFIG, STORAGE_KEYS } from '@/config';

// Hooks
import { useToast } from '@/hooks';
```

## Barrel Exports

Each directory includes an `index.ts` file that exports all public APIs from that module:

```typescript
// Import everything from a module
import { StorageService, SettingsManager } from '@/lib/core';

// Or import specific items
import { cn } from '@/lib/utils';
import { ToolPlugin } from '@/types';
```

## Migration Guide

When moving existing code to this structure:

1. **Components**: Move to appropriate subdirectory in `src/components/`
2. **Utilities**: Move to `src/lib/utils/` or appropriate subdirectory
3. **Types**: Extract to `src/types/` and use barrel exports
4. **Configuration**: Move constants to `src/config/`
5. **Hooks**: Move to `src/hooks/`

## Best Practices

1. **Use barrel exports**: Always export public APIs through `index.ts` files
2. **Consistent imports**: Use the `@/` path mappings for all internal imports
3. **Type safety**: Define proper TypeScript interfaces in `src/types/`
4. **Separation of concerns**: Keep business logic in `lib/`, UI in `components/`
5. **Configuration**: Centralize constants and configuration in `src/config/`