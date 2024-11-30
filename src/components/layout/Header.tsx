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
            <Scissors className="h-6 w-6 text-barber-accent group-hover:rotate-45 transition-transform duration-300" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-barber-accent bg-clip-text text-transparent">
              Sr. Oliveira
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-barber-accent transition-colors">
              Início
            </Link>
            <Link to="/search" className="hover:text-barber-accent transition-colors">
              <Search className="h-4 w-4" />
            </Link>
            <Link to="/appointments" className="hover:text-barber-accent transition-colors">
              <Calendar className="h-4 w-4" />
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-barber-accent hover:bg-barber-accent/90 text-white font-medium">
                Entrar
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card">
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