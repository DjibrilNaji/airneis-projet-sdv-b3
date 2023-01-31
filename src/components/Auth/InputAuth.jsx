import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"

const InputAuth = (props) => {
    const {
        type, placeholder, icon
    } = props

    return (
        <div className="flex items-center bg-white border rounded-md p-1 shadow-md">
            <FontAwesomeIcon icon={icon}
                             className="ml-1 text-white bg-stone-300 px-3 py-2 rounded-md"/>
            <input type={type} placeholder={placeholder} className="p-2 w-full focus:outline-none"
            />
        </div>
    )
}

export default InputAuth

