import classNames from "classnames"
import { useField } from "formik"
import { forwardRef } from "react"

const FormField = forwardRef((props, ref) => {
  const { className, label, name, active, helpText, ...otherProps } = props
  const [field, { error, touched }] = useField({ name })
  const hasError = error && touched
  const hasHelpText = helpText

  return (
    <label className={classNames("flex flex-col text-md", className)}>
      {label ?? <span>{label}</span>}
      <input
        className={classNames(
          "font-bold border-stone-500 border focus:border-2 rounded-lg px-2 py-1 focus:outline-none disabled:border-0 disabled:cursor-text disabled:opacity-50",
          {
            "focus:outline-none": !hasError,
            "focus:border-red-600": hasError,
          }
        )}
        {...field}
        {...otherProps}
        ref={ref}
        disabled={active}
      />
      {hasError && <span className="text-sm text-red-600">{error}</span>}
      {hasHelpText && (
        <span className="italic text-sm text-gray-600">{helpText}</span>
      )}
    </label>
  )
})

FormField.displayName = "FormField"

export default FormField
