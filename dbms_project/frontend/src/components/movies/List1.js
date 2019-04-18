import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies } from "../../actions/movies";
import { getGenres } from "../../actions/genres";
import { getLanguages } from "../../actions/languages";
import { getFormats } from "../../actions/formats";
import { Link } from "react-router-dom";
import "./list1.css";
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

    this.props.getMovies(this.state.city);
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

      for (var i = 0; i < this.props.movies.length; i++) {
        if (this.props.movies[i]["allformats"]) {
          for (var j = 0; j < this.props.movies[i]["allformats"].length; j++) {
            if (this.state[this.props.movies[i]["allformats"][j]["format"]]) {
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
        <div className="slider movie-items">
          <div className="container">
            <div className="row">
              <div className="slick-multiItemSlider">
                <div className="movie-item">
                  <div className="mv-img">
                    <Link to="#">
                      <img
                        src="http://127.0.0.1:8000/media/profile_image/slider1.jpg"
                        alt=""
                        width="285"
                        height="437"
                      />
                    </Link>
                  </div>
                  <div className="title-in">
                    <div className="cate">
                      <span className="blue">
                        <Link to="#">Sci-fi</Link>
                      </span>
                    </div>
                    <h6>
                      <Link to="#">Interstellar</Link>
                    </h6>
                    <p>
                      <i className="ion-android-star" />
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingLeft: "83%",
            backgroundColor: "#020d18",
            paddingTop: "30px"
          }}
        >
          <select
            name="city"
            className="btn btn-dark dropdown-toggle"
            onChange={this.onChange}
          >
            <option value="chennai">chennai</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>

        <div className="movie-items">
          <div className="container-fluid" style={{}}>
            <div className="row ipad-width">
              <div
                className="col-md-3"
                style={{
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  color: "white"
                }}
              >
                {/* <!-- <img src="images/uploads/ads1.png" alt="" width="336" height="296"> --> */}

                <div className="row" style={{ paddingLeft: "10%" }}>
                  <div
                    className="col-sm-12"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "10px"
                    }}
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

                <div
                  className="row"
                  style={{ paddingLeft: "10%", marginTop: "2%" }}
                >
                  <div
                    className="col-sm-12"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "10px"
                    }}
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
                <div
                  className="row"
                  style={{ paddingLeft: "10%", marginTop: "2%" }}
                >
                  <div
                    className="col-sm-12"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "10px"
                    }}
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

              <div className="col-md-2" />

              <div
                className="col-md-7"
                style={{ paddingLeft: "20px", paddindRight: "20px" }}
              >
                <div className="movie-tabs">
                  <div className="tabs">
                    <ul className="tab-links tabs-mv">
                      {this.state.intheatre ? (
                        <li
                          className="active"
                          style={{ cursor: "pointer" }}
                          onClick={this.showInTheatreMovies}
                        >
                          <a style={{ textDecoration: "None" }}>
                            #Movies in Theatres
                          </a>
                        </li>
                      ) : (
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={this.showInTheatreMovies}
                        >
                          <a style={{ textDecoration: "None" }}>
                            #Movies in Theatres
                          </a>
                        </li>
                      )}

                      {!this.state.intheatre ? (
                        <li
                          className="active"
                          style={{ cursor: "pointer" }}
                          onClick={this.showUpcomingMovies}
                        >
                          <a style={{ textDecoration: "None" }}>#Coming Soon</a>
                        </li>
                      ) : (
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={this.showUpcomingMovies}
                        >
                          <a style={{ textDecoration: "None" }}>#Coming Soon</a>
                        </li>
                      )}
                    </ul>

                    <div className="tab-content">
                      <div id="tab1" className="tab active">
                        {this.state.intheatre
                          ? movies.map(movie =>
                              movie.status ? (
                                <div
                                  className="row"
                                  style={{
                                    width: "30%",
                                    float: "left",
                                    padding: "20px"
                                  }}
                                >
                                  <div className="slick-multiItem">
                                    <Link
                                      to={`/specifics/${movie.id}`}
                                      key={movie.id}
                                    >
                                      <div className="slide-it">
                                        <div className="movie-item">
                                          <div className="mv-img">
                                            <img
                                              src={movie.image_source}
                                              alt=""
                                              width="185"
                                              height="284"
                                            />

                                            <div className="title-in">
                                              <h6
                                                style={{
                                                  color: "white",
                                                  fontSize: "20px"
                                                }}
                                              >
                                                {movie.title}
                                              </h6>
                                              <p>
                                                <i className="ion-android-star" />
                                                <span>{movie.likes} likes</span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              ) : null
                            )
                          : null}
                      </div>
                    </div>

                    <div className="tab-content">
                      <div id="tab1" className="tab active">
                        {!this.state.intheatre
                          ? movies.map(movie =>
                              !movie.status ? (
                                <div
                                  className="row"
                                  style={{
                                    width: "30%",
                                    float: "left",
                                    padding: "20px"
                                  }}
                                >
                                  <div className="slick-multiItem">
                                    <Link
                                      to={`/specifics/${movie.id}`}
                                      key={movie.id}
                                    >
                                      <div className="slide-it">
                                        <div className="movie-item">
                                          <div className="mv-img">
                                            <img
                                              src={movie.image_source}
                                              alt=""
                                              width="185"
                                              height="284"
                                            />

                                            <div className="title-in">
                                              <h6
                                                style={{
                                                  color: "white",
                                                  fontSize: "20px"
                                                }}
                                              >
                                                {movie.title}
                                              </h6>
                                              <p>
                                                <i className="ion-android-star" />
                                                <span>{movie.likes} likes</span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              ) : null
                            )
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
