import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies } from "../../actions/movies";
import { Link } from "react-router-dom";

import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

export class List extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getMovies();
  }
  render() {
    return (
      <Fragment>
        <h1>Movies</h1>
        {this.props.movies.map(movie => (
          <div key={movie.id}>
            <Link to={`/specifics/${movie.id}`}>
              <Card>
                <CardImg top width="65%" src={movie.image_source} />
                <CardBody>
                  <CardTitle>{movie.title}</CardTitle>
                  <CardText>{movie.likes}</CardText>
                </CardBody>
              </Card>
            </Link>
          </div>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies
});

export default connect(
  mapStateToProps,
  { getMovies }
)(List);
