import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSpecificMovie } from "../../actions/specificmovie";
import moviesReducer from "../../reducers/moviesReducer";
import "./specificMovie.css";
import StarRatings from "react-star-ratings";
import Rating from "react-star-rating-lite";

export class SpecificMovie extends Component {
  static propTypes = {
    specificmovie: PropTypes.object.isRequired,
    getSpecificMovie: PropTypes.func.isRequired
  };

  state = {
    rating: 0,
    comment: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSpecificMovie(id);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  rateStar = ratedVal => {
    console.log(ratedVal);
    this.setState({ rating: ratedVal });
    console.log(this.state.rating);
  };

  onSubmit = e => {
    e.preventDefault();

    const { rating, comment } = this.state;

    console.log(this.state);
  };

  render() {
    const { specificmovie } = this.props;
    const { comment } = this.state;

    var rating = 0;

    let totalrating = 0;
    let noofratings = 0;

    {
      this.props.specificmovie.allcomments
        ? this.props.specificmovie.allcomments.forEach((comment, index) => {
            totalrating = totalrating + comment.rating;
            noofratings = noofratings + 1;
          })
        : null;
    }

    let avgrating = 0;

    if (this.props.specificmovie.allcomments) {
      avgrating = totalrating / noofratings;
    }
    return (
      <div className="container">
        <h1> SpecificMovie Details </h1>
        <h2 style={{ color: "red", fontSize: "50px" }}>
          {specificmovie.title}
        </h2>
        <div>
          <img
            className="image2"
            src={specificmovie.image_source}
            style={{ border: "1px solid black", borderRadius: "30px" }}
          />
          <div style={{ float: "right", paddingRight: "20%" }}>
            GENRE <br />
            {specificmovie.allgenre
              ? specificmovie.allgenre.map(genre => (
                  <span key={genre.id}>{genre.genre} &nbsp; &nbsp;</span>
                ))
              : null}
            <br />
            Languages <br />
            {specificmovie.allanguages
              ? specificmovie.allanguages.map(language => (
                  <span key={language.id}>
                    {language.language} &nbsp; &nbsp;
                  </span>
                ))
              : null}
            <br />
            Available in Formats
            <br />
            {specificmovie.allformats
              ? specificmovie.allformats.map(format => (
                  <span key={format.id}>{format.format} &nbsp; &nbsp;</span>
                ))
              : null}
            <br />
          </div>
          <br />
        </div>
        <div>
          SYNOPSIS <br />
          {specificmovie.synopsis}
          <br />
          <br />
        </div>
        <div>
          CAST <br />
          {specificmovie.completecast
            ? specificmovie.completecast.map(cast => (
                <div key={cast.id} style={{ float: "left", width: "30%" }}>
                  {cast.cast} &nbsp; &nbsp;
                  <br />
                  <img
                    className="image3"
                    src={cast.image}
                    style={{
                      border: "1px solid black",
                      borderRadius: "10%"
                    }}
                  />
                  <br />
                </div>
              ))
            : null}
        </div>
        <div style={{ marginTop: "30%" }}>
          Average Rating :&nbsp; {avgrating} &nbsp;&nbsp; ({noofratings}) &nbsp;
          users
          <br />
          <StarRatings
            rating={avgrating}
            starRatedColor="yellow"
            starDimension="40px"
            starSpacing="15px"
          />
        </div>
        <div>
          <br />
          COMMENTS <br />
          <br />
          {specificmovie.allcomments
            ? specificmovie.allcomments.map(comment => (
                <div key={comment.id}>
                  Comment <br />
                  <p>
                    {comment.comment} by {comment.user}
                  </p>
                </div>
              ))
            : null}
        </div>
        <div style={{ width: "50%", paddingLeft: "10%" }}>
          Your Review
          <br />
          <Rating
            value="1"
            weight="30"
            onClick={this.rateStar}
            color="yellow"
          />
          <form action="" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name"> Review </label>
              <textarea
                type="message"
                name="comment"
                style={{ height: "120px" }}
                placeholder="Enter your review...."
                className="form-control form-control-lg"
                value={comment}
                onChange={this.onChange}
              />
            </div>
            <input
              type="submit"
              value="Post Your Review"
              className="btn btn-dark btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  specificmovie: state.specificmovie.specificmovie,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getSpecificMovie }
)(SpecificMovie);
