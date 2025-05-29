import { BarChart3, Package, Plus, TrendingUp, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/Logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Revenue Analysis",
    url: "/revenue",
    icon: TrendingUp,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Package,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <img src={logo} alt="logo" className="w-7 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Inventory System</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 uppercase text-xs font-semibold tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="w-full"
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 group"
                    >
                      <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
