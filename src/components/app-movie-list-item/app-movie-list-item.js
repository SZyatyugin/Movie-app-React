import React from 'react';
import './app-movie-list-item.css'


class AppMovieListItem extends React.Component{
constructor(props){
    super()
}
render(){
    let {store,addToFavorite}=this.props;
    return store.map((elem)=>{
        return (
            <li key={elem.imdbID} className='app-movie-list-item'>
            <div className='app-movie-list-item__img'>
            <img src={elem.Poster} alt={elem.Title}/>
            </div>
            <div className='app-movie-list-item__main-info'>
            <h3>{elem.Title}</h3>
            <div className='app-movie-list-item__favorite' onClick={()=>{addToFavorite(elem.imdbID)}}>
            {elem.addToFavorite?<i className="fa fa-star"></i>:<i className="fa fa-star-o"></i>}
            </div>
            <div className='app-movie-list-item__facts'>
            <p>Actors: {elem.Actors}</p>
            <p>Director: {elem.Director}</p>
            <p>Genre: {elem.Genre}</p>
            <p>Released: {elem.Released}</p>
            </div>
            <div className='app-movie-list-item__plot'>
            {elem.Plot}
            </div>
            </div>
            </li>
        )
    })
    
}
    



}
export default AppMovieListItem