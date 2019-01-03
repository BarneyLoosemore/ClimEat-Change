import React, { Component } from 'react'
import RecipeCard from './RecipeCard.js'


class RecipeCardContainer extends Component {


    render(){
        const { handleOnCardClick, recipes } = this.props
        return(
            <div>
                {
                    !recipes.length > 0 
                    ? <RecipeCard handleOnCardClick={handleOnCardClick} />
                    : <div>
                        KG FIGURE IS AMOUNT OF CO2 PER SERVING
                    </div>
                }
            </div>
        )
    }
}

export default RecipeCardContainer