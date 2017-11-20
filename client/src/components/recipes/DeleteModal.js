import React from 'react';

const DeleteModal = () => {
  return (
    <div>
      	<div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{color: 'orange'}}>
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="modalLabel" style={{color:'orange'}}>Delete</h4>
							</div>

              <div className='modal-body'>
                <p style={{fontSize: 16, color: 'orange'}}><strong>Do you want to delete this recipe?</strong></p>
              </div>

							<div className="modal-footer">
								<button className="btn btn-secondary auth-button" data-dismiss = "modal">Yes</button>
								<button type="button" className="btn btn-secondary auth-button" data-dismiss="modal">
									No
								</button>
							</div>
						</div>
					</div>
				</div>
    </div>
  )
}

export default DeleteModal