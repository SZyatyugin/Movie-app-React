import React from 'react';
import AppHeader from '../app-header';
import AppSearchPanel from '../app-search-panel';
import AppMovieList from '../app-movie-list';
import './app.css'
class App extends React.Component{
constructor(props){
  super();
  this.state={
    valueForSearch:'',
    data:{},
    store:[],
    error:''
  }
}
getInputValue=(value)=>{
  this.setState(({valueForSearch})=>{
    return {valueForSearch:value}
  });
this.getDataFromAPI(value)
}
getDataFromAPI=(value)=>{
  if(!value){
    return
  }
  let val=value.split(' ').join('+');
  let url=`http://www.omdbapi.com/?apikey=fd4e62ba&t=${val}`;
  fetch(url).then(response=>response.json())
  .then((result)=>{
    if(result.Response!=='False'){
      this.setState({error:''})
      this.setState({data:result})
      let films=[...this.state.store];
      let check=films.find((elem)=>{
        if(elem.imdbID===result.imdbID){
          return elem
        }
      });
      if(check){
        return
      }else{
        films.push({...this.state.data,addToFavorite:false});
        this.setState({store:films})
      }
    }else{
      this.setState({error:result.Error})
    }
})
  .catch(error=>alert(`There is an error ${error}`))
}
addToFavorite=(id)=>{
  let {store}=this.state;
  let findFilmIndex=store.findIndex((elem,index)=>{if(elem.imdbID===id)return index});
  let film=store.splice(findFilmIndex,1);
  store.unshift(...film);
 
let filmsToMakeFavorite=store.map((elem)=>{
  if(elem.imdbID===id){
    if(elem.addToFavorite){
      elem.addToFavorite=false;
    }else{
      elem.addToFavorite=true;
    }
  } 
  return elem
});
console.log(filmsToMakeFavorite)

this.setState({store:filmsToMakeFavorite})
}

  render(){ 
   return (
      <div className="app">
       <AppHeader/>
       <AppSearchPanel getInputValue={this.getInputValue}/>
       <AppMovieList store={this.state.store} error={this.state.error} addToFavorite={this.addToFavorite}/>
      </div>
    )
  };
}

export default App;
