import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const BestSeller2 = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID');
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    productsCopy = productsCopy.filter(item => item.bestseller);

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SELECT CATEGORY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'><input type="checkbox" value="Clothes" onChange={toggleCategory} /> Clothes</label>
            <label className='flex gap-2'><input type="checkbox" value="Accessories" onChange={toggleCategory} /> Accessories</label>
            <label className='flex gap-2'><input type="checkbox" value="Shoes" onChange={toggleCategory} /> Shoes</label>
            <label className='flex gap-2'><input type="checkbox" value="Bag" onChange={toggleCategory} /> Bag</label>
            <label className='flex gap-2'><input type="checkbox" value="Skincare-and-makeup" onChange={toggleCategory} /> Skincare and Makeup</label>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'><input type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear</label>
            <label className='flex gap-2'><input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear</label>
            <label className='flex gap-2'><input type="checkbox" value="OneSet" onChange={toggleSubCategory} /> OneSet</label>
            <label className='flex gap-2'><input type="checkbox" value="Other" onChange={toggleSubCategory} /> Other</label>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'BEST SELLER'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <div key={index} className='w-full'>
              <div className='w-full aspect-square overflow-hidden'>
                <ProductItem id={item._id} image={item.image} className='w-full h-full object-cover' />
              </div>
              <div className='text-left mt-2'>
                <p className='text-sm font-medium'>{item.name}</p>
                <p className='text-sm text-gray-700'>Rp {formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller2;
