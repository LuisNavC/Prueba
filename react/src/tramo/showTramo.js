import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:8000/tramos/';

const CompShowTramos = () => {
    
    const [tramo, setTramo] = useState([])
    useEffect( () => {
        getTramo();
    }, []);

    const getTramo = async () => {
        const res = await axios.get(URI);
        setTramo(res.data);
    }

    const deleteTramo = async (id) => {
        await axios.delete(`${URI}${id}`);
        getTramo();
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 25;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = tramo.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tramo.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const changeCPage = (id) => {
        setCurrentPage(id);
    }

    const prePage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if(currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }
    
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <form action="/tram" method="get" className="form-inline">
                        <div className="form-group mt-2">
                            <label for="inicio" className="mr-1">Fecha de inicio:</label>
                            <input type="date" id="inicio" name="inicio" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label for="fin" className="mr-1">Fecha de fin:</label>
                            <input type="date" id="fin" name="fin" className="form-control" required />
                        </div>
                        <div className='mt-2'>
                            <button type="submit" className="btn btn-primary">Historial Tramos</button>
                        </div>
                    </form>
                </div>
                <div className='col'>
                    <form action="/clientes" method="get" className="form-inline">
                        <div className="form-group mt-2">
                            <label for="inicio" className="mr-1">Fecha de inicio:</label>
                            <input type="date" id="inicio" name="inicio" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label for="fin" className="mr-1">Fecha de fin:</label>
                            <input type="date" id="fin" name="fin" className="form-control" required />
                        </div>
                        <div className='mt-2'>
                            <button type="submit" className="btn btn-primary">Historial Clientes</button>
                        </div>
                    </form>
                </div>
                <div className='col'>
                    <form action="/tramos-cliente" method="get" className="form-inline">
                        <div className="form-group mt-2">
                            <label for="inicio" className="mr-1">Fecha de inicio:</label>
                            <input type="date" id="inicio" name="inicio" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label for="fin" className="mr-1">Fecha de fin:</label>
                            <input type="date" id="fin" name="fin" className="form-control" required />
                        </div>
                        <div className='mt-2'>
                            <button type="submit" className="btn btn-primary">Tramos Clientes</button>
                        </div>
                    </form>
                </div>
            </div>
            <hr></hr>
                
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    Tabla consumo_tramo
                </div>
                <div className='card-body'>
                    <div className='col'>
                        <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className='fas fa-plus'></i></Link>
                        <table className='table'>
                            <thead className='table-primary'>
                                <tr>
                                    <th>Linea</th>
                                    <th>Fecha</th>
                                    <th>Residencial</th>
                                    <th>Comercial</th>
                                    <th>Industrial</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map ( (tram) => (
                                    <tr key={tram.id}>
                                        <td>{tram.Linea}</td>
                                        <td>{tram.Fecha}</td>
                                        <td>{tram.Residencial}</td>
                                        <td>{tram.Comercial}</td>
                                        <td>{tram.Industrial}</td>
                                        <td>
                                            <Link to={`/edit/${tram.id}`} className='btn btn-info'><i className='fas fa-edit'></i></Link>
                                            <button onClick={ ()=>deleteTramo(tram.id) } className='btn btn-danger'><i className='fas fa-trash-alt'></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            
                        <div className="container-fluid">
                            <div className="scrolling-wrapper row flex-row flex-nowrap ">
                                <nav>
                                    <ul className='pagination'>
                                        <li className='page-item'>
                                            <a href='#' className='page-link' onClick={prePage}>Prev</a>
                                        </li>
                                        {
                                            numbers.map((n, i) => (
                                                <li className={`page-item ${currentPage === n ?'active' : ''}`} key={i}>
                                                    <a href='#' className='page-link' onClick={ ()=> changeCPage(n) } >{n}</a>
                                                </li>
                                            ))
                                        }
                                        <li className='page-item'>
                                            <a href='#' className='page-link' onClick={nextPage}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                            
                            
                    </div>
                </div>
                    
            </div>
                

        </div>
    )
}

export default CompShowTramos;