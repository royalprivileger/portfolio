
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-center text-sm py-4">
      <p>
        Designed & Developed by <span className="font-semibold text-gray-700 dark:text-white">Shivendra Sharma</span> | © {year}
      </p>
    </footer>
  );
}
