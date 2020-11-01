import './app-search-panel.css'
import React from 'react';

class AppSearchPanel extends React.Component{
    constructor(props){
        super();
        this.state={
            inputValue:'',
        }
    }
    
  getValueForSearch=(e)=>{
    this.setState(({inputValue})=>{
        return {inputValue:e.target.value}
    })
  }
submitValueForSearch=(e)=>{
    let{inputValue}=this.state;
    let{getInputValue}=this.props;
    if(inputValue===' '){
        e.preventDefault();
        return
    }
    getInputValue(inputValue);
    this.setState(({inputValue})=>{
        return {inputValue:''}
    })

}
render(){
    return (
        <div className='app-form'>
        <input type='text' className='app-form__search' onChange={this.getValueForSearch} value={this.state.inputValue}/>
        <button className='app-form__btn-search btn btn-info' onClick={this.submitValueForSearch}>Search</button>
        </div>
    )
} 

}
export default AppSearchPanel