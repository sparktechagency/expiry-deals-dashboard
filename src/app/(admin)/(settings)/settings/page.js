import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Settings",
  description: "Admin settings page",
};

const SETTINGS_LINKS = [
  {
    key: "personal-information",
    label: "Personal Information",
    route: "/profile",
  },
  {
    key: "privacy-policy",
    label: "Privacy Policy",
    route: "/privacy-policy",
  },
  {
    key: "terms-conditions",
    label: "Terms & Conditions",
    route: "/terms-conditions",
  },
  {
    key: "about-us",
    label: "About Us",
    route: "/about-us",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      {SETTINGS_LINKS.map((item) => (
        <Link
          key={item.key}
          href={item.route}
          className="flex-center-between rounded-lg !bg-primary p-5 text-lg !text-black"
        >
          <span>{item.label}</span>

          <ChevronRight size={22} />
        </Link>
      ))}
    </div>
  );
}
