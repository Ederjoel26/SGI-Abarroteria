import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Productos = () => {

    const cookie = new Cookies();
    const router = useRouter();
    const [productos, setProductos] = useState([]);
    const id = useRef(null);
    const producto = useRef(null);
    const cantidad = useRef(null);
    const proveedor = useRef(null);
    const costoUnitario = useRef(null);
    const option = useRef(null);

    const fetchData = async () => {
        const data = await fetch("http://localhost/APISGI/api/productos.php");
        const notas = await data.json();
        setProductos(notas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productoEnviar = {
            producto: producto.current.value,
            cantidad: parseInt(cantidad.current.value),
            proveedor: parseInt(proveedor.current.value),
            costo_unitario: parseInt(costoUnitario.current.value)
        }

        try{
            switch(option.current.value){
                case "insert":
                    await fetch("http://localhost/APISGI/api/productos.php", {
                    method: "POST",
                    body: JSON.stringify(productoEnviar)
                    });
                    alert("Producto guardado");
                    break;
                case "update":
                    await fetch(`http://localhost/APISGI/api/productos.php?id=${id.current.value}`, {
                    method: "POST",
                    body: JSON.stringify(productoEnviar),
                    });
                    alert("Producto actualizado");
                    break;
                case "delete":
                    await fetch(`http://localhost/APISGI/api/productos.php?idDelete=${id.current.value}`, {
                    method: "POST",
                    });
                    alert("Producto eliminado");
                    break;
            }
        }catch(ex){
        }
        fetchData();
        handleEmptyData();
    };
    
    const handleEmptyData = () => {
        id.current.value = "";
        producto.current.value = "";
        cantidad.current.value = "";
        proveedor.current.value = "";
        costoUnitario.current.value = "";
    }

    const handleFillData = (item) => {
        id.current.value = item.id;
        producto.current.value = item.producto;
        cantidad.current.value = item.cantidad;
        proveedor.current.value = item.proveedor;
        costoUnitario.current.value = item.costo_unitario;
    }

    const verifyCookie = () => {
        if(!cookie.get("email"))
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
                <h1 className="text-center mt-5 mb-4 text-3xl font-bold">Productos</h1>
                <div className="flex justify-center text-center">
                    <div className="w-full sm:w-1/2">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="ID" disabled ref={id}></input>
                            </div>
                            <div className="mb-4">
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Producto" required={true} ref={producto}/>
                            </div>
                            <div className="mb-4">
                                <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Cantidad" required={true} ref={cantidad}/>
                            </div>
                            <div className="mb-4">
                                <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Proveedor" required={true} ref={proveedor}/>
                            </div>
                            <div className="mb-4">
                                <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Costo unitario" required={true} ref={costoUnitario}/>
                            </div>
                            <div className="mb-4">
                                <select name="option" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={option}>
                                    <option value="insert">Insertar</option>
                                    <option value="update">Actualizar</option>
                                    <option value="delete">Eliminar</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Realizar acción</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                                <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Producto</th>
                                <th className="px-4 py-2">Cantidad</th>
                                <th className="px-4 py-2">Proveedor</th>
                                <th className="px-4 py-2">Costo unitario</th>
                                <th className="px-4 py-2">
                                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEmptyData()}>Deseleccionar</button>
                                </th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                        productos.map(producto => {
                            return(
                            <tr key={producto.id}>
                                <td className="border px-4 py-2">{producto.id}</td>
                                <td className="border px-4 py-2">{producto.producto}</td>
                                <td className="border px-4 py-2">{producto.cantidad}</td>
                                <td className="border px-4 py-2">{producto.proveedor}</td>
                                <td className="border px-4 py-2">{producto.costo_unitario}</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleFillData(producto)}>Seleccionar</button>
                                </td>
                            </tr>
                            );
                        })
                        }
                    </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Productos;