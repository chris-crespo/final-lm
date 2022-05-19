const {
  useRef,
  useEffect
} = React;

const useDidUpdateEffect = (fn, inputs) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) return fn();
    didMount.current = true;
  }, inputs);
};

export default useDidUpdateEffect;