import React from 'react'
import './App.css'


class SearchBar extends React.Component {

  handleClick = (e) => {
    e.target.placeholder = ''
  }

  handleOffClick = (e) => {
    e.target.placeholder = this.props.placeholder
  }

  handleKeyPress = (e) => {
    if(e.key === "Enter"){
      this.props.handleSubmit()
      e.target.blur()
    }
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
    const { handleClick, handleOffClick, handleScroll, handleKeyPress } = this
    const { handleChange } = this.props
    return(
      <div className='search-box-container' onScroll={ e => handleScroll(e) }>
        <div>
            <input className='search-input' type="text" onKeyPress={e => handleKeyPress(e)} onChange={e => handleChange(e.target.value)} onClick={ e => handleClick(e) } onBlur={ e => handleOffClick(e) } placeholder={this.props.placeholder} />
        </div>
      </div>
    )
  }
}

export default SearchBar