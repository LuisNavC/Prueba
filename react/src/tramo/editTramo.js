import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const URI = 'http://localhost:8000/tramos/';

const ComptEditTramos = () => {
    
    const [Linea, setLinea] = useState('');
    const [Fecha, setFecha] = useState('');
    const [Residencial, setResidencial] = useState('');
    const [Comercial, setComercial] = useState('');
    const [Industrial, setIndustrial] = useState('');
    const navigate = useNavigate();

    const {id} = useParams();

    const update = async (e) => {
        await  axios.put(URI+id, {
            Linea:Linea,
            Fecha:Fecha,
            Residencial:Residencial,
            Comercial:Comercial,
            Industrial:Industrial
        });
        navigate('/');
    }

    useEffect( ()=>{
        getTramoById()
    },[]);

    const getTramoById = async () => {
        const res = await axios.get(URI+id);
        setLinea(res.data.Linea);
        setFecha(res.data.Fecha);
        setResidencial(res.data.Residencial);
        setComercial(res.data.Comercial);
        setIndustrial(res.data.Industrial);
    }

    return (
        <div className='container'>
            <h3>Editar</h3>

            <form onSubmit={update}>
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

export default ComptEditTramos;