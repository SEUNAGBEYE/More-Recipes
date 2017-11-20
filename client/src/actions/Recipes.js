import axios from 'axios';

/**
 * @class Recipe
 */
export default class Recipe {

  /**
   * @memberOf Recipe
   * return {object} object
   */
  static allRecipes(){
    axios.get('/api/v1/recipes')
    .then((res) => res.data) // Transform the data into json
    .then((data) => {
      console.log(data)
      return data;
      })
    .catch(error => {
      console.log(error);
      return error;
    })
  }
}