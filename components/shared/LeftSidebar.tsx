"use client";

import { sidebarItems } from "@/constants";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarItems.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

            if (item.route === "/profile") item.route = `${item.route}/${userId}`

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <span className="text-4xl">{item.icon}</span>
              <p className="max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
      <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className='flex items-center cursor-pointer gap-4 p-4 leftsidebar_link'>
                <LogOut className='text-white text-sm rotate-180' size={18} />

                <p className="text-light-2 max-lg:hidden hover:bg-zinc-800">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
