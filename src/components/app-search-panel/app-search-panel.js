import "./app-search-panel.css";
import React from "react";
import PropTypes from "prop-types";

class AppSearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
        };
    }

    getValueForSearch = (e) => {
        this.setState({ inputValue: e.target.value });
    };
    submitValueForSearch = (e) => {
        let { inputValue } = this.state;
        let { getInputValue } = this.props;
        if (inputValue === " ") {
            e.preventDefault();
            return;
        }
        getInputValue(inputValue);
        this.setState({ inputValue: " " });
    };
    render() {
        return (
            <div className="app-form">
                <input
                    type="text"
                    className="app-form__search"
                    onChange={this.getValueForSearch}
                    value={this.state.inputValue}
                />
                <button
                    className="app-form__btn-search btn btn-info"
                    onClick={this.submitValueForSearch}
                >
                    Search
                </button>
            </div>
        );
    }
}
AppSearchPanel.propTypes = {
    getInputValue: PropTypes.func.isRequired,
};
export default AppSearchPanel;
