import { Form, Formik } from "formik"
import * as yup from "yup"
import FormError from "@/web/components/Form/FormError"
import SubmitButton from "@/web/components/Button/SubmitButton"
import FormField from "@/web/components/Admin/Form/FormField"

const defaultInitialValues = {
  name: "",
  description: "",
  slug: "",
}

const defaultValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom de la catégorie est obligatoire")
    .label("name"),
  description: yup
    .string()
    .required("La description de la catégorie est obligatoire")
    .label("description"),
  slug: yup
    .string()
    .required("Le slug de la catégorie est obligatoire")
    .label("slug"),
})

const EditCategoryForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    active,
    error,
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      <>
        <FormError error={error} />
        <Form className="flex flex-col gap-4 p-4">
          <FormField
            name="name"
            type="text"
            label="Category name:"
            active={active}
          />
          <FormField
            name="description"
            type="text"
            label="Category Description :"
            active={active}
          />
          <FormField name="slug" type="text" label="Slug :" active={active} />
          <SubmitButton
            active={active.toString()}
            color="light"
            variant="secondary"
            size="sm"
            className="disabled:hidden"
          >
            Update
          </SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default EditCategoryForm
