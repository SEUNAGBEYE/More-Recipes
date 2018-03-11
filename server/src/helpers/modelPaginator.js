import responseTypes from './responseTypes';

const { successResponse, failureResponse } = responseTypes;
/**
 * @description - Helper function for pagination
 *
 * @param {Object} model
 * @param {Object} request
 * @param {Object} response
 * @param {Object} [where={}]
 * @param {Object} [include=null]
 *
 * @returns {Object} Object
 */
const modelPaginator = async (model, request, response, where = {}, include = null) => {
  const { limit, page: queryPage } = request.query;
  try {
    const modelWithCount = await model.findAndCountAll({ where });
    const data = await model.findAll({
      order: [['createdAt', 'DESC']],
      offset: (modelWithCount.count > limit) ?
        (limit * (queryPage - 1)) : 0,
      limit,
      where,
      include
    });
    const page = Math.ceil(modelWithCount.count / limit);
    return successResponse(response, data, 200, page);
  } catch (error) {
    return failureResponse(response, 400, undefined, error.message);
  }
};

export default modelPaginator;

