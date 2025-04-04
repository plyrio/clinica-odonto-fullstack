"use client";
import { useDropdown } from "@/hooks/useDropdown";
import { IconMenu2, IconX } from "@tabler/icons-react";

export default function MobileMenu() {
  const { toggleMenu, menuOpen } = useDropdown("navMenu");
  return (
    <button
      className="rounded-sm p-2"
      onClick={toggleMenu}
      aria-expanded="true"
      aria-controls="toggle-menu"
    >
      {menuOpen ? (
        <IconX
          stroke={2}
          className="text-gray-700 transition hover:text-gray-600/75 transform rotate-180"
        />
      ) : (
        <IconMenu2
          stroke={2}
          className="text-gray-700 transition hover:text-gray-600/75"
        />
      )}
    </button>
  );
}
