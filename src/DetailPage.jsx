import React, { useState, useEffect, useRef } from 'react';
import './DetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import NavBar from './NavBar';
import { Typography } from '@material-tailwind/react';

const DetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0);
    const myRef = useRef();
    const navigate = useNavigate();
    const { cart, setCart } = useCart();

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    useEffect(() => {
        const products = [
            {
                _id: 1,
                name: 'Earthen Bottle',
                href: '#',
                price: 48,
                src: ['https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'],
                imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
                colors: ['red', 'green', 'yellow']
            },
            {
                _id: 2,
                name: 'Nomad Tumbler',
                href: '#',
                price: 35,
                src: ['https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'],
                imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
                colors: ['red', 'green', 'yellow']
            },
            {
                __id: 3,
                name: 'Focus Paper Refill',
                href: '#',
                price: 89,
                src: ['https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'],
                imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
                colors: ['red', 'green', 'yellow']
            },
            {
                _id: 4,
                name: 'Machined Mechanical Pencil',
                href: '#',
                price: 35,
                src: ['https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg'],
                imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                colors: ['red', 'green', 'yellow']
            },
        ];

        const productData = products.find(item => id == item._id);
        console.log(productData);
        setData(productData);
    }, [id]);

    useEffect(() => {
        if (myRef.current) {
            myRef.current.children[index].className = "active";
        }
    }, [index]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleCart = (productId) => {
        const existingItem = cart.find(item => item.id === productId);
      
        if (existingItem) {
          setCart(prevCart => (
            prevCart.map(item =>
              item.id === productId ? { ...item, qty: item.qty + 1 } : item
            )
          ));
        } else {
          setCart(prevCart => [...prevCart, { id: productId, qty: 1 }]);
        }
      };
      

    return (
        <>
        <div className='w-screen'>

        <NavBar/>
        </div>

        <div className="w-full flex items-center justify-center py-5">
          <Typography variant="h1">{data.name}</Typography>
        </div>
        
        <div className="app">
            <div className="details" key={data._id}>
                <div className="big-img">
                    <img src={data.src[index]} alt="" />
                </div>

                <div className="box">
                    <div className="row">
                        <h2>{data.imageAlt}</h2>
                        <span className='font-extrabold w-36 text-2xl'>$ {data.price}</span>
                    </div>
                    <div className="colors">
                        {data.colors.map((color, i) => (
                            <button
                                style={{ background: color }}
                                key={i}
                            ></button>
                        ))}
                    </div>

                    <p>{data.description}</p>
                    <p>{data.content}</p>
                    <div className="thumb" ref={myRef}>
                        {data.src.map((src, i) => (
                            <img
                                src={src}
                                alt=""
                                key={i}
                            />
                        ))}
                    </div>
                    <button className="cart" onClick={() => handleCart(data._id)}>Add to cart</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default DetailPage;