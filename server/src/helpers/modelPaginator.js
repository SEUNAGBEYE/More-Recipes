

const modelPaginator = (model, req, res, where = {}) => {
  const { limit, page: queryPage } = req.query;
  model.findAndCountAll({ where })
    .then((modelWithCount) => {
      model.findAll({
        order: [['createdAt', 'DESC']],
        offset: (modelWithCount.count > limit) ?
          (limit * (queryPage - 1)) : 0,
        limit,
        where
      })
        .then((data) => {
        //  This is for the remainder of the resume if the count is not even
          const remainder = modelWithCount.count % limit === 0 ?
            0 : 1;
          const page = Math.floor(modelWithCount.count / limit) +
         remainder;
          res.status(200).send({
            status: 'Success',
            data,
            pagination: page
          });
        })
        .catch(error => res.status(400).send({
          status: 'Bad Request',
          error: error.message
        }));
    });
};

export default modelPaginator;

