import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const expandSidebar = () => setIsExpanded(true);
  const collapseSidebar = () => setIsExpanded(false);
  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return <SidebarContext.Provider value={{ isExpanded, expandSidebar, collapseSidebar, mobileOpen, openMobile, closeMobile, toggleMobile }}>{children}</SidebarContext.Provider>;
};
