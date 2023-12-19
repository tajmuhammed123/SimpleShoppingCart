import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { CheckIcon } from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";
 
export function SuccessPage({cartData, subTotal, discount, tax}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  const total = subTotal - discount + tax;
  const navigate=useNavigate()
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Cash On Delivery
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Success</DialogHeader>
        <DialogBody>
            <div className="flex align-middle justify-center flex-col items-center">
            <CheckIcon color="green" className="w-36"/>
            <Typography variant="h2">Success</Typography>
            <Typography >Your order has been suucessfully placed</Typography>

        <Card className="w-full">
        <List>
          {cartData.length>0 && cartData.map((item,index)=>(<ListItem key={index}>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src={item.imageSrc} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {item.name}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                $ {item.price}
              </Typography>
            </div>
          </ListItem>))}
        </List>
      </Card>
            </div>
        <div className="text-right py-5">
        <ul>
          <li>
            Subtotal <span className="text-red-900">$ {subTotal}</span>
          </li>
          {discount > 0 && (
            <li>
              Discount <span className="text-red-900">$ {discount}</span>
            </li>
          )}
          <li>
            Tax <span className="text-red-900">$ {tax}</span>
          </li>
          <li className="text-red-900 font-bold text-xl">
            Total <span>$ {total}</span>
          </li>
        </ul>
      </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="black" onClick={()=>navigate('/')}>
            <span>Continue Shopping</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}