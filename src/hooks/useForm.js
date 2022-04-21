const { useState, useRef, useEffect } = React;

const changeClass = (element, valid) => 
    element.className = valid ? "valid" : "invalid";

const useForm = () => {
    const [states, setStates] = useState({});

    const [valid, setValid] = useState({});
    const invalidate = name => {
        setValid({ ...valid, [name]: false });
        changeClass(refs.current[name].current, false);
    }

    const refs = useRef({});
    const registerRef = (name, ref) => refs.current[name] = ref;

    const watchers = useRef([]);
    const validForm = () => Object.values(valid).every(x => x);
    const invokeWatchers = () => watchers.current.forEach(fn => fn({
        valid: validForm()
    }));

    useEffect(() => { invokeWatchers() }, [valid]);

    const watch = fn => {
        watchers.current.push(fn);
        return { 
            unsub: () => unwatch(fn)
        }
    }
    const unwatch = fn =>
        watchers.current = watchers.current.filter(x => x !== fn);

    const register = (name, { required = false, pattern = /./ }) => {
        const [state, setState] = useState("");
        const ref = useRef(null);
        registerRef(name, ref);

        const onChange = e => {
            setState(e.target.value);
            setStates({ ...states, [name]: e.target.value });
        }

        const isFirst = useRef(true);
        useEffect(() => {
            const isValid = pattern.test(state) && (!required || required && state.length > 0);
            setValid({ ...valid, [name]: isValid });

            if (isFirst.current) isFirst.current = false;
            else changeClass(ref.current, isValid);
        }, [state]);

        return { ref, name, onChange }
    }

    const handleSubmit = onSubmit => e => {
        e.preventDefault();
        onSubmit(states);
    }

    return {
        register,
        invalidate,
        watch,
        handleSubmit
    }
}

export default useForm;
