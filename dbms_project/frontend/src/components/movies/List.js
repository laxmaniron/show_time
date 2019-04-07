import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies } from "../../actions/movies";
import { Link } from "react-router-dom";
import "./specificMovie.css";
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
    console.log(typeof this.props.movies);
    return (
      <Fragment>
        <h1>Movies</h1>
        {this.props.movies.map(movie => (
          <center key={movie.id}>
            <div style={{ width: "50%" }}>
              <Link to={`/specifics/${movie.id}`}>
                <img
                  className="image1"
                  src={movie.image_source}
                  style={{ border: "1px solid black", borderRadius: "20px" }}
                />
                <p id="contentpos">
                  {movie.title}
                  <br />
                  {movie.likes}
                  <br />
                </p>
              </Link>
            </div>
          </center>
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
