import * as yup from "yup"
import {Form, Formik} from "formik"
import Button from "@/components/Button"
import FormField from "@/components/FormField"
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons"
import TextAuth from "@/components/Auth/TextAuth"


const defaultInitialValues = {
    email: "",
    password: ""
}


const defaultValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email invalide")
        .required("Enter a email please")
        .label("Email"),
    password: yup
        .string()
        .required("Enter a password please")
        .label("Password"),
})


const LoginForm = (props) => {
    const {
        onSubmit,
        initialValues = defaultInitialValues,
        validationSchema = defaultValidationSchema
    } = props

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form className="flex flex-col gap-4 p-4">
                <FormField name="email" type="text" label="E-mail" icon={faEnvelope}/>
                <FormField name="password" type="password" label="Password" icon={faLock}/>
                <TextAuth route="./register" text1="Pas de compte ?" text2="Inscrivez-vous"/>
                <Button type="submit">
                    Se connecter
                </Button>
            </Form>
        </Formik>
    )
}

export default LoginForm