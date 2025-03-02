export default function Footer() {
  return (
    <footer className="bg-gray-900 shadow">
      <div className="container mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img
              src="/logoholidaze.svg"
              className="h-8 mr-3"
              alt="Holidaze Logo"
            />
          </a>
          <nav>
            <ul className="flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0">
              <li>
                <a href="/" className="mr-4 hover:underline md:mr-6">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center ">
          Holidaze 2025 &copy; Ramona Jensen. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
