"use client";

import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  // Pré-carregar as imagens
  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = "/amigo.png";
    img2.src = "/aceno.png";
  }, []);

  return (
    <section
      id="sobre"
      className="pt-20 pb-0 bg-black relative overflow-hidden"
    >
      {/* BG com movimento + gradiente */}
      <div className="absolute inset-0 -z-0">
        {/* Imagem 4.jpg no fundo */}
        <div
          className="absolute inset-0 bg-[url('/4.jpg')] bg-cover bg-center"
          aria-hidden
        />

        {/* Imagem amigo.png com Ken Burns - base */}
        <div
          className="absolute inset-0 bg-[url('/amigo.png')] bg-cover bg-center will-change-transform"
          style={{
            animation: "kenburns 20s ease-in-out infinite alternate",
            transformOrigin: "center",
          }}
          aria-hidden
        />

        {/* Imagem aceno.png com Ken Burns - overlay */}
        <div
          className="absolute inset-0 bg-[url('/aceno.png')] bg-cover bg-center will-change-transform"
          style={{
            animation: "kenburns 20s ease-in-out infinite alternate",
            transformOrigin: "center",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
          aria-hidden
        />

        {/* Gradiente escuro por cima */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/85"
          aria-hidden
        />
      </div>

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
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Texto centralizado */}
          <div className="flex flex-col justify-center lg:-translate-y-4 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
              O que <span className="text-primary">fazemos?</span>
            </h2>
            <div id="servicos" className="space-y-4 text-gray-300">
              <p>
                Na <span className="font-semibold text-primary">GaspLab</span>,
                acreditamos que a tecnologia deve ser prática, estratégica e
                orientada a resultados. Somos especialistas em Inteligência
                Artificial,{" "}
                <span className="font-semibold text-primary">automação</span> e{" "}
                <span className="font-semibold text-primary">
                  inovação digital
                </span>
                , desenvolvendo soluções que modernizam processos, fortalecem a
                relação com clientes e impulsionam o crescimento das empresas.
              </p>
              <p>
                Nosso time é formado por profissionais apaixonados por
                tecnologia, capazes de criar{" "}
                <span className="font-semibold text-primary">
                  softwares personalizados
                </span>
                ,{" "}
                <span className="font-semibold text-primary">
                  chatbots avançados
                </span>
                ,{" "}
                <span className="font-semibold text-primary">
                  integrações omnichannel
                </span>{" "}
                e sistemas de{" "}
                <span className="font-semibold text-primary">
                  CRM inteligente
                </span>
                .
              </p>
              <p>
                Combinamos{" "}
                <span className="font-semibold text-primary">
                  expertise técnica
                </span>{" "}
                e{" "}
                <span className="font-semibold text-primary">
                  visão de negócios
                </span>{" "}
                para que sua empresa aproveite ao máximo o potencial da
                transformação digital.
              </p>
            </div>
          </div>

          {/* Robo colado no rodapé - com hover suave */}
          <div
            className="relative flex items-end justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Borrão azul atrás - mais escuro */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-blue-800 opacity-60 blur-3xl rounded-full"></div>

            {/* Container fixo para as imagens */}
            <div className="relative w-full max-w-[960px] h-auto">
              {/* Imagem base - amigo.png */}
              <img
                src="/amigo.png"
                alt="GaspLab Technology"
                className="block w-full h-auto object-contain rounded-lg animate-[kenburnsImg_10s_ease-in-out_infinite_alternate]"
                style={{
                  opacity: isHovered ? 0 : 1,
                  transition: "opacity 0.8s ease-in-out",
                }}
              />

              {/* Imagem overlay - aceno.png */}
              <img
                src="/aceno.png"
                alt="GaspLab Technology"
                className="absolute top-0 left-0 block w-full h-auto object-contain rounded-lg animate-[kenburnsImg_10s_ease-in-out_infinite_alternate] pointer-events-none"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out",
                }}
              />
            </div>

            {/* Efeitos decorativos */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Keyframes Ken Burns */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.05) translate(0%, 0%); }
          50% { transform: scale(1.1) translate(2%, -2%); }
          100% { transform: scale(1.05) translate(-2%, 2%); }
        }
        @keyframes kenburnsImg {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(1%, -1%); }
          100% { transform: scale(1) translate(-1%, 1%); }
        }
      `}</style>
    </section>
  );
}
