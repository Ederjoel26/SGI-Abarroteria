import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import Footer from '@/components/Footer'
import NavbarInicio from "@/components/NavbarInicio";

const Registrarse = () => {

    const nombre = useRef(null);
    const email = useRef(null);
    const password = useRef(null); 
    const rePassword = useRef(null);
    const router = useRouter();
    const cookie = new Cookies();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(password.current.value !== rePassword.current.value){
            alert("Las contraseñas no son las mismas");
            return;
        }

        const usuario = {
            nombre: nombre.current.value,
            correo: email.current.value,
            contra: password.current.value
        };

        await fetch("http://localhost/APISGI/api/usuarios.php", {
            method: "POST",
            body: JSON.stringify(usuario),
        });

        alert("Usuario agregado");

        router.push("/")
    }; 

    const verifyCookie = () => {
        if(cookie.get("email"))
            router.push("notas");
    }

    useEffect(() => {

        verifyCookie();

    }, []);

    return(
        <>
        <NavbarInicio/>
        <div className="flex flex-col justify-center items-center h-screen">
            <form className="bg-white rounded shadow-md p-5 text-center max-w-md w-full" onSubmit={handleSubmit}>
                <h1 className="text-lg font-medium mb-3 text-gray-800">Registro Abarrotería SGI</h1>
                <div className="mb-4">
                    <label className="sr-only">Nombre</label>
                    <input type="text" id="inputName" className="block w-full border border-gray-300 rounded py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-t" ref={nombre} required={true} placeholder="Nombre" />
                </div>
                <div className="mb-4">
                    <label className="sr-only">Correo electrónico</label>
                    <input type="email" id="inputEmail" className="block w-full border border-gray-300 rounded py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" ref={email} required={true} placeholder="Correo electrónico" />
                </div>
                <div className="mb-4">
                    <label className="sr-only">Contraseña</label>
                    <input type="password" id="inputPassword" className="block w-full border border-gray-300 rounded py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" ref={password} required={true} placeholder="Contraseña" />
                </div>
                <div className="mb-4">
                    <label className="sr-only">Confirmar contraseña</label>
                    <input type="password" id="inputRePassword" className="block w-full border border-gray-300 rounded py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-b" ref={rePassword} required={true} placeholder="Confirmar contraseña" />
                </div>
                <button className="bg-gray-800 hover:bg-gray-600 text-white font-medium rounded py-2 px-4 w-full" type="submit">Registrarse</button>
            </form>
        </div>
        <Footer/>
        </>
    );
}

export default Registrarse;