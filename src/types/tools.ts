// Tool-related type definitions
import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  version: string;
  author?: string;
  tags: string[];
}

export interface ToolConfig {
  settings: Record<string, unknown>;
  shortcuts: KeyboardShortcut[];
  exportFormats: ExportFormat[];
  importFormats: ImportFormat[];
}

export interface ToolPlugin {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  component: React.ComponentType<ToolComponentProps>;
  config: ToolConfig;
  metadata: ToolMetadata;
}

export interface ToolComponentProps {
  config: ToolConfig;
  onDataChange: (data: unknown) => void;
  onError: (error: Error) => void;
  initialData?: unknown;
}

export type ToolCategory = 
  | 'developer'
  | 'design'
  | 'productivity'
  | 'utility'
  | 'entertainment'
  | 'finance'
  | 'security';

export interface KeyboardShortcut {
  key: string;
  modifiers: ('ctrl' | 'alt' | 'shift' | 'meta')[];
  action: string;
  description: string;
}

export interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
}

export interface ImportFormat {
  id: string;
  name: string;
  extensions: string[];
  mimeTypes: string[];
}