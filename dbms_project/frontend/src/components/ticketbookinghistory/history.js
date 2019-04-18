import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTicketHistory } from "../../actions/tickethistory";

export class TicketHistoryPage extends Component {
  static propTypes = {
    ticketbookinghistory: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getTicketHistory(this.props.match.params.user_id);
  }

  render() {
    const ticketlist = this.props.ticketbookinghistory["tickets"];
    console.log(ticketlist);

    if (!ticketlist) {
      return <h1>Not Found.</h1>;
    }
    ticketlist.map(ticket =>
      console.log(ticket.movie, ticket.booking_id, ticket.theatre)
    );
    return (
      <div style={{ backgroundColor: "black" }}>
        <div className="container">
          {ticketlist.map(ticket => (
            <table
              className="table table-striped"
              style={{
                width: "35%",
                backgroundColor: "pink",
                float: "left",
                margin: "5%",
                border: "2px solid rgba(123,25,67,0.7)",
                borderRadius: "4px"
              }}
            >
              <tbody>
                <tr>
                  <td>Movie</td>
                  <td>{ticket.movie}</td>
                </tr>
                <tr>
                  <td>Booking Id</td>
                  <td>{ticket.booking_id}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{ticket.city}</td>
                </tr>
                <tr>
                  <td>Theatre</td>
                  <td>{ticket.theatre}</td>
                </tr>
                <tr>
                  <td>Timings</td>
                  <td>{ticket.timings}</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>{ticket.cost}</td>
                </tr>

                <tr>
                  <td>Seat No</td>
                  <td>{ticket.seat_no}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{ticket.category}</td>
                </tr>
                <tr>
                  <td>Dimension</td>
                  <td>{ticket.dimension}</td>
                </tr>
                <tr>
                  <td>Language</td>
                  <td>{ticket.language}</td>
                </tr>
                <tr>
                  <td>Snakcs</td>
                  <td>{ticket.snacks}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ticketbookinghistory: state.ticketbookinghistory.ticketbookinghistory
});

export default connect(
  mapStateToProps,
  { getTicketHistory }
)(TicketHistoryPage);
