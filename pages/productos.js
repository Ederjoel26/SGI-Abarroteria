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
    const nombre = useRef(null);
    const descripcion = useRef(null);
    const codigoBarras = useRef(null);
    const sku = useRef(null);
    const precio = useRef(null);
    const cantidadStock = useRef(null);
    const categoria = useRef(null);
    const proveedor = useRef(null);
    const fechaEntrada = useRef(null);
    const option = useRef(null);

    const fetchData = async () => {
        try{
            const data = await fetch("http://localhost/APISGI/api/productos.php");
            const productos = await data.json();
            setProductos(productos);
        }catch(error){
            alert("Error al cargar los productos");
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productoEnviar = {
            nombre: nombre.current.value,
            descripcion: descripcion.current.value,
            codigo_barras: codigoBarras.current.value,
            sku : sku.current.value,
            precio: parseFloat(precio.current.value),
            cantidad_stock: parseInt(cantidadStock.current.value),
            categoria: categoria.current.value,
            proveedor: parseInt(proveedor.current.value),
            fecha_entrada: fechaEntrada.current.value
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
            alert("Error al guardar el producto");
            console.log(ex);
        }
        fetchData();
        handleEmptyData();
    };
    
    const handleEmptyData = () => {
        id.current.value = "";
        nombre.current.value = "";
        descripcion.current.value = "";
        codigoBarras.current.value = "";
        sku.current.value = "";
        precio.current.value = "";
        cantidadStock.current.value = "";
        categoria.current.value = "";
        fechaEntrada.current.value = "";
    }

    const handleFillData = (item) => {
        id.current.value = item.id;
        nombre.current.value = item.nombre;
        descripcion.current.value = item.descripcion;
        codigoBarras.current.value = item.codigo_barras;
        sku.current.value = item.sku;
        precio.current.value = item.precio;
        cantidadStock.current.value = item.cantidad_stock;
        categoria.current.value = item.categoria;
        fechaEntrada.current.value = item.fecha_entrada;
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
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre" required={true} ref={nombre}/>
                            </div>
                            <div className="mb-4">
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Descripcion" required={true} ref={descripcion}/>
                            </div>
                            <div className="mb-4">
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Codigo de barras" required={true} ref={codigoBarras}/>
                            </div>
                            <div className="mb-4">
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Sku" required={true} ref={sku}/>
                            </div>
                            <div className="mb-4">
                                <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Precio" required={true} ref={precio}/>
                            </div>
                            <div className="mb-4">
                                <input type="number" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Cantidad en stock" required={true} ref={cantidadStock}/>
                            </div>
                            <div className="mb-4">
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Categoria" required={true} ref={categoria}/>
                            </div>
                            <div className="mb-4">
                                <input type="text" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Proveedor" required={true} ref={proveedor}/>
                            </div>
                            <div className="mb-4">
                                <input type="date" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={true} ref={fechaEntrada}/>
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
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Descripcion</th>
                                <th className="px-4 py-2">Codigo de barras</th>
                                <th className="px-4 py-2">Sku</th>
                                <th className="px-4 py-2">Precio</th>
                                <th className="px-4 py-2">Cantidad en stock</th>
                                <th className="px-4 py-2">Categoria</th>
                                <th className="px-4 py-2">Proveedor</th>
                                <th className="px-4 py-2">Fecha de entrada</th>
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
                                <td className="border px-4 py-2">{producto.nombre}</td>
                                <td className="border px-4 py-2">{producto.descripcion}</td>
                                <td className="border px-4 py-2">{producto.codigo_barras}</td>
                                <td className="border px-4 py-2">{producto.sku}</td>
                                <td className="border px-4 py-2">{producto.precio}</td>
                                <td className="border px-4 py-2">{producto.cantidad_stock}</td>
                                <td className="border px-4 py-2">{producto.categoria}</td>
                                <td className="border px-4 py-2">{producto.proveedor_nombre}</td>
                                <td className="border px-4 py-2">{producto.fecha_entrada}</td>
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