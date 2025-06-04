"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div>
      {pathname !== "/settings" && (
        <Link href="/settings" className="flex-center-start mb-8 gap-x-2">
          <ArrowLeft size={16} className="mb-1" /> Settings
        </Link>
      )}

      {children}
    </div>
  );
}
