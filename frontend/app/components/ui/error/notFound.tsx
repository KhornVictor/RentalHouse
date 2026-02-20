import Link from "next/link";

export default function NotFound({backButtonVisible = false, text}: {backButtonVisible?: boolean, text?: string}) {
  return (
    <div className="w-full h-screen flex flex-col bg-white items-center justify-center">
      {backButtonVisible && (
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full text-gray-800 hover:bg-gray-900/10 transition duration-300 hover:scale-105 z-10"
        >
          <svg
            className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </Link>
      )}
      <h1 className="text-4xl font-bold text-gray-500">{text || "404 - Page Not Found"}</h1>
      <img
        src="https://cdn.dribbble.com/userupload/20420676/file/original-aac8f7f838812fa53cd92617fad5f892.gif"
        alt="Not Found"
        className="mt-4"
      />
    </div>
  );
}
