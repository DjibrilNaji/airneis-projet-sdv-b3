import Image from "next/image"
import classNames from "classnames"

const ImageDefault = (props) => {
    const { className, src, alt, ...otherProps } = props
  
    return <Image src={src} alt={alt} {...otherProps} className={classNames("", className)} />
  }
  
  export default ImageDefault