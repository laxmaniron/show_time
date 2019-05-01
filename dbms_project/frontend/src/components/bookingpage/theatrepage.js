import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTheatres } from "../../actions/theatre";
import theatre from "../../reducers/theatre";
import Header from "./layout/header";
import uuid from "uuid";
import "./moviet.css";
import { Link } from "react-router-dom";

export class TheatrePage extends Component {
  static propTypes = {
    theatres: PropTypes.object.isRequired
  };

  formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  changeDay = dateid => {
    console.log(dateid);
    this.setState({ day: dateid });
  };

  state = {
    date: String(this.formatDate(new Date())),
    day: 0
  };

  componentDidMount() {
    this.props.getTheatres(
      this.props.match.params.movie_id,
      this.props.match.params.city_id
    );
  }

  render() {
    // if (!this.props.theatres["theatreDetails"]) {
    //   return (
    //     <Fragment>
    //       <h1>No Theatre Found</h1>
    //     </Fragment>
    //   );
    // }

    let city_id = this.props.match.params.city_id;

    let city = "chennai";

    for (var i = 0; i < this.props.cities.length; i++) {
      if (this.props.cities[i]["id"] == city_id) {
        city = this.props.cities[i]["city"];
        console.log(city_id);
        break;
      }
    }

    let onlytheatres = [];

    let dates = [];

    let currentdate = new Date();

    for (var i = 0; i < 7; i++) {
      if (i == 0) {
        let caldate = String(
          this.formatDate(currentdate.setDate(currentdate.getDate()))
        );
        dates = [...dates, { date: caldate, id: i }];
      }

      if (i) {
        let caldate = String(
          this.formatDate(currentdate.setDate(currentdate.getDate() + 1))
        );
        dates = [...dates, { date: caldate, id: i }];
      }
    }

    if (this.props.theatres["theatreDetails"]) {
      onlytheatres = [];

      for (var i = 0; i < this.props.theatres["theatreDetails"].length; i++) {
        if (
          this.props.theatres["theatreDetails"][i]["date"] ==
          dates[this.state.day]["date"]
        ) {
          onlytheatres = [
            ...onlytheatres,
            this.props.theatres["theatreDetails"][i]
          ];
        }
      }
    }

    const movie_name = this.props.theatres.movie;
    const duration = this.props.theatres.time_duration;
    const movie_likes = this.props.theatres.likes;
    const image = this.props.theatres.image_source;
    const castslist = this.props.theatres.castDetails;
    const genreslist = this.props.theatres.genreDetails;

    let casts = [];

    if (castslist) {
      casts = castslist.map(cast => cast.castname);
    } else {
      casts = [];
    }

    let genres = [];

    if (genreslist) {
      genres = genreslist.map(genre => genre.genre);
    } else {
      genres = [];
    }
    return (
      <div className="backgroundimg">
        <div>
          <div style={{ paddingLeft: "46%" }}>
            <img
              className="image2"
              src={image}
              style={{
                border: "1px solid black",
                width: "18%",
                height: "24%"
              }}
            />
          </div>

          <div style={{ color: "white" }}>
            <h1>Genres</h1>
            <table className="table">
              <tbody>
                <tr>
                  {genres.map(genre => (
                    <td>
                      <i style={{ color: "white" }}>{genre}</i>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <h1>Casts and Crews</h1>
            <table className="table">
              <tbody>
                <tr>
                  {casts.map(cast => (
                    <td>
                      <i style={{ color: "white" }}>{cast}</i>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <h1 style={{ color: "white" }}>{this.props.theatres.movie}</h1>
        </div>

        <div className="dates">
          <table className="table table-striped">
            <thead>
              <tr>
                {dates.map(date => (
                  <th
                    className="datehighlight"
                    key={date.id}
                    onClick={this.changeDay.bind(this, date.id)}
                    style={{
                      cursor: "pointer",
                      color: "white"
                    }}
                  >
                    {date.date}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* <div className="dates"></div>
                <div className="container movietimesdiv" >
                    <div className="row movietimesrow">
                        <div className="col-sm-12">
                            <div className='row' style={{ width: 'inherit' }}>
                                <div className='col-sm-4'>
                                    <div className='movietitles'>
                                        Prasads Imax:
                                    </div>
                                </div>
                                <div className='col-sm-8'>
                                    <div className='movietime'>
                                        <div className='timebox'>
                                            7:30 pm
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div > */}

        {onlytheatres.map(theatre => (
          <div className="container movietimesdiv">
            <div className="row movietimesrow">
              <div className="col-sm-12">
                <div className="row" style={{ width: "inherit" }}>
                  <div className="col-sm-4">
                    <div className="movietitles">{theatre.theatre}</div>
                  </div>
                  <div className="col-sm-8">
                    <div className="movietime">
                      {theatre.timing.map(time => (
                        <div className="timebox" key={time.show_id}>
                          <Link
                            to={`/theatre/seats/${time.show_id}/${
                              theatre.theatre_id
                            }/${city}/${theatre.theatre}`}
                            style={{
                              cursor: "pointer",
                              textDecoration: "none"
                            }}
                          >
                            {time.time}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* <table className="table table-striped">
          <thead>
            <tr>
              <th>Theatre</th>

              <th>Date</th>
              <th>Timings</th>
            </tr>
          </thead>
          <tbody>
            {onlytheatres.map(theatre => (
              <tr key={theatre.theatre_id}>
                <td>{theatre.theatre}</td>
                <td>{theatre.date}</td>
                <td>
                  {theatre.timing.map(time => (
                    <i key={time.time}>&nbsp;&nbsp;{time.time}&nbsp;&nbsp;</i>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  theatres: state.theatres.theatres,
  cities: state.cities.cities
});

export default connect(
  mapStateToProps,
  { getTheatres }
)(TheatrePage);
