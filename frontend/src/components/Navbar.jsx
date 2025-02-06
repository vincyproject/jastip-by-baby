import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    const handleCategoryClick = (category) => {
        navigate(`/collection?category=${category}`);
        setVisible(false);
    };

    return (
        <div>
            {/* Navbar Atas */}
            <div className='flex items-center justify-between py-5 font-medium'>
                <Link to='/'><img src={assets.logo} className='w-36' alt="Logo" /></Link>

                <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                    <NavLink to='/' className='flex flex-col items-center gap-1'><p>HOME</p></NavLink>
                    <NavLink to='/best-seller' className='flex flex-col items-center gap-1'><p>BEST SELLER</p></NavLink>
                    <NavLink to='/collection' className='flex flex-col items-center gap-1'><p>NEW ARRIVAL</p></NavLink>
                    <NavLink to='/about' className='flex flex-col items-center gap-1'><p>ABOUT</p></NavLink>
                    <NavLink to='/contact' className='flex flex-col items-center gap-1'><p>CONTACT</p></NavLink>
                </ul>

                <div className='flex items-center gap-6'>
                    <img onClick={() => { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='navbar-icon cursor-pointer' alt="Search" />
                    <div className='group relative'>
                        <img onClick={() => token ? null : navigate('/login')} className='navbar-icon cursor-pointer' src={assets.profile_icon} alt="Profile" />
                        {token && (
                            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                                <div className='flex flex-col gap-2 w-54 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='navbar-icon' alt="Cart" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} className='navbar-icon cursor-pointer sm:hidden' alt="Menu" />
                </div>
            </div>

            {/* Navbar Mobile (Filter Kategori) */}
            <div className="flex justify-around py-2 border-t mt-[-40px] sm:hidden">
                <button onClick={() => handleCategoryClick('Topwear')} className="text-sm">Topwear</button>
                <button onClick={() => handleCategoryClick('Bottomwear')} className="text-sm">Bottomwear</button>
                <button onClick={() => handleCategoryClick('OneSet')} className="text-sm">OneSet</button>
                <button onClick={() => handleCategoryClick('Other')} className="text-sm">Other</button>
            </div>

            {/* Sidebar Menu */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/best-seller'>BEST SELLER</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>NEW ARRIVAL</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

/* Inline CSS Langsung di Komponen */
const navbarStyles = `
    .navbar-icon {
        width: 20px !important;
        height: auto !important;
        min-width: 20px !important;
    }
`;

const styleElement = document.createElement("style");
styleElement.innerHTML = navbarStyles;
document.head.appendChild(styleElement);
