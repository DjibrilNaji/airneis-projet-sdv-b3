import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebookF, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"

const Footer = () => {
    return (
        <>
            {/*A mettre dans le burger menu pour le mobile voir CDC + gerer le footer */}
            <footer
                className="hidden md:flex items-center bottom-0 w-full bg-white border-t-2 border-stone-400 shadow-md p-4">
                <Link href={`/`} legacyBehavior>
                    <a className="pr-3 text-stone-400 text-lg font-bold">
                        CGU
                    </a>
                </Link>
                <Link href={`/`} legacyBehavior>
                    <a className="px-3 text-stone-400 text-lg font-bold">
                        Mentions légales
                    </a>
                </Link>
                <Link href={`/`} legacyBehavior>
                    <a className="px-3 text-stone-400 text-lg font-bold">
                        Contact
                    </a>
                </Link>

                <div className="ml-auto">
                    <Link href={`/`} className="pr-3">
                        <FontAwesomeIcon icon={faLinkedinIn} className="h-5 text-stone-400"/>
                    </Link>
                    <Link href={`/`} className="pr-3">
                        <FontAwesomeIcon icon={faInstagram} className="h-5 text-stone-400"/>
                    </Link>
                    <Link href={`/`} className="pr-3">
                        <FontAwesomeIcon icon={faFacebookF} className="h-5 text-stone-400"/>
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer