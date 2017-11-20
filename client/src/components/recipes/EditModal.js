import React from 'react';

const EditModal = () => {
  return(
    <div>
      	<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="modalLabel">Recipe</h4>
							</div>

							<div className="modal-body">
								<form action="" id="form">
									<fieldset className="form-group">
										<label htmlFor="first_name" className="form-inline">Name</label>
										<input type="text" className="form-control" id="first_name" name="first_name" />
									</fieldset>

									<fieldset className="form-group">
										<label htmlFor="last_name" className="form-inline">Description</label>
										<textarea className="form-control" id="last_name" name="last_name" cols="50" rows = "5"></textarea>
									</fieldset>

									<fieldset className="form-group">
										<label htmlFor="last_name" className="form-inline">Picture</label>
										<input type="file" className="form-control" id="last_name" name="last_name" />
									</fieldset>

									<fieldset>
										<button className="auth-button fa fa-plus" style={{float: 'left', width: 90, height: 20, fontSize: 12, padding: 0}} id="ingredient"><strong>Ingredients</strong></button>
									</fieldset>

									<fieldset>
										<button className="auth-button fa fa-plus" style={{float: 'left', width: 90, height: 20, fontSize: 12, padding: 0}} id="step"><strong>Steps</strong></button>
									</fieldset>

										<div className="modal-footer">
											<button className="btn btn-secondary auth-button" data-dismiss = "modal">Submit</button>
											<button type="button" className="btn btn-secondary auth-button" data-dismiss="modal">
												Cancel
											</button>
										</div>
								</form>	
							</div>
						</div>
					</div>
				</div>
    </div>
  )
}

export default EditModal;