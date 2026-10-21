function Column({ children }) {
  return (
    <div className="card shadow-sm">
      {children}
    </div>
  );
}

Column.Title = function ({ children }) {
  return (
    <div className="card-header bg-light py-3">
      <h5 className="card-title mb-0 fw-bold">{children}</h5>
    </div>
  );
};

Column.Body = function ({ isLoading, isError, children }) {
  if (isLoading) {
    return (
      <div className="card-body text-center py-3">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-live="polite"
        >
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <span className="text-center text-secondary py-3"> Упс, что-то пошло не так </span>
    );
  }

  return (
    <div className="card-body">
      {children}
    </div>
  );
};

export default Column;