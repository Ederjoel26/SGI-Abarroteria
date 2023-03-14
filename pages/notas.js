import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Notas = () => {

    const cookie = new Cookies();
    const router = useRouter();
    const [notas, setNotas] = useState([]);
    const id = useRef(null);
    const notaInput = useRef(null); 
    const date = useRef(null);
    const descripcion = useRef(null);
    const realizado = useRef(null);
    const option = useRef(null);

    const fetchData = async () => {
        const data = await fetch("http://localhost/APISGI/api/notas.php");
        const notas = await data.json();
        setNotas(notas);
    };

    const verifyCookie = () => {
        if(!cookie.get("email"))
            router.push("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nota = {
            nota: notaInput.current.value,
            fecha_limite: date.current.value,
            descripcion: descripcion.current.value,
            realizado: realizado.current.checked ? true : "false"
        };

        try{
            switch(option.current.value){
                case "insert":
                    await fetch("http://localhost/APISGI/api/notas.php", {
                    method: "POST",
                    body: JSON.stringify(nota)
                    });
                    alert("Nota guardada");
                    break;
                case "update":
                    await fetch(`http://localhost/APISGI/api/notas.php?id=${id.current.value}`, {
                    method: "POST",
                    body: JSON.stringify(nota),
                    });
                    alert("Nota actualizada");
                    break;
                case "delete":
                    await fetch(`http://localhost/APISGI/api/notas.php?idDelete=${id.current.value}`, {
                    method: "POST",
                    });
                    alert("Nota eliminada");
                    break;
            }
        }catch(ex){
        }
        fetchData();
        handleEmptyData();
    }

    const handleEmptyData = () => {
        id.current.value = "";
        notaInput.current.value = "";
        date.current.value = "";
        descripcion.current.value = "";
        realizado.current.checked = false;
    }

    const handleFillData = (item) => {
        id.current.value = item.id;
        notaInput.current.value = item.nota;
        date.current.value = item.fecha_limite;
        descripcion.current.value = item.descripcion;
        realizado.current.checked = item.realizado === "1" ? true : false;
    }

    useEffect(() => {

        verifyCookie();
        fetchData();

    }, []);

    return(
        <>
            <Navbar/>
            <div className="container mx-auto">
                <h1 className="text-center mt-5 mb-4 text-3xl font-bold">Notas</h1>
                <div className="flex justify-center text-center">
                    <div className="w-full sm:w-1/2">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <input type="text" placeholder="ID" disabled className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={id} />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="nota" required={true} ref={notaInput} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <input type="date" required={true} ref={date} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="descripcion" required={true} ref={descripcion} className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <select name="option" className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={option}>
                                    <option value="insert">Insertar</option>
                                    <option value="update">Actualizar</option>
                                    <option value="delete">Eliminar</option>
                                </select>
                            </div>
                            <div className="mb-4 flex items-center">
                                <input type="checkbox" ref={realizado} className="form-check-input h-5 w-5 text-gray-600 rounded" />
                                <label htmlFor="realizado" className="ml-2 text-gray-700">Realizado</label>
                            </div>
                            <input type="submit" value="Realizar acción" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                        </form>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nota</th>
                            <th className="px-4 py-2">Fecha limite</th>
                            <th className="px-4 py-2">Descripción</th>
                            <th className="px-4 py-2">Realizado</th>
                            <th className="px-4 py-2">
                                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEmptyData}>Deseleccionar</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        notas.map(nota => {
                            return (
                                <tr key={nota.id}>
                                    <td className="border px-4 py-2">{nota.id}</td>
                                    <td className="border px-4 py-2">{nota.nota}</td>
                                    <td className="border px-4 py-2">{nota.fecha_limite}</td>
                                    <td className="border px-4 py-2">{nota.descripcion}</td>
                                    <td className="border px-4 py-2">{nota.realizado === "1" ? "Realizado" : "No realizado"}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleFillData(nota)}>Seleccionar</button>
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

export default Notas;