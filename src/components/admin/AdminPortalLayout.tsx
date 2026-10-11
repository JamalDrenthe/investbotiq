import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface AdminPortalLayoutProps {
  children: React.ReactNode;
}

export default function AdminPortalLayout({ children }: AdminPortalLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
