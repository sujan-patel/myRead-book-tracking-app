import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class ChangeShelfMenu extends React.Component {
    handleOptionChange = (event) => {
        const shelf = event.target.value === 'none' ? '' : event.target.value
        this.props.onOptionChange(shelf)
    }

    render() {
        const { value } = this.props

        return (
            <div className='change-shelf-menu'>
                <FontAwesomeIcon icon='chevron-circle-down' size='2x' color='#00796B' />
                <select value={value} onChange={this.handleOptionChange}>
                    <option value='move' disabled={true}>Move to:</option>
                    <option
                        value='currentlyReading'
                        className={value === 'currentlyReading' ? 'selected-option' : ''}
                    >
                        Currently Reading
                    </option>
                    <option
                        value='wantToRead'
                        className={value === 'wantToRead' ? 'selected-option' : ''}
                    >
                        Want to Read
                    </option>
                    <option
                        value='read'
                        className={value === 'read' ? 'selected-option' : ''}
                    >
                        Read
                    </option>
                    <option
                        value='none'
                        className={value === 'none' ? 'selected-option' : ''}
                    >
                        None
                    </option>
                </select>
            </div>
        )
    }
}

ChangeShelfMenu.propTypes = {
    value: PropTypes.string,
    onOptionChange: PropTypes.func.isRequired
}