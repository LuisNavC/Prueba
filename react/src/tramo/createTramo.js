import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const URI = 'http://localhost:8000/tramos/';

const CompCreateTramo = () => {

    const [Linea, setLinea] = useState('');
    const [Fecha, setFecha] = useState('');
    const [Residencial, setResidencial] = useState('');
    const [Comercial, setComercial] = useState('');
    const [Industrial, setIndustrial] = useState('');
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {Linea:Linea, Fecha:Fecha, Residencial:Residencial, Comercial:Comercial, Industrial:Industrial});
        navigate('/');
    }

    return (
        <div className='container'>
            <h3>Crear</h3>

            <form onSubmit={store}>
                <div className='mb-4'>
                    <label className='form-label'>Linea</label>
                    <input
                        value={Linea}
                        onChange={ (e)=> setLinea(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-4'>
                    <label className='form-label'>Fecha</label>
                    <input
                        value={Fecha}
                        onChange={ (e)=> setFecha(e.target.value)}
                        type="date"
                        className='form-control'
                    />
                </div>
                <div className='mb-4'>
                    <label className='form-label'>Residencial</label>
                    <input
                        value={Residencial}
                        onChange={ (e)=> setResidencial(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-4'>
                    <label className='form-label'>Comercial</label>
                    <input
                        value={Comercial}
                        onChange={ (e)=> setComercial(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-4'>
                    <label className='form-label'>Industrial</label>
                    <input
                        value={Industrial}
                        onChange={ (e)=> setIndustrial(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    )
}

export default CompCreateTramo;