import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom' 
import SearchBar from './SearchBar'
import BookShelf from './BookShelf'
import { search } from './BooksAPI'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class SearchPage extends React.Component {
    state = {
        searchResults: []
    }

    handleSearchTermChange = async (searchTerm) => {
        const searchResults = await search(searchTerm)

        if (!searchResults || Object.keys(searchResults).length === 0 || searchResults.hasOwnProperty('error')) {
            this.setState({ searchResults: [] })
        } else {
            this.setState({ searchResults })
        }
    }

    getShelfInfo(results, currentlyReading, wantToRead, read) {
        return results.map(book => {
            if (currentlyReading.find(b => b.id === book.id)) {
                book.shelf = 'currentlyReading'
                return book
            } else if (wantToRead.find(b => b.id === book.id)) {
                book.shelf = 'wantToRead'
                return book
            } else if (read.find(b => b.id === book.id)) {
                book.shelf = 'read'
                return book
            } else {
                return book
            }
        })
    }

    render() {
        const { searchResults } = this.state
        const { currentlyReading, wantToRead, read } = this.props
        const resultsWithShelfInfo = this.getShelfInfo(searchResults, currentlyReading, wantToRead, read)

        return(
            <div>
                <div className='search-bar-area'>
                    <div className='inline-block'>
                        <Link to='/'>
                            <FontAwesomeIcon icon='arrow-left' size='2x' color='#00796B' />
                        </Link>
                    </div>
                    <div className='inline-block search-bar-div'>
                        <SearchBar
                            onSearchTermChange={this.handleSearchTermChange}
                        />
                    </div>
                </div>
                <BookShelf
                    heading='Search Results'
                    books={resultsWithShelfInfo}
                    onOptionChange={this.props.onOptionChange}
                />
            </div>
        )
    }
}

SearchPage.propTypes = {
    onOptionChange: PropTypes.func.isRequired,
    currentlyReading: PropTypes.arrayOf(PropTypes.object),
    wantToRead: PropTypes.arrayOf(PropTypes.object),
    read: PropTypes.arrayOf(PropTypes.object)
}