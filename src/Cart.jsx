import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useCart } from "./CartContext";
import { SuccessPage } from "./SuccessPage";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Typography } from "@material-tailwind/react";

function Header({ itemCount }) {
  return (
    <header className="container">
      <h1>Shopping Cart</h1>

      <ul className="breadcrumb">
        <li>Home</li>
        <li>Shopping Cart</li>
      </ul>

      <span className="count">{itemCount} items in the bag</span>
    </header>
  );
}

function ProductList({ products, onChangeProductQuantity, onRemoveProduct }) {
  return (
    <section className="container">
      <ul className="products">
        {products.map((product, index) => {
          return (
            <li className="row" key={index}>
              <div className="col left">
                <div className="thumbnail">
                  <a href="#">
                    <img src={product.imageSrc} alt={product.name} />
                  </a>
                </div>
                <div className="detail">
                  <div className="name">
                    <a href="#">{product.name}</a>
                  </div>
                  <div className="description">{product.imageAlt}</div>
                  <div className="price">{formatCurrency(product.price)}</div>
                </div>
              </div>

              <div className="col right">
                <div className="quantity">
                  <input
                    type="text"
                    className="quantity"
                    step="1"
                    value={product.quantity}
                    onChange={(event) => onChangeProductQuantity(index, event)}
                  />
                </div>

                <div className="remove">
                  <svg
                    onClick={() => onRemoveProduct(index)}
                    version="1.1"
                    className="close"
                    x="0px"
                    y="0px"
                    viewBox="0 0 60 60"
                    enableBackground="new 0 0 60 60"
                  >
                    <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                  </svg>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Summary({
  subTotal,
  discount,
  tax,
  onEnterPromoCode,
  checkPromoCode,
  products,
}) {
  const total = subTotal - discount + tax;

  return (
    <section className="container">
      <div className="promotion">
        <label htmlFor="promo-code">Have A Promo Code?</label>
        <input type="text" onChange={onEnterPromoCode} />
        <button type="button" onClick={checkPromoCode} />
      </div>

      <div className="summary">
        <ul>
          <li>
            Subtotal <span>{formatCurrency(subTotal)}</span>
          </li>
          {discount > 0 && (
            <li>
              Discount <span>{formatCurrency(discount)}</span>
            </li>
          )}
          <li>
            Tax <span>{formatCurrency(tax)}</span>
          </li>
          <li className="total">
            Total <span>{formatCurrency(total)}</span>
          </li>
        </ul>
      </div>

      <div className="checkout">
        <SuccessPage
          cartData={products}
          subTotal={subTotal}
          discount={discount}
          tax={tax}
        />
      </div>
    </section>
  );
}


const PROMOTIONS = [
  {
    code: "SUMMER",
    discount: "50%",
  },
  {
    code: "AUTUMN",
    discount: "40%",
  },
  {
    code: "WINTER",
    discount: "30%",
  },
];
const TAX = 5;

export default function Cart() {
  const { cart } = useCart();
  console.log(cart);

  const [Mainproducts, setMainProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev-1k0m9u2offneeij.api.raw-labs.com/json-programming-heroes');
        const result = await response.json();
        setMainProducts(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [cartProducts, setCartProducts] = useState([]);
  const CLONE_PRODUCTS = JSON.parse(JSON.stringify(cartProducts));
  const [products, setProducts] = React.useState(CLONE_PRODUCTS);
  const [promoCode, setPromoCode] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);
  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);
  useEffect(() => {
    const filteredProducts = Mainproducts.filter((product) =>
      cart.some((item) => item.id === product.id)
    );
    console.log(filteredProducts);

    setProducts(filteredProducts);
    console.log(cartProducts);
  }, [cart, Mainproducts]);

  const itemCount = products.reduce((quantity, product) => {
    return quantity + +product.quantity;
  }, 0);
  const subTotal = products.reduce((total, product) => {
    return total + product.price * +product.quantity;
  }, 0);
  const discount = (subTotal * discountPercent) / 100;
  console.log(subTotal);

  var onChangeProductQuantity = (index, event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts = [...products];

    if (value === "") {
      cloneProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].quantity = valueInt;
    }

    setProducts(cloneProducts);
  };

  var onRemoveProduct = (i) => {
    const filteredProduct = products.filter((product, index) => {
      return index != i;
    });

    setProducts(filteredProduct);
  };

  var onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  var checkPromoCode = () => {
    for (var i = 0; i < PROMOTIONS.length; i++) {
      if (promoCode === PROMOTIONS[i].code) {
        setDiscountPercent(parseFloat(PROMOTIONS[i].discount.replace("%", "")));

        return;
      }
    }

    alert("Sorry, the Promotional code you entered is not valid!");
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-screen">
        <NavBar />
      </div>
      <div className="w-full flex items-center justify-center py-5">
          <Typography variant="h1">Cart</Typography>
        </div>
      <Header itemCount={itemCount} />

      {products.length > 0 ? (
        <div>
          <ProductList
            products={products}
            onChangeProductQuantity={onChangeProductQuantity}
            onRemoveProduct={onRemoveProduct}
          />

          <Summary
            subTotal={subTotal}
            discount={discount}
            products={products}
            tax={TAX}
            onEnterPromoCode={onEnterPromoCode}
            checkPromoCode={checkPromoCode}
          />
        </div>
      ) : (
        <div className="empty-product">
          <h3>There are no products in your cart.</h3>
          <button onClick={() => navigate("/")}>Shopping now</button>
        </div>
      )}
    </div>
  );
}

function formatCurrency(value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
