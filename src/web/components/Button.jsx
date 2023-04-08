import classNames from "classnames"

const variants = {
  primary: "text-white uppercase rounded-full active:bg-",
  secondary: "",
  third: "border-2 rounded-full flex justify-center",
}

const sizes = {
  sm: "",
  normal: "px-2 py-1",
  md: "px-10 py-3 text-sm",
}

const colors = {
  light: "bg-stone-400",
  dark: "bg-stone-700",
  gray: "bg-gray-100 hover:bg-gray-200",
}

const Button = (props) => {
  const {
    variant = "primary",
    size = "md",
    color = "dark",
    className,
    ...otherProps
  } = props

  return (
    <button
      className={classNames(
        variants[variant],
        sizes[size],
        colors[color],
        className
      )}
      {...otherProps}
    />
  )
}

export default Button
