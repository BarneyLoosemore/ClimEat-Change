import React, { Component } from 'react'
import './App.css'


class NavBar extends Component {

    render(){
        return(
            <div className='nav-bar'>
                <div className='clim-eat'>
                    ClimEat
                </div>
                <div className='nav-menu'>
                    <div className='menu-bar'></div>
                    <div className='menu-bar'></div>
                    <div className='menu-bar'></div>
                </div>
                    
            </div>
        )
    }

}

export default NavBar