import VenueList from "../../components/VenueList";

export default function Home() {
  return (
    <main className="p-6 space-y-8">
      <section className="text-center">
        <h1 className="text-2xl font-bold">Search for Venue</h1>
        <p className="text-gray-600">
          Find the perfect venue for your next Holidaze!
        </p>
      </section>

      {/* Venue List */}
      <VenueList />
    </main>
  );
}
