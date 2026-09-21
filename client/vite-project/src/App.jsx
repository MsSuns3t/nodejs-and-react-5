import { useState, useEffect } from 'react'

import './App.css'

function App() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() =>{
      const controller = new AbortController();

      async function fetchData() {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:3001/api/products', {
            signal: controller.signal
          });

          if(!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          setData(result);
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message)
          }
        } finally {
          setLoading(false);
        }
      }

      fetchData();

      return () => {
        controller.abort();
      };
    }, []);

    if (loading) return <p>loading</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <ul className='productList'>
      {data.map(product => (
        <li key={product.id}>
          <h1>Product: {product.name}</h1>
          <p>id: {product.id}, price: ${product.price}</p>
        </li>
      ))}
      </ul>
    )
  

}

export default App
