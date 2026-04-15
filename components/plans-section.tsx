"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function PlansSection() {
  const [api, setApi] = useState<CarouselApi>();

  // Mapeamento dos links do WhatsApp para cada plano
  const getWhatsAppLink = (planTitle: string) => {
    const links = {
      "Plano Atendimento Inteligente":
        "https://wa.me/5511951276991?text=Ol%C3%A1!%20Cheguei%20at%C3%A9%20aqui%20pelo%20Plano%20Atendimento%20Inteligente%20e%20tenho%20interesse%20em%20saber%20mais%20detalhes.",
      "Plano Comercial & Vendas":
        "https://wa.me/5511951276991?text=Ol%C3%A1!%20Cheguei%20at%C3%A9%20aqui%20pelo%20Plano%20Comercial%20%26%20Vendas%20e%20tenho%20interesse%20em%20saber%20mais%20detalhes.",
      "Plano Administrativo":
        "https://wa.me/5511951276991?text=Ol%C3%A1!%20Cheguei%20at%C3%A9%20aqui%20pelo%20Plano%20Administrativo%20e%20tenho%20interesse%20em%20saber%20mais%20detalhes.",
      "Plano Marketing Automático":
        "https://wa.me/5511951276991?text=Ol%C3%A1!%20Cheguei%20at%C3%A9%20aqui%20pelo%20Plano%20Marketing%20Autom%C3%A1tico%20e%20tenho%20interesse%20em%20saber%20mais%20detalhes.",
      "Plano Premium Personalizado":
        "https://wa.me/5511951276991?text=Ol%C3%A1!%20Cheguei%20at%C3%A9%20aqui%20pelo%20plano%20premium%20personalizado%20e%20tenho%20interesse%20em%20saber%20mais%20detalhes.",
    };
    return links[planTitle as keyof typeof links] || "#";
  };

  const plans = [
    {
      id: 1,
      title: "Plano Atendimento Inteligente",
      description:
        "Imagine nunca mais perder clientes porque não conseguiu responder rápido o suficiente.",
      details:
        "Com esse plano, você terá um assistente virtual 24h, que responde no WhatsApp, Instagram e site em segundos, aumentando conversão e fidelizando clientes.",
      features: [
        "Atendimentos instantâneos",
        "Respostas inteligentes personalizadas",
        "Relatórios semanais para acompanhar seus resultados",
      ],
      ideal: "Ideal para quem quer mais clientes sem aumentar equipe.",
      popular: false,
    },
    {
      id: 2,
      title: "Plano Comercial & Vendas",
      description: "Você ainda perde tempo filtrando leads ruins?",
      details:
        "Esse plano cria um funil automatizado, onde a IA capta, qualifica e entrega somente os contatos prontos para fechar negócio.",
      features: [
        "Geração automática de leads",
        "Qualificação inteligente (o cliente ideal vem até você)",
        "Integração com planilha ou CRM da sua empresa",
      ],
      ideal: "Indispensável para quem quer vender mais em menos tempo.",
      popular: true,
    },
    {
      id: 3,
      title: "Plano Administrativo",
      description:
        "Se sua empresa ainda perde horas com tarefas manuais, esse plano é para você.",
      details:
        "Deixe a IA cuidar da parte chata e foque no que realmente importa: crescer.",
      features: [
        "Relatórios financeiros prontos em segundos",
        "Organização de agenda automática",
        "Follow-ups e lembretes sem esforço",
      ],
      ideal: "Acelere sua gestão e ganhe horas livres toda semana.",
      popular: false,
    },
    {
      id: 4,
      title: "Plano Marketing Automático",
      description:
        "Você posta nas redes, mas não tem tempo de manter consistência?",
      details:
        "Com esse plano, a IA cria e publica para você, com legendas estratégicas e relatórios claros de desempenho.",
      features: [
        "Postagens automáticas e inteligentes",
        "Geração de legendas que convertem",
        "Relatórios de engajamento para saber o que funciona",
      ],
      ideal:
        "Mais presença digital, sem precisar contratar equipe de marketing.",
      popular: false,
    },
    {
      id: 5,
      title: "Plano Premium Personalizado",
      description: "Esse é para quem quer jogar em outro nível.",
      details:
        "Aqui, você terá um ecossistema completo de automação, unindo atendimento, vendas, gestão e marketing em uma solução feita sob medida.",
      features: [
        "Todos os benefícios dos outros planos",
        "Ajustes conforme sua necessidade",
        "Suporte prioritário e treinamento da equipe",
        "Relatórios avançados de performance",
      ],
      ideal:
        "O plano que transforma seu negócio em uma máquina de crescimento.",
      popular: false,
      premium: true,
    },
  ];

  // Encontra o índice do plano popular
  const popularPlanIndex = plans.findIndex((plan) => plan.popular);
  const [current, setCurrent] = useState(popularPlanIndex + 1);

  // Detecta mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 640px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in e ? e.matches : (e as MediaQueryList).matches);
    setIsMobile(mql.matches);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener(
        "change",
        onChange as (e: MediaQueryListEvent) => void
      );
      return () =>
        mql.removeEventListener(
          "change",
          onChange as (e: MediaQueryListEvent) => void
        );
    } else {
      // @ts-ignore
      mql.addListener(onChange);
      // @ts-ignore
      return () => mql.removeListener(onChange);
    }
  }, []);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  type Plan = (typeof plans)[number];

  const PlanCard = ({
    plan,
    isCenter = false,
    isMobile = false,
  }: {
    plan: Plan;
    isCenter?: boolean;
    isMobile?: boolean;
  }) => {
    const [showFeatures, setShowFeatures] = useState(!isMobile);
    const hasBadge = plan.popular || (plan as any).premium;

    return (
      <Card
        className={`
          backdrop-blur-sm border transition-all duration-500 ease-in-out
          flex flex-col h-full relative overflow-hidden mx-1 sm:mx-2
          transform-gpu will-change-transform
          ${
            isCenter
              ? isMobile
                ? "scale-100"
                : "scale-[1.15] shadow-2xl z-20"
              : isMobile
              ? "scale-100 opacity-95"
              : "scale-[0.85] opacity-80"
          }
          ${
            (plan as any).premium && isCenter
              ? "bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-400/60 shadow-blue-500/30"
              : "bg-black/70 border-white/20 hover:border-blue-400/40"
          }
          ${plan.popular && isCenter ? "border-blue-400/70 bg-blue-950/40" : ""}
          ${isMobile ? "rounded-xl" : ""}
          ${!isCenter && !isMobile ? "hover:scale-90 hover:opacity-90" : ""}
        `}
        style={{
          transitionProperty:
            "transform, opacity, background-color, border-color, box-shadow",
        }}
      >
        {(plan.popular || (plan as any).premium) && (
          <div
            className={`absolute z-30 ${
              isMobile ? "top-3 left-3" : "top-4 right-4"
            }`}
          >
            {plan.popular && (
              <span className="bg-blue-500/90 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow">
                ⭐ MAIS POPULAR
              </span>
            )}
            {(plan as any).premium && (
              <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow">
                ⭐ PREMIUM
              </span>
            )}
          </div>
        )}

        <CardHeader
          className={`${isMobile ? `${hasBadge ? "pt-8" : "pt-4"} px-4` : ""}`}
        >
          <h3
            className={`font-bold text-white mb-1 ${
              isMobile ? "text-lg" : isCenter ? "text-xl" : "text-lg"
            }`}
          >
            {plan.title}
          </h3>
          <p
            className={`${
              isMobile ? "text-[13px]" : isCenter ? "text-sm" : "text-xs"
            } text-blue-300/90`}
          >
            {plan.description}
          </p>
        </CardHeader>

        <CardContent className={`${isMobile ? "px-4" : ""} flex-grow`}>
          <p
            className={`${
              isMobile ? "text-[13px]" : isCenter ? "text-sm" : "text-xs"
            } text-gray-300 mb-3`}
          >
            {plan.details}
          </p>

          <button
            className="sm:hidden text-blue-400 text-sm underline underline-offset-4 mb-2"
            onClick={() => setShowFeatures((v) => !v)}
          >
            {showFeatures ? "Esconder recursos" : "Ver recursos"}
          </button>

          <ul
            className={`${
              showFeatures ? "block" : "hidden sm:block"
            } space-y-2 mb-3`}
          >
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-400 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span
                  className={`${
                    isMobile ? "text-[13px]" : isCenter ? "text-sm" : "text-xs"
                  } text-gray-200`}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <p
            className={`${
              isMobile ? "text-[13px]" : isCenter ? "text-sm" : "text-xs"
            } text-blue-400`}
          >
            💡 {plan.ideal}
          </p>
        </CardContent>

        {/* Footer fixo na parte inferior */}
        <CardFooter
          className={`${
            isMobile
              ? "px-4 pb-4 pt-2 sticky bottom-0 bg-transparent border-t border-white/10"
              : "mt-auto"
          }`}
        >
          <Button
            asChild
            className={`
              w-full ${
                isMobile
                  ? "text-sm py-2.5"
                  : isCenter
                  ? "text-base py-3"
                  : "text-sm py-2"
              }
              ${
                (plan as any).premium
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }
              text-white transition-all duration-300
            `}
          >
            <a
              href={getWhatsAppLink(plan.title)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {(plan as any).premium ? "Solicitar Orçamento" : "Escolher Plano"}
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <section
      id="planos"
      className="py-12 bg-black relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.8)), url('/3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Nossos <span className="text-blue-400">Planos</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Escolha o plano ideal para transformar seu negócio com Inteligência
            Artificial
          </p>
        </div>

        {/* Container do Carousel com altura reduzida */}
        <div className="relative mb-8 sm:mb-12">
          <div className="py-8 sm:py-12">
            <Carousel
              setApi={setApi}
              className="w-full [&_.embla__viewport]:overflow-visible [&_.embla__container]:flex [&_.embla__container]:items-center"
              opts={{
                align: "center",
                loop: true,
                duration: isMobile ? 20 : 35,
                startIndex: popularPlanIndex, // Inicia no plano popular
              }}
            >
              <CarouselContent
                className="-ml-3 md:-ml-4 items-center"
                style={{ minHeight: "480px" }}
              >
                {plans.map((plan, index) => (
                  <CarouselItem
                    key={plan.id}
                    className={`pl-3 md:pl-4 flex items-center justify-center ${
                      isMobile
                        ? "basis-full"
                        : "md:basis-2/5 lg:basis-1/3 xl:basis-2/5"
                    }`}
                    style={{ minHeight: "480px" }}
                  >
                    <div
                      className={`p-4 flex items-center justify-center w-full ${
                        isMobile ? "max-w-sm mx-auto" : "px-6"
                      }`}
                    >
                      <PlanCard
                        plan={plan}
                        isCenter={index === current - 1}
                        isMobile={isMobile}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden sm:flex bg-blue-500/20 hover:bg-blue-500/40 text-white border-blue-400/30 backdrop-blur-sm -left-12 lg:-left-16 transition-all duration-300 ease-in-out hover:scale-110" />
              <CarouselNext className="hidden sm:flex bg-blue-500/20 hover:bg-blue-500/40 text-white border-blue-400/30 backdrop-blur-sm -right-12 lg:-right-16 transition-all duration-300 ease-in-out hover:scale-110" />
            </Carousel>
          </div>
        </div>

        {/* Contador separado e fixo */}
        <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 transform ${
                index === current - 1
                  ? "bg-blue-400 scale-125 shadow-lg shadow-blue-400/50"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir para plano ${index + 1}`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-300 tabular-nums">
            {current}/{plans.length}
          </span>
        </div>

        <div className="text-center">
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm max-w-2xl mx-auto transition-all duration-300 hover:bg-blue-500/15 hover:border-blue-400/30">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              🎯 Não sabe qual plano escolher?
            </h3>
            <p className="text-gray-300 mb-5 sm:mb-6 text-base sm:text-lg">
              Converse conosco e descubra qual solução de IA é perfeita para o
              seu negócio
            </p>
            <Button
              asChild
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-base sm:text-lg w-full sm:w-auto"
            >
              <a
                href="https://wa.me/5511951276991?text=Ol%C3%A1!%20Encontrei%20o%20contato%20pelo%20site%20e%20gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20as%20solu%C3%A7%C3%B5es%20de%20intelig%C3%AAncia%20artificial%20podem%20ajudar%20o%20meu%20neg%C3%B3cio."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com Especialista
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* keyframes mantidos se você usa partículas */}
      <style jsx>{`
        @keyframes particle1 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(100px);
          }
        }
        @keyframes particle2 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(-50px);
          }
        }
        @keyframes particle3 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(150px);
          }
        }
        @keyframes particle4 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(-100px);
          }
        }
        @keyframes particle5 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(75px);
          }
        }
        @keyframes particle6 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(-150px);
          }
        }
        @keyframes particle7 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(200px);
          }
        }
        @keyframes particle8 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(-75px);
          }
        }
        @keyframes particle9 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(125px);
          }
        }
        @keyframes particle10 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(-125px);
          }
        }
        @keyframes particle11 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(175px);
          }
        }
        @keyframes particle12 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(-200px);
          }
        }
        @keyframes particle13 {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-100px) translateX(50px);
          }
        }
      `}</style>
    </section>
  );
}
