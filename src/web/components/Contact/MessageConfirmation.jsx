import Link from "@/web/components/Design/Link"

const MessageConfirmation = (props) => {
  const { title, message, info, route, button } = props

  return (
    <div className="fixed inset-0">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center mt-7 max-w-lg mx-auto text-center p-3 rounded-md bg-stone-100 shadow-md h-full gap-5">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg">{message}</p>
          <span className="font-bold italic bg-stone-300 px-2">{info}</span>
          <Link
            href={`${route}`}
            className="bg-stone-500 px-4 text-xl py-2 rounded-md text-white uppercase"
          >
            {button}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MessageConfirmation
