import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const MainPage = (props) => (
    <div>
        <div className='book-shelves'>
            <BookShelf
                heading='Currently Reading'
                books={props.currentlyReading}
                onOptionChange={props.onOptionChange}
            />
            <BookShelf
                heading='Want to Read'
                books={props.wantToRead}
                onOptionChange={props.onOptionChange}
            />
            <BookShelf
                heading='Read'
                books={props.read}
                onOptionChange={props.onOptionChange}
            />
        </div>
        <div className='search-btn'>
            <Link to='/search'>
                <FontAwesomeIcon icon='plus-circle' size='4x' color='#009688' />
            </Link>
        </div>
    </div>
)

MainPage.propTypes = {
    onOptionChange: PropTypes.func.isRequired,
    currentlyReading: PropTypes.arrayOf(PropTypes.object),
    wantToRead: PropTypes.arrayOf(PropTypes.object),
    read: PropTypes.arrayOf(PropTypes.object),
}

export default MainPage