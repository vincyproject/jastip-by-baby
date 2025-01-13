import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Fungsi untuk memformat harga
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {formatPrice(getCartAmount())}</p> {/* Format harga */}
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {formatPrice(delivery_fee)}</p> {/* Format harga */}
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>
            {currency} {formatPrice(getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee)} {/* Format harga */}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;