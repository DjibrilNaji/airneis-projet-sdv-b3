import classNames from "classnames"

const Description = (props) => {
    const { className, ...otherProps } = props
  
    return <p {...otherProps} className={classNames("", className)} />
  }
  
  export default Description