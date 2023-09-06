import { Link } from 'react-router-dom';
import './Header.css';
import React, { useEffect, useState } from "react";

function Header(){

  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    return items ? items.length : 0;
  });
    
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        const items = JSON.parse(e.newValue);
        setCount(items ? items.length : 0);
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return(
    <header className="App-header">
      <div className='logo'>
        <Link to="/">LOGO</Link>
      </div>
      <div className='carrinho'>
        <Link to="/Cart">
          <img className='img-fluid img-carrinho' src='/images/carrinho-de-compras.png' /><p className='count'>{count}</p>
        </Link>  
      </div>
    </header>
  );
}

export default Header;
