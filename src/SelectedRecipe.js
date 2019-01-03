import React, { Component } from 'react'
import './recipe_card.css'
import RecipeCard from './RecipeCard.js'

class SelectedRecipe extends Component {

    render(){
        const { handleOnCardClick } = this.props
        return(
            <div className=''>
                <RecipeCard handleOnCardClick={handleOnCardClick}/>
                <hr/>
                <div className="ingredients-tag">
                    Ingredients
                </div>
            </div>
            )
    }
}

export default SelectedRecipe