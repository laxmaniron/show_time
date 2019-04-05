import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSpecificMovie } from "../../actions/specificmovie";

export class SpecificMovie extends Component {
  static propTypes = {
    specificmovie: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSpecificMovie(id);
  }

  render() {
    const { specificmovie } = this.props;
    return (
      <div>
        <h1> SpecificMovie Details </h1>
        <h2>{specificmovie.title}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  specificmovie: state.specificmovie.specificmovie
});

export default connect(
  mapStateToProps,
  { getSpecificMovie }
)(SpecificMovie);
