import React, { Component } from 'react'
import SearchBar from './SearchBar.js'


class IngredientContainer extends Component {

    render(){
        return(
            <div>
                <SearchBar placeholder={"Filter by ingredient name.."} />
                Ingredients here
            </div>
        )
    }
}

export default IngredientContainer