import React from 'react'
import RecipeCard from './RecipeCard.js'


class RecipeCardContainer extends React.Component {


    render(){
        const { handleOnCardClick, recipes } = this.props
        return(
            <div className='card-containers'>
                {
                    recipes.length > 0 
                    ? 
                        recipes.map(r => 
                            <RecipeCard recipe={r} handleOnCardClick={handleOnCardClick} /> 
                        )

                    : <div>
                        KG FIGURE IS AMOUNT OF CO2 PER SERVING
                    </div>
                }
            </div>
        )
    }
}

export default RecipeCardContainer