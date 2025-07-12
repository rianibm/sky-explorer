import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  BellOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfileMenu: React.FC = () => {
  const router = useRouter();

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleNotifications = () => {
    router.push("/notifications");
  };

  const handleSavedTravelers = () => {
    router.push("/saved-travelers");
  };

  const handleAccountSettings = () => {
    router.push("/account-settings");
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  };

  return (
    <Menu className="w-64 shadow-lg border border-gray-200 rounded-lg">
      <Menu.Item className="px-2" key="1">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-[#EAFDF6]">
            <HomeOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <Link
              href="/trips"
              className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
            >
              Trips
            </Link>
          </div>
        </div>
      </Menu.Item>
      
      <Menu.Item className="px-2" key="2">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <UserOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <button
              onClick={handleProfile}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879] w-full text-left"
            >
              Profile
            </button>
          </div>
        </div>
      </Menu.Item>
      
      <Menu.Item className="px-2" key="3">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <BellOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <button
              onClick={handleNotifications}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879] w-full text-left"
            >
              Notifications
            </button>
          </div>
        </div>
      </Menu.Item>
      
      <Menu.Item className="px-2" key="4">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <TeamOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <button
              onClick={handleSavedTravelers}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879] w-full text-left"
            >
              Saved Travelers
            </button>
          </div>
        </div>
      </Menu.Item>
      
      <Menu.Item className="px-2" key="5">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <SettingOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <button
              onClick={handleAccountSettings}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879] w-full text-left"
            >
              Account Settings
            </button>
          </div>
        </div>
      </Menu.Item>
      
      <Menu.Item className="px-2" key="6">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <LogoutOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <button
              onClick={handleLogout}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879] w-full text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default ProfileMenu;