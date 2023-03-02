import classNames from "classnames"
import { useField } from "formik"
import { forwardRef } from "react"

// eslint-disable-next-line react/display-name
const FormField = forwardRef((props, ref) => {
  const { className, label, name, ...otherProps } = props
  const [field, { error, touched }] = useField({ name })
  const hasError = error && touched

  return (
    <label className={classNames("flex flex-col gap-2", className)}>
      {label ?? <span>{label}</span>}
      <input
        className={classNames("rounded-lg border-2 px-4 py-2 outline-none", {
          "focus:border-blue-600": !hasError,
          "focus:border-red-600": hasError,
        })}
        {...field}
        {...otherProps}
        ref={ref}
      />
      {hasError && <span className="text-sm text-red-600">{error}</span>}
    </label>
  )
})

export default FormField