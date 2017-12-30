import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkAuth from '../utils/CheckAuth';

/**
 *
 *
 * @export
 * @returns {void} void
 * @param {any} AuthComponent
 */
function requireAuthentication(AuthComponent) {
  /**
   * @class AuthenticatedComponent
   * @extends {Component}
   */
  class AuthenticatedComponent extends Component {
    /**
     * @returns {void} void
     * @memberof AuthenticatedComponent
     */
    componentWillMount() {
      checkAuth(this.props.isAuthenticated, this.props.history);
    }

    /**
     * @returns {JSX } jsx
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

  /**
 * mapStateToProps
 * @param {any} state
 * @param {any} props
 * @return {object} object
 */
  const mapStateToProps = (state, props) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}

export default requireAuthentication;
