import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSpecificMovie, addComment } from "../../actions/specificmovie";
import { createMessage } from "../../actions/messages";
import moviesReducer from "../../reducers/moviesReducer";
import "./specificMovie.css";
import StarRatings from "react-star-ratings";
import Rating from "react-star-rating-lite";
import InfiniteScroll from "react-infinite-scroll-component";

export class SpecificMovie extends Component {
  static propTypes = {
    specificmovie: PropTypes.object.isRequired,
    getSpecificMovie: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired
  };

  state = {
    rating: 1,
    comment: "",
    flag: 0,
    summary: true,
    allreviews: false,
    yourreview: false,
    hasMore: false
  };

  showSummary = e => {
    this.setState({
      summary: true,
      allreviews: false,
      yourreview: false
    });
  };

  showAllReviews = e => {
    this.setState({
      summary: false,
      allreviews: true,
      yourreview: false
    });
  };

  showYourReview = e => {
    if (!this.props.auth.isAuthenticated) {
      this.props.createMessage({
        notloggedin: "Please Login to review a movie"
      });
      return;
    }

    this.setState({
      summary: false,
      allreviews: false,
      yourreview: true
    });

    this.setState({ flag: 1 });
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

    if (!this.props.auth.isAuthenticated) {
      this.props.createMessage({ notloggedin: "Please Login to comment" });
      return;
    }

    let flag = 0;
    for (var i = 0; i < this.props.specificmovie.allcomments.length; i++) {
      if (
        this.props.auth.user.username ===
        this.props.specificmovie.allcomments[i].user
      ) {
        flag = 1;
        console.log(`hi ${flag}`);
        break;
      }
    }

    if (flag) {
      this.props.createMessage({
        alreadyReviewed: "You have already reviewed"
      });

      return;
    }

    const ratings = {
      rating: {
        title: this.props.specificmovie.id,
        user: this.props.auth.user.id,
        rating: rating,
        comment: comment
      }
    };

    this.props.addComment(ratings);

    this.setState({ flag: 1 });

    const currentrating = {
      id: 2225645,
      user: this.props.auth.user.username,
      likestatus: 1,
      ratestatus: 1,
      rating: rating,
      comment: comment
    };

    this.setState({
      rating: 1,
      comment: "",
      flag: 0
    });

    this.props.specificmovie.allcomments = [
      ...this.props.specificmovie.allcomments,
      currentrating
    ];
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

    avgrating = Math.round(avgrating * 100) / 100;

    let currentuserreview =
      this.props.specificmovie.allcomments && this.props.auth.user
        ? this.props.specificmovie.allcomments.filter(
            comment => comment.user === this.props.auth.user.username
          )
        : null;

    console.log(currentuserreview);

    if (currentuserreview) {
      console.log(currentuserreview.length);
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
          <div
            style={{
              marginTop: "2%",
              fontSize: "30px",
              cursor: "pointer",
              float: "left",
              width: "25%"
            }}
            onClick={this.showSummary}
          >
            {this.state.summary ? (
              <strong>Summary</strong>
            ) : (
              <span>Summary</span>
            )}
          </div>
          <div
            style={{
              marginTop: "2%",
              fontSize: "30px",
              cursor: "pointer",
              float: "left",
              width: "25%"
            }}
            onClick={this.showAllReviews}
          >
            {this.state.allreviews ? (
              <strong>All Reviews</strong>
            ) : (
              <span>All Reviews</span>
            )}
          </div>
          <div
            style={{
              marginTop: "2%",
              fontSize: "30px",
              cursor: "pointer",
              float: "left",
              width: "25%",
              paddingRight: "50%"
            }}
            onClick={this.showYourReview}
          >
            {this.state.yourreview ? (
              <strong>Your Review</strong>
            ) : (
              <span>Your Review</span>
            )}
          </div>
          {this.state.summary ? (
            <div>
              <div>
                SYNOPSIS <br />
                {specificmovie.synopsis}
                <br />
                <br />
              </div>
              <div>
                Average Rating :&nbsp; {avgrating} &nbsp;&nbsp; ({noofratings})
                &nbsp; users
                <br />
                <StarRatings
                  rating={avgrating}
                  starRatedColor="yellow"
                  starDimension="40px"
                  starSpacing="15px"
                />
              </div>
              <div>
                CAST <br />
                {specificmovie.completecast
                  ? specificmovie.completecast.map(cast => (
                      <div
                        key={cast.id}
                        style={{ float: "left", width: "30%" }}
                      >
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
            </div>
          ) : null}
        </div>

        {this.state.allreviews ? (
          <div>
            <br />
            COMMENTS <br />
            <br />
            {specificmovie.allcomments ? (
              <InfiniteScroll
                dataLength={specificmovie.allcomments.length}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                height={400}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>That's all folks you have seen all the comments</b>
                  </p>
                }
              >
                {specificmovie.allcomments.map(comment => (
                  <div key={comment.id} style={{ width: "70%" }}>
                    Comment <br />
                    <div>
                      <Rating
                        value={String(comment.rating)}
                        weight="20"
                        color="yellow"
                        readonly
                      />
                      {comment.comment} by <strong> {comment.user}</strong>{" "}
                      &nbsp;&nbsp;
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : null}
          </div>
        ) : null}
        {this.state.yourreview ? (
          <div style={{ width: "50%", paddingLeft: "10%" }}>
            Your Review
            <br />
            <br />
            {currentuserreview ? (
              currentuserreview.length ? (
                currentuserreview.map(userreview => (
                  <div key={userreview.id} style={{ width: "50%" }}>
                    <div>
                      <Rating
                        value={String(userreview.rating)}
                        weight="20"
                        color="yellow"
                        readonly
                      />
                      {userreview.comment} by{" "}
                      <strong> {userreview.user}</strong> &nbsp;&nbsp;
                    </div>
                    <br />
                    <br />
                  </div>
                ))
              ) : (
                <strong>
                  You haven't reviewed yet
                  <br />
                  <br />
                </strong>
              )
            ) : null}
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
        ) : null}
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
  { getSpecificMovie, addComment, createMessage }
)(SpecificMovie);
