import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-7xl font-bold text-neutral-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
          Pagina niet gevonden
        </h2>
        <p className="text-neutral-600 mb-8">
          Sorry, de pagina die je zoekt bestaat niet. Ga terug naar de
          homepage en ontdek Young Wise Women!
        </p>
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-accent hover:scale-105"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug naar Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
