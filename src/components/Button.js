import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    return <button onClick={onClick} className='btn' style={{ backgroundColor: color }}>{text}</button>
}

// default props if nothing else passed in:
Button.defaultProps = {
    color: 'steelblue',
}

//props types (shoud use TypeScript instead of this in future):
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
