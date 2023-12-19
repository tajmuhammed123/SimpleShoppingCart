import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import NavBar from "../NavBar";
import { useEffect, useState } from "react";
   
  export function ProductList() {

    const {cart, setCart}=useCart()
    console.log(cart);

    const navigate=useNavigate()

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

    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://dev-1k0m9u2offneeij.api.raw-labs.com/json-programming-heroes');
          const result = await response.json();
          setProducts(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    return (
      <>
        <NavBar/>
        <div className="w-full flex items-center justify-center py-5">
          <Typography variant="h1">Shop</Typography>
        </div>
      <div className="flex align-middle justify-center mt-9">
      {products.map((item,index)=>(
        <Card className="w-72 mx-5" key={index}>
        <CardHeader shadow={false} floated={false} className="h-48" onClick={()=>navigate(`/productdetails/${item.id}`)}>
          <img
            src={item.imageSrc}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody onClick={()=>navigate(`/productdetails/${item.id}`)}>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {item.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $ {item.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {item.imageAlt}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            onClick={()=>handleCart(item.id)}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
      ))}
      </div>
      </>
    );
  }