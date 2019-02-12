import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import NavBar from './NavBar.js'
import SearchBar from './SearchBar.js'
import SelectedRecipe from './SelectedRecipe.js'
import IngredientContainer from './IngredientContainer.js'
import SelectedIngredient from './SelectedIngredient.js'
import RecipeCardContainer from './RecipeCardContainer.js'
import history from '../history'


class App extends React.Component {

  state = {
    // delete state items where necessary
    recipes: [],
    ingredients: [],
    ingredientData: [],
    recipeFootprintData: [],
    recipeFilter: '',
    filteredRecipes: [],
    selectedRecipe: '',

    recipeSearch: true,
    ingredientFilter: '',
    filteredIngredients: [],
    selectedIngredient: ''
  }

  componentDidMount(){
    this.getIngredientData()
    this.getRecipesFromAPI()
  }

  getIngredientData = () => {
    fetch('../food_CO2_data_newest.json')
      .then(r => r.json())
      .then(ingredientData => this.setState({ ingredientData }))
  }

  getRecipesFromAPI = () => {
    fetch("http://localhost:3000/api/v1/recipes")
    // fetch("http://10.218.6.156:3000/api/v1/recipes")
      .then(r => r.json())
      .then(r => this.assignRecipesCO2(r))
  }

  assignRecipesCO2 = (r) => {
    const recipes = r.data
    recipes.forEach(r => r.co2 = (this.findCO2AllIngredientsOfRecipe(r.attributes["recipe-ingredients"])/r.attributes.servings).toFixed(1))
    const manuallyFilteredRecipes = recipes.filter(r => r.co2 > 0)
    this.setState({ recipes: manuallyFilteredRecipes })
  }

  findCO2AllIngredientsOfRecipe = (ingredients) => {
    if (ingredients.length > 0){
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

  handleIngredientOrRecipeSearchClick = () => {
    if (this.state.recipeSearch) {
      this.setState({ recipeSearch: false })
      history.push('/ingredients')
    } else {
      this.setState({ recipeSearch: true })
      history.push('/')
    }
  }


  handleOnCardClick = (recipe) => {
    this.setState({ selectedRecipe: recipe }) 
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    history.push(`/recipes/${recipe.id}`)
  }

  handleLogoClick = () => {
    this.setState({ selectedRecipe: '' })
    history.push('/')
  }

  recipeResults = () => {
    const foundRecipes = this.state.recipes.filter(r => r.attributes.name.toLowerCase().includes(this.state.recipeFilter.toLowerCase()))
    return foundRecipes
  }

  ingredientResults = () => {
    const foundIngredients = this.state.ingredientData.filter(i => i.name.toLowerCase().includes(this.state.ingredientFilter.toLowerCase()))
    this.setState({ filteredIngredients: foundIngredients })
    this.setState({ filteredRecipes: [] })
  }

  handleChange = (input) => {
    if (!this.state.ingredientSearch){
      this.setState({ recipeFilter: input })
      this.setState({ ingredientFilter: '' })
    } else {
      this.setState({ ingredientFilter: input })
      this.setState({ recipeFilter: '' })
    }
  }

  handleSubmit = () => {
    this.setState({ filteredRecipes: this.recipeResults() })
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

      recipeSearch,
      filteredRecipes
          } = this.state

    const { 
      handleChange,
      handleSubmit, 
      handleOnCardClick, 
      handleLogoClick,
      handleIngredientOrRecipeSearchClick
          } = this

    return (


    <div className="App">
      <NavBar recipeSearch={recipeSearch} handleLogoClick={handleLogoClick} handleIngredientOrRecipeSearchClick={handleIngredientOrRecipeSearchClick} />
      <Switch>
        <Route exact path ='/' render={() => 
        <>
          <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} placeholder={"Search for a recipe.."} />
          <RecipeCardContainer recipes={filteredRecipes} handleOnCardClick={handleOnCardClick}/>
        </>
        }/>
        <Route exact path={`/recipes/${selectedRecipe.id}`} render={() => <SelectedRecipe recipe={selectedRecipe} />} />
        <Route exact path='/ingredients' render={() => <IngredientContainer />} />
        {/* <Route exact path={`/ingredients/${REPLACE_ME}`} /> */}
        <Route exact path='/about' />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
    </div>

    )
  }
}

export default App
