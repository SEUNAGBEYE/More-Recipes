import React from 'react';
import Loader from 'react-loader';
import PropTypes from 'prop-types';
/**
 * @description -  Update Profile Modal
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const UpdateProfileModal = (props) => {
  const {
    firstName,
    lastName,
    facebookUrl,
    twitterUrl,
    linkedInUrl,
    aboutMe
  } = props.user;
  return (
    <div className="modal fade" id="editModal" tabIndex="-1"
      role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close"
              data-dismiss="modal"
              aria-label="Close" style={{ color: 'orange' }}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="modalLabel"
              style={{ color: 'orange' }}>Profile</h4>
          </div>

          <div className="modal-body">
            <form id="form">
              <fieldset className="form-group">
                <label htmlFor="first_name" className="form-inline">
                        First Name
                </label>
                <input type="text" className="form-control"
                  defaultValue={firstName}
                  name="firstName" onChange={props.onChange}
                />
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="first_name" className="form-inline">
                        Last Name
                </label>
                <input type="text" className="form-control"
                  defaultValue={lastName}
                  name="lastName" onChange={props.onChange}
                />
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="first_name" className="form-inline">
                       Facebook Url
                </label>
                <input type="text" className="form-control"
                  defaultValue={facebookUrl}
                  name="facebookUrl"
                  onChange={props.onChange}
                />
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="first_name" className="form-inline">
                        Twitter User
                </label>
                <input type="text" className="form-control"
                  defaultValue={twitterUrl}
                  name="twitterUrl"
                  onChange={props.onChange}
                />
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="first_name" className="form-inline">
                        LinkedIn Url
                </label>
                <input type="text" className="form-control"
                  defaultValue={linkedInUrl}
                  name="linkedInUrl"
                  onChange={props.onChange}
                />
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="aboutMe" className="form-inline">
                        About Me
                </label>
                <textarea type="text"
                  rows="5" cols="20"
                  className="form-control"
                  defaultValue={aboutMe}
                  name="aboutMe"
                  onChange={props.onChange}
                />
              </fieldset>


              <fieldset className="form-group">
                <label htmlFor="last_name" className="form-inline">
                        Picture
                </label>
                <input type="file" className="form-control"
                  id="profilePicture" name="profilePicture"
                  onChange={props.onChange}
                />
              </fieldset>

              <div className="modal-footer">
                <Loader loaded={props.state.loaded} />
                <button className="btn btn-secondary auth-button"
                  id="updateProfileButton"
                  onClick={props.onSubmit}
                >Submit</button>
                <button type="button"
                  className="btn btn-secondary auth-button"
                  data-dismiss="modal"
                >
                          Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const propTypes = {
  state: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

UpdateProfileModal.propTypes = propTypes;

export default UpdateProfileModal;
