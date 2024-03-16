'use client'
import React from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import {users} from "./data";
import {AcmeLogo} from "./AcmeLogo";

export default function Home() {
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
      {/* <AcmeLogo /> */}
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
    <>
      <ListboxWrapper>
        <Listbox
          topContent={topContent}
          bottomContent={topContent}
          classNames={{
            base: "m-0 p-0 w-full bg-red-500",
            list: "m-0 p-0 w-full h-fit max-h-[80vh] overflow-scroll bg-slate-300 px-1 py-2 border-default-100",
          }}
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
      </ListboxWrapper>
        
    </>
  );
}
