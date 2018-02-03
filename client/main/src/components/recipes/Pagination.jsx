import React from 'react';
import { Link } from 'react-router-dom';


const Pagination = (props) => (
  <div>
    <div className="container">
      <div className="row">

        <div className="col-xs-1 col-sm-1 col-md-4" />


        <div className="col-xs-1 col-sm-1 col-md-4">

          <nav style={{ margin: 20 }}>
            <ul className="pagination pagination-sm text-center">
              <li className="page-item">
                <Link to="/" className="page-link" aria-label="Previous" onClick={(e) => {
                  e.preventDefault();
                  let current = document.querySelector('.page-link-active');
                  if ((parseInt(current.innerHTML, 10) !== 1)) {
                    Array.from(document.getElementsByClassName('page-link')).map(elem => elem.className = 'page-link');
                    Array.from(document.getElementsByClassName('page-item')).map(elem => elem.className = 'page-item');
                    current.parentElement.previousElementSibling.children[0].className += ' page-link-active';
                    let prevElement = current.parentElement.previousElementSibling.children[0];
                    props.recipesPagination(prevElement.innerHTML - 1);
                  }
                }
                }>
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {
                [...Array(props.recipesCount).keys()].map((elem, index) => (<li className={index === 0 ? "page-item active" : "page-item"} key={index}><Link to="/" className={index === 0 ? "page-link page-link-active" : "page-link"} onClick={(e) => {
                  e.preventDefault();
                  Array.from(document.getElementsByClassName('page-link')).map(elem => elem.className = 'page-link');
                  Array.from(document.getElementsByClassName('page-item')).map(elem => elem.className = 'page-item');
                  e.target.parentElement.className += ' active';
                  e.target.className += ' page-link-active';
                  props.recipesPagination(index + 1);
                }
                }>{index + 1}</Link></li>))
              }
              <li className="page-item">
                <Link to="/" className="page-link" aria-label="Next" onClick={(e) => {
                  e.preventDefault();
                  let current = document.querySelector('.page-link-active');

                  Array.from(document.getElementsByClassName('page-link')).map(elem => elem.className = 'page-link');
                  Array.from(document.getElementsByClassName('page-item')).map(elem => elem.className = 'page-item');
                  current.parentElement.nextElementSibling.children[0].className += ' page-link-active';
                  props.recipesPagination(parseInt(current.innerHTML, 10) + 1);
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

export default Pagination;
