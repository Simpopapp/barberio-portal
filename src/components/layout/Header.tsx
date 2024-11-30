import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Menu } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-barber-muted/20 bg-barber/95 backdrop-blur">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">Sr. Oliveira Barbearia</h1>
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
              <Button className="bg-barber-accent text-white">Entrar</Button>
            </DialogTrigger>
            <DialogContent>
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