import { Helmet } from "react-helmet-async";
import {
  FaInstagram,
  FaLeaf,
  FaAward,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

/**
 * Contact component renders the contact page for Holidaze.
 *
 * This component displays the contact information including phone number, address, email, and social media links.
 * It also showcases some highlighted messages with icons, a grid of vacation photos, and uses Helmet to set the page title
 * and meta description for SEO purposes.
 *
 * @component
 * @returns {JSX.Element} The rendered Contact page.
 *
 * @example
 * <Contact />
 */
export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Holidaze</title>
        <meta
          name="description"
          content="Contact Holidaze for support, inquiries, or more information about our eco-friendly and award-winning travel platform."
        />
      </Helmet>
      <div className="space-y-10 px-4 py-8 max-w-screen-lg mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

        <div className="space-y-8">
          <div className="flex flex-col items-center gap-2">
            <FaLeaf className="text-green-600 text-4xl" />
            <h2 className="text-2xl font-semibold">
              Your property is safe with us
            </h2>
            <p className="text-gray-700 max-w-md">
              We take sustainability and safety seriously. Our venues meet
              rigorous environmental standards, ensuring your stay is not only
              comfortable but also eco-friendly.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaAward className="text-yellow-500 text-4xl" />
            <h2 className="text-2xl font-semibold">Voted Best Travel Page</h2>
            <p className="text-gray-700 max-w-md">
              Holidaze is proud to be voted the best travel platform by our
              community. Book your next vacation with us for top-rated
              experiences and unforgettable memories.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-gray-800">
          <div className="flex items-center justify-center gap-3">
            <FaPhone className="text-2xl" />
            <span className="text-lg font-medium">+47 11111111</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaMapMarkerAlt className="text-2xl" />
            <span className="text-lg font-medium">Oslo street 1, Oslo</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaEnvelope className="text-2xl" />
            <span className="text-lg font-medium">support@holidaze.com</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-button font-bold">#Holidaze</h2>
          <p className="text-gray-700">
            Holidaze loves seeing your vacation memories. Connect, share, and be
            part of our journey!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <img
              key={num}
              src={`/img/contact-${num}.jpg`}
              alt={`Vacation photos ${num}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <FaInstagram className="text-2xl text-pink-600" />
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-pink-600 hover:underline"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </>
  );
}
