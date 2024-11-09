import React, { useId, forwardRef } from 'react';

const Input = forwardRef(function Input({
    label,
    labelCss = "",
    type = "text",
    cssClass = "",
    ...props
}, ref) {

    const id = useId();
    return (
        <div className='w-full'>
            {
                label && <label className={`inline-block mb-2 pl-1 text-lg md:text-2xl ${labelCss}`} htmlFor={id}>{label}</label>
            }
            {
                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${cssClass} focus:ring-1 focus:ring-indigo-600`}
                    id={id}
                    ref={ref}
                    {...props}
                />
            }




        </div>
    );
});

export default Input;