import classNames from "classnames"
import NextLink from "next/link"

const Link = (props) => {
  const { className, ...otherProps } = props

  return <NextLink {...otherProps} className={classNames("", className)} />
}

export default Link
