import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTheatres } from "../../actions/theatre";
import theatre from "../../reducers/theatre";
import Header from "./layout/header";
import uuid from "uuid";

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
    if (!this.props.theatres["theatreDetails"]) {
      return (
        <Fragment>
          <h1>No Theatre Found</h1>
        </Fragment>
      );
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

    return (
      <Fragment>
        <Header movie={this.props.theatres} />
        <h1>{this.props.theatres.movie}</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              {dates.map(date => (
                <th key={date.id} onClick={this.changeDay.bind(this, date.id)}>
                  {date.date}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div style={{ marginTop: "5%" }} />
        <table className="table table-striped">
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
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  theatres: state.theatres.theatres
});

export default connect(
  mapStateToProps,
  { getTheatres }
)(TheatrePage);
