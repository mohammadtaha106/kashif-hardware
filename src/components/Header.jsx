import React, { useContext, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AvatarDrop from "./Avatardrop";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Badge } from "@nextui-org/react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setuser } = useContext(AuthContext);
  console.log("user", user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { cartItems } = useContext(CartContext);

  return (
<nav className="bg-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <button onClick={toggleMenu} className="text-gray-600 md:hidden mr-4">
        {isOpen ? (
          <FaTimes size={20} className="text-black" />
        ) : (
          <FaBars size={20} className="text-black" />
        )}
      </button>
      <span className="text-blue-800 font-extrabold text-lg md:text-2xl">
        Kashif
      </span>
      <span className="text-gray-500 font-extrabold text-lg md:text-2xl">
        Hardware
      </span>
    </div>

    <div className="hidden md:flex justify-center ml-20 space-x-8 flex-grow">
      <Link to="/" className="text-gray-800 hover:text-blue-800">
        Home
      </Link>
      <Link to="/shop" className="text-gray-800 hover:text-blue-800">
        Shop
      </Link>
      <Link to="/about" className="text-gray-800 hover:text-blue-800">
        About
      </Link>
      <Link to="/contact" className="text-gray-800 hover:text-blue-800">
        Contact
      </Link>
    </div>

    <div className="flex items-center space-x-4">
      <Link to={"/cart"}>
      <Badge  content={cartItems.length} color="danger">

      <BsCart2 className="text-gray-600 text-2xl" />
      </Badge>
        
      </Link>
      {user?.isLogin ? (
        <AvatarDrop
          onclick={handleLogOut}
          img={user?.userInfo?.photourl}
          name={user?.userInfo?.name}
          email={user?.userInfo?.email}
        />
      ) : (
        <Link
          to="/signin"
          className="text-xs sm:text-sm md:w-36 p-2 h-10 bg-blue-800 text-white border border-blue-800 flex items-center justify-center rounded-md"
        >
          Sign In
        </Link>
      )}
      <Link
        to="/admin"
        className="text-xs sm:text-sm md:w-36 p-2 h-10 bg-blue-800 text-white border border-blue-800 flex items-center justify-center rounded-md"
      >
        Admin Panel
      </Link>
    </div>
  </div>

  <div
    className={`absolute top-16 left-0 w-full bg-white bg-opacity-75 shadow-lg transition-transform duration-300 ease-in-out transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } backdrop-blur-sm`}
  >
    <div className="md:hidden p-4 space-y-2">
      <Link to="/" className="block text-gray-800">
        Home
      </Link>
      <Link to="/shop" className="block text-gray-800">
        Shop
      </Link>
      <Link to="/about" className="block text-gray-800">
        About
      </Link>
      <Link to="/contact" className="block text-gray-800">
        Contact
      </Link>
    </div>
  </div>
</nav>

  );
};

export default Header;
