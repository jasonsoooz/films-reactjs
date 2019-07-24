import React from 'react';

class FilmForm extends React.Component {
    state = {
        title: '',
        releaseDate: '',
        imdbRating: 0,
        director: '',
    };

    componentDidMount() {
        this.setState({ title: '', releaseDate: '', imdbRating: 0, director: '' });
    }

    handleCancel = () => {
        this.props.onAddCancel();
    };

    handleAddSubmit = (event) => {
        this.props.onAddSubmit(this.props.id, this.state.title, this.state.releaseDate,
          this.state.imdbRating, this.state.director);
        event.preventDefault();
    }

    updateTitle(evt) {
        this.setState({ title: evt.target.value });
    }
    
    updateReleaseDate(evt) {
        this.setState({ releaseDate: evt.target.value });
    }
    
    updateImdbRating(evt) {
        this.setState({ imdbRating: evt.target.value });
    }
    
    updateDirector(evt) {
        this.setState({ director: evt.target.value });
    }

    render() {
        return(
            <form onSubmit={this.handleAddSubmit} className="ui form">
                <h1>Add Film</h1>
                <input type="hidden" name="id" value={this.props.id} />  
                <div className="field">
                    <label>Film</label>
                    <input id="title" type="text" value={this.state.title} onChange={evt => this.updateTitle(evt)} />
                </div>
                <div className="field">
                    <label>Release Date</label>
                    <input type="date" value={this.state.releaseDate} onChange={evt => this.updateReleaseDate(evt)} />
                </div>
                <div className="field">
                    <label>Imdb Rating</label>
                    <input type="number" step="0.1" value={this.state.imdbRating} onChange={evt => this.updateImdbRating(evt)} />
                </div>
                <div className="field">
                    <label>Director</label>
                    <input id="director" type="text" value={this.state.director} onChange={evt => this.updateDirector(evt)} />
                </div>
                <input type="submit" value="Submit" className="ui primary button submit-button" />&nbsp;
                <button onClick={this.handleCancel} className="ui button cancel-button">Cancel</button>
            </form>
        );
    }
}

export default FilmForm;