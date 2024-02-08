const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      //
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      //
    }
  };

  const removeItem = (): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      //
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;