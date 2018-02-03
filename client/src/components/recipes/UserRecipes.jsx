import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe,
  getUserRecipes,
  recipeCategories }
  from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';
import CategoryButton from './CategoryButton';


/**
 * @class UserRecipes
 */
class UserRecipes extends Component {
  /**
   * Creates an instance of UserRecipes.
   * @param {any} props
   * @memberof UserRecipes
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: '',
      ingredients: [],
      steps: [],
      errors: {},
      categoryId: '',
      downvotes: [],
      upvotes: [],
      userRecipes: []
    };
  }

  /**
  * @returns {void} void
  * @memberof UserRecipes
  */
  componentDidMount() {
    this.props.recipeCategories();
    this.props.getUserRecipes()
      .then(res => {
        this.setState({
          userRecipes: [...this.state.userRecipes, ...res.recipes]
        });
      });
  }


  /**
   * @memberOf UserRecipes
   * @returns {jsx} JSX
   */
  render() {
    return (
      <div>
        <main style={{ marginTop: 40 }}>

          <div className="container">
            <CategoryButton />
          </div>

          <div className="container">
            <div style={{ textAlign: 'center', marginTop: 100 }}>
              <a href="" className="auth-button"
                data-toggle="modal"
                data-target="#addModal">Add Recipe</a>
              <h4 className="container__myrecipes">My Recipes</h4><br /><br />
              <RecipeModal addRecipe={this.props.addRecipe}
                recipeCategories={this.props.categories}/>
            </div>

            <div className="row">
              {
                this.props.userRecipes.length > 0 ?
                  this.props.userRecipes.map((elem, index) => (
                    <RecipeCard key={elem.id} user={this.props.user}
                      recipe={elem} id={elem.id} onDelete={this.deleteRecipe}
                      editRecipe={this.editRecipe}
                    />)) :
                  <Exclamation>
                    <p className="text-muted">Sorry you haven't added any
                     recipe yet, please add to get started</p>
                  </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination />
      </div>
    );
  }
}

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  recipes: state.recipes,
  user: state.auth.user,
  userRecipes: state.recipes.allRecipes,
  categories: state.recipes.recipeCategories
});

export default connect(mapStateToProps, {
  addRecipe, getUserRecipes, recipeCategories
})(UserRecipes);

