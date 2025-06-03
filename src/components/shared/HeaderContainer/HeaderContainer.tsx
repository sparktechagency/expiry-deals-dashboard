"use client";

import { Button } from "antd";
import "./HeaderContainer.css";
import Link from "next/link";
import userAvatar from "@/assets/images/user-avatar.png";
import { Layout } from "antd";
import { Icon } from "@iconify/react";
import CustomAvatar from "@/components/custom/CustomAvatar";
import { cn } from "@/utils/cn";
import { MainLayoutContext } from "@/context/MainLayoutContext";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { Dropdown } from "antd";
import { Bell } from "lucide-react";
import formatUrl from "@/utils/formatUrl";

const { Header } = Layout;

// Dummy Notification Data
const notifications = [
  {
    id: 1,
    message: "A New Booking was made to Hotel #HVBV3423",
    time: "Sat, 12:30pm",
  },
  {
    id: 2,
    message: "A Payment was made to Apartment #OYLD4353",
    time: "Oct 24, 12:30pm",
  },
  {
    id: 3,
    message: "A New Booking was made to Hotel #PVBV3424",
    time: "Fri, 12:30pm",
  },
];

const notificationMenu = notifications.map((notification) => ({
  key: notification.id,
  label: (
    <div className="p-2 text-start">
      <div className="flex items-center gap-x-3">
        <Icon icon="typcn:bell" height={26} width={26} color="var(--primary)" />
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium">{notification.message}</p>
          <p className="text-primary">{notification.time}</p>
        </div>
      </div>
    </div>
  ),
}));

export default function HeaderContainer() {
  const { sidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed } =
    useContext(MainLayoutContext);
  const currentPathname = usePathname();

  return (
    <Header
      style={{
        backgroundColor: "white",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 0,
        paddingRight: "40px",
        borderBottom: "1px solid lightGray",
      }}
    >
      {/* Collapse Icon */}
      <div
        className={cn("flex items-center gap-x-2", !collapsed ? "-ml-4" : "")}
      >
        <Button
          type="text"
          icon={
            <div className="flex-center">
              <Icon icon="ci:menu-duo-lg" width="26" height="26" />
            </div>
          }
          onClick={() => setCollapsed(!collapsed)}
        />

        <h1 className="font-quicksand text-3xl font-bold capitalize">
          {currentPathname.length > 1
            ? formatUrl(currentPathname)
            : "dashboard"}
        </h1>
      </div>

      {/* Right --- notification, user profile */}
      <div className="header-button-group flex items-center gap-x-4">
        <Dropdown
          menu={{ items: notificationMenu }}
          trigger={["click"]}
          className="header-notification-dropdown"
        >
          <button className="flex-center bg-primary relative aspect-square size-11 rounded-full !leading-none">
            <div className="absolute top-2 right-3 size-3 rounded-full bg-indigo-600" />

            {/* <Icon icon="typcn:bell" height={26} width={26} color="#fff" /> */}
            <Bell size={24} color="#fff" />
          </button>
        </Dropdown>

        {/* User */}
        <Link
          href={"/admin/profile"}
          className="hover:text-primary-blue group flex items-center gap-x-2 text-black"
        >
          <CustomAvatar src={userAvatar?.src} size={50} />
        </Link>
      </div>
    </Header>
  );
}
