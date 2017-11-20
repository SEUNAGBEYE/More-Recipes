import React from 'react';

const Pagination = () => {
  return (
    <div>
      <div className="container">
        <div className="row">

          <div className="col-xs-1 col-sm-1 col-md-4"></div>


          <div className="col-xs-1 col-sm-1 col-md-4">
          
            <nav style={{margin: 20}}>
              <ul className="pagination pagination-sm text-center">
              <li className="page-item">
              <a href="#" className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              </a>
              </li>
                <li className="page-item"><a href="#" className="page-link">1</a></li>
                <li className="page-item"><a href="#" className="page-link">2</a></li>
                <li className="page-item"><a href="#" className="page-link">3</a></li>
                <li className="page-item active"><a href="#" className="page-link" style={{color: 'white', background: 'orange', borderColor: 'orange'}}>4</a></li>
                <li className="page-item"><a href="#" className="page-link">5</a></li>
                <li className="page-item"><a href="#" className="page-link">6</a></li>
                <li className="page-item"><a href="#" className="page-link">7</a></li>
                <li className="page-item">
                <a href="#" className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-xs-1 col-sm-1 col-md-4"></div>
        </div>
      </div>
    </div>
  )
}

export default Pagination;