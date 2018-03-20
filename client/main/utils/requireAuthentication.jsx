import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import checkAuth from '../utils/checkAuth';

/**
 * @description - Higher order component for forcing authentication
 *
 * @param {Component} AuthComponent
 *
 * @returns {Component} React component
 */
const requireAuthentication = (AuthComponent) => {
  /**
   * @class AuthenticatedComponent
   * @extends {Component}
   */
  class AuthenticatedComponent extends Component {
    /**
     * @description - Check if user is authenticated
     * @method componentWillMount
     *
     * @returns {void} void
     * @memberof AuthenticatedComponent
     */
    componentWillMount() {
      checkAuth(this.props.isAuthenticated, this.props.history);
    }

    /**
     * @description - Renders react component
     * @method render
     *
     * @returns {Jsx } Jsx
     * @memberof AuthenticatedComponent
     */
    render() {
      return (
        <div>
          {this.props.isAuthenticated === true ?
            <AuthComponent {...this.props}/> :
            null
          }
        </div>
      );
    }
  }

  const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
  };

  AuthenticatedComponent.propTypes = propTypes;

  /**
 * mapStateToProps
 * @param {Object} state
 * @param {Oject} props
 *
 * @return {Object} object
 */
  const mapStateToProps = (state, props) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}

export default requireAuthentication;
