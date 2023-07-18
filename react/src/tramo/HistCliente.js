import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useNavigate, useSearchParams } from 'react-router-dom';
import { BarChart, Bar,LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

const URI = 'http://localhost:8000/tramos/clientes';

const ComptHistCliente = () => {
    const [consuHistClient, setConsuHistClient] = useState([]);

    const [searchParams] = useSearchParams();
    const inicio = searchParams.get("inicio");
    const fin = searchParams.get("fin");
    
    useEffect(() => {
    
        axios.get(URI, {
            params: {
            inicio,
            fin
            }
        }).then(res => {
            setConsuHistClient(res.data);
            console.log(res.data);
        }).catch(err => {
            console.error(err);
        });
    }, [inicio, fin]);
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Linea',
                accessor: 'Linea',
            },
            {
                Header: 'consumo_residencial',
                accessor: 'consumo_residencial',
            },
            {
                Header: 'consumo_comercial',
                accessor: 'consumo_comercial',
            },
            {
                Header: 'consumo_industrial',
                accessor: 'consumo_industrial',
            },
            {
                Header: 'perdidas_residencial',
                accessor: 'perdidas_residencial',
            },
            {
                Header: 'perdidas_comercial',
                accessor: 'perdidas_comercial',
            },
            {
                Header: 'perdidas_industrial',
                accessor: 'perdidas_industrial',
            },
            {
                Header: 'costo_residencial',
                accessor: 'costo_residencial',
            },
            {
                Header: 'costo_comercial',
                accessor: 'costo_comercial',
            },
            {
                Header: 'costo_industrial',
                accessor: 'costo_industrial',
            }
        ],
        []
    );
        
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageIndex,
        pageSize,
    } = useTable(
        {
        columns,
        data: consuHistClient,
        initialState: {pageIndex:0}
        },
        useFilters,
        useSortBy,
        usePagination
    );
    
    
    return(
        <>
        <div className='container'>
            <h1>Historial Cliente</h1>
            <hr></hr>
            <div className='row'>
                <div className='col'>
                    <LineChart width={500} height={300} data={consuHistClient}>
                        <XAxis dataKey="Linea" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="consumo_residencial" stroke="#8884d8" />
                        <Line type="monotone" dataKey="consumo_comercial" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="consumo_industrial" stroke="#ff0000" />
                    </LineChart>
                </div>
                <div className='col'>
                    <BarChart width={500} height={300} data={consuHistClient}>
                        <XAxis dataKey="Linea" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Bar dataKey="consumo_residencial" fill="#8884d8" />
                        <Bar dataKey="consumo_comercial" fill="#82ca9d" />
                        <Bar dataKey="consumo_industrial" fill="#ff0000" />
                    </BarChart>
                </div>
            </div>
            <hr></hr>
            <div className='row' style={{overflowX: 'auto'}}>
                <table {...getTableProps()} className="table">
                    <thead className="table-primary">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                <div>
                                    <input
                                    className='form-control'
                                    value={column.filterValue || ''}
                                    onChange={e => {
                                    column.setFilter(e.target.value || undefined);
                                    }} />
                                </div>
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.original.Linea}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className='btn btn-primary' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    <button className='btn btn-primary' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    <button className='btn btn-primary' onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    <button className='btn btn-primary' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                    <span>
                    Página{' '}
                    <strong>
                    {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                    </span>
                    <span>
                        | Ir a página:{' '}
                        <input
                        type="number"
                        min="1"
                        max={pageOptions.length}
                        value={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                        />
                    </span>
                    <select
                    value={pageSize}
                    onChange={e => {
                    setPageSize(Number(e.target.value))
                    }}
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                    </option>
                    ))}
                    </select>
                </div>
            </div>
        </div>
        </>
    )
    }

export default ComptHistCliente;
