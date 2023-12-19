
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import MainRoutes from "./Routes/MainRoutes";
import CartProvider from './CartContext';

 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CartProvider><MainRoutes/></CartProvider>}/>
      </Routes>
    </BrowserRouter>
  );
}