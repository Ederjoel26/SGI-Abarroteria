import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

const Proveedores = () => {

    const cookie = new Cookies();
    const router = useRouter();
    const [proveedores, setProveedores] = useState([]);
    const proveedor = useRef(null);
    const nombre = useRef(null);
    const producto = useRef(null);
    const precioUnitario = useRef(null);
    const costoUnitario = useRef(null);
    const numeroTelefonico = useRef(null);
    const id = useRef(null);
    const option = useRef(null);

    const fetchData = async () => {
        const data = await fetch("http://localhost/APISGI/api/proveedores.php");
        const notas = await data.json();
        setProveedores(notas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const proveedorEnviar = {
            proveedor: proveedor.current.value,
            nombre: nombre.current.value,
            producto: producto.current.value,
            precio_unitario: parseInt(precioUnitario.current.value),
            costo_unitario: parseInt(costoUnitario.current.value),
            numero_telefonico: numeroTelefonico.current.value
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
                case "delete":
                    await fetch(`http://localhost/APISGI/api/proveedores.php?idDelete=${id.current.value}`, {
                    method: "POST",
                    });
                    alert("Proveedor eliminado");
                    break;
            }
        }catch(ex){
        }
        fetchData();
        handleEmptyData();
    }

    const handleEmptyData = async () => {
        id.current.value = "";
        nombre.current.value = "";
        proveedor.current.value = "";
        producto.current.value = "";
        precioUnitario.current.value = "";
        costoUnitario.current.value = "";
        numeroTelefonico.current.value = "";
    }

    const handleFillData = async (aux) => {
        id.current.value = aux.id;
        nombre.current.value = aux.nombre;
        proveedor.current.value = aux.proveedor;
        producto.current.value = aux.producto;
        precioUnitario.current.value = aux.precio_unitario;
        costoUnitario.current.value = aux.costo_unitario;
        numeroTelefonico.current.value = aux.numero_telefonico;
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
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Proveedor" required={true} ref={proveedor} />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre" required={true} ref={nombre} />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Producto" required={true} ref={producto} />
                        </div>
                        <div className="mb-4">
                            <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Precio unitario" required={true} ref={precioUnitario} />
                        </div>
                        <div className="mb-4">
                            <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Costo unitario" required={true} ref={costoUnitario} />
                        </div>
                        <div className="mb-4">
                            <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Numero telefonico" required={true} ref={numeroTelefonico} />
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
                            <th className="px-4 py-2">Proveedor</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Producto</th>
                            <th className="px-4 py-2">Precio unitario</th>
                            <th className="px-4 py-2">Costo unitario</th>
                            <th className="px-4 py-2">Numero telefonico</th>
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
                                <td className="border px-4 py-2">{proveedor.proveedor}</td>
                                <td className="border px-4 py-2">{proveedor.nombre}</td>
                                <td className="border px-4 py-2">{proveedor.producto}</td>
                                <td className="border px-4 py-2">{proveedor.precio_unitario}</td>
                                <td className="border px-4 py-2">{proveedor.costo_unitario}</td>
                                <td className="border px-4 py-2">{proveedor.numero_telefonico}</td>
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