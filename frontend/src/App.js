import React, { useState } from 'react';
import { productos } from './api/productos';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modoOscuro, setModoOscuro] = useState(false); // Estado para manejar el modo oscuro

  // Función para alternar entre modo oscuro y claro
  const alternarModoOscuro = () => {
    setModoOscuro(!modoOscuro);
    document.body.classList.toggle('modo-oscuro', !modoOscuro); // Agregar o quitar clase al body
  };

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className={`container ${modoOscuro ? 'modo-oscuro' : ''}`}>
      <header className="text-center py-4" role="banner">
        <h1 id="main-title">Golden Shoes</h1>
      </header>

      <main role="main" aria-labelledby="main-title">
        {/* Campo de búsqueda */}
        <section id="busqueda" className="my-4" aria-label="Buscar productos">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar productos"
          />
        </section>

        {/* Lista de productos */}
        <section id="productos" aria-label="Lista de productos">
          <h2 className="text-center">Nuestros Productos</h2>
          {productosFiltrados.length > 0 ? (
            <div className="row" role="list">
              {productosFiltrados.map((producto) => (
                <div className="col-md-4 mb-4" key={producto.id} role="listitem">
                  <div className="card">
                    <img
                      src={producto.imagen}
                      alt={`Imagen de ${producto.nombre}`}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text">{producto.descripcion}</p>
                      <p className="card-text text-success">${producto.precio}</p>
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => setCarrito([...carrito, producto])}
                        aria-label={`Agregar ${producto.nombre} al carrito`}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No se encontraron productos.</p>
          )}
        </section>

        {/* Carrito de compras */}
        <section id="carrito" className="mt-5" aria-label="Carrito de compras">
          <h2 className="text-center">Carrito de Compras</h2>
          {carrito.length > 0 ? (
            <div>
              {carrito.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center border p-2 mb-2"
                  role="listitem"
                  aria-label={`Producto ${item.nombre} en el carrito`}
                >
                  <p className="mb-0">
                    {item.nombre} - ${item.precio}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      setCarrito(carrito.filter((_, i) => i !== index))
                    }
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <p className="mt-3 text-center">
                <strong>Total:</strong> $
                {carrito.reduce((total, item) => total + item.precio, 0)}
              </p>
            </div>
          ) : (
            <p className="text-center">El carrito está vacío.</p>
          )}
        </section>
      </main>

      {/* Botón de Modo Oscuro */}
      <footer className="text-center mt-5">
        <button
          className="btn btn-secondary"
          onClick={alternarModoOscuro}
          aria-label={`Activar ${modoOscuro ? 'modo claro' : 'modo oscuro'}`}
        >
          {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </footer>
    </div>
  );
}

export default App;
