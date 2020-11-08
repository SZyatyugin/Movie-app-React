import React from "react";
import AppHeader from "../app-header";
import AppSearchPanel from "../app-search-panel";
import AppMovieList from "../app-movie-list";
import Appsevices from "../app-services";
import "./app.css";

let appservices = new Appsevices();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueForSearch: "",
            data: {},
            store: [],
            error: ""
        };
    }
    getInputValue = (value) => {
        this.setState({ valueForSearch: value });
        this.getData(value);
    };
    getData = async (value) => {
        await appservices
            .getDataFromAPI(value)
            .then((result) => {
                if (result.Response === "False") {
                    this.setState({ error: result.Error });
                } else {
                    this.setState({ error: "" });
                    this.setState({ data: result });
                    let films = [...this.state.store];
                    let checkFilm = films.find((elem) => {
                        if (elem.imdbID === this.state.data.imdbID) {
                            return elem;
                        }
                    });
                    if (checkFilm) {
                        return;
                    } else {
                        films.push({
                            ...this.state.data,
                            addToFavorite: false
                        });
                        this.setState({ store: films });
                    }
                }
            })
            .catch((error) => {
                alert(`There is an error ${error}`);
            });
    };
    addToFavorite = (id) => {
        let { store } = this.state;
        let findFilm = store.find((elem) => elem.imdbID === id);
        let filmsToMakeFavorite = store.map((elem) => {
            if (elem.imdbID === id) {
                if (elem.addToFavorite) {
                    elem.addToFavorite = false;
                } else {
                    elem.addToFavorite = true;
                }
            }
            return elem;
        });
        if (findFilm.addToFavorite) {
            let findFilmIndex = store.findIndex((elem, index) => {
                if (elem.imdbID === id) return index;
            });
            let films = [...store];
            let favoriteFilm = films.splice(findFilmIndex, 1);
            let newArrayOfFilms = [...favoriteFilm, ...films];
            this.setState({ store: newArrayOfFilms });
        } else {
            let favoriteFilms = filmsToMakeFavorite.filter(
                (elem) => elem.addToFavorite
            );
            let notFavoriteFilms = filmsToMakeFavorite.filter(
                (elem) => !elem.addToFavorite
            );
            let films = [...favoriteFilms, ...notFavoriteFilms];
            this.setState({ store: films });
        }
    };

    render() {
        return (
            <div className="app">
                <AppHeader />
                <AppSearchPanel getInputValue={this.getInputValue} />
                <AppMovieList
                    store={this.state.store}
                    error={this.state.error}
                    addToFavorite={this.addToFavorite}
                />
            </div>
        );
    }
}

export default App;
