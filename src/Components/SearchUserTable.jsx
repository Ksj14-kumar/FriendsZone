import React from 'react'
import FilterUser from './FilterUser'

function SearchUserTable({ data }) {
    console.log("user filter data", data)
    return (
        <>
            <header className="_search_filter  h-full
            rounded-lg shadow-lg p-2
            overflow-auto
            "
            >
                <FilterUser item={data} />

            </header>
        </>

    )
}

export default SearchUserTable