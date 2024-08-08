const AppError = ({ error }: { error: string }) => {
  return (
    <>
      {error && (
        <div className="wrapper">
          <div>{error}</div>
        </div>
      )}
    </>
  );
};

export default AppError;
