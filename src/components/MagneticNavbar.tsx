"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRef, useState } from "react"

const MagneticNavbar: React.FC = () => {
  const currentPath = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  // Track if mouse is over the navbar
  const [isHovering, setIsHovering] = useState(false)

  // Handle mouse movement to create magnetic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return

    const navRect = navRef.current.getBoundingClientRect()
    const mouseX = e.clientX - navRect.left
    const mouseY = e.clientY - navRect.top

    // Apply magnetic effect to each nav item
    itemsRef.current.forEach((item) => {
      if (!item) return

      const itemRect = item.getBoundingClientRect()
      const itemX = itemRect.left + itemRect.width / 2 - navRect.left
      const itemY = itemRect.top + itemRect.height / 2 - navRect.top

      // Calculate distance between mouse and item center
      const distanceX = mouseX - itemX
      const distanceY = mouseY - itemY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      // Magnetic effect strength (adjust these values to control the effect)
      const magneticRange = 150 // How far the magnetic effect reaches
      const maxPull = 20 // Maximum pixels to pull

      if (distance < magneticRange) {
        // Calculate pull strength based on distance (closer = stronger)
        const pull = maxPull * (1 - distance / magneticRange)

        // Calculate pull direction
        const pullX = (distanceX / distance) * pull * -1
        const pullY = (distanceY / distance) * pull * -1

        // Apply transform
        item.style.transform = `translate(${pullX}px, ${pullY}px)`
        item.style.transition = "transform 0.2s ease-out"
      } else {
        // Reset position when mouse is far away
        item.style.transform = "translate(0, 0)"
        item.style.transition = "transform 0.5s ease-out"
      }
    })
  }

  // Reset all items when mouse leaves navbar
  const handleMouseLeave = () => {
    setIsHovering(false)
    itemsRef.current.forEach((item) => {
      if (!item) return
      item.style.transform = "translate(0, 0)"
      item.style.transition = "transform 0.5s ease-out"
    })
  }

  // Navigation links data
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Product" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex items-center gap-6"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {navLinks.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className={`relative inline-block py-2 px-3 transition-colors hover:text-[#007580] ${
            currentPath === link.href ? "text-teal-500 font-medium" : ""
          }`}
        >
          {link.label}
          {currentPath === link.href && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#007580] rounded-full" />
          )}
        </Link>
      ))}
    </nav>
  )
}

export default MagneticNavbar;

