export default {
  development: {
    username: 'postgres',
    password: '',
    database: 'more_recipes',
    host: '127.0.0.1',
    port: 5432,
    secret_key: 'MYNAMEISSEUNAGBEYEANDYOUCANCALLMESEUNA',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
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
