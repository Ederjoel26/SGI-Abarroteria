import { useState } from "react";
import Link from "next/link";

const NavbarInicio = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl text-white font-bold">
                        SGI-Abarroteria
                    </Link>

                    <button
                        className="block sm:hidden text-gray-500 hover:text-white focus:text-white focus:outline-none"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <svg
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <title>Mobile menu</title>
                        {navbarOpen ? (
                            <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18v-2H3Z"
                            />
                        ) : (
                            <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"
                            />
                        )}
                        </svg>
                    </button>

                    <div className="hidden sm:flex">
                        <Link
                        href="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                        Iniciar Sesión
                        </Link>
                        <Link
                        href="registro"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                        Registrarse
                        </Link>
                    </div>
                </div>
            </div>

            {navbarOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                        href="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                        Iniciar Sesión
                        </Link>
                        <Link
                        href="registro"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                        Registrarse
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavbarInicio;