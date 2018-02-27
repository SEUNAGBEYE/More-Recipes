import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const Pagination = (props) => {
  // recipe count is the page count, recipePagination is a function
  const { recipesPagination, recipesCount } = props;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-sm-1 col-md-4" />
          <div className="col-xs-1 col-sm-1 col-md-4">
            <nav style={{ margin: 20 }}>
              <ul className="pagination pagination-sm text-center">
                <li className="page-item">
                  <Link to="/" className="page-link"
                    aria-label="Previous"
                    id="previous"
                    onClick={(event) => {
                      event.preventDefault();
                      let current = document.querySelector('.page-link-active');
                      console.log('+++++++++++++', current);
                      if ((parseInt(current.innerHTML, 10) !== 1)) {
                        Array.from(document.getElementsByClassName('page-link'))
                          .map(elem => { elem.className = 'page-link'; });
                        Array.from(document.getElementsByClassName('page-item'))
                          .map(elem => { elem.className = 'page-item'; });
                        current.parentElement.previousElementSibling
                          .children[0].className += ' page-link-active';
                        let previousElement = current.parentElement
                          .previousElementSibling.children[0];
                        recipesPagination(previousElement.innerHTML);
                      }
                    }
                    }
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                {
                  // page starts from 0 and an array of three item is created
                  [...Array(recipesCount).keys()]
                    .map((page, index) => (
                      <li
                        className={
                          index === 0 ? "page-item active" : "page-item"
                        }
                        key={index}
                      >
                        <Link to="/"
                          className={
                            index === 0 ? "page-link page-link-active" :
                              "page-link"}
                          onClick={(event) => {
                            event.preventDefault();
                            Array.from(document.getElementsByClassName('page-link'))
                              .map(elem => { elem.className = 'page-link'; });
                            Array.from(document.getElementsByClassName('page-item'))
                              .map(elem => { elem.className = 'page-item'; });
                            event.target.parentElement.className += ' active';
                            event.target.className += ' page-link-active';
                            recipesPagination(page + 1);
                          }
                          }>{page + 1}</Link>
                      </li>
                    ))
                }
                <li className="page-item">
                  <Link to="/" className="page-link" aria-label="Next"
                    onClick={(event) => {
                      event.preventDefault();
                      let current = document.querySelector('.page-link-active');
                      if (parseInt(current.innerHTML, 10) !== recipesCount) {
                        Array.from(document.getElementsByClassName('page-link'))
                          .map(elem => { elem.className = 'page-link'; });
                        Array.from(document.getElementsByClassName('page-item'))
                          .map(elem => { elem.className = 'page-item'; });
                        current.parentElement.nextElementSibling
                          .children[0].className += ' page-link-active';
                        recipesPagination(parseInt(current.innerHTML, 10) + 1);
                      }
                    }
                    }>
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-xs-1 col-sm-1 col-md-4" />
        </div>
      </div>
    </div>
  );
};

const propTypes = {
  recipesPagination: PropTypes.func.isRequired,
  recipesCount: PropTypes.number.isRequired,
};

Pagination.propTypes = propTypes;

export default Pagination;
