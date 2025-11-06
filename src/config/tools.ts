// Tool configuration and registry
import { ToolCategory } from '@/types/index';

export const TOOL_CATEGORIES: Record<ToolCategory, { name: string; description: string }> = {
  developer: {
    name: 'Developer Tools',
    description: 'Tools for software development and programming',
  },
  design: {
    name: 'Design Tools',
    description: 'Tools for design and creative work',
  },
  productivity: {
    name: 'Productivity',
    description: 'Tools to enhance productivity and workflow',
  },
  utility: {
    name: 'Utilities',
    description: 'General purpose utility tools',
  },
  entertainment: {
    name: 'Entertainment',
    description: 'Games and entertainment tools',
  },
  finance: {
    name: 'Finance',
    description: 'Financial and currency tools',
  },
  security: {
    name: 'Security',
    description: 'Security and privacy tools',
  },
  text: {
    name: 'Text Tools',
    description: 'Text processing and manipulation tools',
  },
  image: {
    name: 'Image Tools',
    description: 'Image processing and editing tools',
  },
  data: {
    name: 'Data Tools',
    description: 'Data processing and analysis tools',
  },
} as const;

export const DEFAULT_TOOL_CONFIG = {
  settings: {},
  shortcuts: [],
  exportFormats: [
    {
      id: 'json',
      name: 'JSON',
      extension: 'json',
      mimeType: 'application/json',
    },
  ],
  importFormats: [
    {
      id: 'json',
      name: 'JSON',
      extensions: ['json'],
      mimeTypes: ['application/json'],
    },
  ],
} as const;