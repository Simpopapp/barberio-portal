import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Menu, Scissors } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-barber-dark/95 backdrop-blur supports-[backdrop-filter]:bg-barber-dark/50">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Scissors className="h-6 w-6 text-barber-accent group-hover:rotate-45 transition-transform duration-300" />
              <div className="absolute inset-0 bg-barber-accent/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">
              Sr. Oliveira
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="relative group">
              <span className="text-barber-foreground/80 group-hover:text-barber-accent transition-colors">
                Início
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-barber-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link to="/search" className="p-2 rounded-full hover:bg-barber-highlight transition-colors group">
              <Search className="h-4 w-4 text-barber-foreground/80 group-hover:text-barber-accent transition-colors" />
            </Link>
            <Link to="/appointments" className="p-2 rounded-full hover:bg-barber-highlight transition-colors group">
              <Calendar className="h-4 w-4 text-barber-foreground/80 group-hover:text-barber-accent transition-colors" />
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="md:hidden hover:bg-barber-highlight">
            <Menu className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-barber-accent hover:bg-barber-accent/90 text-white font-medium hover-glow">
                Entrar
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card animate-scale-in">
              <DialogHeader>
                <DialogTitle>Entrar na sua conta</DialogTitle>
                <DialogDescription>
                  Faça login para agendar seus serviços
                </DialogDescription>
              </DialogHeader>
              {/* Login form will be added here */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}