import { useId, forwardRef } from "react";


function Select(
    { label, options, cssClass = "", ...props },
    ref) {

    const id = useId();
    return (
        <section className="w-full">
            {label && <label className="text-lg md:text-2xl" htmlFor={id}>{label}</label>}
            <select
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:ring-1 focus:ring-indigo-600 duration-200 border border-gray-200 w-full ${cssClass}`}
                {...props}
                ref={ref}

            >
                <option value="">--Select---</option>

                {
                    options?.map((eachOption, index) => (
                        <option key={index} value={eachOption}>{eachOption}</option>
                    ))
                }
            </select>
        </section>
    );
}

export default forwardRef(Select);
