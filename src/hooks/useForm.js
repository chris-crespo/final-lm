import useDidUpdateEffect from './useDidUpdateEffect.js';

const { useState, useRef, useEffect } = React;

const changeClass = (element, { valid, required, empty }) => 
    element.className = valid 
        ? "valid" 
        : required || !empty
        ? "invalid"
        : "";

const isValid = (state, { required, pattern }) =>
    pattern.test(state) && (!required || required && state.length > 0);

const useFormState = () => {
    const [fields, setFields] = useState({});

    const text = name => fields[name];
    const updateField = (name, value) => setFields({ ...fields, [name]: value });

    return { fields, text, updateField };
}

const useFormValidity = () => {
    const [fields, setFields] = useState({});

    const valid = name => fields[name];
    const setValidity = valid => name => setFields({ ...fields, [name]: valid });
    const validate = setValidity(true);
    const invalidate = setValidity(false);

    return { fields, valid, validate, invalidate };
}

const useFormRefs = () => {
    const refs = useRef({});

    const ref = name => refs.current[name];
    const registerRef = (name, ref) => refs.current = { ...refs.current, [name]: ref };

    return { refs, ref, registerRef };
}

const useFormWatchers = () => {
    const watchers = useRef(new Set());

    const sub = fn => watchers.current.add(fn);
    const watch = fn => {
        sub(fn);
        return { unsub: () => unwatch(fn) }
    }
    const unwatch = fn => watchers.current.delete(fn);

    const invokeWatchers = state => watchers.current.forEach(fn => fn(state));

    return { watch, invokeWatchers }
}

const useForm = () => {
    const { fields: inputs, text, updateField } = useFormState();
    const { fields: valids, valid, validate, invalidate } = useFormValidity();
    const { refs, ref, registerRef } = useFormRefs();
    const { watch, invokeWatchers } = useFormWatchers();

    const invalidateWithEffect = name => {
        invalidate(name);
        changeClass(refs.current[name].current, false);
    }

    const validForm = () => Object.values(valids).every(x => x);
    useEffect(() => { invokeWatchers({ valid: validForm() }) }, [inputs]);

    const register = (name, { required = false, pattern = /./ }) => {
        const [state, setState] = useState("");
        const ref = useRef(null);

        registerRef(name, ref);

        const onChange = e => {
            setState(e.target.value);
            updateField(name, e.target.value);
        }

        const validInput = isValid(state, { pattern, required });
        useEffect(() => {
            validInput ? validate(name) : invalidate(name);
        }, [state]);

        useDidUpdateEffect(() => {
            changeClass(ref.current, { valid: validInput, required, empty: state.length === 0 });
        }, [state]);

        return { ref, name, onChange }
    }

    const handleSubmit = onSubmit => e => {
        e.preventDefault();
        onSubmit(inputs);
    }

    return {
        register,
        invalidate,
        watch,
        handleSubmit
    }
}

export default useForm;
