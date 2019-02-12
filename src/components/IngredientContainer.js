import React from 'react'

import SearchBar from './SearchBar.js'
import Ingredient from './Ingredient.js'


class IngredientContainer extends React.Component {

    render(){
        return(
            <div>
                <SearchBar placeholder={"Filter by ingredient name.."}/>
                <div className='card-containers'>
                    <Ingredient/>
                    <Ingredient/>
                    <Ingredient/>
                </div>
            </div>
        )
    }
}

export default IngredientContainer