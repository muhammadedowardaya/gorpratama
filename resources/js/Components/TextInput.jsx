import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        placeholder,
        pattern,
        onChange,
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 focus:border-blue-300 focus:ring-blue-300 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={onChange}
                placeholder={placeholder}
                pattern={pattern}
            />
        </div>
    );
});
