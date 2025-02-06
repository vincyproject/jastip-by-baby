import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSubCategory([categoryParam]);
    } else {
      setSubCategory([]);
    }
  }, [searchParams]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = products;

    if (showSearch && search) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category !== "All") {
      filtered = filtered.filter(item => item.category === category);
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    if (sortType === 'low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sortedProducts);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID');
  };

  const titleText = subCategory.length > 0 ? subCategory.join(", ") : "All";

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='w-full sm:w-60'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">SELECT CATEGORY</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="All">All</option>
            <option value="Clothes">Clothes</option>
            <option value="Accessories">Accessories</option>
            <option value="Shoes">Shoes</option>
            <option value="Bag">Bag</option>
            <option value="Skincare-and-makeup">Skincare and Makeup</option>
          </select>
        </div>

        <div className="hidden sm:block border border-gray-300 pl-5 py-3 mt-4">
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'OneSet', 'Other'].map(type => (
              <label key={type} className='flex gap-2'>
                <input type="checkbox" value={type} onChange={toggleSubCategory} checked={subCategory.includes(type)} /> {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={titleText.toUpperCase()} text2={'New Arrival'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <div key={index} className='w-full'>
                <div className='w-full aspect-square overflow-hidden'>
                  <ProductItem id={item._id} image={item.image} className='w-full h-full object-cover' />
                </div>
                <div className='text-left mt-2'>
                  <p className='text-sm font-medium'>{item.name}</p>
                  <p className='text-sm text-gray-700'>Rp {formatPrice(item.price)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;