import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = pathnames.map((_, index, arr) => {
    const href = `/${arr.slice(0, index + 1).join("/")}`;
    return {
      label: arr[index],
      path: href,
    };
  });

  return (
    <ol className="flex items-center space-x-2 whitespace-nowrap p-4">
      <li className="inline-flex items-center">
        <Link
          className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
          to="/"
        >
          Home
        </Link>
        <svg
          className="shrink-0 mx-2 text-gray-400 dark:text-neutral-600"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </li>
      {breadcrumbs.map((breadcrumb, index) => (
        <li key={breadcrumb.path} className="inline-flex items-center">
          {index < breadcrumbs.length - 1 ? (
            <>
              <Link
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                to={breadcrumb.path}
              >
                {breadcrumb.label}
              </Link>
              <svg
                className="shrink-0 mx-2 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </>
          ) : (
            <span className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200">
              {breadcrumb.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumbs;
