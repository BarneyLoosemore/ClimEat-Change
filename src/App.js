import React, { Component } from 'react'
import './App.css'

class App extends Component {

  state = {
    recipes: [],
    ingredientData: [],
    recipeFootprintData: [],
    filter: ''
  }


  getRecipes = () => {
    fetch(`https://api.edamam.com/search?q=${this.state.filter}&app_id=632e253a&app_key=6666a09ef074ac455f9590ec38d9228e`)
      .then(r => r.json())
      .then(recipes => this.findFootprintOfRecipes(recipes.hits))
  }

  getIngredientData = () => {
    fetch('../food_CO2_data_newest.json')
      .then(r => r.json())
      .then(ingredientData => this.setState({ ingredientData }))
  }

  componentDidMount(){
    this.getRecipes()
    this.getIngredientData()
  }

  componentDidUpdate(){
    if(this.state.filter.length > 2){
      this.getRecipes()
    }
  }

  findIndividualIngredientFootprint = (ingredient) => {
    const ingredData = [...this.state.ingredientData]
    const foundIngredient = ingredData.filter(ingred => ingredient.text.toLowerCase().includes(ingred.food_name.toLowerCase()))
    foundIngredient.sort(function(a,b){
      return a.food_name.length - b.food_name.length
    }).reverse()
    const ingredientFootprint = foundIngredient.length > 0 
    ? (foundIngredient[0].kg_CO2_per_kg_produce)*(ingredient.weight/1000)
    : 0
    return ingredientFootprint
  }

  findIngredientsFootprint = (recipe) => {
    const ingredients = [...recipe.ingredients]
    const ingredientsCO2Footprint = ingredients.map(ingredient => this.findIndividualIngredientFootprint(ingredient))
    const summedIngredientsCO2Footprint = ingredientsCO2Footprint.reduce((a, b) => a + b)
    const summedIngredientsCO2FootprintRounded = summedIngredientsCO2Footprint.toFixed(2)
    const footprintPerServing = (summedIngredientsCO2Footprint / recipe.yield).toFixed(2)
    return {name: recipe.label, footprint: summedIngredientsCO2FootprintRounded, footprintPerServing: footprintPerServing, colour: this.setColour(footprintPerServing)}
  }

  findFootprintOfRecipes = (fetchedRecipes) => {
    this.setState({ recipes: fetchedRecipes.map(recipe => recipe.recipe) })
    const recipes = [...this.state.recipes]
    const recipeFootprints = recipes.map(recipe => this.findIngredientsFootprint(recipe))
    this.setState({ recipeFootprintData: recipeFootprints })
  }

  setColour = (footprintPerServing) => {
    const carbonNumber = footprintPerServing
    console.log(carbonNumber)
    if (carbonNumber < 0.2){
      return 125
    } else if(0.2 < carbonNumber && carbonNumber < 0.5){
      return 70
    } else if (0.5 < carbonNumber && carbonNumber < 2) {
      return 52
    } else if(2 < carbonNumber){
      return 0
    }
  }

  handleInputChange = (event) => {
    this.setState({ filter: event.target.value })
  }



  render() {
    const { recipeFootprintData } = this.state
    const { handleInputChange } = this

    return (
      <div className="App">
        <div className="title">
          <h1>Recipe Carbon Footprints</h1>
        </div>
        <div>
          <input onChange={(e) => handleInputChange(e)} style={{ border:"2px solid black" }}></input>
        </div>
          <div className="texts-container">
            {
              recipeFootprintData.map(recipe =>
                <div className="text-wrapper">
                  <p className="card" style={{ background: `hsl(${recipe.colour}, 100%, 44%)` }}>
                    <div style={{fontSize: "4vw"}}>
                      {recipe.name}
                    </div>
                    <div style={{ fontSize: "4vw" }}>
                      {/* Total: {recipe.footprint}kg CO2 
                      <hr/> */}
                      {recipe.footprintPerServing}kg CO2
                    </div>
                  </p>
                </div>
              )
            }
        </div>
      </div>




    );
  }
}

export default App;
