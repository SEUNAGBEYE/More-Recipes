import React from 'react';
import PropTypes from 'prop-types';

const DeleteModal = (props) => (
  <div>
    <div className="modal fade" id={`deleteModal${props.id}`}
      tabIndex="-1" role="dialog" aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal"
              aria-label="Close" style={{ color: 'orange' }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="modalLabel"
              style={{ color: 'orange' }}
            >
            Delete
            </h4>
          </div>

          <div className="modal-body">
            <p style={{ fontSize: 16 }}>
              <strong>Do you want to delete this recipe?</strong>
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary auth-button"
              data-dismiss = "modal" onClick={props.onDelete}
              id={props.id}>Yes
            </button>
            <button type="button" className="btn btn-secondary auth-button"
              data-dismiss="modal"
            >
                  No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

DeleteModal.propTypes = propTypes;

export default DeleteModal;
