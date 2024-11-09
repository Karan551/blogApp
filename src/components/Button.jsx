

export default function Button({
    children,
    cssClass = "",
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    ...props
}) {


    return (
        <button className={`px-4 rounded-lg py-2 ${cssClass}
        ${textColor} ${bgColor}`}
            type={type}
            {...props}
        >
            {children}

        </button>
    );
}
