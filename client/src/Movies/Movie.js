import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateMovie from './UpdateMovie';
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      isEditing: false
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = (e) =>{
    e.preventDefault();
    // this.setState({isEditing: !this.state.isEditing})
    // console.log (this.state);
    this.props.history.push(`/update-movie/${this.state.movie.id}`)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        
        {this.state.isEditing ? <><UpdateMovie movie={this.state.movie} editMovie={this.state.editMovie} /></> : <><MovieCard movie={this.state.movie} /></>}
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link to={`/update-movie/${this.state.movie.id}`} >
        <div className="edit-button">
          Edit
        </div>
        </Link>
      </div>
    );
  }
}
