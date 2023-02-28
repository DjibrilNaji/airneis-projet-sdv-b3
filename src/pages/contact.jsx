import Input from "../web/components/Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox } from "@fortawesome/free-solid-svg-icons"

const contact = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12 mb-12 md:mb-0">
          <form className="p-10 rounded-2xl">
            <h1 className="font-semibold opacity-70 text-2xl font-normal text-center pb-5 uppercase z-0">
              Contactez-nous
            </h1>

            <Input type="email" placeholder="E-mail*" />
            <Input type="text" placeholder="Subject" />
            <div className="mb-6">
              <textarea
                className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-stone-500 focus:outline-none"
                placeholder="Message*"
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                className="px-10 py-3 bg-gray-200 text-sm uppercase rounded-full"
              >
                <FontAwesomeIcon icon={faInbox} className="mr-2 fa-lg" />
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default contact
