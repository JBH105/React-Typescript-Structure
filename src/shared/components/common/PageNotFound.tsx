import not_found from '@assets/images/404_not_found.png';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center ">
      <div className="not-found-image-container animate-pulse">
        <img src={not_found} alt="Page Not Found" className="not-found-image" />
      </div>
      <h1 className="not-found-title">Oops! Page Not Found</h1>
      <p className="not-found-description">
        The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <a href="/" className="not-found-button">
        Go Back Home
      </a>
    </div>
  );
};

export default PageNotFound;