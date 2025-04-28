import { NavLink } from "react-router-dom";
import { Monitor, Settings, ShoppingCart, FileText, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    {
      title: "Preview Website",
      icon: <Monitor className="h-5 w-5" />,
      href: "/dashboard/preview",
    },
    {
      title: "Manage Website",
      icon: <Settings className="h-5 w-5" />,
      href: "/dashboard/manage",
    },
    {
      title: "Products",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/dashboard/products",
    },
    {
      title: "Content",
      icon: <FileText className="h-5 w-5" />,
      href: "/dashboard/content",
    },
    {
      title: "SEO",
      icon: <SearchIcon className="h-5 w-5" />,
      href: "/dashboard/seo",
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b px-6">
        <h1 className="text-xl font-bold text-blue-600">Business Hub</h1>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;