import Button from "@/web/components/Button.jsx"
import classNames from "classnames"
import { useFormikContext } from "formik"

const SubmitButton = (props) => {
  const {
    children = "Submit",
    isSubmitting,
    isValid,
    variant,
    size,
    color,
    className,
  } = useFormikContext()

  return (
    <Button
      {...props}
      disabled={isSubmitting || !isValid}
      className={classNames(variant, size, color, className)}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
