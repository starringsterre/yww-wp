import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Retreats from "./pages/Retreats";
import Kalender from "./pages/Kalender";
import Contact from "./pages/Contact";
import LidWorden from "./pages/LidWorden";
import VoorOrganisaties from "./pages/VoorOrganisaties";
import OntwikkelingWorkshops from "./pages/OntwikkelingWorkshops";
import Weekenden from "./pages/Weekenden";
import Jaarprogrammas from "./pages/Jaarprogrammas";
import LosseWorkshops from "./pages/LosseWorkshops";
import Inspiratie from "./pages/Inspiratie";
import Blogs from "./pages/Blogs";
import Podcasts from "./pages/Podcasts";
import WeekendIntensiveTransactie from "./pages/WeekendIntensiveTransactie";
import OverElla from "./pages/OverElla";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route
              path="/retreats/persoonlijke-ontwikkeling-dag-workshops"
              element={<OntwikkelingWorkshops />}
            />
            <Route
              path="/retreats/persoonlijke-ontwikkeling-weekend-training"
              element={<Weekenden />}
            />
            {/* Redirects from old URLs */}
            <Route path="/groepstrainingen" element={<Navigate to="/retreats" replace />} />
            <Route
              path="/groepstrainingen/ontwikkeling-workshops"
              element={<Navigate to="/retreats/persoonlijke-ontwikkeling-dag-workshops" replace />}
            />
            <Route
              path="/groepstrainingen/persoonlijke-ontwikkeling-weekend-training"
              element={<Navigate to="/retreats/persoonlijke-ontwikkeling-weekend-training" replace />}
            />
            <Route
              path="/groepstrainingen/weekenden"
              element={<Navigate to="/retreats/persoonlijke-ontwikkeling-weekend-training" replace />}
            />
            <Route
              path="/persoonlijke-ontwikkeling-weekend-training"
              element={<Navigate to="/retreats/persoonlijke-ontwikkeling-weekend-training" replace />}
            />
            <Route
              path="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
              element={<WeekendIntensiveTransactie />}
            />
            <Route
              path="/weekendintensive-juni-2026"
              element={
                <Navigate
                  to="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
                  replace
                />
              }
            />
            <Route path="/in-company" element={<VoorOrganisaties />} />
            <Route path="/in-company/jaarprogrammas" element={<Jaarprogrammas />} />
            <Route path="/in-company/workshops-op-maat" element={<LosseWorkshops />} />
            <Route path="/in-company/losse-workshops" element={<Navigate to="/in-company/workshops-op-maat" replace />} />
            <Route path="/inspiratie" element={<Inspiratie />} />
            <Route path="/inspiratie/evenementen" element={<Kalender />} />
            <Route path="/inspiratie/tools-en-handvatten" element={<Blogs />} />
            <Route path="/inspiratie/tools-en-handvatten/:slug" element={<BlogDetail />} />
            <Route path="/inspiratie/blogs" element={<Navigate to="/inspiratie/tools-en-handvatten" replace />} />
            <Route path="/inspiratie/podcasts" element={<Podcasts />} />
            <Route path="/trainingen" element={<Navigate to="/retreats" replace />} />
            <Route path="/voor-organisaties" element={<Navigate to="/in-company" replace />} />
            <Route path="/kalender" element={<Navigate to="/inspiratie/evenementen" replace />} />
            <Route path="/ons-verhaal" element={<Contact />} />
            <Route path="/ons-verhaal/over-ella" element={<OverElla />} />
            <Route path="/lid-worden" element={<LidWorden />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
