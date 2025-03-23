import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ReactNode } from "react";

export default function DynamicDrawer({
  children,
  trigger,
  title,
  description,
}: {
  children: ReactNode;
  trigger: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger className="flex flex-row gap-[10px] bg-sheerpeace-purple-secondary text-white rounded-[5px] px-[15px] py-[7px]">
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
