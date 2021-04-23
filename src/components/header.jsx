import Button from './button'
import PropTypes from 'prop-types'

const Header = ({ title, onAddClicked, isFormShowing }) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text={isFormShowing ? 'Hide' : 'Add'} color={isFormShowing ? 'red' : 'green'} onClick={onAddClicked} />
        </header>
    );
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header;