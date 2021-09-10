import React, { Fragment, useState } from 'react'

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const searchHandler = (event) => {
        event.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        else {
            history.push('/');
        }
    }





    return (

        <form onSubmit={searchHandler} className="form-inline mt-1">
            <input className="form-control mr-sm-2 mt-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}



            />
            <button className="btn btn-outline-light my-2 my-sm-0 mr-5 " type="submit">Search</button>

        </form>

    )
}

export default Search
