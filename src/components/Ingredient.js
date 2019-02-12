import React from 'react'

import './recipe_card.css'


class Ingredient extends React.Component {

  render(){
    return(
      <div className='card-wrapper'>
        <div>
          <div className='divider-wrapper'/>
          <img className='image-wrapper' src='../cheese.jpeg' alt="" ></img>
        </div>
        <div className='text-and-symbol-wrapper'>
          <div className='recipe-text'>
            <h1>Cheese</h1>
          </div>
          <div className='emission-symbol'>
            13KG
          </div>
        </div>
      </div>
    )
  }
}

export default Ingredient