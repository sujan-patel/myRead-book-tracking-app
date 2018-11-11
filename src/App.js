import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import NotFoundPage from './NotFoundPage'
import { getAll, update } from './BooksAPI'
import fontawesome from '@fortawesome/fontawesome'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import faChevronCircleDown from '@fortawesome/fontawesome-free-solid/faChevronCircleDown'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'

fontawesome.library.add(faArrowLeft, faChevronCircleDown, faPlusCircle)

export default class App extends React.Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    async componentDidMount() {
        const allBooks = await getAll()

        const currentlyReading = []
        const wantToRead = []
        const read = []

        Object.keys(allBooks).forEach(key => {
            switch (allBooks[key].shelf) {
                case 'currentlyReading':
                    currentlyReading.push(allBooks[key])
                    break;
                case 'wantToRead':
                    wantToRead.push(allBooks[key])
                    break;
                case 'read':
                    read.push(allBooks[key])
                    break;
                default:
                    // do nothing
            }
        })

        this.setState({
            currentlyReading,
            wantToRead,
            read
        })
    }

    addBookToShelf(book, shelf) {
        book.shelf = shelf
        this.setState({ [shelf]: this.state[shelf].concat(book) })
    }

    handleOptionChange = (book, destinationShelf) => {
        if (destinationShelf && book.shelf) {
            this.transferBookToShelf(book, destinationShelf)
        } else if (destinationShelf) {
            this.addBookToShelf(book, destinationShelf)
        } else if (book.shelf) {
            this.removeBookFromShelf(book)
        } else {
            // do nothing if source and destination shelf values are falsy (i.e. none)
            return
        }

        update(book, destinationShelf || 'none')
    }

    removeBookFromShelf(book) {
        const shelfForRemovalName = book.shelf
        book.shelf = ''
        const newShelf = this.state[shelfForRemovalName].filter(b => b.id !== book.id)
        this.setState({ [shelfForRemovalName]: newShelf })
    }

    transferBookToShelf(book, shelf) {
        const shelfForRemovalName = book.shelf
        book.shelf = shelf
        const newShelfForAdd = this.state[shelf].concat(book)
        const newShelfForRemoval = this.state[shelfForRemovalName].filter(b => b.id !== book.id)

        this.setState({
            [shelfForRemovalName]: newShelfForRemoval,
            [shelf]: newShelfForAdd
        })
    }

    render() {
        return (
            <div className='app'>
                <div className='header'>
                    MyReads
                </div>
                <div className='container'>
                    <Switch >
                        <Route
                            exact path='/'
                            render={() => (
                                <MainPage
                                    onOptionChange={this.handleOptionChange}
                                    currentlyReading={this.state.currentlyReading}
                                    wantToRead={this.state.wantToRead}
                                    read={this.state.read}
                                />
                            )}
                        />
                        <Route
                            path='/search'
                            render={() => (
                                <SearchPage
                                    onOptionChange={this.handleOptionChange}
                                    currentlyReading={this.state.currentlyReading}
                                    wantToRead={this.state.wantToRead}
                                    read={this.state.read}
                                />
                            )}
                        />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </div>
        )
    }
}
