import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell() {
  return (
    <div className="flex h-screen bg-[#0d1117] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Header />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0d1117] to-[#161b22] p-4 md:p-8 scroll-smooth">
          <div className="container mx-auto max-w-7xl animate-fade-in">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
