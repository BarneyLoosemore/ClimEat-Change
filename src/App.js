import React, { Component } from 'react'
import './App.css'
import RecipeCard from './RecipeCard.js'
import NavBar from './NavBar.js'


class App extends Component {

  state = {
    recipes: [],
    ingredientData: [],
    recipeFootprintData: [],
    filter: '',
    noResults: false,
    loadingSpinner: false
  }


  getRecipes = () => {
    fetch(`https://api.edamam.com/search?q=${this.state.filter}&app_id=632e253a&app_key=6666a09ef074ac455f9590ec38d9228e&from=0&to=9`)
      .then(r => r.json())
      .then(recipes => this.findFootprintOfRecipes(recipes.hits))
  }

  getIngredientData = () => {
    fetch('../food_CO2_data_newest.json')
      .then(r => r.json())
      .then(ingredientData => this.setState({ ingredientData }))
  }

  componentDidMount(){
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
    const footprintPerServing = (summedIngredientsCO2Footprint / recipe.yield).toFixed(2)
    return {
      name: recipe.label,
      footprint: summedIngredientsCO2FootprintRounded,
      footprintPerServing: footprintPerServing, 
      colour: this.setColour(footprintPerServing)}
  }

  findFootprintOfRecipes = (fetchedRecipes) => {
    this.setState({ recipes: fetchedRecipes.map(recipe => recipe.recipe) })
    const recipes = [...this.state.recipes]
    const recipeFootprints = recipes.map(recipe => this.findIngredientsFootprint(recipe))
    this.setState({ recipeFootprintData: recipeFootprints })
    this.state.recipeFootprintData.length < 1 ? this.setState({ noResults: true }) : this.setState({ noResults: false })
    this.setState({ loadingSpinner: false })
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

  handleChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleSubmit = (event) => {
    if (event.which === 13){
      this.setState({ loadingSpinner: true })
      this.getRecipes()
    }
  }

  handleMouseOver = (recipe) => {

  }


  render() {
    const { recipeFootprintData, noResults, loadingSpinner } = this.state
    const { handleChange, handleSubmit, handleMouseOver } = this

    return (
      <div className="App">
        {/* <div className="title">
          <p>Per Serving Carbon Output of Recipes</p>
        </div>
        <div className="search-container">
          <input className="search-box" onChange={(e) => handleChange(e)} onKeyPress={(e) => handleSubmit(e)}></input>
        </div>
          <div className="texts-container">
            { noResults
              ? 
              <div position="absolute">No Results</div>
              :
              recipeFootprintData.map(recipe =>
                <div className="text-wrapper">
                  <p className="card" style={{ background: `hsl(${recipe.colour}, 100%, 44%)` }}>
                    <div style={{fontSize: "3.5vw", paddingBottom: "8%" }}>
                      {recipe.name.length > 35 ? `${recipe.name.slice(0, 35)}...` : recipe.name}
                    </div>
                    <div style={{ fontSize: "4vw", paddingBottom: "8%" }}>
                      {recipe.footprintPerServing}kg CO2
                    </div>
                  </p>
                </div>
              )
            }
        </div> */}
        <NavBar/>
        <div className='card-containers'>
          <RecipeCard/>
          <RecipeCard/>
          <RecipeCard/>
        </div>
      </div>




    );
  }
}

export default App;
