import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
 
export default function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navigate=useNavigate()
 
  return (
    <Navbar className=" py-2 lg:py-4 w-100" style={{width:'100%', maxWidth:'100%'}}>
      <div className="container flex justify-between text-blue-gray-900" style={{minWidth:'100%', width:'100%'}}>
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer font-medium"
          onClick={() => navigate('/')}
        >
          SHOPPING WEBSITE
        </Typography>
        <div className="flex items-center gap-x-1">
          <Button variant="text" size="sm" className="hidden lg:inline-block" onClick={()=>navigate('/cart')}>
            <span>CART</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="" onClick={()=>navigate('/cart')}>
              <span>Cart</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}