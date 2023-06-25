import * as yup from "yup"
import { Form, Formik } from "formik"
import Button from "@/web/components/Button.jsx"
import FormField from "@/web/components/FormField.jsx"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import TextAuth from "@/web/components/Auth/TextAuth.jsx"
import FormError from "../FormError.jsx"
import routes from "@/web/routes.js"

const defaultInitialValues = {
  email: "",
  password: "",
}

const defaultValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email invalide")
    .required("Enter a email please")
    .label("Email"),
  password: yup.string().required("Enter a password please").label("Password"),
})

const LoginForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    error,
  } = props

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <>
        <FormError error={error} />
        <Form className="flex flex-col gap-4 p-4">
          <FormField
            name="email"
            type="text"
            label="E-mail"
            icon={faEnvelope}
          />
          <FormField
            name="password"
            type="password"
            label="Password"
            icon={faLock}
          />
          <TextAuth
            route={routes.signUp()}
            text1="Pas de compte ?"
            text2="Inscrivez-vous"
          />
          <TextAuth
            route={routes.checkEmail()}
            text1="Vous avez oubliez votre mot de passe ?"
            text2="Cliquez ici !"
          />
          <Button type="submit">Se connecter</Button>
        </Form>
      </>
    </Formik>
  )
}

export default LoginForm
