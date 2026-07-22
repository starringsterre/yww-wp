import "./global.css";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { prefetchCalendly } from "@/lib/prefetchCalendly";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Kalender from "./pages/Kalender";
import Contact from "./pages/Contact";
import ContactPage from "./pages/ContactPage";
import LidWorden from "./pages/LidWorden";
import VoorOrganisaties from "./pages/VoorOrganisaties";
import VoorConsultancy from "./pages/VoorConsultancy";
import OnzeAanpak from "./pages/OnzeAanpak";
import Weekenden from "./pages/Weekenden";
import BusinessRetreats from "./pages/BusinessRetreats";
import Jaarprogrammas from "./pages/Jaarprogrammas";
import PilotProgramma from "./pages/PilotProgramma";

import Inspiratie from "./pages/Inspiratie";
import Blogs from "./pages/Blogs";
import Podcasts from "./pages/Podcasts";
import WeekendIntensiveTransactie from "./pages/WeekendIntensiveTransactie";
import WeekendIntensiveOktoberTransactie from "./pages/WeekendIntensiveOktoberTransactie";
import IntroductieWorkshopTransactie from "./pages/IntroductieWorkshopTransactie";
import OverElla from "./pages/OverElla";
import BlogDetail from "./pages/BlogDetail";
import HetTeam from "./pages/HetTeam";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    prefetchCalendly();
  }, []);
  return (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Aanbod routes */}
            <Route path="/aanbod/workshops" element={<VoorOrganisaties />} />
            <Route path="/aanbod/workshops/jaarprogramma" element={<Jaarprogrammas />} />
            <Route path="/aanbod/business-retreats" element={<BusinessRetreats />} />
            <Route path="/pilot-programma" element={<PilotProgramma />} />
            <Route path="/voor-consultancy" element={<VoorConsultancy />} />

            {/* B2C routes (verborgen uit navigatie, bereikbaar via directe URL) */}
            <Route path="/voor-professionals" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route
              path="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
              element={<WeekendIntensiveTransactie />}
            />
            <Route
              path="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-oktober-2026"
              element={<WeekendIntensiveOktoberTransactie />}
            />
            <Route
              path="/introductie-workshop-persoonlijk-leiderschap-april-2026"
              element={<IntroductieWorkshopTransactie />}
            />

            {/* Methode & About */}
            <Route path="/onze-aanpak" element={<OnzeAanpak />} />
            <Route path="/ons-verhaal" element={<Contact />} />
            <Route path="/ons-verhaal/over-ella" element={<OverElla />} />

            {/* Inspiratie */}
            <Route path="/inspiratie" element={<Inspiratie />} />
            <Route path="/inspiratie/evenementen" element={<Kalender />} />
            <Route path="/inspiratie/tools-en-handvatten" element={<Blogs />} />
            <Route path="/inspiratie/tools-en-handvatten/:slug" element={<BlogDetail />} />
            <Route path="/inspiratie/blogs" element={<Navigate to="/inspiratie/tools-en-handvatten" replace />} />
            <Route path="/inspiratie/podcasts" element={<Podcasts />} />

            {/* Contact */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Legacy redirects */}
            <Route path="/bedrijfstrajecten" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/bedrijfstrajecten/jaarprogramma" element={<Navigate to="/aanbod/workshops#jaarprogrammas" replace />} />
            <Route path="/bedrijfstrajecten/workshops" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/bedrijfstrajecten/jaarprogrammas" element={<Navigate to="/aanbod/workshops/jaarprogramma" replace />} />
            <Route path="/in-company" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/in-company/jaarprogrammas" element={<Navigate to="/aanbod/workshops/jaarprogramma" replace />} />
            <Route path="/in-company/workshops-op-maat" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/in-company/losse-workshops" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/in-company/workshops" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/voor-organisaties" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/voor-organisaties/jaarprogramma" element={<Navigate to="/aanbod/workshops/jaarprogramma" replace />} />
            <Route path="/voor-organisaties/workshops" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/retreats" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route path="/groepstrainingen" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route path="/groepstrainingen/ontwikkeling-workshops" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route path="/groepstrainingen/persoonlijke-ontwikkeling-weekend-training" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route path="/groepstrainingen/weekenden" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route path="/persoonlijke-ontwikkeling-weekend-training" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route path="/retreats/persoonlijke-ontwikkeling-dag-workshops" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route path="/retreats/persoonlijke-ontwikkeling-weekend-training" element={<Navigate to="/aanbod/business-retreats" replace />} />
            <Route
              path="/weekendintensive-juni-2026"
              element={
                <Navigate
                  to="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
                  replace
                />
              }
            />
            <Route path="/trainingen" element={<Navigate to="/aanbod/workshops" replace />} />
            <Route path="/kalender" element={<Navigate to="/inspiratie/evenementen" replace />} />
            <Route path="/lid-worden" element={<LidWorden />} />

            <Route path="/ons-verhaal/het-team" element={<HetTeam />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
