"use client";

import React from "react";
import { Layout } from "antd";
import SidebarContainer from "@/components/shared/SidebarContainer/SidebarContainer";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";

interface LayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <Layout hasSider>
      <SidebarContainer></SidebarContainer>

      <Layout>
        <HeaderContainer></HeaderContainer>

        <main
          style={{
            maxHeight: "90dvh",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
            paddingInline: "50px",
            paddingBlock: "20px",
          }}
        >
          {children}
        </main>
      </Layout>
    </Layout>
  );
}
