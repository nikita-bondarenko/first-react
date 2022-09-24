import React from 'react';

const MyPagination = ({pagesArray, page, changePage}) => {
    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span onClick={() => changePage(p)} key={p}
                      className={page === p ? 'page page__current' : 'page'}>{p}</span>)}
        </div>

    );
};

export default MyPagination;