import Cookies from "universal-cookie";
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import NavbarInicio from "@/components/NavbarInicio";

const Home = () => {

  const email = useRef(null);
  const password = useRef(null);
  const router = useRouter();
  const cookie = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost/APISGI/api/usuarios.php?correo=${email.current.value}`);
    const usuario = await response.json();

    if(email.current.value !== usuario.correo){
      alert("El correo es incorrecto");
      return;
    }

    if(password.current.value !== usuario.contra){
      alert("La contraseña es incorrecta");
      return;
    }

    cookie.set("email", usuario.correo);

    router.push("proveedores");
  };
  
  const verifyCookie = () => {
    if(cookie.get("email")) 
      router.push("proveedores");
  };

  useEffect(() => {

    verifyCookie();

  }, []);

  return (
    <>
    <NavbarInicio/>
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 text-center" onSubmit={handleSubmit}>
        <h1 className="text-lg font-medium mb-3 text-gray-700">Iniciar Sesión SGI Abarrotería</h1>
        <div className="mb-4">
          <label className="sr-only">Correo electrónico</label>
          <input
            type="email"
            id="inputEmail"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            ref={email}
            required={true}
            placeholder="Correo electrónico"
            name="email"
          />
        </div>
        <div className="mb-4">
          <label className="sr-only" >Contraseña</label>
          <input
            type="password"
            id="inputPassword"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            ref={password}
            required={true}
            placeholder="Contraseña"
            name="password"
          />
        </div>
        <button className="bg-gray-800 hover:bg-gray-600 text-white rounded-lg py-2 px-4 w-full mb-4" type="submit">Ingresar</button>
        <div className="text-gray-700 text-sm">
          <a href="registro" className="underline">¿No tienes una cuenta? Regístrate aquí</a>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  )
}

export default Home;