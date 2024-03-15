import Image from "next/image";
import {Button} from '@nextui-org/button'; 
import {Avatar} from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
export default function Home() {
  return (
    <>
    <ScrollShadow className="w-[300px] h-[400px]">
      sdfjlksjdkfjksdjkl
      sdf
      sfjklsdjfkjksldfj
      sdf
    </ScrollShadow>
      <div>
        <Button>Click me</Button>
      </div>
      <div className="flex gap-3 items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar name="Junior" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar name="Jane" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar name="Joe" />
      </div>
     
    </>
  );
}
