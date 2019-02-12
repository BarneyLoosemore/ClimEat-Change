import React from 'react'
import './recipe_card.css'
import RecipeCard from './RecipeCard.js'

class SelectedRecipe extends React.Component {

    render(){
        const { handleOnCardClick, recipe } = this.props
        const ingredients = recipe.attributes["recipe-ingredients"]
        const instructions = recipe.attributes.instructions
        return(
            <div className=''>
                <RecipeCard recipe={recipe} handleOnCardClick={handleOnCardClick}/>
                <hr/>
                <div className="ingredients-tag">
                    Ingredients
                </div>
                <div className="ingredients-list">
                    {
                        ingredients.map(ing => <div className='ingredient-item'> {ing.content} </div>)
                    }
                </div>
                <hr/>
                <div className="ingredients-tag">
                    Preparation
                </div>
                <div className="">
                    {
                        instructions.map(inst => <div className='ingredient-item'> {inst.index}.  {inst.content} </div>)
                    }
                </div>
            </div>
            )
    }
}

export default SelectedRecipe