import Navbar from "@/components/Navbar";
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
                         method: "PUT",
                    body: JSON.stringify(proveedorEnviar),
                    });
                    alert("Proveedor actualizado");
                case "delete":
                    await fetch(`http://localhost/APISGI/api/proveedores.php?id=${id.current.value}`, {
                    method: "DELETE",
                    });
                    alert("Proveedor eliminado");
                    break;
            }
        }catch(ex){
        }
        fetchData();
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
            <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Bienvenidos al apartado de Proveedores</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4">Agregar proveedor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <input type="text" className="border rounded-lg py-2 px-3 w-full" disabled placeholder="ID" ref={id}></input>
                    </div>
                    <div className="mb-4">
                        <input type="text" className="border rounded-lg py-2 px-3 w-full" placeholder="Proveedor" required={true} ref={proveedor} />
                    </div>
                    <div className="mb-4">
                        <input type="text" className="border rounded-lg py-2 px-3 w-full" placeholder="Nombre" required={true} ref={nombre} />
                    </div>
                    <div className="mb-4">
                        <input type="text" className="border rounded-lg py-2 px-3 w-full" placeholder="Producto" required={true} ref={producto} />
                    </div>
                    <div className="mb-4">
                        <input type="number" className="border rounded-lg py-2 px-3 w-full" placeholder="Precio unitario" required={true} ref={precioUnitario} />
                    </div>
                    <div className="mb-4">
                        <input type="number" className="border rounded-lg py-2 px-3 w-full" placeholder="Costo unitario" required={true} ref={costoUnitario} />
                    </div>
                    <div className="mb-4">
                        <input type="number" className="border rounded-lg py-2 px-3 w-full" placeholder="Numero telefonico" required={true} ref={numeroTelefonico} />
                    </div>
                    <div className="mb-4">
                        <select name="option" className="border rounded-lg py-2 px-3 w-full" ref={option}>
                            <option value="insert">Insertar</option>
                            <option value="update">Actualizar</option>
                            <option value="delete">Eliminar</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded-lg mt-3 hover:bg-gray-700">Realizar acción</button>
            </form>
            <table className="table-auto mt-5 mx-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Proveedor</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Producto</th>
                        <th className="px-4 py-2">Precio unitario</th>
                        <th className="px-4 py-2">Costo unitario</th>
                        <th className="px-4 py-2">Numero telefonico</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(proveedor => (
                        <tr key={proveedor.id}>
                            <td className="border px-4 py-2">{proveedor.id}</td>
                            <td className="border px-4 py-2">{proveedor.proveedor}</td>
                            <td className="border px-4 py-2">{proveedor.nombre}</td>
                            <td className="border px-4 py-2">{proveedor.producto}</td>
                            <td className="border px-4 py-2">{proveedor.precio_unitario}</td>
                            <td className="border px-4 py-2">{proveedor.costo_unitario}</td>
                            <td className="border px-4 py-2">{proveedor.numero_telefonico}</td>
                            <td className="border px-4 py-2"> 
                                <button onClick={() => handleFillData(proveedor)}>Seleccionar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Proveedores;