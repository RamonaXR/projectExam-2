import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/img/404.jpg")',
        backgroundSize: "contain",
      }}
    >
      <Helmet>
        <title>404 Not Found | Holidaze</title>
        <meta
          name="description"
          content="The page you are looking for was not found."
        />
      </Helmet>
      <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg text-center max-w-md mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-700 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-button text-white px-6 py-3 rounded-md transition-colors duration-300 hover:bg-gray-500"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
