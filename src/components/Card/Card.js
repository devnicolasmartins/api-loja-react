import React, { useEffect, useState } from "react";
import './Card.css';
import fetchProducts from "../../services/Api.js";

const CardList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData)
        };
        getProducts();
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart'))
        if (items) {
            setCart(items);
        }
    }, []);

    useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const productInCart = cart.find(item => item.id === product.id);

        if (!productInCart) {
            setCart((prevCart) => [...prevCart, product]);
        }
    }
    return (
        <div className="products-detail">
            {products.map((product) => (
                <div id={product.id} className="products-info">
                    <div className='product-pic'>
                        <img src={product.thumbnail} alt={product.title} />
                    </div>
                    <div className='product-name'>
                        <h3>{product.title}</h3>
                    </div>
                    <div className='product-price'>
                        Price: <a>${product.price},00</a>
                    </div>
                    <button 
                            className="btn-card" 
                            onClick={() => addToCart(product)}
                            disabled={cart && cart.some((item) => item.id === product.id)}
                    >
                        {cart && cart.some((item) => item.id === product.id) ? "In Cart" : "Add to Cart"}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CardList;
