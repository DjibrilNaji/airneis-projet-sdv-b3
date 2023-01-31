import FormField from "@/components/FormField"
import {Form, Formik} from "formik"
import * as yup from "yup"
import TextAuth from "@/components/Auth/TextAuth"
import React from "react"
import {faEnvelope, faLock, faPerson} from "@fortawesome/free-solid-svg-icons"
import Button from "@/components/Button"

const defaultInitialValues = {
    name: "",
    email: "",
    password: ""
}

const defaultValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Le nom est obligatoire")
        .label("Name"),
    email: yup
        .string()
        .email("email invalide")
        .required("L'email est obligatoire")
        .label("Email"),
    password: yup
        .string()
        .required("Le mot de passe est obligatoire")
        .label("Password"),
})

const RegisterForm = (props) => {
    const {
        onSubmit,
        initialValues = defaultInitialValues,
        validationSchema = defaultValidationSchema,
    } = props

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            <Form className="flex flex-col gap-4 p-4">
                <FormField name="name" type="text" label="Nom complet*" icon={faPerson}/>
                <FormField name="email" type="email" label="E-mail*" icon={faEnvelope}/>
                <FormField name="password" type="password" label="Password*" icon={faLock}/>
                <TextAuth route="./login" text1="Déjà un compte ?" text2="Connectez-vous" button="S'inscrire"/>
                <Button type="submit">
                    S'inscrire
                </Button>
            </Form>
        </Formik>
    )
}
export default RegisterForm
