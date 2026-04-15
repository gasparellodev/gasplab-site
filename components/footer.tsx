import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-black pt-0 pb-6 relative overflow-hidden">
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
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 text-center md:text-left">
            <div className="flex items-center mb-0 justify-center md:justify-start -mt-4">
              <img
                src="/logo-gasplab.png"
                alt="GaspLab"
                className="h-22 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4 mt-2 max-w-md mx-auto md:mx-0">
              Criamos novas tecnologias e possibilitamos que o empreendedor
              produza mais com menos trabalho.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/gasplab/"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/5511951276991"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold text-white mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  IA de Atendimento
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Chatbots
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  CRM com IA
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">vinicius@gasplab.com</li>
              <li className="text-gray-300">+55 (11) 95127-6991</li>
              <li className="text-gray-300">Alphaville, SP</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-300 text-sm">
            © 2025 GaspLab. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 justify-center">
            <a
              href="#"
              className="text-gray-300 hover:text-primary transition-colors text-sm"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-primary transition-colors text-sm"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
