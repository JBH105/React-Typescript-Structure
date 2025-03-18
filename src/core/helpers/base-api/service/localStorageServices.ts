export const localStorageService = {
  getItem: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  setItem: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },

  stringGetItem: (key: string): string | null => {
    const item = localStorage.getItem(key);
    return item;
  },

  stringSetItem: (key: string, value: string): void => {
    localStorage.setItem(key, value);
  }
};
