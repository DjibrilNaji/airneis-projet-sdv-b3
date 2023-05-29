import routes from "@/web/routes.js"

const addNewBillingAddress =
  ({ api }) =>
  async (userId, { addressFull, country, city, cp, phoneNumber }) => {
    try {
      const { data } = await api.post(
        routes.api.users.billingAddress.add(userId),
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

export default addNewBillingAddress
