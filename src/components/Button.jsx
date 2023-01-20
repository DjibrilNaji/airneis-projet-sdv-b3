import classNames from "classnames"

const variants = {
    primary: "text-white uppercase rounded-full active:bg-",
    secondary: "",
}

const sizes = {
    sm: "",
    md: "px-10 py-3 text-sm",
}

const colors = {
    light: "bg-stone-400",
    dark: "bg-stone-700",
}

const Button = (props) => {
    const {variant = "primary", size = "md", color = "dark", className, ...otherProps} = props

    return (
        <button
            className={classNames(variants[variant], sizes[size], colors[color], className)}
            {...otherProps}
        />
    )
}

export default Button
