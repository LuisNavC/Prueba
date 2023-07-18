import React, {Suspense, lazy} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const CompShowTramos = lazy(() => import('./tramo/showTramo'));
const CompCreateTramo = lazy(() => import('./tramo/createTramo'));
const ComptEditTramos = lazy(() => import('./tramo/editTramo'));
const ComptHistTramos = lazy(() => import('./tramo/HistTramos'));
const ComptHistCliente = lazy(() => import('./tramo/HistCliente'));
const ComptTramosCliente = lazy(() => import('./tramo/TramosCliente'));

function App() {
  return (
    <Suspense fallback={
      <nav className="navbar navbar-dark bg-primary">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          Cargando...
        </button>
      </nav>
    }>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <CompShowTramos />} />
            <Route path='/create' element={ <CompCreateTramo />} />
            <Route path='/edit/:id' element={ <ComptEditTramos />} />
            <Route path='/tram' element={ <ComptHistTramos />} />
            <Route path='/clientes' element={ <ComptHistCliente />} />
            <Route path='/tramos-cliente' element={ <ComptTramosCliente />} />
          </Routes>
        </BrowserRouter>
      
    </div>
    </Suspense>
  );
}

export default App;
