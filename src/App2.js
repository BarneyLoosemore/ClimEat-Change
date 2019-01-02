import React from 'react'

class App2 extends React.Component {

    fetchRecipes = () => {
        fetch('http://api.yummly.com/v1/api/recipes?_app_id=4d9c2146&_app_key=1daf15da5ddc9b6597d7bff27d6c7bb5&q=onion')
            .then(r => r.json())
            .then(r => console.log(r))
    }

    componentDidMount(){
        this.fetchRecipes()
    }

    render(){
        return(
            <div>
                App2
            </div>
        )
    }
}

export default App2