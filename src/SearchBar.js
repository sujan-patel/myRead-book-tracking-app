import React from 'react'
import PropTypes from 'prop-types'

export default class SearchBar extends React.PureComponent {
    state = {
        searchTerm: ''
    }

    handleChange = (event) => {
        const searchTerm = event.target.value
        this.setState({ searchTerm })
        this.props.onSearchTermChange( searchTerm )
    }

    render() {
        return (
            <div>
                <input className='search-input'
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                    placeholder='Search for a book...'
                />
            </div>
        )
    }
}

SearchBar.propTypes = {
    onSearchTermChange: PropTypes.func.isRequired
}