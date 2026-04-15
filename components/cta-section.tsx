import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CtaSection() {
  const whatsappLink =
    "https://wa.me/5511951276991?text=Ol%C3%A1!%20Encontrei%20o%20contato%20pelo%20site%20e%20gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20as%20solu%C3%A7%C3%B5es%20de%20intelig%C3%AAncia%20artificial%20podem%20ajudar%20o%20meu%20neg%C3%B3cio.";

  return (
    <section id="contato" className="py-20 bg-black relative overflow-hidden">
      {/* Partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute rounded-full animate-[particle1_15s_linear_infinite_-6s]"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#036cb9",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle2_20s_linear_infinite_-9s]"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#036cb9",
            opacity: 0.4,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle3_18s_linear_infinite_-3s]"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#036cb9",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle4_22s_linear_infinite_-12s]"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: "#036cb9",
            opacity: 0.7,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle5_16s_linear_infinite_-4s]"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#036cb9",
            opacity: 0.3,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle6_25s_linear_infinite_-13s]"
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "#036cb9",
            opacity: 0.4,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle7_19s_linear_infinite_-7s]"
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#036cb9",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle8_21s_linear_infinite_-10s]"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#036cb9",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle9_17s_linear_infinite_-5s]"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#036cb9",
            opacity: 0.8,
          }}
        />
        <div
          className="absolute rounded-full animate-[particle10_23s_linear_infinite_-11s]"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#036cb9",
            opacity: 0.45,
          }}
        />
        <div
          className="absolute rounded-full blur-sm animate-[particle11_28s_linear_infinite_-14s]"
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: "#036cb9",
            opacity: 0.2,
          }}
        />
        <div
          className="absolute rounded-full blur-sm animate-[particle12_26s_linear_infinite_-8s]"
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#036cb9",
            opacity: 0.3,
          }}
        />
        <div
          className="absolute rounded-full blur-sm animate-[particle13_24s_linear_infinite_-9s]"
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "#036cb9",
            opacity: 0.25,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Pronto para <span className="text-primary">transformar</span> seu
              negócio?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
              Está na hora de levar sua empresa para o próximo nível com{" "}
              <span className="font-semibold text-primary">
                Inteligência Artificial
              </span>
              .
              <br />
              <span className="inline-block mt-3 text-white">
                Fale com a GaspLab e descubra como podemos{" "}
                <span className="font-semibold text-primary">
                  automatizar processos
                </span>
                ,{" "}
                <span className="font-semibold text-primary">
                  aumentar sua produtividade
                </span>{" "}
                e{" "}
                <span className="font-semibold text-primary">
                  gerar mais resultados
                </span>
                .
              </span>
              <br />
              <span className="inline-block mt-3 text-white">
                📩 Entre em contato agora e agende uma demonstração exclusiva
                com nossos especialistas.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                >
                  Fale Conosco Agora
                </Button>
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-white/10 w-full"
                >
                  Agendar Demonstração
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
