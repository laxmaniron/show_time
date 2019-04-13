import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSnacks } from "../../actions/snacks";
import Paypal from "../pages/Paypal";

/// AUWnNkRkdwNKiee-zgU8NF7Zs6OTt-c6zcCNeAM89mHWRHr_DrCjqyyu-qTZGYyJzJ2aTA2wsi4Aq6HK

export class Snacks extends Component {
  static propTypes = {
    snacks: PropTypes.array.isRequired
  };

  state = {
    totalcost: 0.0,
    samosa: 0,
    popcorn: 0,
    sandwich: 0
  };

  componentDidMount() {
    this.props.getSnacks();
  }

  addItems = (name, price) => {
    if (name == "samosa") {
      this.setState({ samosa: this.state.samosa + 1 });
    }
    if (name == "popcorn") {
      this.setState({ popcorn: this.state.popcorn + 1 });
    }
    if (name == "sandwich") {
      this.setState({ sandwich: this.state.sandwich + 1 });
    }

    this.setState({ totalcost: this.state.totalcost + price });
  };

  subtractItems = (name, price) => {
    if (name == "samosa") {
      if (this.state.samosa > 0) {
        this.setState({ samosa: this.state.samosa - 1 });
        this.setState({ totalcost: this.state.totalcost - price });
      }
    }
    if (name == "popcorn") {
      if (this.state.popcorn > 0) {
        this.setState({ popcorn: this.state.popcorn - 1 });
        this.setState({ totalcost: this.state.totalcost - price });
      }
    }
    if (name == "sandwich") {
      if (this.state.sandwich > 0) {
        this.setState({ sandwich: this.state.sandwich - 1 });
        this.setState({ totalcost: this.state.totalcost - price });
      }
    }
  };

  transactionError = () => {};

  transactionCanceled = () => {};

  transactionSuccess = () => {};

  render() {
    return (
      <Fragment>
        <h1>Snacks</h1>
        {this.props.snacks.map(snack => (
          <div key={snack.id}>
            <span>{snack.snacks}&nbsp;&nbsp;</span>
            <span>{snack.price}&nbsp;&nbsp;</span>
            <span>
              &nbsp;&nbsp;
              <div
                className="btn btn-primary "
                onClick={this.addItems.bind(this, snack.snacks, snack.price)}
              >
                Add
              </div>
            </span>
            <span>
              currently you have {this.state[snack.snacks]} {snack.snacks}
            </span>
            <span>
              &nbsp;&nbsp;
              <div
                className="btn btn-danger"
                onClick={this.subtractItems.bind(
                  this,
                  snack.snacks,
                  snack.price
                )}
              >
                Subtract
              </div>
            </span>
          </div>
        ))}

        <div> {this.state.totalcost}</div>

        <div className="btn btn-dark">
          <Paypal
            toPay={this.state.totalcost}
            transactionError={data => this.transactionError(data)}
            transactionCanceled={data => this.transactionCanceled(data)}
            onSuccess={data => this.transactionSuccess(data)}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  snacks: state.snacks.snacks
});

export default connect(
  mapStateToProps,
  { getSnacks }
)(Snacks);
