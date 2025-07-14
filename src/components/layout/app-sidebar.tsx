"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BrainCircuit,
  LayoutDashboard,
  RotateCw,
  Truck,
  Warehouse,
} from "lucide-react";

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
    { href: "/demand-forecaster", label: "Demand Forecaster", icon: BrainCircuit, tooltip: "Demand Forecaster" },
    { href: "/return-router", label: "Return Router", icon: RotateCw, tooltip: "Return Router" },
    { href: "/stock-relocation", label: "Stock Relocation", icon: Truck, tooltip: "Stock Relocation" },
  ];

  return (
    <SidebarContent className="p-0">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Warehouse className="size-7 text-primary transition-transform duration-300 group-hover/sidebar-wrapper:rotate-[360deg]" />
          <h1 className="text-xl font-bold font-headline transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">StoreFlowAI</h1>
        </Link>
      </SidebarHeader>
      <SidebarMenu className="p-4 pt-0">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.tooltip}
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <item.icon className="size-5" />
                <span className="transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
