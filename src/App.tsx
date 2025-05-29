import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // <-- changed here
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import Revenue from "./pages/Revenue";
import Inventory from "./pages/Inventory";
import { AppSidebar } from "./components/AppSidebar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      {" "}
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </HashRouter>
  </QueryClientProvider>
);

export default App;
