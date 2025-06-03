export const setToSessionStorage = (key: string, token: string) => {
  if (!key || typeof window === undefined) {
    return;
  }
  return sessionStorage.setItem(key, JSON.stringify(token));
};

export const getFromSessionStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return;
  }

  return JSON.parse(sessionStorage.getItem(key)!);
};

export const removeFromSessionStorage = (key: string) => {
  if (!key || typeof window === "undefined") return;

  return sessionStorage.removeItem(key);
};
