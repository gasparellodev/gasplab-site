import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export function Header() {
  const whatsappLink =
    "https://wa.me/5511951276991?text=Ol%C3%A1!%20Encontrei%20o%20contato%20pelo%20site%20e%20gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20as%20solu%C3%A7%C3%B5es%20de%20intelig%C3%AAncia%20artificial%20podem%20ajudar%20o%20meu%20neg%C3%B3cio.";

  const instagramLink = "https://www.instagram.com/gasplab/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo-gasplab.png" alt="GaspLab" className="h-24 w-auto" />
        </div>

        {/* Navegação Centralizada - Ordem: Sobre > Planos > Contato */}
        <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <a
            href="#sobre"
            className="relative text-muted-foreground hover:text-foreground transition-colors group"
          >
            Sobre
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#036cb9] transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          <a
            href="#planos"
            className="relative text-muted-foreground hover:text-foreground transition-colors group"
          >
            Planos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#036cb9] transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          <a
            href="https://contaflow.gasplab.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-muted-foreground hover:text-foreground transition-colors group"
          >
            Contaflow
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#036cb9] transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          <a
            href="#contato"
            className="relative text-muted-foreground hover:text-foreground transition-colors group"
          >
            Contato
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#036cb9] transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
        </nav>

        {/* Área direita com Instagram (mobile) e Botão CTA */}
        <div className="flex items-center gap-3">
          {/* Ícone Instagram - Mobile e Desktop */}
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
          >
            <Instagram className="w-5 h-5 text-white" />
            <span className="hidden md:inline text-white font-medium">
              Instagram
            </span>
          </a>

          {/* Botão CTA */}
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Fale Conosco
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
