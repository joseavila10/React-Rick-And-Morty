import React from 'react';
import './styles/pagination.css';

const Pagination = (props) => {

  return (
    <div>
        <div className="paginationDiv">
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={() => props.paginationHandler(1)}>
                            <span className="page-link">&#8592;</span>
                        </li>
                        { props.currentPage >= 3 && <li className="page-item" onClick={() => props.paginationHandler(props.currentPage - 2)}>
                            <span className="page-link">{props.currentPage - 2}</span>
                        </li> }
                        { props.currentPage >= 2 && <li className="page-item" onClick={() => props.paginationHandler(props.currentPage - 1)}>
                            <span className="page-link">{props.currentPage - 1}</span>
                        </li>}
                        <li className="page-item active" onClick={() => props.paginationHandler(props.currentPage)}>
                            <span className="page-link">{props.currentPage}</span>
                        </li>
                        { props.currentPage + 1 <= props.totalPages && <li className="page-item" onClick={() => props.paginationHandler(props.currentPage + 1)}>
                            <span className="page-link">{props.currentPage + 1}</span>
                        </li> }
                        { props.currentPage + 2 <= props.totalPages &&<li className="page-item" onClick={() => props.paginationHandler(props.currentPage + 2)}>
                            <span className="page-link">{props.currentPage + 2}</span>
                        </li> }
                        <li className="page-item" onClick={() => props.paginationHandler(props.totalPages)}>
                            <span className="page-link">&#8594;</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div className="paginationShowing">
            Showeing {props.to - props.from} of {props.totalChars} {props.showing}
        </div>
    </div>
  )
}

export default Pagination