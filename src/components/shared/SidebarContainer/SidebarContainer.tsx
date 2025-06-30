"use client";

import "./Sidebar.css";
import { MainLayoutContext } from "@/context/MainLayoutContext";
import { logout } from "@/redux/features/auth/authSlice";
// import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
// import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

// Sidebar Links
const sidebarLinks = [
  {
    id: "dashboard",
    icon: "ic:outline-dashboard",
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    id: "account-details",
    icon: "heroicons:users",
    route: "/account-details",
    label: "Account Details",
  },
  {
    id: "earnings",
    icon: "lucide:hand-coins",
    route: "/earnings",
    label: "Earnings",
  },
  {
    id: "vendor-requests",
    icon: "iconoir:shop",
    route: "/vendor-requests",
    label: "Vendor Requests",
  },
  {
    id: "withdraw-requests",
    icon: "nrk:reload",
    route: "/withdraw-requests",
    label: "Withdraw Requests",
  },
  {
    id: "categories",
    icon: "ri:box-3-line",
    route: "/categories",
    label: "Product Categories",
  },
  {
    id: "settings",
    icon: "si:settings-fill",
    route: "/settings",
    label: "Settings",
  },
];

const SidebarContainer = () => {
  const { sidebarCollapsed: collapsed } = useContext(MainLayoutContext);

  const dispatch = useDispatch();
  const router = useRouter();

  // Logout handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e:any) => {
    if (e.key === "logout") {
      dispatch(logout());
      router.refresh();
      router.push("/login");

       toast.success("Logout successful");
    } 
  };

  // Admin Sidebar Links
  const adminSidebarLinks = [
    ...sidebarLinks.map((link) => ({
      key: link.id,
      icon: <Icon icon={link.icon} height={25} width={25} />,
      label: (
        <Link href={link.route} className="flex-center-between">
          {link.label}

          {link.id === "settings" && (
            <Icon icon="ri:arrow-right-s-line" height={25} width={25} />
          )}
        </Link>
      ),
    })),
    {
      key: "logout",
      icon: <Icon icon="ri:logout-circle-line" height={25} width={25} />,
      label: <Link href="/login">Logout</Link>,
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace(`/^\//`, "")?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        backgroundColor: "white",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div
        style={{
          height: 80,
          borderBottom: "1px solid lightGray",
        }}
      />

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu space-y-2 !border !border-none !border-red-400 !bg-transparent !px-2 !pt-4"
        items={adminSidebarLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
