import clsx from "clsx";
import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({
  onClick,
  hidden = false,
  disabled = false,
  isLoading = false,
  fullWidth = false,
  children = "Load more",
  className,
}) {
  if (hidden) return null;

  return (
    <div className={styles.loadmore}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? "true" : "false"}
        className={clsx(styles.root, fullWidth && styles.fullWidth, className)}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        <span>{isLoading ? "Loading…" : children}</span>
      </button>
    </div>
  );
}
