import classNames from "classnames"

const Title = (props) => {
    const { className, ...otherProps } = props
  
    return <h1 {...otherProps} className={classNames("", className)} />
  }
  
  export default Title