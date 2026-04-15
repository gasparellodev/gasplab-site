"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const whatsappLink =
    "https://wa.me/5511951276991?text=Ol%C3%A1!%20Encontrei%20o%20contato%20pelo%20site%20e%20gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20as%20solu%C3%A7%C3%B5es%20de%20intelig%C3%AAncia%20artificial%20podem%20ajudar%20o%20meu%20neg%C3%B3cio.";

  return (
    <section
      id="produtos"
      className="relative py-20 md:py-32 overflow-hidden bg-cover bg-center animate-backgroundZoom"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/1.jpg')",
        backgroundSize: "110%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay mais escuro com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90 -z-10"></div>

      {/* Sistema de Partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Partículas pequenas */}
        <div
          className="absolute rounded-full animate-[particle1_15s_linear_infinite_-6s]"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#036cb9",
            opacity: 0.6,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-[particle2_20s_linear_infinite_-9s]"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#036cb9",
            opacity: 0.4,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-[particle3_18s_linear_infinite_-3s]"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#036cb9",
            opacity: 0.5,
          }}
        ></div>
        <div
          className="absolute rounded-full animate_[particle4_22s_linear_infinite_-12s]"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: "#036cb9",
            opacity: 0.7,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-[particle5_16s_linear_infinite_-4s]"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#036cb9",
            opacity: 0.3,
          }}
        ></div>

        {/* Partículas médias */}
        <div
          className="absolute rounded-full animate-[particle6_25s_linear_infinite_-13s]"
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "#036cb9",
            opacity: 0.4,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-[particle7_19s_linear_infinite_-7s]"
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#036cb9",
            opacity: 0.6,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-[particle8_21s_linear_infinite_-10s]"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#036cb9",
            opacity: 0.35,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-[particle9_17s_linear_infinite_-5s]"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#036cb9",
            opacity: 0.8,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-[particle10_23s_linear_infinite_-11s]"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#036cb9",
            opacity: 0.45,
          }}
        ></div>

        {/* Partículas grandes com brilho */}
        <div
          className="absolute rounded-full blur-sm animate-[particle11_28s_linear_infinite_-14s]"
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: "#036cb9",
            opacity: 0.2,
          }}
        ></div>
        <div
          className="absolute rounded-full blur-sm animate-[particle12_26s_linear_infinite_-8s]"
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#036cb9",
            opacity: 0.3,
          }}
        ></div>
        <div
          className="absolute rounded-full blur-sm animate-[particle13_24s_linear_infinite_-9s]"
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "#036cb9",
            opacity: 0.25,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título com animação */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            Transforme seu negócio com{" "}
            <span className="text-primary animate-[pulseGlow_3s_ease-in-out_infinite]">
              Inteligência Artificial
            </span>
          </h1>

          {/* Parágrafo */}
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-pretty opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            A GaspLab ajuda sua empresa a crescer com soluções inteligentes em{" "}
            <span className="font-semibold text-primary">
              Inteligência Artificial
            </span>{" "}
            e{" "}
            <span className="font-semibold text-primary">
              automação de processos
            </span>
            . Desenvolvemos softwares sob medida, criamos sistemas de alto
            desempenho e aplicamos{" "}
            <span className="font-semibold text-primary">inovação digital</span>{" "}
            para aumentar sua produtividade e gerar resultados reais.
            <br />
            <span className="inline-block mt-3 text-white font-medium">
              Comece hoje mesmo a transformar seu negócio com tecnologia de
              ponta.
            </span>
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Começar Agora
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200 hover:shadow-md"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Saiba Mais
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-[floatUp_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-[floatDown_8s_ease-in-out_2s_infinite]"></div>
      </div>

      {/* Estilos CSS inline para animações */}
      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }

        @keyframes floatUp {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes floatDown {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes backgroundZoom {
          0% {
            background-size: 110%;
          }
          50% {
            background-size: 120%;
          }
          100% {
            background-size: 110%;
          }
        }
        .animate-backgroundZoom {
          animation: backgroundZoom 10s ease-in-out infinite;
        }

        /* Animações das Partículas */
        @keyframes particle1 {
          0% {
            transform: translate(-10px, 80vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.6;
          }
          95% {
            opacity: 0.6;
          }
          100% {
            transform: translate(20vw, -10px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes particle2 {
          0% {
            transform: translate(10vw, 90vh) rotate(0deg);
            opacity: 0;
          }
          8% {
            opacity: 0.4;
          }
          92% {
            opacity: 0.4;
          }
          100% {
            transform: translate(30vw, -10px) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes particle3 {
          0% {
            transform: translate(20vw, 70vh) rotate(0deg);
            opacity: 0;
          }
          3% {
            opacity: 0.5;
          }
          97% {
            opacity: 0.5;
          }
          100% {
            transform: translate(40vw, -10px) rotate(270deg);
            opacity: 0;
          }
        }
        @keyframes particle4 {
          0% {
            transform: translate(30vw, 85vh) rotate(0deg);
            opacity: 0;
          }
          6% {
            opacity: 0.7;
          }
          94% {
            opacity: 0.7;
          }
          100% {
            transform: translate(50vw, -10px) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes particle5 {
          0% {
            transform: translate(40vw, 95vh) rotate(0deg);
            opacity: 0;
          }
          4% {
            opacity: 0.3;
          }
          96% {
            opacity: 0.3;
          }
          100% {
            transform: translate(60vw, -10px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes particle6 {
          0% {
            transform: translate(50vw, 75vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.4;
          }
          95% {
            opacity: 0.4;
          }
          100% {
            transform: translate(70vw, -10px) rotate(270deg);
            opacity: 0;
          }
        }
        @keyframes particle7 {
          0% {
            transform: translate(60vw, 88vh) rotate(0deg);
            opacity: 0;
          }
          6% {
            opacity: 0.6;
          }
          94% {
            opacity: 0.6;
          }
          100% {
            transform: translate(80vw, -10px) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes particle8 {
          0% {
            transform: translate(70vw, 78vh) rotate(0deg);
            opacity: 0;
          }
          7% {
            opacity: 0.35;
          }
          93% {
            opacity: 0.35;
          }
          100% {
            transform: translate(90vw, -10px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes particle9 {
          0% {
            transform: translate(80vw, 92vh) rotate(0deg);
            opacity: 0;
          }
          4% {
            opacity: 0.8;
          }
          96% {
            opacity: 0.8;
          }
          100% {
            transform: translate(100vw, -10px) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes particle10 {
          0% {
            transform: translate(90vw, 82vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.45;
          }
          95% {
            opacity: 0.45;
          }
          100% {
            transform: translate(110vw, -10px) rotate(270deg);
            opacity: 0;
          }
        }
        @keyframes particle11 {
          0% {
            transform: translate(5vw, 85vh) rotate(0deg);
            opacity: 0;
          }
          8% {
            opacity: 0.2;
          }
          92% {
            opacity: 0.2;
          }
          100% {
            transform: translate(25vw, -10px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes particle12 {
          0% {
            transform: translate(75vw, 77vh) rotate(0deg);
            opacity: 0;
          }
          6% {
            opacity: 0.3;
          }
          94% {
            opacity: 0.3;
          }
          100% {
            transform: translate(95vw, -10px) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes particle13 {
          0% {
            transform: translate(45vw, 83vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.25;
          }
          95% {
            opacity: 0.25;
          }
          100% {
            transform: translate(65vw, -10px) rotate(270deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
