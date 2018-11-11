import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
    <div className='not-found-page'>
        <div>
            <h3>404 - Page not found!</h3>
        </div>
        <div>
            <Link to='/'>
                <h3>Go back home</h3>
            </Link>
        </div>
    </div>
)

export default NotFoundPage