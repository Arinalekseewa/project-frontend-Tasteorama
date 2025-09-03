
import styles from './Pagination.module.css';
import sprite from '../../../public/sprite.svg';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 6;

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrow}
        aria-label="previous page"
      >
        <svg className={styles.iconBack}>
          <use href={`${sprite}#back_arrow_icon`} />
        </svg>
      </button>

      <div className={styles.containerbtn}>
        {pageNumbers.map(pageNum => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`${styles.pageBtn} ${
            pageNum === currentPage ? styles.active : ''
          }`}
        >
          {pageNum}
        </button>
      ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrow}
        aria-label="next page"
      >
        <svg className={styles.iconGo}>
          <use href={`${sprite}#back_arrow_icon`} />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
