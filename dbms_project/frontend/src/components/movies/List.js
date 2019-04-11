import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies } from "../../actions/movies";
import { Link } from "react-router-dom";
import "./specificMovie.css";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

export class List extends Component {
  state = {
    intheatre: 1
  };
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired
  };

  showInTheatreMovies = e => {
    this.setState({ intheatre: 1 });
  };

  showUpcomingMovies = e => {
    this.setState({ intheatre: 0 });
  };

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    console.log(typeof this.props.movies);

    const { movies } = this.props;

    movies.sort((a, b) => b.likes - a.likes);

    return (
      <Fragment>
        <h1>Movies</h1>

        <div
          style={{
            marginTop: "2%",
            fontSize: "30px",
            cursor: "pointer",
            float: "left",
            width: "40%",
            marginBottom: "3%"
          }}
          onClick={this.showInTheatreMovies}
        >
          {this.state.intheatre ? (
            <strong>Movies in theatres</strong>
          ) : (
            <span>Movies in Theatres</span>
          )}
        </div>
        <div
          style={{
            marginTop: "2%",
            fontSize: "30px",
            cursor: "pointer",
            float: "left",
            width: "40%",
            marginBottom: "3%"
          }}
          onClick={this.showUpcomingMovies}
        >
          {!this.state.intheatre ? (
            <strong>Upcoming Movies</strong>
          ) : (
            <span>Upcoming Movies</span>
          )}
        </div>
        <div style={{ paddingLeft: "25%" }}>
          {this.state.intheatre
            ? movies.map(movie =>
                movie.status ? (
                  <div
                    key={movie.id}
                    style={{ width: "33.33%", float: "left" }}
                    className="carddiv"
                  >
                    <Link to={`/specifics/${movie.id}`}>
                      <img
                        className="image1"
                        src={movie.image_source}
                        style={{
                          border: "1px solid black",
                          borderRadius: "20px"
                        }}
                      />
                      <p id="contentpos">
                        {movie.title}
                        <br />
                        {movie.likes}
                        <br />
                      </p>
                    </Link>
                  </div>
                ) : null
              )
            : null}

          {!this.state.intheatre
            ? movies.map(movie =>
                !movie.status ? (
                  <div
                    key={movie.id}
                    style={{ width: "33.33%", float: "left" }}
                    className="carddiv"
                  >
                    <Link to={`/specifics/${movie.id}`}>
                      <img
                        className="image1"
                        src={movie.image_source}
                        style={{
                          border: "1px solid black",
                          borderRadius: "20px"
                        }}
                      />
                      <p id="contentpos">
                        {movie.title}
                        <br />
                        {movie.likes}
                        <br />
                      </p>
                    </Link>
                  </div>
                ) : null
              )
            : null}
        </div>
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
