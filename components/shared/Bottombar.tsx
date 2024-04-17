"use client";

import { usePathname, useRouter } from "next/navigation";
import { sidebarItems } from "@/constants"
import Link from "next/link";


const Bottombar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <section className="bottombar">
      <div className="bottombar_container">
      {sidebarItems.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <span className="text-4xl">{item.icon}</span>
              <p className="max-lg:hidden text-subtle-medium max-sm:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  )
}

export default Bottombar