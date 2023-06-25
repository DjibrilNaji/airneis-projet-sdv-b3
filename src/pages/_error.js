import routes from "@/web/routes"
import Link from "next/link"

function Error({ statusCode }) {
  return (
    <div className="h-[90vh] md:h-fit flex flex-col items-center justify-center">
      <p className="text-xl font-bold">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <Link
        href={routes.home()}
        className="my-7 bg-stone-500 text-white px-4 py-2 rounded-md text-lg"
      >
        Go Back
      </Link>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode }
}

export default Error
