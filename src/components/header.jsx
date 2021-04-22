import Button from './button'
import PropTypes from 'prop-types'

const Header = ({ title }) => {

    const addFunc = () => {
        console.log("Added button has been clicked");
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text='Add' color='green' onClick={addFunc} />
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