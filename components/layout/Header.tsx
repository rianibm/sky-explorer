import React, { useEffect, useState, useRef, useCallback } from "react";
import Logo from "../ui/Logo";
import { Layout, Dropdown } from "antd";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { useRouter } from "next/router";
import { MenuProps } from "antd/lib";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

dayjs.extend(customParseFormat);

const { Header } = Layout;

// SVG paths as strings
const Chevron = "/assets/chevron-down.svg";
const IconMenu = "/assets/menu.svg";
const IconUser = "/assets/user.svg";

const api_base_url = "https://be-java-master-production.up.railway.app/api";
// const api_base_url = "https://be-java-production.up.railway.app";

const HeaderComponent: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Memoize fetchName function to prevent unnecessary re-renders
  const fetchName = useCallback(async () => {
    if (!token) return;

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch(api_base_url + "/users/me", {
        method: "GET",
        headers: myHeaders,
      });

      if (response.status !== 200) {
        const responseJson = await response.json();
        console.error("Error:", responseJson.message);
        // Handle error more gracefully than alert
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          setToken(null);
          router.push("/login");
        }
        return;
      }

      const responseJson = await response.json();
      setUserName(responseJson.data["firstName"]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [token, router]);

  // Initialize token from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("access_token");
      setToken(storedToken);
      setIsLoading(false);
    }
  }, []);

  // Handle token changes and fetch user data
  useEffect(() => {
    if (!isLoading) {
      if (!token) {
        router.push("/login");
      } else {
        fetchName();
      }
    }
  }, [token, isLoading, router, fetchName]);

  // Handle outside clicks and window resize
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileMenuVisible(false);
      }
    };

    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize(); // Check initial window size

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleProfileClick = useCallback(() => {
    setProfileMenuVisible(!isProfileMenuVisible);
  }, [isProfileMenuVisible]);

  const handleStatus = useCallback(() => {
    router.push("/status");
  }, [router]);

  const handleSignUp = useCallback(() => {
    router.push("/signup");
  }, [router]);

  const CabinItems: MenuProps["items"] = [
    {
      key: "cabin-1",
      label: (
        <Link href="/cabin/economy" className="block px-4 py-2 hover:bg-gray-50">
          Economy
        </Link>
      ),
    },
    {
      key: "cabin-2",
      label: (
        <Link href="/cabin/business" className="block px-4 py-2 hover:bg-gray-50">
          Business
        </Link>
      ),
    },
    {
      key: "cabin-3",
      label: (
        <Link href="/cabin/first" className="block px-4 py-2 hover:bg-gray-50">
          First
        </Link>
      ),
    },
  ];

  const BaggageItems: MenuProps["items"] = [
    {
      key: "baggage-1",
      label: (
        <Link href="/baggage/checked" className="block px-4 py-2 hover:bg-gray-50">
          Checked Baggage
        </Link>
      ),
    },
    {
      key: "baggage-2",
      label: (
        <Link href="/baggage/cabin" className="block px-4 py-2 hover:bg-gray-50">
          Cabin Baggage
        </Link>
      ),
    },
    {
      key: "baggage-3",
      label: (
        <Link href="/baggage/fare-types" className="block px-4 py-2 hover:bg-gray-50">
          Fare Types
        </Link>
      ),
    },
  ];

  const menu = <ProfileMenu />;

  if (isLoading) {
    return (
      <Header className="sticky top-0 z-50 flex items-center border-b border-gray-200 bg-white px-4 lg:px-8">
        <div className="flex w-full items-center justify-between">
          <Logo />
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
        </div>
      </Header>
    );
  }

  return (
    <Header className="sticky top-0 z-50 flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Logo />
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden items-center gap-6 lg:flex">
              <Link 
                href="/explore"
                className="text-lg font-medium font-['Plus Jakarta Sans'] leading-7 text-neutral-900 transition-colors hover:text-primary"
              >
                Explore
              </Link>
              
              <button
                className="cursor-pointer text-lg font-medium font-['Plus Jakarta Sans'] leading-7 text-neutral-900 transition-colors hover:text-primary"
                onClick={handleStatus}
              >
                Status
              </button>
              
              <Dropdown
                menu={{ items: CabinItems }}
                placement="bottomLeft"
                trigger={['hover']}
              >
                <button className="flex items-center text-lg font-medium font-['Plus Jakarta Sans'] leading-7 text-neutral-900 transition-colors hover:text-primary">
                  <span className="mr-2">Cabin</span>
                  <Image src={Chevron} alt="Chevron" width={16} height={16} />
                </button>
              </Dropdown>
              
              <Dropdown
                menu={{ items: BaggageItems }}
                placement="bottomLeft"
                trigger={['hover']}
              >
                <button className="flex items-center text-lg font-medium font-['Plus Jakarta Sans'] leading-7 text-neutral-900 transition-colors hover:text-primary">
                  <span className="mr-2">Baggage</span>
                  <Image src={Chevron} alt="Chevron" width={16} height={16} />
                </button>
              </Dropdown>
            </nav>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Currency Selector */}
          <div className="hidden cursor-pointer items-center gap-4 text-lg font-medium font-['Plus Jakarta Sans'] leading-7 text-neutral-900 transition-colors hover:text-primary sm:flex">
            <ReactCountryFlag 
              countryCode="ID" 
              svg 
              style={{ width: '1.5em', height: '1.5em' }} 
            />
            <span>IDR</span>
          </div>

          {/* User Section */}
          {token ? (
            <div
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-base font-semibold font-['Plus Jakarta Sans'] leading-7 text-neutral-900 transition-all duration-200 hover:border-primary hover:text-primary lg:text-lg"
              onClick={handleProfileClick}
              ref={dropdownRef}
            >
              <div className="rounded-xl bg-gray-200 p-2">
                <Image src={IconUser} alt="User Icon" width={16} height={16} />
              </div>
              
              {!isMobile && (
                <span className="hidden max-w-24 truncate sm:block">
                  {userName || 'User'}
                </span>
              )}
              
              <Image src={IconMenu} alt="Menu Icon" width={16} height={16} />
              
              <Dropdown
                open={isProfileMenuVisible}
                overlay={menu}
                placement="bottomRight"
                trigger={[]}
              >
                <div />
              </Dropdown>
            </div>
          ) : (
            <button
              onClick={handleSignUp}
              className="rounded-md bg-primary px-4 py-2 font-bold text-white shadow-sm transition-colors duration-200 hover:bg-primary-dark disabled:bg-gray-400 lg:px-6"
            >
              <span className="text-sm font-['Plus Jakarta Sans'] lg:text-base">
                Sign Up
              </span>
            </button>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button className="p-2 lg:hidden">
              <Image src={IconMenu} alt="Mobile Menu" width={20} height={20} />
            </button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;