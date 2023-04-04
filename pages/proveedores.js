import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

const Proveedores = () => {

    const cookie = new Cookies();
    const router = useRouter();
    const [proveedores, setProveedores] = useState([]);
    const nombre = useRef(null);
    const direccion = useRef(null);
    const correoElectronico = useRef(null);
    const nombrePersonaContacto = useRef(null);
    const cuentaBancaria = useRef(null);
    const id = useRef(null);
    const option = useRef(null);

    const fetchData = async () => {
        try{
            const data = await fetch("http://localhost/APISGI/api/proveedores.php");
            const notas = await data.json();
            setProveedores(notas);
        }catch(error){
            alert("Error al cargar los proveedores")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const proveedorEnviar = {
            nombre: nombre.current.value,
            direccion: direccion.current.value,
            correo_electronico: correoElectronico.current.value,
            nombre_persona_contacto: nombrePersonaContacto.current.value,
            cuenta_bancaria: cuentaBancaria.current.value
        };

        try{
            switch(option.current.value){
                case "insert":
                    await fetch("http://localhost/APISGI/api/proveedores.php", {
                    method: "POST",
                    body: JSON.stringify(proveedorEnviar)
                    });
                    alert("Proveedor guardado");
                    break;
                case "update":
                    await fetch(`http://localhost/APISGI/api/proveedores.php?id=${id.current.value}`, {
                         method: "POST",
                    body: JSON.stringify(proveedorEnviar),
                    });
                    alert("Proveedor actualizado");
                    break;
                case "delete":
                    await fetch(`http://localhost/APISGI/api/proveedores.php?idDelete=${id.current.value}`, {
                    method: "POST",
                    });
                    alert("Proveedor eliminado");
                    break;
            }
        }catch(ex){
            alert("Error al guardar el proveedor");
            console.log(ex);
        }
        fetchData();
        handleEmptyData();
    }

    const handleEmptyData = async () => {
        id.current.value = "";
        nombre.current.value = "";
        direccion.current.value = "";
        correoElectronico.current.value = "";
        nombrePersonaContacto.current.value = "";
        cuentaBancaria.current.value = "";
    }

    const handleFillData = async (aux) => {
        id.current.value = aux.id;
        nombre.current.value = aux.nombre;
        direccion.current.value = aux.direccion;
        correoElectronico.current.value = aux.correo_electronico;
        nombrePersonaContacto.current.value = aux.nombre_persona_contacto;
        cuentaBancaria.current.value = aux.cuenta_bancaria;
    }

    const verifyCookie = () => {
        if (!cookie.get("email"))
            router.push("/");
    };

    useEffect(() => {

        verifyCookie();
        fetchData();

    }, []);

    return(
        <>
            <Navbar/>
            <div className="container mx-auto">
            <h1 className="text-center mt-5 mb-4 text-3xl font-bold">Proveedores</h1>
            <div className="flex justify-center text-center">
                <div className="w-full sm:w-1/2">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled placeholder="ID" ref={id}></input>
                        </div>
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre" required={true} ref={nombre} />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Direccion" required={true} ref={direccion} />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Correo electronico" required={true} ref={correoElectronico} />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre de contacto" required={true} ref={nombrePersonaContacto} />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Numero de cuenta bancaria" required={true} ref={cuentaBancaria} />
                        </div>
                        <div className="mb-4">
                            <select name="option" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={option}>
                                <option value="insert">Insertar</option>
                                <option value="update">Actualizar</option>
                                <option value="delete">Eliminar</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Realizar acción</button>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Direccion</th>
                            <th className="px-4 py-2">Correo electronico</th>
                            <th className="px-4 py-2">Nombre de contacto</th>
                            <th className="px-4 py-2">Numero de cuenta bancaria</th>
                            <th className="px-4 py-2">
                                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEmptyData()}>Deseleccionar</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        proveedores.map(proveedor => (
                            <tr key={proveedor.id}>
                                <td className="border px-4 py-2">{proveedor.id}</td>
                                <td className="border px-4 py-2">{proveedor.nombre}</td>
                                <td className="border px-4 py-2">{proveedor.direccion}</td>
                                <td className="border px-4 py-2">{proveedor.correo_electronico}</td>
                                <td className="border px-4 py-2">{proveedor.nombre_persona_contacto}</td>
                                <td className="border px-4 py-2">{proveedor.cuenta_bancaria}</td>
                                <td className="border px-4 py-2"> 
                                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleFillData(proveedor)}>Seleccionar</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Proveedores;