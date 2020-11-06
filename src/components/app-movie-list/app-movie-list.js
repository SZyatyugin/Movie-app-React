import React from "react";
import AppMovieListItem from "../app-movie-list-item";
import PropTypes from "prop-types";
import "./app-movie-list.css";

class AppMovieList extends React.Component {
    render() {
        let { store, error, addToFavorite, } = this.props;
        return (
            <div className="app-movie-list">
                <ul>
                    {error ? (
                        <li>{error}</li>
                    ) : (
                        <AppMovieListItem
                            store={store}
                            addToFavorite={addToFavorite}
                        />
                    )}
                </ul>
            </div>
        );
    }
}
AppMovieList.propTypes = {
    store: PropTypes.array,
    error: PropTypes.string,
    addToFavorite: PropTypes.func,
};
export default AppMovieList;
