import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import bca from './bca.svg'
import mandiri from './mandiri.svg'
import bni from './bni.png'
import bri from './bri.png'

const PlaceOrder = () => {
  const [method, setMethod] = useState('transfer');
  const { 
    navigate, 
    backendUrl, 
    token, 
    cartItems, 
    setCartItems, 
    getCartAmount, 
    delivery_fee, 
    products 
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  // ... (kode initPay dihapus karena tidak relevan)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'transfer':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------- Left Side ---------------- */}
      <div className='flex flex-col gap-4 w-full sm:w-1/2'> 
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='firstName' 
            value={formData.firstName} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='First name' 
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name='lastName' 
            value={formData.lastName} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Last name' 
          />
        </div>
        <input 
          required 
          onChange={onChangeHandler} 
          name='email' 
          value={formData.email} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="email" 
          placeholder='Email address' 
        />
        <input 
          required 
          onChange={onChangeHandler} 
          name='street' 
          value={formData.street} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='Street' 
        />
        <div className='flex gap-3'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='city' 
            value={formData.city} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='City' 
          />
          <input 
            onChange={onChangeHandler} 
            name='state' 
            value={formData.state} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='State' 
          />
        </div>
        <div className='flex gap-3'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='zipcode' 
            value={formData.zipcode} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="number" 
            placeholder='Zipcode' 
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name='country' 
            value={formData.country} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Country' 
          />
        </div>
        <input 
          required 
          onChange={onChangeHandler} 
          name='phone' 
          value={formData.phone} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="number" 
          placeholder='Phone' 
        />
      </div>

      {/* ------------- Right Side ------------------ */}
      <div className='mt-8 sm:w-1/2'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
          <div onClick={() => setMethod('transfer')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'transfer' ? 'bg-green-400' : ''}`}></p>
                <div> {/* Bungkus elemen gambar dan teks */}
                <img src={bca} alt="Logo Bank" className="h-[50px] w-[100px]" /> {/* Tambahkan gambar logo */}
                    <p className='text-gray-500 text-sm font-medium mx-4'>0040236864</p> {/* Nomor rekening */}
                    <p className='text-gray-500 text-sm font-medium mx-4'>Masdian Haerunisah</p> {/* Nama pemilik rekening */}
                </div>
                <div> {/* Bungkus elemen gambar dan teks */}
                <img src={mandiri} alt="Logo Bank" className="h-[60px] w-[100px]" /> {/* Tambahkan gambar logo */}
                    <p className='text-gray-500 text-sm font-medium mx-4 -mt-3'>1260007349763</p> {/* Nomor rekening */}
                    <p className='text-gray-500 text-sm font-medium mx-4'>Masdian Haerunisah</p> {/* Nama pemilik rekening */}
                </div>
                <div> {/* Bungkus elemen gambar dan teks */}
                <img src={bni} alt="Logo Bank" className="h-[30px] w-[100px]" /> {/* Tambahkan gambar logo */}
                    <p className='text-gray-500 text-sm font-medium mx-4 mt-2'>1539447176</p> {/* Nomor rekening */}
                    <p className='text-gray-500 text-sm font-medium mx-4'>Masdian Haerunisah</p> {/* Nama pemilik rekening */}
                </div>
                <div> {/* Bungkus elemen gambar dan teks */}
                <img src={bri} alt="Logo Bank" className="h-[30px] w-[100px]" /> {/* Tambahkan gambar logo */}
                    <p className='text-gray-500 text-sm font-medium mx-4 mt-2'>043401039179502</p> {/* Nomor rekening */}
                    <p className='text-gray-500 text-sm font-medium mx-4'>Masdian Haerunisah</p> {/* Nama pemilik rekening */}
                </div>  
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;