
import React from 'react';
import AppMovieListItem from '../app-movie-list-item'
import './app-movie-list.css'

class AppMovieList extends React.Component{

   render(){
        let {store,error,addToFavorite}=this.props;
  return  (
        <div className='app-movie-list'>
        <ul>
        {error?<li>{error}</li>:<AppMovieListItem store={store} addToFavorite={addToFavorite} />}
        </ul>
        </div>
    )
} 
}
export default AppMovieList