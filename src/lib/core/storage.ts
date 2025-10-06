// Storage service interface and implementation

export interface StorageService {
  save<T>(key: string, data: T): Promise<void>;
  load<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
  export(keys: string[]): Promise<Blob>;
  import(file: File): Promise<Record<string, unknown>>;
  clear(): Promise<void>;
}

export class LocalStorageService implements StorageService {
  async save<T>(key: string, data: T): Promise<void> {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      throw new Error(`Failed to save data to localStorage: ${error}`);
    }
  }

  async load<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      throw new Error(`Failed to load data from localStorage: ${error}`);
    }
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async export(keys: string[]): Promise<Blob> {
    const data: Record<string, unknown> = {};
    
    for (const key of keys) {
      const value = await this.load(key);
      if (value !== null) {
        data[key] = value;
      }
    }

    const json = JSON.stringify(data, null, 2);
    return new Blob([json], { type: 'application/json' });
  }

  async import(file: File): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const data = JSON.parse(content) as Record<string, unknown>;
          resolve(data);
        } catch (error) {
          reject(new Error(`Failed to parse import file: ${error}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read import file'));
      };
      
      reader.readAsText(file);
    });
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}