'use client'
import React from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {users} from "./data";
import {AcmeLogo} from "./AcmeLogo";

export const RightListboxWrapper = () => {
  const [values, setValues] = React.useState(new Set(["1"]));
  const arrayValues = Array.from(values);


  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <Navbar
      classNames = {{
        wrapper: "px-4",
      }}
      >
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
    
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    );
  }, [arrayValues.length]);

  return (
    <div className="w-full max-w-[w-80] flex flex-col h-screen bg-slate-800">
      <div className="bg-gray-500 w-full">
        {topContent}
      </div>
      <Listbox
            className="flex-grow overflow-scroll"
            items={users}
            label="Assigned to"
            selectionMode="none"
            onSelectionChange={setValues}
            variant="flat"
            aria-label="Actions"
            onAction={(key) => alert(key)}
          >
            {(item) => (
              <ListboxItem key={item.id} textValue={item.name}>
                <div className="flex gap-2 items-center">
                  <Image
                    className="w-full"
                    alt="NextUI hero Image"
                    src={item.avatar}
                  />
                </div>
              </ListboxItem>
            )}
          </Listbox>
          <div className="w-full">
              {topContent}
          </div>
    </div>
  )
};
