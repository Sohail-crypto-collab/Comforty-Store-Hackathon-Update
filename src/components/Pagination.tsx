"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="pagination flex text-sm sm:text-base justify-center items-center mt-32 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded-md hover:bg-gray-200"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded-md ${
            currentPage === i + 1 ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded-md hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
