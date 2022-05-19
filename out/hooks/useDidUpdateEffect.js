var _React = React,
    useRef = _React.useRef,
    useEffect = _React.useEffect;

var useDidUpdateEffect = function useDidUpdateEffect(fn, inputs) {
  var didMount = useRef(false);
  useEffect(function () {
    if (didMount.current) return fn();
    didMount.current = true;
  }, inputs);
};

export default useDidUpdateEffect;