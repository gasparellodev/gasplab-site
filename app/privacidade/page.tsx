import { PageShell } from "@/components/site-shell";
import { Legal } from "@/components/legal";
export const metadata = { title: "Privacidade" };
export default function Privacy() {
  return (
    <PageShell>
      <Legal title="Política de privacidade" updated="25 de setembro de 2026">
        <p className="text-xs text-subtle">
          Razão social e CNPJ serão publicados após a formalização da empresa.
        </p>
        <h2>Quem trata os seus dados</h2>
        <p>
          Esta política se aplica aos dados coletados pelo site da GaspLab, operado por Vinícius
          Gasparello. Dúvidas ou solicitações podem ser enviadas para vinicius@gasplab.com.
        </p>
        <h2>Dados coletados no diagnóstico</h2>
        <p>
          No formulário de diagnóstico, coletamos nome, empresa, contato, segmento, interesse,
          gargalo descrito, URL opcional, consentimento e parâmetros de campanha (UTMs). Esses
          dados nunca são enviados para ferramentas de analytics.
        </p>
        <h2>Finalidade e base legal</h2>
        <p>
          Usamos esses dados para responder à solicitação, entender o cenário descrito e organizar
          o atendimento e uma eventual proposta. O tratamento tem como base legal o seu
          consentimento, dado no momento do envio do formulário.
        </p>
        <h2>Medição do site</h2>
        <p>
          Quando ativada, a medição do site registra somente eventos de navegação, sem enviar
          nome, e-mail, telefone ou o conteúdo do diagnóstico.
        </p>
        <h2>Operadores</h2>
        <p>
          Os dados podem ser tratados pelos seguintes operadores: Vercel (hospedagem do site),
          Neon (banco de dados), WhatsApp/Meta (quando o contato acontece por esse canal) e
          Cal.com (quando usado para agendamento). Cada operador trata os dados sob suas próprias
          políticas de privacidade.
        </p>
        <h2>Retenção</h2>
        <p>
          Os registros do diagnóstico são mantidos por até 12 meses após o último contato,
          podendo ser mantidos por prazo maior quando exigido por obrigação legal.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Conforme a Lei Geral de Proteção de Dados (LGPD), você pode solicitar a qualquer momento
          confirmação de tratamento, acesso, correção, exclusão, portabilidade dos seus dados e a
          revogação do consentimento dado. Basta escrever para vinicius@gasplab.com.
        </p>
      </Legal>
    </PageShell>
  );
}
