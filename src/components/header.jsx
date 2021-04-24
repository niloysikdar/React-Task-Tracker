import Button from './button'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAddClicked, isFormShowing }) => {

    const location = useLocation();

    return (
        <header className='header'>
            <h1>{title}</h1>
            {(location.pathname === '/') && (<Button
                text={isFormShowing ? 'Hide' : 'Add'}
                color={isFormShowing ? 'red' : 'green'}
                onClick={onAddClicked}
            />)}
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