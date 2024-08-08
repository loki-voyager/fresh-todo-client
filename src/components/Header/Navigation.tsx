import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NavType } from "../../data/Nav";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type NavProps = {
  NavData: NavType[] | null;
};

const Navigation = ({ NavData }: NavProps) => {
  const user = useSelector((state: RootState) => state.user.data);

  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setShowMobile(false);
      }
    };

    if (showMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobile]);

  const filteredNavData =
    NavData?.filter((link) => {
      if (link.type === "public") {
        return true;
      }

      if (user) {
        const isAdminOrOwner = user.roles.some(
          (role) => role.includes("admin") || role.includes("owner")
        );

        if (
          link.type === "private" ||
          (link.type === "special" && isAdminOrOwner)
        ) {
          return true;
        }
      }

      return false;
    }) || [];

  return (
    <div ref={headerRef}>
      {isMobile ? (
        <nav ref={navContainerRef} className="mobile">
          <button
            onClick={() => {
              setShowMobile((state) => !state);
            }}
          >
            menu
          </button>
          <div
            className={`mobileNavigationBlock ${showMobile ? "active" : ""}`}
          >
            <button
              onClick={() => {
                setShowMobile((state) => !state);
              }}
            >
              close
            </button>
            {filteredNavData.map((link: NavType) => (
              <Link
                to={link.href}
                key={link.id}
                onClick={() => {
                  setShowMobile(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : (
        <nav ref={navContainerRef}>
          {filteredNavData.map((link: NavType) => (
            <Link to={link.href} key={link.id}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export { Navigation };
