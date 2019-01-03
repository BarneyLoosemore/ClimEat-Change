import React, { Component } from 'react'
import './App.css'
import NavBar from './NavBar.js'
import SearchBar from './SearchBar.js'
import SelectedRecipe from './SelectedRecipe.js'
import IngredientContainer from './IngredientContainer.js'
import SelectedIngredient from './SelectedIngredient.js'
import RecipeCardContainer from './RecipeCardContainer.js'


class App extends Component {

  state = {
    recipes: [],
    ingredients: [],
    ingredientData: [],
    recipeFootprintData: [],
    recipeFilter: '',
    filteredRecipes: [],
    selectedRecipe: '',
    ingredientSearch: false,
    ingredientFilter: '',
    filteredIngredients: [],
    selectedIngredient: ''
  }

  getRecipesFromAPI = () => {
    // fetch("http://localhost:3000/api/v1/recipes")
    fetch("http://192.168.1.7:3000/api/v1/recipes")
      .then(r => r.json())
      // .then(recipes => this.setState({ recipes }))
      .then(r => this.assignRecipesCO2(r))
  }

  assignRecipesCO2 = (r) => {
    const recipes = r.data
    recipes.forEach(r => r.co2 = (this.findCO2AllIngredientsOfRecipe(r.attributes["recipe-ingredients"])/r.attributes.servings).toFixed(1))
    const manuallyFilteredRecipes = recipes.filter(r => r.co2 > 0)
    this.setState({ recipes: manuallyFilteredRecipes })
  }

  // getIngredientsFromAPI = () => {
  //   fetch("http://localhost:3000/api/v1/ingredients")
  //     .then(r => r.json())
  //     .then(ingredients => this.setState({ ingredients }))
  // }

  getIngredientData = () => {
    fetch('../food_CO2_data_newest.json')
      .then(r => r.json())
      .then(ingredientData => this.setState({ ingredientData }))
  }

  componentDidMount(){
    this.getIngredientData()
    this.getRecipesFromAPI()
  }

  findCO2AllIngredientsOfRecipe = (ingredients) => {
    if(ingredients.length > 0){
      const ingredientsCO2 = ingredients.map(i => this.findCO2SingleIngredient(i))
      const filteredIngredientsCO2 = ingredientsCO2.filter(n => n)
      return filteredIngredientsCO2.length > 0 ? filteredIngredientsCO2.reduce((a, b) => a + b) : 0
    } else {
      return 0
    }
  }
      

  findCO2SingleIngredient = (recipe_ing) => {
    const ingredient = this.state.ingredientData[recipe_ing.ingredient_id-1]
    if (ingredient) {
      const CO2 = ingredient.kg_CO2_per_kg_produce * recipe_ing.ingredient_kgs
      return CO2 === 0 ?  null :  CO2
    }
  }

  handleOnCardClick = (recipe) => {
    this.setState({ selectedRecipe: recipe }) 
    console.log(recipe)
  }

  handleLogoClick = () => {
    this.setState({ selectedRecipe: '' })
    this.setState({ ingredientSearch: false })
  }

  handleIngredientSearchClick = () => {
    this.setState({ ingredientSearch: true })
  }

  handleRecipeAndIngredientFilterChange = (filter) => {
    if (this.state.ingredientSearch === true){
      // set the ingredients that include the filter
    } else {
      // set the recipes that include the filter
    }
  }

  recipeResults = () => {
    const foundRecipes = this.state.recipes.filter(r => r.attributes.name.toLowerCase().includes(this.state.recipeFilter.toLowerCase()))
    // this.setState({ filteredRecipes: foundRecipes })
    // this.setState({ filteredIngredients: [] })
    return foundRecipes
  }

  ingredientResults = () => {
    const foundIngredients = this.state.ingredientData.filter(i => i.name.toLowerCase().includes(this.state.ingredientFilter.toLowerCase()))
    this.setState({ filteredIngredients: foundIngredients })
    this.setState({ filteredRecipes: [] })
  }

  handleChange = (input) => {
    if(!this.state.ingredientSearch){
      this.setState({ recipeFilter: input })
      this.setState({ ingredientFilter: '' })
    } else {
      this.setState({ ingredientFilter: input })
      this.setState({ recipeFilter: '' })
    }
  }

  handleSubmit = () => {
    console.log('submitted')
    if(!this.state.ingredientSearch){
      this.setState({ filteredRecipes: this.recipeResults() })
    } else {
      this.setState({ filteredRecipes: this.recipeResults() })
    }
  }


  render() {
    const { 
      recipes, 
      ingredients,
      recipeFootprintData, 
      selectedRecipe, 
      ingredientSearch, 
      selectedIngredient, 
      recipeAndIngredientFilter,
      recipeResults,
      filteredRecipes
          } = this.state
    const { 
      handleChange,
      handleSubmit, 
      handleOnCardClick, 
      handleLogoClick,
      handleIngredientSearchClick
          } = this

    return (
      <div className="App">
        <NavBar handleLogoClick={handleLogoClick} handleIngredientSearchClick={handleIngredientSearchClick}/>
        {
          ingredientSearch 
          ? selectedIngredient !== ''
            ? <SelectedIngredient/>
            : <IngredientContainer/>
          :
            selectedRecipe !== '' 
            ? <SelectedRecipe handleOnCardClick={handleOnCardClick} recipe={selectedRecipe} />
            :
            <div>
              <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} placeholder={"Search for a recipe.."} />
              <div className='card-containers'>
                  <RecipeCardContainer recipes={filteredRecipes} handleOnCardClick={handleOnCardClick}/>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;
