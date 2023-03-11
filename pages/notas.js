import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

const Notas = () => {

    const cookie = new Cookies();
    const router = useRouter();
    const [notas, setNotas] = useState([]);
    const notaInput = useRef(null); 
    const date = useRef(null);
    const descripcion = useRef(null);
    const realizado = useRef(null);

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

        await fetch("http://localhost/APISGI/api/notas.php", {
            method: "POST",
            body: JSON.stringify(nota)
        });

        alert("Nota agregada");

        fetchData();
    }

    useEffect(() => {

        verifyCookie();
        fetchData();

    }, []);

    return(
        <>
            <Navbar/>
            <div className="mx-auto">
                <h1 className="text-center text-4xl font-bold">Bienvenidos al apartado de notas</h1>
                <div className="flex justify-center my-8">
                    <form onSubmit={handleSubmit} className="border rounded p-3">
                    <h3 className="text-xl font-bold mb-3">Agregar nota</h3>
                    <div className="mb-3">
                        <input
                        type="text"
                        placeholder="id"
                        disabled
                        className="border rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        placeholder="nota"
                        required={true}
                        ref={notaInput}
                        className="border rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="date"
                        required={true}
                        ref={date}
                        className="border rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        placeholder="descripcion"
                        required={true}
                        ref={descripcion}
                        className="border rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <input type="checkbox" ref={realizado} className="form-check-input h-5 w-5 text-gray-600 rounded" />
                        <label htmlFor="realizado" className="ml-2 text-gray-700">Realizado</label>
                    </div>
                    <input type="submit" value="Guardar nota" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700" />
                    </form>
                </div>
                <div className="flex justify-center mt-8">
                    <table className="table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nota</th>
                        <th className="px-4 py-2">Fecha limite</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Realizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map(nota => {
                        return (
                            <tr key={nota.id} className="text-center">
                            <td className="border px-4 py-2">{nota.id}</td>
                            <td className="border px-4 py-2">{nota.nota}</td>
                            <td className="border px-4 py-2">{nota.fecha_limite}</td>
                            <td className="border px-4 py-2">{nota.descripcion}</td>
                            <td className="border px-4 py-2">{nota.realizado === "1" ? "Realizado" : "No realizado"}</td>
                            <td className="border px-4 py-2">
                                <button>Seleccionar</button>
                            </td>
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        </> 
    );

}

export default Notas;