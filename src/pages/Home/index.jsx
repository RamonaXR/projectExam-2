import { Link } from "react-router-dom";
import VenueList from "../../components/VenueList";
import Button from "../../components/Button";
import { useAuthStore } from "../../store/authStore";

export default function Home() {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="space-y-10">
      <section className="relative">
        <img
          src="/img/holidazehero2.jpg"
          alt="Hero image"
          className="w-full object-cover h-60 sm:h-80 md:h-96"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Book your next holidaze!
          </h1>
          {!isLoggedIn && (
            <Button
              as={Link}
              to="/register"
              className="px-8 py-3 text-lg hover:bg-gray-500 transition-colors"
            >
              Register
            </Button>
          )}
        </div>
      </section>
      <section>
        <VenueList />
      </section>
    </div>
  );
}
