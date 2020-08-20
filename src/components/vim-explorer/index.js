import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import "./index.scss";

const VIMS_PER_PAGE = 5;

function VimExplorer({ vimList }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [vimList]);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const activeList = vimList.slice(
    VIMS_PER_PAGE * (currentPage - 1),
    VIMS_PER_PAGE * currentPage
  );

  return (
    <div className="vim-explorer">
      <div className="vim-list-container">
        {activeList.map((row, index) => (
          <div className="vim-block" key={index}>
            <div className="vim-avatar">
              <img src={row.image} alt="avatar" />
            </div>
          </div>
        ))}
      </div>
      {vimList.length > VIMS_PER_PAGE && (
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={currentPage}
          itemsCountPerPage={VIMS_PER_PAGE}
          totalItemsCount={vimList.length}
          pageRangeDisplayed={10}
          onChange={onChangePage}
        />
      )}
    </div>
  );
}

export default VimExplorer;
