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
  created: Date;
  modified: Date;
  featured?: boolean;
  deprecated?: boolean;
}

export interface ToolConfig {
  settings: Record<string, unknown>;
  shortcuts: KeyboardShortcut[];
  exportFormats: ExportFormat[];
  importFormats: ImportFormat[];
  defaultSettings?: Record<string, unknown>;
  validation?: ValidationSchema;
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
  integration?: ToolIntegration;
  permissions?: ToolPermissions;
}

export interface ToolComponentProps {
  config: ToolConfig;
  onDataChange: (data: unknown) => void;
  onError: (error: Error) => void;
  onSave?: (data: unknown) => void;
  onLoad?: () => unknown;
  initialData?: unknown;
  readonly?: boolean;
}

export type ToolCategory = 
  | 'developer'
  | 'design'
  | 'productivity'
  | 'utility'
  | 'entertainment'
  | 'finance'
  | 'security'
  | 'text'
  | 'image'
  | 'data';

export interface KeyboardShortcut {
  key: string;
  modifiers: ('ctrl' | 'alt' | 'shift' | 'meta')[];
  action: string;
  description: string;
  enabled?: boolean;
  global?: boolean;
}

export interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  description?: string;
  options?: Record<string, unknown>;
}

export interface ImportFormat {
  id: string;
  name: string;
  extensions: string[];
  mimeTypes: string[];
  description?: string;
  validator?: (data: unknown) => boolean;
}

export interface ToolIntegration {
  canAccept(data: unknown, fromTool: string): boolean;
  accept(data: unknown, fromTool: string): void;
  canProvide(toTool: string): boolean;
  provide(toTool: string): unknown;
  supportedTools: string[];
}

export interface ToolPermissions {
  clipboard: boolean;
  fileSystem: boolean;
  network: boolean;
  storage: boolean;
  camera?: boolean;
  microphone?: boolean;
}

export interface ValidationSchema {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean';
  properties?: Record<string, ValidationSchema>;
  required?: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minimum?: number;
  maximum?: number;
}

export interface ToolSettings {
  toolId: string;
  userId?: string;
  settings: Record<string, unknown>;
  shortcuts: Record<string, string>;
  lastUsed: Date;
  usageCount: number;
  favorites: boolean;
}