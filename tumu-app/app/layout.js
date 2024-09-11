
import "./globals.css";
export const metadata = {
  title: 'Next.js E-commerce',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Tumu</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
                </li>
                <li>
                  <a href="/products" className="text-gray-700 hover:text-gray-900">Products</a>
                </li>
                <li>
                  <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto flex-1 mt-8 p-4">{children}</main>
      </body>
    </html>
  );
}
