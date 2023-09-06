import './Cart.css';
import Layout from '../Layout/Layout';
import React, { useEffect, useState } from "react";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart'))
        if (items) {
            const cartWithQuantity = items.map(item => ({ ...item, quantity: item.quantity || 1 }));
            setCart(cartWithQuantity);
        }
    }, []);

    const addMoreProducts = (product) => {
        const productIndex = cart.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[productIndex] = { ...updatedCart[productIndex], quantity: (updatedCart[productIndex].quantity || 1) + 1 };
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const newProduct = { ...product, quantity: 1 };
            setCart(prevCart => [...prevCart, newProduct]);
            localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));
        }
    };

    const removeProduct = (product) => {
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            const updatedProduct = { ...updatedCart[productIndex] };
            if (updatedProduct.quantity > 1) {
                updatedProduct.quantity -= 1;
                updatedCart[productIndex] = updatedProduct;
            } else {
                updatedCart.splice(productIndex, 1);
            }
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    return (
        <Layout>
            <h1 className='title'>Cart</h1>
            <div className="cart-items">
                {cart.map((product) =>( 
                    <div key={product.id} className="cart-item">
                        <div>
                            <img src={product.thumbnail} alt={product.title} />
                            <h3>{product.title}</h3>
                        </div>
                        
                        <div>
                            <input value='+' type="button" className='crud-button' onClick={() => addMoreProducts(product)}/>
                            <p className='product-count'>{product.quantity}</p>
                            <input value='-' type="button" className='crud-button' onClick={() => removeProduct(product)} />
                        </div>
                    </div>
                ))}
                
            </div>
        </Layout>
    )
}

export default Cart;
