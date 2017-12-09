export default {
  development: {
    username: 'SeunAgbeye',
    password: '',
    database: 'more_recipes',
    host: '127.0.0.1',
    port: 5432,
    secret_key: 'MYNAMEISSEUNAGBEYEANDYOUCANCALLMESEUNA',
    dialect: 'postgres'
  },
  test: {
    username: 'seun',
    password: '',
    database: 'more_recipes_test',
    host: '127.0.0.1',
    port: 5432,
    secret_key: 'MYNAMEISSEUNAGBEYEANDYOUCANCALLMESEUNA',
    dialect: 'postgres'
  },
  production: {
    environment: 'production'
  }
};
