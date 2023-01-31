import {Field} from "formik"
import InputAuth from "@/components/Auth/InputAuth"

const FormField = (props) => {
    const {name, label, type, icon} = props

    return (
        <>
            <Field name={name}>
                {({field, meta}) => (
                    <label className="flex flex-col gap-2">
                        <InputAuth {...field} type={type} placeholder={label} icon={icon}/>
                        {meta.touched && meta.error ? (
                            <span className="text-red-600">{meta.error}</span>
                        ) : null}
                    </label>
                )}
            </Field>
        </>
    )
}

export default FormField
