'use client';

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";


export default function Header({user,profileInfo}) {


    const menuItems = [
        {
            label: "Home",
            path: "/",
            show: true
        },
        {
            label: "Login",
            path: "/sign-in",
            show: !user
        },
        {
            label: "Register",
            path: "/sign-up",
            show: !user
        },
        {
            label: "Activity",
            path: "/activity",
            show: profileInfo?.role === 'candidate'
        },
        {
            label: "Jobs",
            path: "/jobs",
            show: user
        },
        {
            label: "Account",
            path: "/account",
            show: true
        },
    ]

    return <div>
        <header className="flex h-16 w-full shrink-0 items-center">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="flex lg:hidden">
                        <AlignJustify className="h-6 w-6" />
                        <span className="sr-only">
                            Toggle Navigation Menu
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <Link className="mr-6 hidden lg:flex" href={"#"}>
                        <h3>JOBSCO</h3>
                    </Link>
                    <div className="grid gap-2 py-6">
                        {
                            menuItems.map((menuItem,idx) => {
                                return menuItem.show ?
                                    <Link key={idx} href={menuItem.path} className="flex w-full items-center py-2 text-lg font-semibold">{menuItem.label}</Link>
                                    : null
                            })
                        }
                        <UserButton afterSignOutUrl="/"/>
                    </div>
                </SheetContent>
            </Sheet>
            <Link href={"/"} className="hidden lg:flex mr-6">JOBSCO</Link>
            <nav className="ml-auto hidden lg:flex gap-6">
                {
                    menuItems.map((menuItem,idx) => {
                        return menuItem.show ?
                            <Link key={idx}
                                onClick={()=>sessionStorage.removeItem("filterParams")}
                            href={menuItem.path} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">{menuItem.label}</Link>
                            : null
                    })
                }
                <UserButton afterSignOutUrl="/"/>
            </nav>
        </header>
    </div>
}