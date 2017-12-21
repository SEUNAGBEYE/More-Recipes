
import React, { Component } from 'react';

/**
 *
 *
 * @class ReviewRecipe
 * @extends {Component}
 */
class ReviewRecipe extends Component {
  /**
   * Creates an instance of ReviewRecipe.
   * @param {any} props
   * @memberof ReviewRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      reviewBody: ''
    };
  }

  /**
   *
   *
   * @memberof ReviewRecipe
   * @returns {jsx} JSX
   */
  render() {
    return (
      <div className="row">
        <div className="" style={{ backgroundColor: '#f8f9fa', border: '1 solid #f8f9fa' }}>

          <div className="col-md-1 review" style={{ paddingTop: 10 }}>
            <img style={{ width: 30, height: 30, borderRadius: 80 }} />
          </div>
          <div className="col-md-11 review">
            <h5 style={{ color: 'orange', marginTop: 5 }}>Joe</h5>

            Do you have a recipe for an eggless homemade pasta? I have a vegan daughter and would like to make some homemade pasta. I have tried a plain flour and water recipe, but did not like the texture and it cooked up too soft. Thanks Vicki DiFederico
          </div>
        </div>
      </div>
    );
  }
}
