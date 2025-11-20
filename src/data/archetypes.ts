export type ArchetypeId = 'pioneer' | 'strategist' | 'connector' | 'executor' | 'cultivator' | 'visionary';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  icon: string;
  description: string;
  characteristics: string[];
  motivationalPhrase: string;
  actionTips: string[];
  color: string;
}

export const archetypes: Record<ArchetypeId, Archetype> = {
  pioneer: {
    id: 'pioneer',
    name: 'O Pioneiro',
    icon: 'Sprout',
    description: 'Você é um inovador nato! Busca constantemente novas oportunidades e não tem medo de ser o primeiro a explorar territórios desconhecidos.',
    characteristics: [
      'Inovador e visionário',
      'Busca oportunidades únicas',
      'Não teme o desconhecido',
      'Inspira mudanças no mercado'
    ],
    motivationalPhrase: 'Você não segue tendências, você as cria!',
    actionTips: [
      'Continue explorando novas tecnologias e práticas',
      'Compartilhe suas descobertas com o mercado',
      'Seja a referência em inovação do setor'
    ],
    color: '#00ff88'
  },
  strategist: {
    id: 'strategist',
    name: 'O Estrategista',
    icon: 'Target',
    description: 'Você é movido por dados e planejamento! Cada decisão é calculada, cada meta é alcançável através de estratégias bem definidas.',
    characteristics: [
      'Analítico e planejador',
      'Orientado por dados e métricas',
      'Pensa a longo prazo',
      'Minimiza riscos com inteligência'
    ],
    motivationalPhrase: 'Seu planejamento transforma desafios em vitórias certas!',
    actionTips: [
      'Continue refinando suas análises de mercado',
      'Documente suas estratégias vencedoras',
      'Ensine sua metodologia para a equipe'
    ],
    color: '#3b82f6'
  },
  connector: {
    id: 'connector',
    name: 'O Conectador',
    icon: 'Users',
    description: 'Você constrói pontes! Sua maior força está nos relacionamentos duradouros e na capacidade de criar redes poderosas de parceiros.',
    characteristics: [
      'Mestre em relacionamentos',
      'Constrói redes de confiança',
      'Valoriza parcerias de longo prazo',
      'Transforma contatos em oportunidades'
    ],
    motivationalPhrase: 'Seu networking é seu maior patrimônio!',
    actionTips: [
      'Continue expandindo sua rede de contatos',
      'Fortaleça parcerias estratégicas',
      'Seja o elo entre pessoas e oportunidades'
    ],
    color: '#f59e0b'
  },
  executor: {
    id: 'executor',
    name: 'O Executor',
    icon: 'Zap',
    description: 'Você é pura energia e ação! Enquanto outros planejam, você já está executando e gerando resultados concretos.',
    characteristics: [
      'Alta energia e velocidade',
      'Foco em resultados imediatos',
      'Transforma ideias em ação',
      'Supera metas consistentemente'
    ],
    motivationalPhrase: 'Você não espera acontecer, você faz acontecer!',
    actionTips: [
      'Canalize sua energia em metas desafiadoras',
      'Inspire a equipe com sua velocidade',
      'Celebre cada vitória conquistada'
    ],
    color: '#ef4444'
  },
  cultivator: {
    id: 'cultivator',
    name: 'O Cultivador',
    icon: 'Leaf',
    description: 'Você entende que grandes colheitas vêm de cuidado constante! Sua visão de longo prazo e paciência geram crescimento sustentável.',
    characteristics: [
      'Visão de longo prazo',
      'Crescimento sustentável',
      'Paciência estratégica',
      'Cultiva relacionamentos e resultados'
    ],
    motivationalPhrase: 'Você planta hoje as sementes do sucesso de amanhã!',
    actionTips: [
      'Continue nutrindo seus projetos de longo prazo',
      'Valorize o crescimento consistente',
      'Seja exemplo de sustentabilidade no negócio'
    ],
    color: '#84cc16'
  },
  visionary: {
    id: 'visionary',
    name: 'O Visionário',
    icon: 'Lightbulb',
    description: 'Você enxerga além do horizonte! Suas ideias transformadoras e liderança inspiradora movem pessoas e mercados.',
    characteristics: [
      'Pensa em grande escala',
      'Lidera com inspiração',
      'Transforma visões em realidade',
      'Influencia o futuro do setor'
    ],
    motivationalPhrase: 'Sua visão ilumina o caminho para o futuro!',
    actionTips: [
      'Continue compartilhando sua visão transformadora',
      'Inspire outros a sonhar grande',
      'Lidere a mudança que o setor precisa'
    ],
    color: '#a855f7'
  }
};
