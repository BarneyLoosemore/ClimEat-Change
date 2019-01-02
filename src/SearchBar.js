import React, { Component } from 'react'
import './App.css'


class SearchBar extends React.Component {

    handleClick = (e) => {
        e.target.placeholder = ''
    }

    handleOffClick


    render(){
        const { handleClick } = this
        return(
            <div>
                <input class='search-input' type="text" onClick={ e => handleClick(e) } offClick={ console.log('off') } placeholder="Search for a recipe.."/>
            </div>
        )
    }
}

export default SearchBar