import React, { Component } from 'react'
import './App.css'
import SearchBar from './SearchBar.js'

class Header extends Component {

    render(){
        return(
            <div className='nav-bar'>
                <SearchBar/>
            </div>
        )
    }

}

export default Header