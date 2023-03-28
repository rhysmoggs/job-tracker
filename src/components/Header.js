import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* if location.pathname is equal to '/' then: */}
            {location.pathname === '/' && (
                <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
            )}
        </header>
    )
}

// default props if nothing else passed in:
Header.defaultProps = {
    title: 'Task Tracker',
}

//props types (shoud use TypeScript instead of this in future):
Header.propTypes = {
    title: PropTypes.string,
}

export default Header
