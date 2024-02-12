"use client"

import { useRef, useState, useEffect } from "react"
import { PRODUCT_CATEGORIES } from "@/config";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {

  const[activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        setActiveIndex(null);  /* Close all the actives */
      }
    }

    document.addEventListener('keydown', (e) => handler(e));

    return () => {
      document.removeEventListener('keydown', (e) => handler(e));  /* Clean up after use to avoid memory leaks */
    }
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return(
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {

      const handleOpen = () => {
        if(activeIndex === i) {
          setActiveIndex(null);
        }
        else {
          setActiveIndex(i);
        }
      }

      const isOpen = i === activeIndex;

      return(
        <NavItem 
          category={category} 
          handleOpen={handleOpen} 
          isOpen={isOpen}
          key={category.value}
          isAnyOpen={isAnyOpen}
        />
      )
      })}
    </div>
  )
}

export default NavItems