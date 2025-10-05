import { Link } from "react-router";

function Navbar() {
  return (
    <header className="flex w-full items-center justify-between bg-indigo-500 px-8 py-4 text-gray-50">
      <div className="grid gap-0.5">
        <h1 className="text-lg font-bold">Camilo Micheletto</h1>
        <p>camili.silva@gmail.com</p>
      </div>
      <nav>
        <ul className="aline-items-center flex gap-x-4 text-base font-bold">
          <li>
            <Link to="/" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">
              Registrar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Navbar };
