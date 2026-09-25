import { PageShell } from "@/components/site-shell";
import { Legal } from "@/components/legal";
export const metadata = { title: "Termos de uso" };
export default function Terms() {
  return (
    <PageShell>
      <Legal title="Termos de uso" updated="25 de setembro de 2026">
        <p className="text-xs text-subtle">
          Razão social e CNPJ serão publicados após a formalização da empresa.
        </p>
        <h2>Quem oferece este site</h2>
        <p>
          O site gasplab.site é operado por Vinícius Gasparello sob a marca GaspLab, empresa de
          engenharia de software e inteligência artificial aplicada.
        </p>
        <h2>Finalidade</h2>
        <p>
          Este site apresenta a GaspLab, seu método e seus cases. O envio do diagnóstico não cria
          obrigação de contratação nem garante disponibilidade imediata.
        </p>
        <h2>Conteúdo e propriedade</h2>
        <p>
          Textos, identidade, interfaces e demais materiais pertencem à GaspLab ou são usados com
          autorização. Não é permitido reproduzi-los como oferta própria sem consentimento.
        </p>
        <h2>Propostas e contratação</h2>
        <p>
          Escopo, prazos, investimento, responsabilidades e tratamento de dados de cada projeto
          serão definidos em proposta ou contrato específico, celebrado fora deste site.
        </p>
        <h2>Alterações</h2>
        <p>
          Estes termos podem ser atualizados para refletir mudanças no site ou na operação da
          GaspLab. A data no topo desta página indica a versão vigente.
        </p>
        <h2>Contato</h2>
        <p>Dúvidas sobre estes termos podem ser enviadas para vinicius@gasplab.com.</p>
      </Legal>
    </PageShell>
  );
}
