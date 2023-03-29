import knexfile from "@@/knexfile"
import * as yup from "yup"

// generic
export const boolValidator = yup.bool()
export const stringValidator = yup.string()
export const idValidator = yup.number().integer().min(1)

// users
export const emailValidator = yup.string().email()

export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  )
  .label("Password")

// collection (pagination, order, etc.)
export const limitValidator = yup
  .number()
  .integer()
  .min(knexfile.pagination.limit.min)
  .max(knexfile.pagination.limit.max)
  .default(knexfile.pagination.limit.default)

export const pageValidator = yup.number().integer().min(1).default(1)

export const orderFieldValidator = (fields) => yup.string().oneOf(fields)

export const orderValidator = yup.string().lowercase().oneOf(["asc", "desc"])

export const createValidator = (object) => yup.object().shape(object)
