import Button from "@/web/components/Button.jsx"
import { useFormikContext } from "formik"

const SubmitButton = (props) => {
  const { children = "Submit", isSubmitting, isValid } = useFormikContext()

  return (
    <Button {...props} disabled={isSubmitting || !isValid}>
      {children}
    </Button>
  )
}

export default SubmitButton