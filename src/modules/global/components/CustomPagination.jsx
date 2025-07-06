import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({
    currentPage,
    totalPages,
    pageOnClick,
}) => {
  let active = currentPage;
  let items = [];

  let startPage = Math.max(active - 2, 1);
  let endPage = startPage + 4;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - 4, 1);
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
      key={number}
      active={number === active}
      onClick={number === currentPage ? () => {} : () => pageOnClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>
        <Pagination.First onClick={currentPage === 1 ? () => {} : () => pageOnClick(1)} />
        <Pagination.Prev
        onClick={
          currentPage - 1 >= 1 ? () => pageOnClick(currentPage - 1) : () => {}
        }
        />
        {items}
        <Pagination.Next
        onClick={
          currentPage + 1 <= totalPages ? () => pageOnClick(currentPage + 1) : () => {}
        }
        />
        <Pagination.Last onClick={currentPage === totalPages ? () => {} : () => pageOnClick(totalPages)}/>
      </Pagination>
    </div>
  );
}

export default CustomPagination;