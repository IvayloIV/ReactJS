import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { createMovieAction } from '../../actions/movieActions';

export class CreateMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      imageUrl: '',
      description: '',
      genres: '',
      tickets: '',
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    let { title, imageUrl, description, genres, tickets } = this.state;
    if (title.length < 6) {
      toast.error('The title should be at least 6 characters long.');
      return;
    }

    if (description.length < 10) {
      toast.error('The description should be at least 10 characters long.');
      return;
    }

    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      toast.error('The image should start with "http://" or "https://".');
      return;
    }

    if (isNaN(tickets)) {
      toast.error('The available tickets should be a number.');
      return;
    }

    genres = genres.split(' ');
    this.props.createMovie(title, imageUrl, description, genres, Number(tickets))
      .then((json) => {
        if (!json.error) {
          this.props.history.push('/movie/all');
        }
      });
  }

  render() {
    return (
      <div id="addMovie">
        <h1>Create movie</h1>
        <form onSubmit={this.onSubmitHandler}>
          <Input
            name="title"
            value={this.state.title}
            onChange={this.onChangeHandler}
            label="Title"
          />
          <Input
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.onChangeHandler}
            label="Image URL"
          />
          <Input
            name="description"
            value={this.state.description}
            onChange={this.onChangeHandler}
            label="Description"
          />
          <Input
            name="genres"
            value={this.state.genres}
            onChange={this.onChangeHandler}
            label="Genres"
          />
          <Input
            name="tickets"
            type="number"
            value={this.state.tickets}
            onChange={this.onChangeHandler}
            label="Available Tickets"
          />
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

function mapDispatch(dispatch) {
    return {
        createMovie: (title, imageUrl, description, genres, tickets) => dispatch(createMovieAction(title, imageUrl, description, genres, tickets))
    };
}

export default withRouter(connect(null, mapDispatch)(CreateMovie));
