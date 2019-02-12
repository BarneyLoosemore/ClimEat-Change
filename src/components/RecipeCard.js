import React from 'react'

import './recipe_card.css'


class RecipeCard extends React.Component {

    findFontSize = () => {
        const name = this.props.recipe.attributes.name
        if(name.length > 18){
            return "1.5em"
        } else if(name.length > 25){
            return "1em"
        } else {
            return "2em"
        }
    }

    render(){
        const { handleOnCardClick, recipe } = this.props
        return(
            <div className='card-wrapper'>
                <div>
                    <div className='divider-wrapper'/>
                    <img onClick={() => handleOnCardClick(recipe)} className='image-wrapper' src={recipe.attributes["image-url"]} alt={recipe.title} ></img>
                </div>
                <div className='text-and-symbol-wrapper'>
                    <div className='recipe-text'>
                        <h2>{
                                recipe.attributes.name.length > 25 
                                ? `${recipe.attributes.name.slice(0, 25)}..`
                                : recipe.attributes.name
                            }
                        </h2> 
                    </div>
                    <div className='emission-symbol' style={{ background: `hsl(${100-(33*recipe.co2) > 0 ? 100-(33*recipe.co2) : 0}, 68%, 57%)` }}>
                        {recipe.co2}KG
                    </div>
                </div>
            </div>
            )
    }
}

export default RecipeCard