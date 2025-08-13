"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/assets/logo.png"
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { dark, neobrutalism  } from "@clerk/themes";

const Navbar = () => {
    const { theme } = useTheme()
    return (
        <header className="shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 p-1">
                <Link href="/resumes" className="flex items-center gap-2">
                    <Image
                        src={logo}
                        width={35}
                        height={35}
                        alt="Logo image"
                        className="rounded-full"
                    />
                    <span className="font-bold text-xl">Resumind</span>
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <UserButton
                        appearance={{
                            baseTheme: theme === "dark" ? dark : neobrutalism,
                            elements: {
                                avatarBox: {
                                    width: 35,
                                    height: 35
                                }
                            }
                        }}
                    >
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label="Billing"
                                labelIcon={<CreditCard className="size-4" />}
                                href="/billing"
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </div>
            </div>
        </header>
    );
}

export default Navbar;