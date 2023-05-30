import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import cookie from "cookie"
import useCartContext from "@/web/hooks/cartContext"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { useTranslation } from "next-i18next"
import Modal from "@/web/components/Modal"
import FormError from "@/web/components/FormError"
import AddressForm from "@/web/components/Checkout/AddressForm"
import { useRouter } from "next/router"
import createAPIClient from "@/web/createAPIClient"
import getAllAddressService from "@/web/services/address/getAllAddress"
import Button from "@/web/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfo, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import OrderSummary from "@/web/components/OrderSummary"

export const getServerSideProps = async ({ req, locale }) => {
  const cookies = req.headers.cookie
    ? cookie.parse(req.headers.cookie || "")
    : null

  const jwt = cookies ? (cookies.jwt !== undefined ? cookies.jwt : null) : null

  const userId = cookies
    ? cookies.userId !== undefined
      ? cookies.userId
      : null
    : null

  const redirection = () => {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const api = createAPIClient({ jwt, server: true })

  const getAllAddress = getAllAddressService({ api })

  const [err, data] = await getAllAddress(userId)

  if (err) {
    return redirection()
  }

  return {
    props: {
      jwt,
      userId,
      data: data.result,
      defaultAddress:
        data.defaultAddress.length > 0 ? data.defaultAddress[0] : null,
      ...(await serverSideTranslations(locale, [
        "navigation",
        "cart",
        "delivery",
        "address",
      ])),
    },
  }
}

const Delivery = (props) => {
  const { userId, data, defaultAddress } = props

  const {
    state: { subtotal, tva, total },
  } = useCartContext()

  const {
    actions: { addNewAddress, getAllAddress },
  } = useAppContext()

  const { t } = useTranslation(["cart", "delivery", "address"])
  const { locale } = useRouter()
  const direction = t("address:direction", { locale })

  const [error, setError] = useState(null)
  const [address, setAddress] = useState(data)
  const [addAddress, setAddAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress.id)
  const [visibleAddressId, setVisibleAddressId] = useState(null)

  const fetchAddressData = useCallback(async () => {
    const [err, data] = await getAllAddress(userId)

    if (err) {
      setError(err)

      return
    }

    setAddress(data.result)

    setSelectedAddress(
      data.defaultAddress.length > 0 ? data.defaultAddress[0].id : null
    )
  }, [getAllAddress, userId])

  const handleChangeAddress = useCallback(
    (address) => {
      selectedAddress !== address.id && setSelectedAddress(address.id)
    },
    [selectedAddress]
  )

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      const [err] = await addNewAddress(userId, values)

      if (err) {
        setError(err)

        return
      }

      resetForm()
      fetchAddressData()
      setAddAddress(false)
    },
    [addNewAddress, userId, fetchAddressData]
  )

  const handleShowAddress = (id) => {
    if (visibleAddressId === id) {
      setVisibleAddressId(null)
    } else {
      setVisibleAddressId(id)
    }
  }

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      <Modal
        isOpen={addAddress}
        modalTitle={t("address:add_address_modal_title")}
        closeModal={() => setAddAddress(false)}
        dir={direction}
      >
        <AddressForm onSubmit={handleSubmit} />
      </Modal>

      <h1 className="text-center text-3xl font-bold py-6">
        {t("delivery:delivery_title")}
      </h1>
      <div className="h-full flex flex-col md:flex-row flex-1 justify-center">
        <div className="flex flex-col md:w-[50%] px-8 py-2 md:max-w-lg overflow-scroll">
          <div className="flex flex-col gap-2 ">
            <h2
              className={`text-center text-2xl py-6 ${
                address.length > 0 ? "block" : "hidden"
              }`}
            >
              {t("delivery:delivery_address")}
            </h2>
            {address.map((address) => (
              <div
                key={address.id}
                className={`${
                  address.id === selectedAddress && "bg-stone-200"
                } cursor-pointer rounded-lg p-4 flex justify-between`}
                onClick={() => handleChangeAddress(address)}
              >
                <div className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer h-5 w-5 border-2 border-stone-500 appearance-none checked:bg-stone-500"
                    disabled={address.id === selectedAddress}
                    checked={address.id === selectedAddress}
                    readOnly
                  />
                  <span
                    className={visibleAddressId === address.id ? "hidden" : ""}
                  >
                    {address.firstName}
                  </span>

                  <div
                    className={`flex flex-col ${
                      visibleAddressId === address.id ? "" : "hidden"
                    }`}
                  >
                    <span>{address.firstName}</span>
                    <span>{address.addressFull}</span>
                    <span>
                      {address.cp}, {address.city} -- {address.country}
                    </span>
                    <span></span>
                    <span>{address.phoneNumber}</span>
                  </div>
                </div>

                <button onClick={() => handleShowAddress(address.id)}>
                  <FontAwesomeIcon
                    icon={visibleAddressId === address.id ? faXmark : faInfo}
                    className="flex h-5 text-stone-600"
                  />
                </button>
              </div>
            ))}

            <Button
              onClick={() => setAddAddress(!addAddress)}
              className="flex justify-center items-center gap-2 w-fit mx-auto border-2 px-4 py-2 my-4"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="text-lg">
                {t("delivery:delivery_add_button")}
              </span>
            </Button>
          </div>
        </div>

        <OrderSummary
          price={subtotal}
          totalTva={tva}
          totalPrice={total}
          buttonName={t("cart:payment")}
          disabled={
            typeof selectedAddress === "undefined" ||
            selectedAddress === null ||
            address.length === 0 ||
            subtotal === 0 ||
            tva === 0 ||
            total === 0
          }
        />
      </div>
    </>
  )
}

export default Delivery
