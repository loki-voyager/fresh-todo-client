import React, { useEffect, useRef, useState } from "react";

type PaginationProps = {
  numOfPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
};

const Pagination = ({
  numOfPages,
  setPage,
  currentPage,
  setLimit,
  limit,
}: PaginationProps) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const temporaryContainer = useRef<HTMLDivElement>(null);
  const paginationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (temporaryContainer.current && paginationContainer.current) {
      const blockOfNumberWidth = temporaryContainer.current.offsetWidth;
      const containerWidth = paginationContainer.current.offsetWidth;
      setIsOverflow(
        blockOfNumberWidth > containerWidth ||
          blockOfNumberWidth === containerWidth
      );
    }
  }, [numOfPages]);

  const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const changePageHandler = (number: number) => {
    setPage(number);
  };

  const previousPage = () => {
    if (currentPage - 1 === 0) {
      setPage(numOfPages);
    } else {
      setPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage + 1 > numOfPages) {
      setPage(1);
    } else {
      setPage(currentPage + 1);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value, 10));
  };

  return (
    <>
      <div
        ref={temporaryContainer}
        style={{ visibility: "hidden", position: "absolute" }}
      >
        <div className="blockOfNumber">
          {numbers.map((number) => (
            <button
              key={number}
              className={currentPage === number ? "currentPage" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      <div className="pagination">
        <button onClick={previousPage}>previous</button>
        <div className="parrentBlockOfNumber" ref={paginationContainer}>
          <div className="blockOfNumber">
            {isOverflow ? (
              <select
                className="changeLimit"
                onChange={(e) => changePageHandler(Number(e.target.value))}
                value={currentPage}
              >
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            ) : (
              <>
                {numbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => changePageHandler(number)}
                    className={currentPage === number ? "currentPage" : ""}
                  >
                    {number}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
        <select
          className="changeLimit"
          value={limit}
          onChange={handleSelectChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
        </select>
        <button onClick={nextPage}>next</button>
      </div>
    </>
  );
};

export { Pagination };
