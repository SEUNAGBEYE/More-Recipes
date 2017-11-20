import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Recipe from '../../actions/Recipes';
import { pasta, seun } from '../../helpers/Images';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';


/**
 * @class RecipeCard
 */
export default class RecipeCard extends Component{

  /**
   * @memberOf RecipeCard
   * return {object} object
   */
  render(){
    return (
				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 my-card">
					<div className="card">
					  	<img className="card-img-top" src={pasta} alt="Card image cap" />
						<div className="container">
							<div className="card-block">
					    		<h4 className="card-title">Pasta</h4>
					    		<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							    <div className="d-flex justify-content-between">
										<a href="" className="fa fa-eye icons">10</a>
										<a href="#" className="fa fa-pencil icons" data-toggle="modal" data-target="#editModal"></a>
										<a href="#" className="fa fa-trash icons" data-toggle="modal" data-target="#deleteModal"></a>
								 </div>
							</div>
						</div>
					</div>
					<EditModal />
					<DeleteModal />
        </div>	
    )
  }
}

