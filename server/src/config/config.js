// let DATABASE_URL = process.env.DATABASE_URL['dialect'] = 'postgres'

export default {
  development: {
    username: "root",
    password: "password",
    database: "more_recipes",
    host: "127.0.0.1",
    port: 5432,
    secret_key: "MYNAMEISSEUNAGBEYEANDYOUCANCALLMESEUNA",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: "password",
    database: "more_recipes_test",
    host: "127.0.0.1",
    port: 5432,
    secret_key: "MYNAMEISSEUNAGBEYEANDYOUCANCALLMESEUNA",
    dialect: "postgres"
  },
  production: {
    // use_env_variable: process.env.DATABASE_URL,
    // dialect: "postgres"
    environment: 'production'
  }
}
