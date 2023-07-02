import routes from "@/web/routes.js"

const addNewAddress =
  ({ api }) =>
  async (
    userId,
    {
      firstName,
      lastName,
      addressFull,
      addressOptional,
      country,
      city,
      cp,
      phoneNumber,
      address_default,
    }
  ) => {
    try {
      const { data } = await api.post(routes.api.users.address.add(userId), {
        firstName,
        lastName,
        addressFull,
        addressOptional,
        country,
        city,
        cp,
        phoneNumber,
        address_default,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addNewAddress
