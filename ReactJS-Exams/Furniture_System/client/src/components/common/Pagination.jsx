import React from 'react';
import { Link } from 'react-router-dom';

function Pagination(props) {
    const { total, lengthPerPage, current } = props;
    const pagesCount = Math.ceil(total / lengthPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push((
            <li key={i} className={`page-item${current === i ? ' active' : ''}`}>
                <Link className="page-link" to={`/furniture/all/${i}`}>{i}</Link>
            </li>
        ));
    }

    return (
        <div className="row space-top">
            <div className="col-md-12">
                <ul className="pagination">
                    <li className={'page-item' + (current === 1 ? ' disabled': '')}>
                        <Link className="page-link" to={`/furniture/all/${current - 1}`}>«</Link>
                    </li>
                    {pages}
                    <li className={'page-item' + (current === pagesCount || pagesCount === 0 ? ' disabled': '')}>
                        <Link className="page-link" to={`/furniture/all/${current + 1}`}>»</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Pagination;
