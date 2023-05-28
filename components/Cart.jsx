import React, { useRef} from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from "../context/StateContext";
import { urlFor } from '../lib/client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuanitities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  return (
    <div className="cart-wrapper" ref= {cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({totalQuanitities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>Your Shopping Bag Is Empty</h3>
            <Link href="/">
              <button
              type="button"
              onClick={() => setShowCart(false)}
              className='btn'>Continue Shopping</button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                      <p className="quantity-desc">
                        <span className='minus' onClick={() => toggleCartItemQuanitity(item._id,'dec') }><AiOutlineMinus /></span>
                        <span className='num' onClick="">{item.quantity}</span>
                        <span className='plus' onClick={() => toggleCartItemQuanitity(item._id,'inc') }><AiOutlinePlus /></span>
                      </p>
                  </div>
                  <button 
                  type="button"
                  className="remove-item"
                  onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <br />

            <br />

            <br />
            <div className="btn-container">
              <PayPalScriptProvider options={{"client-id": "AZcS3Sc4lK1Rnx6GG_kvtKHZ7icX_spJ3ztCbgkLFfWlimnFrZGS0ACUbwRBV8wCf2LRHmFs-BoSFT75"}}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "90.00",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
                />
              </PayPalScriptProvider>
            </div>
          </div>

        )}
        </div> 

    </div>
  )
}

export default Cart