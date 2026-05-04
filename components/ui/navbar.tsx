import { Cat } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="  -mb-16.25">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <Cat />
          <a className="text-lg sm:text-2xl tracking-wide font-bold ml-2">
            Cleo
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>

            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href={"/login"} className="btn btn-sm">
            Login
          </Link>
          <Link href={"/signup"} className="btn btn-sm btn-ghost">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
