import routes from "@/web/routes.js"

const updateBillingAddress =
  ({ api }) =>
  async (addressId, { addressFull, country, city, cp, phoneNumber }) => {
    try {
      const { data } = await api.patch(
        routes.api.users.billingAddress.update(addressId),
        {
          addressFull,
          country,
          city,
          cp,
          phoneNumber,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateBillingAddress
