import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

/**
 * Layout component provides the main structure for the application.
 *
 * It includes a Header at the top, a Footer at the bottom, and an Outlet in the middle
 * where nested routes will be rendered.
 *
 * @component
 * @returns {JSX.Element} The layout component wrapping header, outlet, and footer.
 */
export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
