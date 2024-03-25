import React from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button
} from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Vincent AU</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/quickBusCheck">
            QuickBusCheck
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
    </Navbar>
  );
};

export default Header;