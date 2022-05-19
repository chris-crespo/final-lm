const {
  useState,
  useEffect
} = React;

const useSessionStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(JSON.parse(sessionStorage.getItem(key)) || defaultValue);
  }, []);
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

export default useSessionStorage;