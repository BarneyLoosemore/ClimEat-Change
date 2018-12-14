import React, { Component } from 'react'
import './App.css'

class App extends Component {

  state = {
    recipes: [],
    ingredientData: [],
    recipeFootprintData: []
  }


  getRecipes = () => {
    fetch("https://api.edamam.com/search?q=apple&app_id=632e253a&app_key=6666a09ef074ac455f9590ec38d9228e")
      .then(r => r.json())
      // .then(recipes => this.setState({ recipes: recipes.hits }))
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
    return {name: recipe.label, footprint: summedIngredientsCO2FootprintRounded, footprintPerServing: (summedIngredientsCO2Footprint/recipe.yield).toFixed(2)}
  }

  findFootprintOfRecipes = (fetchedRecipes) => {
    this.setState({ recipes: fetchedRecipes.map(recipe => recipe.recipe) })
    const recipes = [...this.state.recipes]
    const recipeFootprints = recipes.map(recipe => this.findIngredientsFootprint(recipe))
    this.setState({ recipeFootprintData: recipeFootprints })
  }

  setColour = (recipe) => {
    const carbonNumber = recipe.footprintPerServing
    switch carbonNumber
  }

  render() {
    const { recipeFootprintData, setColour } = this.state
    return (
      <div className="App">
        <div className="title">
          <h1>Recipe Carbon Footprints</h1>
        </div>
        <div>
          <input></input>
        </div>
          <div className="texts-container">
            {
              recipeFootprintData.map(recipe =>
                <div className="text-wrapper">
                {/* ${recipe => setColour(recipe)} */}
                  <p className="card" style={{ background: `hsl(0, 98%, 51%)` }}>
                    <div style={{fontSize: "3vw"}}>
                      {recipe.name}
                    </div>
                    <div style={{ fontSize: "2vw" }}>
                      Total: {recipe.footprint}kg CO2 
                      Per Serving: {recipe.footprintPerServing}kg CO2
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
