import React, { Component } from 'react'
import './recipe_card.css'


class RecipeCard extends Component {

    render(){
        return(
            <div className='card-wrapper'>
                <div>
                    <div className='divider-wrapper'/>
                    <img className='image-wrapper' src='../penne_pasta.jpg' alt='penne pasta image' flexWrap='wrap'></img>
                </div>
                <div className='text-and-symbol-wrapper'>
                    <div className='recipe-text'>
                        <h1>Penne Pasta</h1>
                    </div>
                    <div className='emission-symbol'>
                        13KG
                    </div>
                </div>
            </div>
            )
    }
}

export default RecipeCard