import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Book from './Book'

const BookShelf = (props) => {
    const { books, heading, onOptionChange } = props

    return (
        <div>
            <div className='shelf-heading'>
                <h3>{heading}</h3>
            </div>
            <hr/>
            <div className='shelf'>
                {books && Object.keys(books).length > 0
                ?   <div className='books-container'>
                        {Object.keys(books).map(key => (
                            <Book
                                key={books[key].id}
                                id={books[key].id}
                                authors={books[key].authors}
                                title={books[key].title}
                                imageLinks={books[key].imageLinks}
                                shelf={books[key].shelf}
                                onOptionChange={onOptionChange} />
                        ))}
                    </div>
                :   <div className='books-container-empty'>
                        <h3>No books to display</h3>
                    </div>
                }
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    heading: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.object),
    onOptionChange: PropTypes.func.isRequired
}

export default BookShelf