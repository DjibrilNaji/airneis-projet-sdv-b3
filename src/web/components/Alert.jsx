import classNames from "classnames"

const variants = {
  info: "bg-blue-200 text-blue-800",
  danger: "bg-red-200 text-red-800",
}

const Button = (props) => {
  const { className, variant = "primary", ...otherProps } = props

  return (
    <div
      className={classNames("rounded-lg p-4", variants[variant], className)}
      {...otherProps}
    />
  )
}

export default Button