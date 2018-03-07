

const modelPaginator = (model, req, res, where = {}, include = null) => {
  const { limit, page: queryPage } = req.query;
  model.findAndCountAll({ where })
    .then((modelWithCount) => {
      model.findAll({
        order: [['createdAt', 'DESC']],
        offset: (modelWithCount.count > limit) ?
          (limit * (queryPage - 1)) : 0,
        limit,
        where,
        include
      })
        .then((data) => {
          const page = Math.ceil(modelWithCount.count / limit);
          res.status(200).send({
            status: 'Success',
            data,
            pagination: page
          });
        })
        .catch(error => res.status(400).send({
          status: 'Failure',
          message: 'Bad Request',
          error: error.message
        }));
    })
    .catch(error => res.status(400).send({
      status: 'Failure',
      message: 'Bad Request',
      error: error.message
    }));
};

export default modelPaginator;

