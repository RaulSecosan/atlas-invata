import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AtlasThemeProvider from "./components/AtlasThemeProvider";
import Attendance from "./pages/Attendance";
import Index from "./pages/Index.tsx";
import AtlasLayout from "./components/AtlasLayout";
import Math from "./pages/Math";
import Geography from "./pages/Geography";
import GeographyQuiz from "./pages/GeographyQuiz";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <AtlasThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route element={<AtlasLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/calendar" element={<Attendance />} />
              <Route path="/matematica" element={<Math />} />
              <Route path="/geografie" element={<Geography />} />
              <Route path="/geografie/quiz" element={<GeographyQuiz />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AtlasThemeProvider>
);

export default App;
