import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies } from "../../actions/movies";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./list1.css";
// import './list1.css';
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
        <div className="movie-items">
          <div className="container">
            <div className="row ipad-width">
              <div className="col-md-3">
                <div className="sidebar">
                  <div className="ads">
                    {/* <!-- <img src="images/uploads/ads1.png" alt="" width="336" height="296"> --> */}
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="title-hd">
                  <h2>in theater</h2>
                  <a href="#" className="viewall">
                    View all <i className="ion-ios-arrow-right" />
                  </a>
                </div>
                <div className="tabs">
                  <ul className="tab-links">
                    <li className="active" style={{ marginRight: "18%" }}>
                      <a href="#tab1">#Popular</a>
                    </li>
                    <li>
                      <a href="#tab2"> #Coming soon</a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div id="tab1" className="tab active">
                      {this.props.movies.map(movie => (
                        <div
                          className="row"
                          style={{
                            width: "30%",
                            float: "left",
                            padding: "20px"
                          }}
                        >
                          <div className="slick-multiItem">
                            <Link to={`/specifics/${movie.id}`} key={movie.id}>
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="trailers">
          <div className="container">
            <div className="row ipad-width">
              <div className="col-md-12" />
            </div>
          </div>
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
