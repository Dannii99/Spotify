export function addKeysToObject<T extends Record<string, any>>(item: T, setKey: string, setValue: any): T {
  Object.entries(item).forEach(([key, value]) => {
      item[key as keyof T] = {
          ...(value as object),
          [setKey]: setValue
      } as T[keyof T];
  });

  return item;
}
