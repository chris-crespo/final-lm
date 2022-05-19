const {
  useState,
  useEffect
} = React;

const useApi = url => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    fetch(url).then(res => {
      setLoading(false);
      setResponse(res);
    });
  }, []);
  return [loading, response];
};

export default useApi;