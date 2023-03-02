import Alert from "@/web/components/Alert.jsx"
import classNames from "classnames"

const FormError = (props) => {
  const { className, error, ...otherProps } = props

  if (!error) {
    return null
  }

  return (
    <Alert
      className={classNames("flex flex-col gap-4", className)}
      variant="danger"
      {...otherProps}
    >
      {error.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </Alert>
  )
}

export default FormError