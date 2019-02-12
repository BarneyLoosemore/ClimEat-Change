import React from 'react'

import './App/App.css'


class NavBar extends React.Component {

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

    handleSearchChangeClickAndCloseMenu = () => {
        this.handleMenuBarClick()
        this.props.handleIngredientOrRecipeSearchClick()
    }

    render(){
        const { handleMenuBarClick, handleSearchChangeClickAndCloseMenu } = this
        const{ handleLogoClick, recipeSearch } = this.props
        return(
            <div>
                <div className='nav-bar'>
                    <div onClick={handleLogoClick} className='clim-eat'>
                        ClimEat
                    </div>
                    <div onClick={ e => handleMenuBarClick(e) } className='nav-menu'>
                        <div className='menu-bar'></div>
                        <div className='menu-bar'></div>
                        <div className='menu-bar'></div>
                    </div>
                        
                </div>

                <div className='nav-bar-menu'>
                    <div onClick={handleSearchChangeClickAndCloseMenu} className='nav-bar-menu-item'>{recipeSearch ? "Ingredient Search" : "Recipe Search"}</div>
                        <hr className='divider'/>
                    <div className ='nav-bar-menu-item'>Statistics</div>
                        <hr className='divider'/>
                    <div className='nav-bar-menu-item'>About</div>
                </div>
            </div>
        )
    }

}

export default NavBar