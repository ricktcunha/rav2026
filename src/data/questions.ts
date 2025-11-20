import type { ArchetypeId } from './archetypes';

export interface QuizOption {
  text: string;
  archetype: ArchetypeId;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual sua maior motivação no agronegócio?',
    options: [
      { text: 'Transformar o mercado com inovação', archetype: 'pioneer' },
      { text: 'Bater metas e superar recordes', archetype: 'executor' },
      { text: 'Construir relacionamentos duradouros', archetype: 'connector' },
      { text: 'Criar estratégias vencedoras', archetype: 'strategist' }
    ]
  },
  {
    id: 2,
    question: 'Como você enfrenta desafios?',
    options: [
      { text: 'Analiso dados e crio um plano detalhado', archetype: 'strategist' },
      { text: 'Ajo rápido e ajusto no caminho', archetype: 'executor' },
      { text: 'Busco apoio da minha rede de contatos', archetype: 'connector' },
      { text: 'Vejo oportunidades onde outros veem problemas', archetype: 'visionary' }
    ]
  },
  {
    id: 3,
    question: 'Seu maior orgulho seria:',
    options: [
      { text: 'Revolucionar uma prática do setor', archetype: 'pioneer' },
      { text: 'Ter a maior carteira de clientes fiéis', archetype: 'cultivator' },
      { text: 'Liderar a equipe mais produtiva', archetype: 'visionary' },
      { text: 'Fechar a maior venda do ano', archetype: 'executor' }
    ]
  },
  {
    id: 4,
    question: 'O que te energiza no dia a dia?',
    options: [
      { text: 'Descobrir novas soluções e tecnologias', archetype: 'pioneer' },
      { text: 'Ver resultados concretos e imediatos', archetype: 'executor' },
      { text: 'Conectar pessoas e criar parcerias', archetype: 'connector' },
      { text: 'Acompanhar o crescimento sustentável', archetype: 'cultivator' }
    ]
  },
  {
    id: 5,
    question: 'Qual seu estilo de liderança?',
    options: [
      { text: 'Inspiro com grandes visões e ideias', archetype: 'visionary' },
      { text: 'Guio com dados e planejamento', archetype: 'strategist' },
      { text: 'Lidero pelo exemplo e ação', archetype: 'executor' },
      { text: 'Desenvolvo talentos com paciência', archetype: 'cultivator' }
    ]
  },
  {
    id: 6,
    question: 'Como você define sucesso?',
    options: [
      { text: 'Ser referência em inovação', archetype: 'pioneer' },
      { text: 'Atingir metas ambiciosas consistentemente', archetype: 'strategist' },
      { text: 'Ter uma rede sólida de parceiros', archetype: 'connector' },
      { text: 'Transformar o futuro do agronegócio', archetype: 'visionary' }
    ]
  }
];
