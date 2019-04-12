import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies } from "../../actions/movies";
import { getGenres } from "../../actions/genres";
import { getLanguages } from "../../actions/languages";
import { getFormats } from "../../actions/formats";
import { Link } from "react-router-dom";
import "./specificMovie.css";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

export class List extends Component {
  state = {
    intheatre: 1,
    city: "chennai",
    Action: false,
    Adventure: false,
    Animation: false,
    Biography: false,
    Classic: false,
    Comedy: false,
    Crime: false,
    Dance: false,
    Drama: false,
    Family: false,
    Fantasy: false,
    History: false,
    Horror: false,
    Musical: false,
    Mystery: false,
    Period: false,
    Political: false,
    Physchological: false,
    Romance: false,
    Satire: false,
    SciFi: false,
    Sports: false,
    Suspense: false,
    Thriller: false,
    War: false,
    Bengali: false,
    Bhojpuri: false,
    English: false,
    Gujarati: false,
    Hindi: false,
    Kannada: false,
    Malayalam: false,
    Marathi: false,
    Punjabi: false,
    Tamil: false,
    Telugu: false
  };

  movie = [];

  static propTypes = {
    movies: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    formats: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired,
    getGenres: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    getFormats: PropTypes.func.isRequired
  };

  showInTheatreMovies = e => {
    this.setState({ intheatre: 1 });
  };

  showUpcomingMovies = e => {
    this.setState({ intheatre: 0 });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  doFormatFilter = e => {
    let p = false;
    if (e.target.value == "false") {
      p = false;
    } else if (e.target.value == "true") {
      p = true;
    }

    this.setState({ [e.target.name]: p });
  };

  doGenreFilter = e => {
    let p = false;
    if (e.target.value == "false") {
      p = false;
    } else if (e.target.value == "true") {
      p = true;
    }

    this.setState({ [e.target.name]: p });
  };

  doLanguageFilter = e => {
    let p = false;
    if (e.target.value == "false") {
      p = false;
    } else if (e.target.value == "true") {
      p = true;
    }

    this.setState({ [e.target.name]: p });
  };

  componentDidMount() {
    this.props.getMovies(this.state.city);
    this.props.getGenres();
    this.props.getLanguages();
    this.props.getFormats();
  }

  render() {
    let movies = this.props.movies;

    console.log(this.movie);

    let flag = 0;

    if (this.props.movies.length) {
      //console.log(this.props.movies);
      this.movie = [];
      for (var i = 0; i < this.props.movies.length; i++) {
        if (this.props.movies[i]["allgenre"]) {
          for (var j = 0; j < this.props.movies[i]["allgenre"].length; j++) {
            if (this.state[this.props.movies[i]["allgenre"][j]["genre"]]) {
              flag = 1;
              break;
            }
          }
          if (flag) {
            this.movie = [...this.movie, this.props.movies[i]];
          }

          flag = 0;
        }
      }

      for (var i = 0; i < this.props.movies.length; i++) {
        if (this.props.movies[i]["allanguages"]) {
          for (var j = 0; j < this.props.movies[i]["allanguages"].length; j++) {
            if (
              this.state[this.props.movies[i]["allanguages"][j]["language"]]
            ) {
              flag = 1;
              break;
            }
          }
          if (flag) {
            this.movie = [...this.movie, this.props.movies[i]];
          }

          flag = 0;
        }
      }
    }

    if (this.movie.length) {
      movies = this.movie;
    }

    movies.sort((a, b) => b.likes - a.likes);

    return (
      <Fragment>
        <h1>Movies</h1>
        <div className="container" style={{ textAlign: "Right" }}>
          <div className="row ">
            <div className="col-sm-12">
              <select name="city" onChange={this.onChange}>
                <option value="chennai">chennai</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="mumbai">Mumbai</option>
              </select>
            </div>
          </div>
        </div>
        <div
          style={{
            float: "left",
            marginTop: "10%",
            width: "20%",
            paddingLeft: "50px"
          }}
        >
          <div className="row" style={{ paddingLeft: "10%" }}>
            <div
              className="col-sm-8"
              style={{ border: "1px solid gray", borderRadius: "10px" }}
            >
              <p style={{ fontSize: "25px" }}>Genres</p>

              {this.props.genres.map(genre => (
                <span key={genre.id}>
                  <input
                    type="checkbox"
                    name={genre.genre}
                    value={!this.state[genre.genre]}
                    onChange={this.doGenreFilter}
                  />
                  {genre.genre}
                  <br />
                </span>
              ))}
            </div>
          </div>

          <div className="row" style={{ paddingLeft: "10%", marginTop: "2%" }}>
            <div
              className="col-sm-8"
              style={{ border: "1px solid gray", borderRadius: "10px" }}
            >
              <p style={{ fontSize: "25px" }}>Languages</p>

              {this.props.languages.map(language => (
                <span key={language.id}>
                  <input
                    type="checkbox"
                    name={language.language}
                    value={!this.state[language.language]}
                    onChange={this.doLanguageFilter}
                  />
                  {language.language}
                  <br />
                </span>
              ))}
            </div>
          </div>
          <div className="row" style={{ paddingLeft: "10%", marginTop: "2%" }}>
            <div
              className="col-sm-8"
              style={{ border: "1px solid gray", borderRadius: "10px" }}
            >
              <p style={{ fontSize: "25px" }}>Formats</p>

              {this.props.formats.map(format => (
                <span key={format.id}>
                  <input
                    type="checkbox"
                    name={format.format}
                    value={!this.state[format.format]}
                    onChange={this.doFormatFilter}
                  />
                  {format.format}
                  <br />
                </span>
              ))}
            </div>
          </div>
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
  movies: state.movies.movies,
  genres: state.genres.genres,
  formats: state.formats.formats,
  languages: state.languages.languages
});

export default connect(
  mapStateToProps,
  { getMovies, getGenres, getLanguages, getFormats }
)(List);
