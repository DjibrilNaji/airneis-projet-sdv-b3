import Alert from "@/web/components/Form/Alert.jsx"
import classNames from "classnames"

const FormSuccess = (props) => {
  const { className, success, ...otherProps } = props

  if (!success) {
    return null
  }

  return (
    <Alert
      className={classNames("flex flex-col gap-4", className)}
      variant="success"
      {...otherProps}
    >
      {success}
    </Alert>
  )
}

export default FormSuccess
