const Text = (props) => {
    const {
        firstTextPart, secondTextPart
    } = props

    return (
        <div className="flex items-center justify-center">
            <p className="pt-10 pb-10 text-center font-bold text-stone-400 text-xl">
                {firstTextPart} <br/> {secondTextPart}
            </p>
        </div>
    )
}

export default Text