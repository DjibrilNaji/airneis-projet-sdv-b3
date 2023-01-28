import Link from "next/link"
import React from "react"

const TextAuth = (props) => {
    const {
        route, text1, text2,
    } = props

    return (
        <div className="text-center m-3">
            <p>
                <span className="text-stone-300">{text1} </span>
                <Link href={route}
                      className="font-semibold">
                    {text2}
                </Link>
            </p>
        </div>

    )
}

export default TextAuth




