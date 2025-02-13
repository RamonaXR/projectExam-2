import { Link } from "react-router-dom";
import VenueList from "../../components/VenueList";

export default function Home() {
  return (
    <main className="space-y-10">
      {/* Hero Section */}
      <section className="relative">
        <img
          src="/img/heroholidaze.jpg"
          alt="Hero image"
          className="w-full object-cover h-60 sm:h-80 md:h-96"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Book your next holidaze!
          </h1>
          <Link
            to="/register"
            className="bg-button text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </section>
      <section>
        <VenueList />
      </section>
    </main>
  );
}
