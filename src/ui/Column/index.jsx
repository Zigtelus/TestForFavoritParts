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

Column.Body = function ({ isLoading, isError, children, className, style }) {
  if (isLoading) {
    return (
      <div className={`card-body text-center py-3 ${className || ''}`} style={style}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-muted my-3"> Упс, что-то пошло не так </p>
    );
  }

  return (
    <div className={`card-body ${className || ''}`} style={style}>
      {children}
    </div>
  );
};

export default Column;