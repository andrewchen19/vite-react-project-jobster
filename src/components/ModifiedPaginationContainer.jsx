import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ModifiedPaginationContainer = () => {
  const { numOfPages, params } = useLoaderData();
  // params 拿到的是 string, 記得要先轉換成 number
  const page = parseInt(params.page) || 1;

  // conditional rendering
  // 當總頁面數量小於 2 時，不會出現 pagination container
  if (numOfPages < 2) return null;

  const location = useLocation();
  const { pathname, search } = location;

  const navigate = useNavigate();

  // event handling (click button)
  const pageChangeHandler = (number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-secondary btn-sm sm:btn-md join-item ${
          activeClass && "btn-active"
        }`}
        onClick={() => pageChangeHandler(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // first page button
    pageButtons.push(pageButton({ pageNumber: 1, activeClass: page === 1 }));

    // ...
    if (page > 2) {
      pageButtons.push(
        <button
          key="dot-1"
          className="btn btn-secondary btn-sm sm:btn-md join-item"
        >
          ...
        </button>
      );
    }

    // other page button
    if (page !== 1 && page !== numOfPages) {
      pageButtons.push(pageButton({ pageNumber: page, activeClass: true }));
    }

    // ...
    if (page < numOfPages - 1) {
      pageButtons.push(
        <button
          key="dot-2"
          className="btn btn-secondary btn-sm sm:btn-md join-item"
        >
          ...
        </button>
      );
    }

    // last page button
    pageButtons.push(
      pageButton({ pageNumber: numOfPages, activeClass: page === numOfPages })
    );

    return pageButtons;
  };

  return (
    <div className="mt-16 flex justify-center">
      <div className="join">
        {/* prev button */}
        <button
          className="btn btn-secondary btn-sm sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = numOfPages;
            pageChangeHandler(prevPage);
          }}
        >
          prev
        </button>

        {/* page buttons，手動設定數量 */}
        {renderPageButtons()}

        {/* next button */}
        <button
          className="btn btn-secondary btn-sm sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > numOfPages) nextPage = 1;
            pageChangeHandler(nextPage);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ModifiedPaginationContainer;
