import Button from "@/web/components/Button"
import classNames from "classnames"
import { useTranslation } from "next-i18next"

const OrderSummary = (props) => {
  const {
    className,
    price,
    totalPrice,
    totalTva,
    handleClick,
    buttonName,
    ...otherProps
  } = props

  const { t } = useTranslation("cart")

  return (
    <div
      className={classNames(
        "flex flex-col w-4/5 mx-auto border-2 rounded-lg p-4 shadow-xl h-fit min-w-md max-w-sm md:mx-0 md:w-[50%]",
        className
      )}
    >
      <p className="flex text-md justify-between font-bold opacity-80">
        <span>{t("subtotal")}</span>
        <span>{price} €</span>
      </p>

      <p className="flex justify-between text-sm text-stone-400 font-bold">
        <span>{t("tva")}</span>
        <span>{totalTva} €</span>
      </p>

      <p className="flex justify-between mt-4 text-xl font-bold  whitespace-nowrap">
        <span>{t("total")}</span>
        <span>{totalPrice} €</span>
      </p>

      <Button
        className="text-center text-white font-bold uppercase bg-stone-500 rounded-lg p-2 mt-4 whitespace-nowrap disabled:opacity-20 disabled:cursor-not-allowed"
        {...otherProps}
        onClick={handleClick}
      >
        {buttonName}
      </Button>
    </div>
  )
}

export default OrderSummary
