import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF4EE] px-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-8xl font-bold text-[#F36C45]">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[#F36C45] text-white rounded-lg hover:bg-[#e05a33] transition-colors"
        >
          ← Back to Home
        </Link>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} Ooshas Prep
        </p>
      </div>
    </div>
  );
}