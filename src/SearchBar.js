import React, { Component } from 'react'
import './App.css'


class SearchBar extends Component {

    handleClick = (e) => {
        e.target.placeholder = ''
        console.log(e.target.getBoundingClientRect())
    }

    handleOffClick = (e) => {
        // e.target.placeholder = "Search for a recipe.."
        e.target.placeholder = this.props.placeholder
    }

    handleScroll = () => {
        console.log(document.querySelector('.search-box-container').getBoundingClientRect())
    }
    
    componentDidMount(){
        let search_bar = document.querySelector('.search-box-container')
        let sticky = search_bar.offsetTop
        window.onscroll = function(){
            if (window.pageYOffset >= sticky) {
                search_bar.classList.add("sticky")
            } else {
                search_bar.classList.remove("sticky");
            }
        }
    }

    render(){
        const { handleClick, handleOffClick, handleScroll } = this
        return(
            <div className='search-box-container' onScroll={ e => handleScroll(e) }>
                <div>
                    <input class='search-input' type="text" onClick={ e => handleClick(e) } onBlur={ e => handleOffClick(e) } placeholder={this.props.placeholder} />
                </div>
            </div>
        )
    }
}

export default SearchBar