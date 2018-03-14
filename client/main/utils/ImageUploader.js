import axios from 'axios';
import config from '../src/config/config';

const { cloudinaryUploadUrl, cloudinaryUploadPreset } = config;

/**
 * @description - Upload Media
 *
 * @param {Object} file
 * @returns {Promise} Promise
 */
function imageUpload(file) {
  const imageData = new FormData();
  imageData.append('file', file);
  imageData.append('upload_preset', cloudinaryUploadPreset);

  delete axios.defaults.headers.common['x-access-token'];

  return axios({
    url: cloudinaryUploadUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form.urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: imageData,
    return_delete_token: 1
  });
}

export default imageUpload;
