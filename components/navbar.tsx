import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      isBordered
      className="bg-transparent"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <p className="text-4xl font-extrabold text-inherit">AgroPlan</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* <NavbarContent className="hidden pr-16 sm:flex" justify="end">
        <NavbarItem className="hidden gap-4 md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/"}
            variant="flat"
          >
            Home
          </Button>
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/"}
            variant="flat"
          >
            history
          </Button>
        </NavbarItem>
      </NavbarContent> */}
      <ThemeSwitch />

      {/* <NavbarMenu>
        {searchInput}
        <div className="flex flex-col gap-2 mx-4 mt-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}
    </NextUINavbar>
  );
};
