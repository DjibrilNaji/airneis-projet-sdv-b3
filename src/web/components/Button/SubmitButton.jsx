import Button from "@/web/components/Button/Button.jsx"
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
  } = useFormikContext()
  const { active, className } = props

  const activeBool = active === "true" ? true : false

  return (
    <Button
      {...props}
      disabled={isSubmitting || !isValid || activeBool}
      className={classNames(variant, size, color, className)}
    >
      {props.children ?? children}
    </Button>
  )
}

export default SubmitButton
