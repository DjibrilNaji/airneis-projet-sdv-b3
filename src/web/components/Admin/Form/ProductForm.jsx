import { Field, Form, Formik } from "formik"
import * as yup from "yup"
import FormError from "@/web/components/FormError"
import SubmitButton from "@/web/components/SubmitButton"
import FormField from "@/web/components/Admin/FormField"

const defaultInitialValues = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  highlander: "",
  slug: "",
  categoryId: "",
}

const defaultValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom du produit est obligatoire")
    .label("Name"),
  description: yup
    .string()
    .required("La description est obligatoire")
    .label("description"),
  price: yup.number().required("Le prix est obligatoire").label("price"),
  highlander: yup.boolean().required().label("Highlander").default(false),
  slug: yup
    .string()
    .matches(
      /^[a-z]+[a-z-]*$/,
      "The URL cannot contain any capital letters, any numbers, any special characters except '-' to separate certain words"
    )
    .label("Slug"),
  categorieId: yup
    .string()
    .required("La categorie est obligatoire")
    .label("Categorie")
    .default("1"),
})

const ProductForm = (props) => {
  const {
    onSubmit,
    onChange,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    categories,
    error,
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <>
        <FormError error={error} />
        <Form className="flex flex-col gap-4 p-4">
          <FormField name="name" type="text" label="Nom du Produit :" />
          <FormField name="description" type="text" label="Description :" />
          <FormField name="price" type="number" label="Prix :" />
          <FormField name="quantity" type="number" label="Quantity :" />
          <label className="flex flex-col gap-2">
            {" "}
            Highlander
            <Field name="highlander" type="checkbox" />
          </label>
          <label className="flex flex-col gap-2">
            {" "}
            Catégorie
            <Field as="select" name="categorieId">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Field>
          </label>
          <FormField name="slug" type="text" label="Slug :" />
          <FormField
            name="file"
            type="file"
            label="Main Image :"
            onChange={onChange}
          />
          <SubmitButton color="light" variant="secondary" size="sm">
            Submit
          </SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default ProductForm