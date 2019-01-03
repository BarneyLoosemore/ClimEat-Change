import React, { Component } from 'react'
import './App.css'


class NavBar extends Component {

    state = {
        displayMenu: false,
    }

    handleMenuBarClick = () => {
        const menu_bars = document.querySelectorAll('.menu-bar')
        const dropdown = document.querySelector('.nav-bar-menu')

        if(this.state.displayMenu === false){
            menu_bars.forEach(b => b.style.opacity = '0.5')
            dropdown.style.display = 'block'
            this.setState({ displayMenu: true })
        } else {
            menu_bars.forEach(b => b.style.opacity = '1')
            dropdown.style.display = 'none'
            this.setState({ displayMenu: false })
        }

    }

    render(){
        const { handleMenuBarClick } = this
        return(
            <div>
                <div className='nav-bar'>
                    <div className='clim-eat'>
                        ClimEat
                    </div>
                    <div onClick={ e => handleMenuBarClick(e) } className='nav-menu'>
                        <div className='menu-bar'></div>
                        <div className='menu-bar'></div>
                        <div className='menu-bar'></div>
                    </div>
                        
                </div>

                <div className='nav-bar-menu'>
                    <div className='nav-bar-menu-item'>Ingredient Search</div>
                        <hr className='divider'/>
                    <div className ='nav-bar-menu-item'> Statistics </div>
                        <hr className='divider'/>
                    <div className='nav-bar-menu-item'>About</div>
                </div>
            </div>
        )
    }

}

export default NavBar