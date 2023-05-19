import routes from "@/web/routes.js"

const modifyAddress =
  ({ api }) =>
  async (
    addressId,
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
      const { data } = await api.patch(
        routes.api.users.address.single(addressId),
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
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default modifyAddress
