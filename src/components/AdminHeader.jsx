import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";


export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
  'products',
  'users',
  'orders',
  'sales',
  'analytics',
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
         
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="products">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="sales">
            Sales
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="orders" aria-current="page">
            Orders
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="users">
            Users
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" to="analytics">
            Analytics
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (

          
          
          <NavbarMenuItem key={`${item}-${index}`}>

            
            
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              to={item}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
