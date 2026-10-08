// Dicionário de UI PT/EN. O idioma é resolvido uma vez por carga de página
// (?lang → localStorage → navigator) e trocar de idioma recarrega a página,
// para que quiz e resultados sejam rebuscados já no idioma novo.
import type { PersonalityCategory, ProfileDimension } from '../types/quiz';

export type Lang = 'pt' | 'en' | 'nl';
const LANGS: Lang[] = ['pt', 'en', 'nl'];
function isLang(v: string | null): v is Lang {
  return v !== null && (LANGS as string[]).includes(v);
}

const STORAGE_KEY = '12axes-lang';

// Idioma forçado pelo caminho: /en sempre inglês, /br sempre português,
// independente do aparelho ou da preferência salva.
function langForcedByPath(pathname: string): Lang | null {
  const path = (pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/');
  if (path === '/en') return 'en';
  if (path === '/br') return 'pt';
  if (path === '/nl') return 'nl';
  return null;
}

export function resolveLang(): Lang {
  if (typeof window === 'undefined') {
    return 'pt';
  }
  const forced = langForcedByPath(window.location.pathname);
  if (forced) {
    return forced;
  }
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) {
    window.localStorage.setItem(STORAGE_KEY, fromUrl);
    return fromUrl;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(stored)) {
    return stored;
  }
  const nav = navigator.language?.toLowerCase() ?? '';
  if (nav.startsWith('pt')) return 'pt';
  if (nav.startsWith('nl')) return 'nl';
  return 'en';
}

export const LANG: Lang = resolveLang();

export function setLang(lang: Lang) {
  window.localStorage.setItem(STORAGE_KEY, lang);
  const url = new URL(window.location.href);
  url.searchParams.delete('lang');
  // Em /en ou /br a URL é o que define o idioma, então o toggle troca de rota.
  if (langForcedByPath(url.pathname)) {
    url.pathname = lang === 'en' ? '/en' : lang === 'nl' ? '/nl' : '/br';
  }
  window.location.href = url.toString();
}

interface QuizFormatStrings {
  label: string;
  questionCount: string;
  description: string;
  duration: string;
  action: string;
}

interface Strings {
  htmlLang: string;
  docTitle: string;
  loadingAnalysis: string;
  loadingQuiz: string;
  loadingResult: string;
  tryAgain: string;
  crashTitle: string;
  crashBody: string;
  crashBodyWithProgress: string;
  crashReload: string;
  resumeEyebrow: string;
  resumeTitle: string;
  resumeBody: (answered: number, total: number) => string;
  resumeContinue: string;
  resumeDiscard: string;
  resumeUnavailable: string;
  skipToContent: string;
  backToStartAria: string;
  mainNavAria: string;
  navHow: string;
  navAxes: string;
  navSpectrum: string;
  navFaq: string;
  navIdeologies: string;
  navPersonalities: string;
  navCountries: string;
  navSupport: string;
  langToggleLabel: string;
  langToggleAria: string;
  redoQuiz: string;
  religionLabel: string;
  religionQuestion: string;
  religionNone: string;
  religionNames: Record<'christianity' | 'judaism' | 'islam' | 'buddhism', string>;
  denominationLabel: string;
  denominationQuestion: string;
  denominationNames: Record<'catholic' | 'protestant' | 'orthodox', string>;
  restartQuiz: string;
  heroEyebrow: string;
  h1Pre: string;
  h1Em: string;
  h1Post: string;
  introLead: string;
  startQuiz: string;
  seeAxes: string;
  heroLabels: string[];
  heroTeaserLabel: string;
  heroTeaserTag: string;
  formats: { short: QuizFormatStrings; extended: QuizFormatStrings; extreme: QuizFormatStrings };
  axisExplanations: Record<string, string>;
  axisInfoAria: (label: string) => string;
  closeLabel: string;
  personalityInfoAria: (name: string) => string;
  closenessTitle: string;
  closenessYou: string;
  compareEyebrow: string;
  compareTitle: string;
  compareLead: string;
  compareSearchLabel: string;
  compareSearchPlaceholder: string;
  compareView: string;
  compareAxesTitle: string;
  compareNoResults: string;
  compareLoading: string;
  compareLoadError: string;
  compareTypeLabels: Record<'personality' | 'country' | 'ideology', string>;
  compareAxisAdverbs: Partial<Record<string, string>>;
  compareClosestLine: (adverb: string, name: string) => string;
  compareFarthestLine: (adverb: string, name: string) => string;
  compareClosestFallback: (axis: string, name: string) => string;
  compareFarthestFallback: (axis: string, name: string) => string;
  compareIdentical: (name: string) => string;
  compareNearestLine: (axis: string, name: string) => string;
  compareNoFarLine: (name: string) => string;
  compareValues: (pole: string, you: number, them: number, name: string) => string;
  compareOptionAria: (name: string, type: string) => string;
  homeAxes: Record<string, { label: string; leftPole: string; rightPole: string }>;
  spectrumItems: { id: string; label: string; tone: string; description: string }[];
  faqItems: { question: string; answer: string }[];
  howEyebrow: string;
  howTitle: string;
  howLead: string;
  steps: { title: string; text: string }[];
  axesGuideEyebrow: string;
  axesGuideTitle: string;
  axesGuideLead: string;
  discoveryEyebrow: string;
  discoveryTitle: string;
  discoveryLead: string;
  discoveryItems: { icon: string; title: string; text: string }[];
  exampleEyebrow: string;
  exampleTitle: string;
  exampleCaption: string;
  exampleCta: string;
  spectrumEyebrow: string;
  spectrumTitle: string;
  spectrumLead: string;
  faqTitle: string;
  faqLead: string;
  navStart: string;
  menuAria: string;
  roseAria: string;
  spectrumBarAria: string;
  versionsEyebrow: string;
  versionsTitle: string;
  versionsLead: string;
  variantEyebrow: string;
  variantTitlePre: string;
  variantTitleEm: string;
  backToStart: string;
  depthLabel: string;
  depthAria: (level: number) => string;
  recommended: string;
  formatNotes: string[];
  variantLead: string;
  quizNavAria: string;
  autoAdvance: string;
  back: string;
  next: string;
  calculating: string;
  seeResult: string;
  archetypeSkip: string;
  errMissingAnswer: string;
  errLoadQuiz: string;
  errCalc: string;
  errImage: string;
  errHttp: (status: number) => string;
  resultsEyebrow: string;
  resultsH1Pre: string;
  resultsH1Em: string;
  resultsLead: (count: number) => string;
  resultsLeadShared: string;
  resultsSummaryAria: string;
  metaAnswered: string;
  metaAxes: string;
  metaTop: string;
  axesSectionEyebrow: string;
  axesSectionTitle: string;
  proximityEyebrow: string;
  otherMatches: string;
  navOnThisPage: string;
  resultsNavAxes: string;
  resultsNavSignature: string;
  resultsNavCountries: string;
  resultsNavPersonalities: string;
  resultsNavAreas: string;
  resultsNavBooks: string;
  resultsNavIdeologies: string;
  countriesSectionTitle: string;
  countryCurrentTab: string;
  countryHistoricalTab: string;
  countriesDistantTitle: string;
  personalitiesSectionTitle: string;
  personalitiesByAreaTitle: string;
  dimensionsTitle: string;
  dimensionLabels: Record<ProfileDimension, string>;
  areasGeneralTitle: string;
  booksEyebrow: string;
  booksTitle: string;
  booksTopLabel: string;
  booksAuthorLabel: string;
  booksLead: string;
  booksWhy: (pct: number) => string;
  booksYearBc: (year: number) => string;
  booksCta: string;
  areasSectionTitle: string;
  areasTabsAria: string;
  areasGeneralTab: string;
  areasByAreaTab: string;
  personalitiesDistantTitle: string;
  ideologyDistantTitle: string;
  phraseTitle: string;
  phraseNote: (ideology: string) => string;
  signatureTitle: string;
  signatureUnusualLabel: string;
  signatureCommonLabel: string;
  signatureUnusualLead: (pole: string, percent: number) => string;
  signatureUnusualLeadMax: (pole: string) => string;
  signatureUnusualLeadBalanced: (axis: string, pole: string, percent: number) => string;
  signatureUnusualNote: (axis: string) => string;
  signatureCommonLead: (axis: string) => string;
  signatureCommonNote: (pole: string) => string;
  signatureCommonNoteBalanced: (axis: string) => string;
  tensionLabel: string;
  tensionCombo: (firstPole: string, secondPole: string) => string;
  tensionRare: (count: number, total: number) => string;
  tensionUnique: string;
  tensionExamples: (names: string) => string;
  tensionNote: (firstAxis: string, secondAxis: string) => string;
  signatureMedian: string;
  signatureYou: string;
  personalityCategories: Record<PersonalityCategory, string>;
  redoAnalysis: string;
  share: string;
  saveOrShare: string;
  generatingPng: string;
  downloadPdf: string;
  generatingPdf: string;
  report: {
    fileName: string;
    docLabel: string;
    profileEyebrow: string;
    headerLabel: (ideology: string) => string;
    kpiCountry: string;
    kpiPersonality: string;
    kpiAxes: string;
    kpiAnswered: (count: number) => string;
    tocTitle: string;
    generatedOn: (date: string) => string;
    axesIntro: string;
    intensityLegend: string;
    intensityLevels: [string, string, string, string];
    alsoClose: string;
    continued: string;
    areasIntro: string;
    booksIntro: string;
    aboutTitle: string;
    aboutText: string;
    ctaTitle: string;
  };
  shareFilePrefix: string;
  shareMessage: (
    ideology: string,
    ideologyPct: number,
    country: string,
    countryPct: number,
    personality: string,
    personalityPct: number
  ) => string;
  progress: (current: number, total: number) => string;
  progressDone: (percent: number) => string;
  archetypeHeader: string;
  archetypeStep: (current: number, total: number) => string;
  progressAria: (percent: number) => string;
  answersAria: string;
  countryKicker: string;
  flagLabel: string;
  flagHistoricLabel: string;
  flagAlt: (label: string, name: string) => string;
  flagUnavailable: string;
  flagUnavailableAria: (name: string) => string;
  personalityKicker: string;
  portraitAlt: (name: string) => string;
  portraitUnavailableAria: (name: string) => string;
  compatibilityAria: (pct: string) => string;
  matchWord: string;
  shareTitle: string;
  shareTopMatch: string;
  shareCountry: string;
  sharePersonality: string;
  shareResultLabel: string;
  shareMostCompatible: string;
  shareYourAxes: string;
  shareOtherPersonalities: string;
  shareNearbyCountries: string;
  shareFooterCta: string;
  shareFooterUrl: string;
  supportEyebrow: string;
  supportTitle: string;
  ossEyebrow: string;
  ossTitle: string;
  ossLead: string;
  ossCards: { title: string; text: string }[];
  ossBarText: string;
  ossGithubCta: string;
  ossIssueCta: string;
  feedbackTitle: string;
  feedbackReport: string;
  feedbackSuggest: string;
  supportTitleEm: string;
  supportLead: string;
  supportPrivacyNote: string;
  supportCopy: string;
  supportCopied: string;
  supportCopyAria: (label: string) => string;
  supportCoins: {
    id: string;
    name: string;
    network: string;
    address: string;
  }[];
}

const pt: Strings = {
  htmlLang: 'pt-BR',
  docTitle: '12 Axes — Quiz Político e Teste Ideológico em 12 Eixos',
  loadingAnalysis: 'Carregando análise política...',
  loadingQuiz: 'Carregando quiz...',
  loadingResult: 'Carregando resultado...',
  tryAgain: 'Tentar novamente',
  crashTitle: 'Algo deu errado',
  crashBody: 'A página encontrou um erro inesperado. Recarregue para tentar de novo.',
  crashBodyWithProgress: 'A página encontrou um erro inesperado, mas suas respostas estão guardadas. Recarregue e escolha continuar de onde parou.',
  crashReload: 'Recarregar a página',
  resumeEyebrow: 'Quiz em andamento',
  resumeTitle: 'Continue de onde parou',
  resumeBody: (answered, total) => `Você já respondeu ${answered} de ${total} perguntas. Suas respostas estão guardadas neste navegador.`,
  resumeContinue: 'Continuar',
  resumeDiscard: 'Começar de novo',
  resumeUnavailable: 'Não foi possível retomar o quiz anterior. Comece um novo.',
  skipToContent: 'Pular para o conteúdo',
  backToStartAria: 'Voltar para o início',
  mainNavAria: 'Navegação principal',
  navHow: 'Como funciona',
  navAxes: '12 Eixos',
  navSpectrum: 'Espectro',
  navFaq: 'FAQ',
  navIdeologies: 'Ideologias',
  navPersonalities: 'Personalidades',
  navCountries: 'Países',
  navSupport: 'Apoie',
  langToggleLabel: 'EN',
  langToggleAria: 'Switch to English',
  redoQuiz: 'Refazer quiz',
  religionLabel: 'Religião',
  religionQuestion: 'Você segue alguma religião? Usamos isso só para ajustar as recomendações.',
  religionNone: 'Sem religião',
  religionNames: { christianity: 'Cristianismo', judaism: 'Judaísmo', islam: 'Islamismo', buddhism: 'Budismo' },
  denominationLabel: 'Vertente cristã',
  denominationQuestion: 'Qual é a sua vertente cristã? Usamos isso só para ajustar as recomendações.',
  denominationNames: { catholic: 'Católica', protestant: 'Protestante', orthodox: 'Ortodoxa' },
  restartQuiz: 'Reiniciar quiz',
  heroEyebrow: 'Descoberta política',
  h1Pre: 'Você sabe mesmo qual é a sua ',
  h1Em: 'ideologia política',
  h1Post: '?',
  introLead:
    'Talvez você esteja se classificando errado. Em poucos minutos, descubra sua ideologia real, o país que mais pensa como você e o líder político mais parecido com suas ideias.',
  startQuiz: 'Descobrir meu perfil',
  seeAxes: 'Ver os 12 eixos',
  heroLabels: ['Gratuito', 'Anônimo', 'Rápido', 'Resultado imediato'],
  heroTeaserLabel: 'match',
  heroTeaserTag: 'Exemplo de resultado',
  formats: {
    short: {
      label: 'Curta',
      questionCount: '36 perguntas',
      description: 'Resultado rápido, ideal para uma primeira leitura do seu perfil',
      duration: 'Aprox. 5 min',
      action: 'Começar versão curta'
    },
    extended: {
      label: 'Completa',
      questionCount: '60 perguntas',
      description: 'Mais precisão para aproximar seu resultado dos perfis ideológicos.',
      duration: 'Aprox. 9 min',
      action: 'Começar versão completa'
    },
    extreme: {
      label: 'Extrema',
      questionCount: '240 perguntas',
      description: 'Saiba exatamente a síntese do seu pensamento com 100% de precisão.',
      duration: 'Aprox. 30 min',
      action: 'Começar versão extrema'
    }
  },
  axisInfoAria: (label) => `O que significa o eixo ${label}?`,
  closeLabel: 'Fechar',
  personalityInfoAria: (name) => `Ver detalhes de ${name}`,
  closenessTitle: 'O que te aproxima',
  closenessYou: 'Você',
  compareEyebrow: 'Análise comparativa',
  compareTitle: 'Compare-se com qualquer perfil',
  compareLead: 'Escolha uma personalidade, país ou ideologia e veja, eixo por eixo, onde você se aproxima ou se afasta.',
  compareSearchLabel: 'Buscar perfil para comparar',
  compareSearchPlaceholder: 'Busque uma personalidade, país ou ideologia',
  compareView: 'Visualizar',
  compareAxesTitle: 'Seus 12 eixos',
  compareNoResults: 'Nenhum perfil encontrado.',
  compareLoading: 'Comparando…',
  compareLoadError: 'Não foi possível carregar a comparação. Tente de novo.',
  compareTypeLabels: { personality: 'Personalidade', country: 'País', ideology: 'Ideologia' },
  compareAxisAdverbs: {
    estrutura: 'estruturalmente',
    economia: 'economicamente',
    comercio: 'comercialmente',
    religiao: 'religiosamente',
    moral: 'moralmente',
    tecnologia: 'tecnologicamente',
    diplomacia: 'diplomaticamente'
  },
  compareClosestLine: (adverb, name) => `Você é ${adverb} compatível com ${name}.`,
  compareFarthestLine: (adverb, name) => `Você é ${adverb} distante de ${name}.`,
  compareClosestFallback: (axis, name) => `Em ${axis}, você é compatível com ${name}.`,
  compareFarthestFallback: (axis, name) => `Em ${axis}, você é distante de ${name}.`,
  compareIdentical: (name) => `Você e ${name} têm posições praticamente idênticas em todos os eixos.`,
  compareNearestLine: (axis, name) => `Seu eixo mais próximo de ${name} é ${axis}.`,
  compareNoFarLine: (name) => `Nenhum eixo está muito distante de ${name}.`,
  compareValues: (pole, you, them, name) => `${pole}: você ${you}% · ${name} ${them}%.`,
  compareOptionAria: (name, type) => `${name}, ${type}`,
  axisExplanations: {
    estrutura:
      'Mede se você prefere poder distribuído entre estados, municípios e comunidades locais ou um Estado nacional unitário com leis e comando mais uniformes.',
    representacao:
      'Compara confiança em eleições, oposição e instituições democráticas com preferência por liderança forte, tecnocracia, monarquia ou regimes autoritários.',
    poder:
      'Avalia o equilíbrio entre ordem, vigilância, punição e controle estatal versus privacidade, liberdade individual e autonomia civil.',
    imigracao:
      'Observa se você valoriza assimilação cultural, idioma e identidade nacional ou multiculturalismo, abertura migratória e pluralidade de costumes.',
    diplomacia:
      'Analisa sua posição sobre Forças Armadas, armamento, dissuasão e intervenção militar em contraste com negociação, pacifismo e organismos internacionais.',
    intervencao:
      'Mede a inclinação entre não intervencionismo externo e soberania nacional mais assertiva, nacionalismo geopolítico e defesa ativa de interesses nacionais.',
    economia:
      'Compara preferência por propriedade pública, estatais e serviços coletivos com propriedade privada, privatização e protagonismo empresarial.',
    controle:
      'Avalia planejamento estatal, regulação e política econômica ativa contra livre mercado, baixa interferência, autonomia monetária e competição.',
    comercio:
      'Mede protecionismo, soberania produtiva e defesa da indústria nacional contra globalismo, livre comércio e integração econômica internacional.',
    religiao:
      'Compara laicidade, separação entre religião e Estado e crítica a privilégios religiosos com influência pública da fé e valores religiosos.',
    moral:
      'Avalia progressismo cultural, direitos civis e mudanças sociais em contraste com tradição, família, costumes e conservadorismo moral.',
    tecnologia:
      'Mede entusiasmo por tecnologia, IA, engenharia genética e desenvolvimento técnico contra cautela biológica, ambiental e preservacionista.'
  },
  homeAxes: {},
  spectrumItems: [
    {
      id: 'left-radical',
      label: 'Esquerda radical',
      tone: 'darkred',
      description:
        'Comunismo revolucionário ou totalitário de partido único, com economia planificada, forte centralização e concentração do poder do Estado.'
    },
    {
      id: 'left',
      label: 'Esquerda',
      tone: 'green',
      description:
        'Defende social-democracia, progressismo e maior intervenção do Estado na economia dentro da democracia liberal.'
    },
    {
      id: 'center',
      label: 'Centro',
      tone: 'gray',
      description:
        'Busca equilíbrio entre esquerda e direita, mercado e Estado, reformas e estabilidade, com posicionamento político moderado ou pragmático.'
    },
    {
      id: 'right',
      label: 'Direita',
      tone: 'blue',
      description:
        'Defende conservadorismo, liberalismo econômico e nacionalismo moderado dentro da democracia liberal.'
    },
    {
      id: 'right-extreme',
      label: 'Extrema direita',
      tone: 'navy',
      description:
        'Fascismo, nacionalismo racial e teocracias opressivas, com rejeição explícita da democracia e concentração autoritária do poder.'
    },
    {
      id: 'third-position',
      label: 'Terceira posição',
      tone: 'purple',
      description:
        'Síntese nacionalista e corporativista que rejeita tanto o capitalismo liberal quanto o marxismo, fora do eixo tradicional esquerda-direita.'
    },
    {
      id: 'libertarian',
      label: 'Libertário',
      tone: 'amber',
      description:
        'Defende Estado mínimo, livre mercado, propriedade privada e liberdades individuais, sem propor a abolição total do Estado.'
    },
    {
      id: 'anarchist',
      label: 'Anarquista',
      tone: 'charcoal',
      description:
        'Rejeita o Estado e toda autoridade coercitiva, defendendo organização social livre, voluntária e autogerida, de esquerda ou de direita.'
    }
  ],
  faqItems: [
    {
      question: 'O teste é confiável?',
      answer:
        'O teste político 12 Axes é confiável como ferramenta de leitura e comparação de posicionamento político. Ele usa perguntas distribuídas por 12 eixos para reduzir vieses de um único tema, mas não substitui estudo, debate ou análise acadêmica.'
    },
    {
      question: 'Quanto tempo demora?',
      answer:
        'A versão curta demora cerca de 5 minutos. A versão completa leva aproximadamente 9 minutos. A versão extrema, com 240 perguntas, pode levar cerca de 30 minutos.'
    },
    {
      question: 'Posso refazer?',
      answer:
        'Sim. Você pode refazer o quiz político quantas vezes quiser, inclusive escolhendo outra profundidade para comparar se o resultado muda.'
    },
    {
      question: 'Existe resposta certa?',
      answer:
        'Não existe resposta certa. O teste ideológico mede preferências sobre democracia, monarquia, federalismo, imigração, religião na política, política econômica, comércio internacional, liberalismo, conservadorismo, progressismo e outros temas.'
    },
    {
      question: 'Como o algoritmo calcula?',
      answer:
        'Cada resposta soma pontos em um polo específico. O algoritmo calcula percentuais por eixo, compara seu vetor ideológico com perfis de correntes políticas, países e personalidades, e retorna as maiores compatibilidades.'
    },
    {
      question: 'O resultado muda?',
      answer:
        'Pode mudar se suas opiniões mudarem, se você responder com mais nuance ou se fizer uma versão mais longa. A versão extrema tende a reduzir oscilações por usar mais perguntas.'
    },
    {
      question: 'O teste é científico?',
      answer:
        'O 12 Axes não é um instrumento científico validado clinicamente. Ele é um teste político educativo, inspirado em modelos de espectro político e quiz ideológico, útil para reflexão e comparação.'
    },
    {
      question: 'Posso compartilhar?',
      answer:
        'Sim. Ao terminar, você pode compartilhar seu resultado para discutir ideologia política, espectro político, esquerda, direita, centro e os 12 eixos com outras pessoas.'
    },
    {
      question: 'O teste coleta dados?',
      answer:
        'O teste é anônimo e não exige cadastro. As respostas são usadas para calcular o resultado no momento do quiz, sem pedir nome, e-mail ou identificação pessoal.'
    },
    {
      question: 'Posso responder pelo celular?',
      answer:
        'Sim. A interface foi pensada para celular e desktop, então você pode fazer o teste político pelo navegador do smartphone.'
    }
  ],
  howEyebrow: 'Como funciona',
  howTitle: 'Como funciona o quiz político 12 Axes',
  howLead:
    'Um teste de ideologia política simples e visual: você responde a afirmações, o 12 Axes calcula seus percentuais e mostra onde você está no espectro político em cada dimensão.',
  steps: [
    {
      title: 'Responda às perguntas',
      text: 'Concorde ou discorde de afirmações sobre economia, Estado, liberdades civis, valores, religião, política externa e tecnologia.'
    },
    {
      title: 'Análise em 12 eixos',
      text: 'Cada resposta posiciona você em 12 eixos ideológicos independentes - do livre mercado ao planejamento, do nacionalismo ao globalismo.'
    },
    {
      title: 'Descubra seu perfil',
      text: 'Receba seu perfil ideológico, ideologias mais compatíveis, país mais próximo, personalidade relacionada e resultado por eixo.'
    }
  ],
  axesGuideEyebrow: '12 eixos',
  axesGuideTitle: 'O que significa cada eixo?',
  axesGuideLead:
    'O teste ideológico 12 Axes analisa federalismo, representação política, democracia, eleições, imigração, comércio internacional, religião na política, política econômica, moral e tecnologia em dimensões separadas.',
  discoveryEyebrow: 'O que você vai descobrir',
  discoveryTitle: 'Um retrato completo das suas convicções políticas',
  discoveryLead:
    'Mais do que esquerda ou direita: seu resultado mostra com quem, onde e com que intensidade suas ideias realmente combinam.',
  discoveryItems: [
    { icon: 'ideology', title: 'Sua ideologia', text: 'Qual corrente política combina com você' },
    { icon: 'country', title: 'Seu país', text: 'Que nação pensa parecido com você' },
    { icon: 'personality', title: 'Seu líder político', text: 'Qual figura histórica é seu par ideológico' },
    { icon: 'spectrum', title: 'Seu espectro', text: 'Onde você fica entre esquerda e direita' },
    { icon: 'profile', title: 'Seu perfil', text: 'Um retrato completo das suas convicções' },
    { icon: 'compatibility', title: 'Compatibilidade', text: 'O quanto você realmente concorda com sua própria ideologia' }
  ],
  exampleEyebrow: 'Exemplo real',
  exampleTitle: 'É assim que fica o seu resultado',
  exampleCaption: 'Exemplo ilustrativo com dados reais do catálogo do 12 Axes.',
  exampleCta: 'Quero ver o meu resultado',
  spectrumEyebrow: 'Espectro político',
  spectrumTitle: 'Descubra seu espectro político',
  spectrumLead:
    'O resultado ajuda a visualizar seu posicionamento político entre esquerda, direita e centro, além de identificar formas mais radicais, autoritárias ou libertárias que não cabem nesse eixo, como extrema direita, esquerda radical, terceira posição, libertarianismo e anarquismo.',
  faqTitle: 'Perguntas frequentes',
  faqLead: 'Tudo o que as pessoas costumam perguntar antes de fazer o teste.',
  navStart: 'Começar',
  menuAria: 'Abrir menu',
  roseAria: 'Rosa dos 12 eixos',
  spectrumBarAria: 'Barra do espectro político com as oito categorias',
  versionsEyebrow: 'Versões',
  versionsTitle: 'Escolha a profundidade',
  versionsLead:
    'Comece pelo quiz rápido ou aprofunde sua análise para um retrato mais preciso do seu perfil ideológico. Todas as versões usam os mesmos 12 eixos e retornam o resultado imediatamente.',
  variantEyebrow: 'Escolha o formato',
  variantTitlePre: 'Você quer velocidade ou ',
  variantTitleEm: 'precisão?',
  backToStart: 'Voltar ao início',
  depthLabel: 'Profundidade',
  depthAria: (level) => `Profundidade ${level} de 3`,
  recommended: 'Recomendada',
  formatNotes: ['Todas as versões usam os mesmos 12 eixos', 'Anônimo, sem cadastro', 'Resultado imediato'],
  variantLead:
    'A versão curta revela o resultado de forma rápida. A completa aumenta a precisão para aproximar melhor seu resultado dos perfis ideológicos.',
  quizNavAria: 'Navegação do quiz',
  autoAdvance: 'Avançar ao responder',
  back: 'Voltar',
  next: 'Avançar',
  calculating: 'Calculando…',
  seeResult: 'Ver resultado',
  archetypeSkip: 'Pular',
  errMissingAnswer: 'Ainda falta responder esta pergunta antes de ver o resultado.',
  errLoadQuiz: 'Não foi possível carregar o quiz.',
  errCalc: 'Não foi possível calcular o resultado.',
  errImage: 'Não foi possível gerar a imagem do resultado.',
  errHttp: (status) => `Erro HTTP ${status}`,
  resultsEyebrow: 'Análise concluída',
  resultsH1Pre: 'Seu perfil ',
  resultsH1Em: 'ideológico',
  resultsLead: (count) =>
    `Análise baseada em ${count} respostas distribuídas em 12 dimensões fundamentais da ideologia política. Confira sua posição em cada eixo e suas correspondências ideológicas.`,
  resultsLeadShared:
    'Resultado compartilhado: a posição em cada um dos 12 eixos políticos e as correspondências ideológicas calculadas a partir dele. Faça o teste para descobrir o seu.',
  resultsSummaryAria: 'Resumo da análise',
  metaAnswered: 'Perguntas respondidas',
  metaAxes: 'Eixos analisados',
  metaTop: 'Top match',
  axesSectionEyebrow: 'Eixos políticos',
  axesSectionTitle: 'Resultado percentual por eixo',
  proximityEyebrow: 'Proximidade ideológica',
  otherMatches: 'Outras correspondências',
  navOnThisPage: 'Nesta página',
  resultsNavAxes: 'Os 12 eixos',
  resultsNavSignature: 'O que te distingue',
  resultsNavCountries: 'Países',
  resultsNavPersonalities: 'Personalidades',
  resultsNavAreas: 'Áreas de atuação',
  resultsNavBooks: 'Para ler',
  resultsNavIdeologies: 'Outras ideologias',
  countriesSectionTitle: 'Países mais próximos de você',
  countryCurrentTab: 'País atual',
  countryHistoricalTab: 'Experiência histórica',
  countriesDistantTitle: 'Os mais distantes de você',
  personalitiesSectionTitle: 'Personalidades mais próximas de você',
  personalitiesByAreaTitle: 'Também próximos, por área de atuação',
  dimensionsTitle: 'Também próximos, por dimensão do seu perfil',
  dimensionLabels: {
    political: 'Politicamente',
    social: 'Socialmente',
    economic: 'Economicamente',
  },
  booksEyebrow: 'Para ir além',
  booksTitle: 'Para ler',
  booksTopLabel: 'Mais próxima de você',
  booksAuthorLabel: 'Autor',
  booksLead: 'Uma obra de cada uma das personalidades mais próximas dos seus resultados.',
  booksWhy: (pct) => `${pct}% compatível`,
  booksYearBc: (year) => `${year} a.C.`,
  booksCta: 'Ver na Amazon',
  areasGeneralTitle: 'Os mais próximos dos seus resultados',
  areasSectionTitle: 'Os mais próximos por área de atuação',
  areasTabsAria: 'Modo de exibição das personalidades',
  areasGeneralTab: 'Compatibilidade geral',
  areasByAreaTab: 'Área de atuação',
  personalitiesDistantTitle: 'As mais distantes de você',
  ideologyDistantTitle: 'A ideologia mais distante de você',
  phraseTitle: 'Uma frase que te descreve',
  phraseNote: (ideology) => `É assim que alguém do ${ideology} resumiria a sociedade que quer.`,
  signatureTitle: 'O que te distingue',
  signatureUnusualLabel: 'Sua posição mais incomum',
  signatureCommonLabel: 'Sua posição mais comum',
  signatureUnusualLead: (pole, percent) => `Você puxa mais para ${pole.toLowerCase()} que ${Math.round(percent)}% das ideologias do catálogo.`,
  signatureUnusualLeadMax: (pole) => `Nenhuma ideologia do catálogo puxa tanto para ${pole.toLowerCase()} quanto você.`,
  signatureUnusualLeadBalanced: (axis, pole, percent) =>
    `Sua posição em ${axis} é de meio-termo. Mesmo assim, isso já te coloca mais para ${pole.toLowerCase()} que ${Math.round(percent)}% das ideologias do catálogo.`,
  signatureUnusualNote: (axis) => `De todos os 12 eixos, ${axis} é onde você mais se afasta do conjunto. É o traço que mais te diferencia.`,
  signatureCommonLead: (axis) => `Sua posição em ${axis} é praticamente a mediana do catálogo.`,
  signatureCommonNote: (pole) => `Aqui você está em terreno comum. Não puxa para ${pole.toLowerCase()} nem para o polo oposto.`,
  signatureCommonNoteBalanced: (axis) => `Você fica no centro em ${axis}, e o catálogo também. É onde seu perfil menos se distingue.`,
  tensionLabel: 'Sua tensão interna',
  tensionCombo: (firstPole, secondPole) => `${firstPole} e ${secondPole} ao mesmo tempo`,
  tensionRare: (count, total) => `Só ${count} das ${total} ideologias do catálogo juntam essas duas posições.`,
  tensionUnique: 'Nenhuma ideologia do catálogo junta essas duas posições.',
  tensionExamples: (names) => `Quem chega perto: ${names}.`,
  tensionNote: (firstAxis, secondAxis) => `No catálogo, ${firstAxis} e ${secondAxis} costumam andar na mesma direção. Você inverte esse padrão.`,
  signatureMedian: 'Mediana das ideologias',
  signatureYou: 'Você',
  personalityCategories: {
    politico: 'Política',
    religioso: 'Religião',
    economista: 'Economia',
    filosofo: 'Filosofia',
    teorico: 'Teoria política',
    empresario: 'Empresariado',
    intelectual: 'Vida intelectual',
    ativista: 'Ativismo',
  },
  redoAnalysis: 'Refazer análise',
  share: 'Compartilhar',
  saveOrShare: 'Compartilhar resultado',
  generatingPng: 'Gerando PNG...',
  generatingPdf: 'Gerando PDF...',
  downloadPdf: 'Download PDF',
  report: {
    fileName: '12axes-relatorio',
    docLabel: 'Relatório completo',
    profileEyebrow: 'Seu perfil ideológico',
    headerLabel: (ideology) => `Relatório do perfil político · ${ideology}`,
    kpiCountry: 'País mais próximo',
    kpiPersonality: 'Personalidade',
    kpiAxes: 'Eixos analisados',
    kpiAnswered: (count) => `${count} perguntas respondidas`,
    tocTitle: 'Neste relatório',
    generatedOn: (date) => `Gerado em ${date}`,
    axesIntro: 'Sua posição em cada um dos 12 eixos. A barra parte do centro (50%) em direção ao polo para onde você pende; o selo indica a intensidade.',
    intensityLegend: 'Intensidade',
    intensityLevels: ['Equilibrado · até 57%', 'Inclinado · 58 a 72%', 'Forte · 73 a 87%', 'Muito forte · 88% ou mais'],
    alsoClose: 'Também próximos, por dimensão do seu perfil',
    continued: 'continuação',
    areasIntro: 'As personalidades do catálogo cujo perfil nos 12 eixos mais se parece com o seu.',
    booksIntro: 'Uma obra de cada uma das personalidades mais próximas dos seus resultados. Links na versão online do resultado.',
    aboutTitle: 'Sobre este relatório',
    aboutText: 'O 12 Axes compara suas respostas com perfis de ideologias, países e personalidades nos mesmos 12 eixos. A compatibilidade mede proximidade entre perfis; não é diagnóstico científico nem rótulo definitivo. Suas respostas não são armazenadas.',
    ctaTitle: 'Refaça o teste ou compartilhe'
  },
  shareFilePrefix: '12axes-perfil',
  shareMessage: (ideology, ideologyPct, country, countryPct, personality, personalityPct) =>
    `Descobri meu perfil ideológico no Quiz Político 12 Axes!\n\n` +
    `💡 Ideologia mais compatível:\n` +
    `${ideology} - ${ideologyPct}% de compatibilidade\n\n` +
    `🌎 País/Nação mais compatível:\n` +
    `${country} - ${countryPct}% de compatibilidade\n\n` +
    `👤 Personalidade mais compatível:\n` +
    `${personality} - ${personalityPct}% de compatibilidade\n\n` +
    `👉 Faça o teste e compartilhe seu resultado:\nhttps://12axes.vercel.app/`,
  progress: (current, total) => `Pergunta ${current} de ${total}`,
  progressDone: (percent) => `${percent}% concluído`,
  archetypeHeader: 'Identificando seu arquétipo',
  archetypeStep: (current, total) => `${current} de ${total}`,
  progressAria: (percent) => `Progresso do quiz: ${percent}%`,
  answersAria: 'Opções de resposta',
  countryKicker: 'País mais compatível',
  flagLabel: 'Bandeira',
  flagHistoricLabel: 'Bandeira / símbolo histórico',
  flagAlt: (label, name) => `${label} de ${name}`,
  flagUnavailable: 'Bandeira indisponível',
  flagUnavailableAria: (name) => `Bandeira indisponível de ${name}`,
  personalityKicker: 'Personalidade mais compatível',
  portraitAlt: (name) => `Retrato de ${name}`,
  portraitUnavailableAria: (name) => `Retrato indisponível de ${name}`,
  compatibilityAria: (pct) => `Compatibilidade: ${pct} por cento`,
  matchWord: 'match',
  shareTitle: 'Seu perfil ideológico | 12axes.vercel.app',
  shareTopMatch: 'Top match',
  shareCountry: 'País mais compatível',
  sharePersonality: 'Personalidade',
  shareResultLabel: 'MEU RESULTADO',
  shareMostCompatible: 'MAIS COMPATÍVEL',
  shareYourAxes: 'SEUS 12 EIXOS',
  shareOtherPersonalities: 'OUTRAS PERSONALIDADES',
  shareNearbyCountries: 'PAÍSES PRÓXIMOS',
  shareFooterCta: 'DESCUBRA SEU PERFIL',
  shareFooterUrl: '12AXES.VERCEL.APP',
  supportEyebrow: 'Apoie o projeto',
  supportTitle: '',
  ossEyebrow: 'Código aberto',
  ossTitle: 'Um projeto independente e transparente',
  ossLead: 'Você não precisa confiar na nossa palavra. O código do 12 Axes é público: dá para ver como cada resposta é pontuada, como a compatibilidade é calculada e de onde vêm os perfis.',
  ossCards: [
    { title: 'Independente', text: 'Sem vínculo com partidos, governos ou campanhas. Ninguém paga para aparecer no seu resultado.' },
    { title: 'Auditável', text: 'A pontuação das respostas e o cálculo de compatibilidade estão no código, sem caixa-preta.' },
    { title: 'Verificável', text: 'Perguntas, ideologias, países e personalidades ficam em arquivos versionados, com histórico público.' },
    { title: 'Colaborativo', text: 'Achou uma pergunta enviesada ou um perfil impreciso? Abra uma issue ou envie um pull request.' }
  ],
  ossBarText: 'Leia o código, audite os dados e contribua pelo GitHub.',
  ossGithubCta: 'Ver no GitHub',
  ossIssueCta: 'Sugerir melhoria',
  feedbackTitle: 'Encontrou um problema ou tem uma ideia?',
  feedbackReport: 'Reportar um problema',
  feedbackSuggest: 'Sugerir melhorias',
  supportTitleEm: 'Apoie',
  supportLead:
    'O 12 Axes é independente e gratuito. Se o teste te ajudou a entender melhor sua ideologia política, considere fazer uma doação via Pix ou criptomoedas para manter o projeto no ar.',
  supportPrivacyNote: 'Não coletamos dados. Para doar sem se identificar, use criptomoedas.',
  supportCopy: 'Copiar',
  supportCopied: 'Copiado!',
  supportCopyAria: (label) => `Copiar endereço de ${label}`,
  supportCoins: [
    {
      id: 'pix',
      name: 'Pix',
      network: 'Chave aleatória',
      address: 'bf3e8e0b-27fe-4845-b5e2-358ca0281847'
    },
    {
      id: 'btc',
      name: 'Bitcoin',
      network: 'On-chain',
      address: 'bc1qsuy8r8gvl39apjykqzlgh7hku79ecarezhz2zj'
    },
    {
      id: 'lightning',
      name: 'Bitcoin',
      network: 'Lightning',
      address: 'lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhk2ctnw3jhymnsv96kcwfsa0gczg'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      network: 'ERC-20',
      address: '0xDe821e55D6101AA42D05DBf2C07ad0BB866C23a5'
    },
    {
      id: 'xmr',
      name: 'Monero',
      network: 'XMR',
      address:
        '85Du1EuRPkybMVXTVptC6z31dsGPpTthsiMKM3yjY7YE24BUCkyNMd9Q82kwe5CvE7BegtDTNxaG8VwYdVvTgbjDU6DpuN1'
    }
  ]
};

const en: Strings = {
  htmlLang: 'en',
  docTitle: '12 Axes — Political Quiz and Ideology Test across 12 Axes',
  loadingAnalysis: 'Loading political analysis...',
  loadingQuiz: 'Loading quiz...',
  loadingResult: 'Loading results...',
  tryAgain: 'Try again',
  crashTitle: 'Something went wrong',
  crashBody: 'The page hit an unexpected error. Reload to try again.',
  crashBodyWithProgress: 'The page hit an unexpected error, but your answers are saved. Reload and choose to continue where you left off.',
  crashReload: 'Reload the page',
  resumeEyebrow: 'Quiz in progress',
  resumeTitle: 'Pick up where you left off',
  resumeBody: (answered, total) => `You have answered ${answered} of ${total} questions. Your answers are saved in this browser.`,
  resumeContinue: 'Continue',
  resumeDiscard: 'Start over',
  resumeUnavailable: 'The previous quiz could not be resumed. Please start a new one.',
  skipToContent: 'Skip to content',
  backToStartAria: 'Back to start',
  mainNavAria: 'Main navigation',
  navHow: 'How it works',
  navAxes: '12 Axes',
  navSpectrum: 'Spectrum',
  navFaq: 'FAQ',
  navIdeologies: 'Ideologies',
  navPersonalities: 'Personalities',
  navCountries: 'Countries',
  navSupport: 'Support',
  langToggleLabel: 'PT',
  langToggleAria: 'Mudar para português',
  redoQuiz: 'Retake quiz',
  religionLabel: 'Religion',
  religionQuestion: 'Do you follow a religion? We only use this to tailor your recommendations.',
  religionNone: 'No religion',
  religionNames: { christianity: 'Christianity', judaism: 'Judaism', islam: 'Islam', buddhism: 'Buddhism' },
  denominationLabel: 'Christian tradition',
  denominationQuestion: 'Which Christian tradition do you follow?',
  denominationNames: { catholic: 'Catholic', protestant: 'Protestant', orthodox: 'Orthodox' },
  restartQuiz: 'Restart quiz',
  heroEyebrow: 'Political discovery',
  h1Pre: 'Do you really know your ',
  h1Em: 'political ideology',
  h1Post: '?',
  introLead:
    'You might be labeling yourself wrong. In a few minutes, discover your real ideology, the country that thinks most like you, and the political leader closest to your ideas.',
  startQuiz: 'Discover my profile',
  seeAxes: 'See the 12 axes',
  heroLabels: ['Free', 'Anonymous', 'Fast', 'Instant result'],
  heroTeaserLabel: 'match',
  heroTeaserTag: 'Example result',
  formats: {
    short: {
      label: 'Short',
      questionCount: '36 questions',
      description: 'A quick result, ideal for a first reading of your profile',
      duration: 'About 5 min',
      action: 'Start short version'
    },
    extended: {
      label: 'Full',
      questionCount: '60 questions',
      description: 'More precision to bring your result closer to the ideological profiles.',
      duration: 'About 9 min',
      action: 'Start full version'
    },
    extreme: {
      label: 'Extreme',
      questionCount: '240 questions',
      description: 'Know the exact synthesis of your thinking with 100% precision.',
      duration: 'About 30 min',
      action: 'Start extreme version'
    }
  },
  axisInfoAria: (label) => `What does the ${label} axis mean?`,
  closeLabel: 'Close',
  personalityInfoAria: (name) => `See details about ${name}`,
  closenessTitle: 'What brings you closer',
  closenessYou: 'You',
  compareEyebrow: 'Comparative analysis',
  compareTitle: 'Compare yourself with any profile',
  compareLead: 'Pick a personality, country or ideology and see, axis by axis, where you are close or far apart.',
  compareSearchLabel: 'Search a profile to compare',
  compareSearchPlaceholder: 'Search a personality, country or ideology',
  compareView: 'View',
  compareAxesTitle: 'Your 12 axes',
  compareNoResults: 'No profiles found.',
  compareLoading: 'Comparing…',
  compareLoadError: 'Could not load the comparison. Please try again.',
  compareTypeLabels: { personality: 'Personality', country: 'Country', ideology: 'Ideology' },
  compareAxisAdverbs: {
    estrutura: 'structurally',
    economia: 'economically',
    moral: 'morally',
    tecnologia: 'technologically',
    diplomacia: 'diplomatically'
  },
  compareClosestLine: (adverb, name) => `You are ${adverb} compatible with ${name}.`,
  compareFarthestLine: (adverb, name) => `You are ${adverb} distant from ${name}.`,
  compareClosestFallback: (axis, name) => `In ${axis}, you are compatible with ${name}.`,
  compareFarthestFallback: (axis, name) => `In ${axis}, you are distant from ${name}.`,
  compareIdentical: (name) => `You and ${name} have practically identical positions on every axis.`,
  compareNearestLine: (axis, name) => `Your closest axis to ${name} is ${axis}.`,
  compareNoFarLine: (name) => `No axis is far from ${name}.`,
  compareValues: (pole, you, them, name) => `${pole}: you ${you}% · ${name} ${them}%.`,
  compareOptionAria: (name, type) => `${name}, ${type}`,
  axisExplanations: {
    estrutura:
      'Measures whether you prefer power distributed among states, cities, and local communities or a unitary national state with more uniform laws and command.',
    representacao:
      'Compares trust in elections, opposition, and democratic institutions with a preference for strong leadership, technocracy, monarchy, or authoritarian regimes.',
    poder:
      'Evaluates the balance between order, surveillance, punishment, and state control versus privacy, individual freedom, and civil autonomy.',
    imigracao:
      'Looks at whether you value cultural assimilation, language, and national identity or multiculturalism, open migration, and plurality of customs.',
    diplomacia:
      'Analyzes your position on armed forces, weapons, deterrence, and military intervention in contrast with negotiation, pacifism, and international organizations.',
    intervencao:
      'Measures the leaning between external non-interventionism and more assertive national sovereignty, geopolitical nationalism, and active defense of national interests.',
    economia:
      'Compares a preference for public ownership, state companies, and collective services with private property, privatization, and business leadership.',
    controle:
      'Evaluates state planning, regulation, and active economic policy against free markets, low interference, monetary autonomy, and competition.',
    comercio:
      'Measures protectionism, productive sovereignty, and defense of national industry against globalism, free trade, and international economic integration.',
    religiao:
      'Compares secularism, separation of religion and state, and criticism of religious privileges with the public influence of faith and religious values.',
    moral:
      'Evaluates cultural progressivism, civil rights, and social change in contrast with tradition, family, customs, and moral conservatism.',
    tecnologia:
      'Measures enthusiasm for technology, AI, genetic engineering, and technical development against biological, environmental, and preservationist caution.'
  },
  homeAxes: {
    estrutura: { label: 'Structure', leftPole: 'Federal', rightPole: 'Unitary' },
    representacao: { label: 'Representation', leftPole: 'Democracy', rightPole: 'Autocracy' },
    poder: { label: 'Power', leftPole: 'Security', rightPole: 'Liberty' },
    imigracao: { label: 'Immigration', leftPole: 'Assimilation', rightPole: 'Multiculturalism' },
    diplomacia: { label: 'Diplomacy', leftPole: 'Militarist', rightPole: 'Pacifist' },
    intervencao: { label: 'Intervention', leftPole: 'Non-interventionist', rightPole: 'Nationalist' },
    economia: { label: 'Economy', leftPole: 'Public', rightPole: 'Private' },
    controle: { label: 'Control', leftPole: 'Planning', rightPole: 'Free market' },
    comercio: { label: 'Trade', leftPole: 'Protectionism', rightPole: 'Globalism' },
    religiao: { label: 'Religion', leftPole: 'Irreligious', rightPole: 'Religious' },
    moral: { label: 'Morality', leftPole: 'Progressive', rightPole: 'Traditionalist' },
    tecnologia: { label: 'Technology', leftPole: 'Technology', rightPole: 'Biology' }
  },
  spectrumItems: [
    {
      id: 'left-radical',
      label: 'Radical left',
      tone: 'darkred',
      description:
        'Revolutionary or totalitarian single-party communism, with a planned economy, strong centralization, and concentrated state power.'
    },
    {
      id: 'left',
      label: 'Left',
      tone: 'green',
      description:
        'Advocates social democracy, progressivism, and greater state intervention in the economy within liberal democracy.'
    },
    {
      id: 'center',
      label: 'Center',
      tone: 'gray',
      description:
        'Seeks balance between left and right, market and state, reform and stability, with a moderate or pragmatic political stance.'
    },
    {
      id: 'right',
      label: 'Right',
      tone: 'blue',
      description:
        'Advocates conservatism, economic liberalism, and moderate nationalism within liberal democracy.'
    },
    {
      id: 'right-extreme',
      label: 'Far-right',
      tone: 'navy',
      description:
        'Fascism, racial nationalism, and oppressive theocracies, with explicit rejection of democracy and authoritarian concentration of power.'
    },
    {
      id: 'third-position',
      label: 'Third position',
      tone: 'purple',
      description:
        'A nationalist, corporatist synthesis that rejects both liberal capitalism and Marxism, outside the traditional left-right axis.'
    },
    {
      id: 'libertarian',
      label: 'Libertarian',
      tone: 'amber',
      description:
        'Advocates a minimal state, free markets, private property, and individual liberties, without proposing the total abolition of the state.'
    },
    {
      id: 'anarchist',
      label: 'Anarchist',
      tone: 'charcoal',
      description:
        'Rejects the state and all coercive authority, advocating free, voluntary, and self-managed social organization, from the left or the right.'
    }
  ],
  faqItems: [
    {
      question: 'Is the test reliable?',
      answer:
        'The 12 Axes political test is reliable as a tool for reading and comparing political positions. It uses questions spread across 12 axes to reduce single-topic bias, but it does not replace study, debate, or academic analysis.'
    },
    {
      question: 'How long does it take?',
      answer:
        'The short version takes about 5 minutes. The full version takes roughly 9 minutes. The extreme version, with 240 questions, can take about 30 minutes.'
    },
    {
      question: 'Can I retake it?',
      answer:
        'Yes. You can retake the political quiz as many times as you like, including choosing another depth to compare whether your result changes.'
    },
    {
      question: 'Is there a right answer?',
      answer:
        'There is no right answer. The ideology test measures preferences about democracy, monarchy, federalism, immigration, religion in politics, economic policy, international trade, liberalism, conservatism, progressivism, and other topics.'
    },
    {
      question: 'How does the algorithm calculate?',
      answer:
        'Each answer adds points to a specific pole. The algorithm calculates percentages per axis, compares your ideological vector with the profiles of political currents, countries, and personalities, and returns the highest compatibilities.'
    },
    {
      question: 'Does the result change?',
      answer:
        'It can change if your opinions change, if you answer with more nuance, or if you take a longer version. The extreme version tends to reduce fluctuations by using more questions.'
    },
    {
      question: 'Is the test scientific?',
      answer:
        '12 Axes is not a clinically validated scientific instrument. It is an educational political test, inspired by political spectrum models and ideology quizzes, useful for reflection and comparison.'
    },
    {
      question: 'Can I share it?',
      answer:
        'Yes. When you finish, you can share your result to discuss political ideology, the political spectrum, left, right, center, and the 12 axes with other people.'
    },
    {
      question: 'Does the test collect data?',
      answer:
        'The test is anonymous and requires no sign-up. Answers are used to calculate the result at quiz time, without asking for your name, email, or personal identification.'
    },
    {
      question: 'Can I take it on my phone?',
      answer:
        'Yes. The interface was designed for mobile and desktop, so you can take the political test in your smartphone browser.'
    }
  ],
  howEyebrow: 'How it works',
  howTitle: 'How the 12 Axes political quiz works',
  howLead:
    'A simple, visual political ideology test: you respond to statements, 12 Axes calculates your percentages, and shows where you stand on the political spectrum in each dimension.',
  steps: [
    {
      title: 'Answer the questions',
      text: 'Agree or disagree with statements about the economy, the state, civil liberties, values, religion, foreign policy, and technology.'
    },
    {
      title: 'Analysis across 12 axes',
      text: 'Each answer positions you on 12 independent ideological axes - from free markets to planning, from nationalism to globalism.'
    },
    {
      title: 'Discover your profile',
      text: 'Receive your ideological profile, most compatible ideologies, closest country, related personality, and per-axis results.'
    }
  ],
  axesGuideEyebrow: '12 axes',
  axesGuideTitle: 'What does each axis mean?',
  axesGuideLead:
    'The 12 Axes ideology test analyzes federalism, political representation, democracy, elections, immigration, international trade, religion in politics, economic policy, morality, and technology in separate dimensions.',
  discoveryEyebrow: 'What you will discover',
  discoveryTitle: 'A complete portrait of your political convictions',
  discoveryLead:
    'More than left or right: your result shows who, where, and how strongly your ideas actually align.',
  discoveryItems: [
    { icon: 'ideology', title: 'Your ideology', text: 'Which political current matches you' },
    { icon: 'country', title: 'Your country', text: 'Which nation thinks most like you' },
    { icon: 'personality', title: 'Your political leader', text: 'Which historical figure is your ideological match' },
    { icon: 'spectrum', title: 'Your spectrum', text: 'Where you fall between left and right' },
    { icon: 'profile', title: 'Your profile', text: 'A complete portrait of your convictions' },
    { icon: 'compatibility', title: 'Compatibility', text: 'How much you truly agree with your own ideology' }
  ],
  exampleEyebrow: 'Real example',
  exampleTitle: "Here's what your result looks like",
  exampleCaption: 'Illustrative example using real data from the 12 Axes catalog.',
  exampleCta: 'I want to see my result',
  spectrumEyebrow: 'Political spectrum',
  spectrumTitle: 'Discover your political spectrum',
  spectrumLead:
    'The result helps you visualize your political position between left, right, and center, and also identifies more radical, authoritarian, or libertarian forms that fall outside that axis, such as far-right, radical left, third position, libertarianism, and anarchism.',
  faqTitle: 'Frequently asked questions',
  faqLead: 'Everything people usually ask before taking the test.',
  navStart: 'Start',
  menuAria: 'Open menu',
  roseAria: 'Rose of the 12 axes',
  spectrumBarAria: 'Political spectrum bar with the eight categories',
  versionsEyebrow: 'Versions',
  versionsTitle: 'Choose the depth',
  versionsLead:
    'Start with the quick quiz or go deeper for a more precise portrait of your ideological profile. All versions use the same 12 axes and return the result immediately.',
  variantEyebrow: 'Choose the format',
  variantTitlePre: 'Do you want speed or ',
  variantTitleEm: 'precision?',
  backToStart: 'Back to start',
  depthLabel: 'Depth',
  depthAria: (level) => `Depth ${level} of 3`,
  recommended: 'Recommended',
  formatNotes: ['All versions use the same 12 axes', 'Anonymous, no sign-up', 'Instant result'],
  variantLead:
    'The short version reveals the result quickly. The full version increases precision to bring your result closer to the ideological profiles.',
  quizNavAria: 'Quiz navigation',
  autoAdvance: 'Advance on answer',
  back: 'Back',
  next: 'Next',
  calculating: 'Calculating…',
  seeResult: 'See results',
  archetypeSkip: 'Skip',
  errMissingAnswer: 'You still need to answer this question before seeing the result.',
  errLoadQuiz: 'Could not load the quiz.',
  errCalc: 'Could not calculate the result.',
  errImage: 'Could not generate the result image.',
  errHttp: (status) => `HTTP error ${status}`,
  resultsEyebrow: 'Analysis complete',
  resultsH1Pre: 'Your ideological ',
  resultsH1Em: 'profile',
  resultsLead: (count) =>
    `Analysis based on ${count} answers distributed across 12 fundamental dimensions of political ideology. Check your position on each axis and your ideological matches.`,
  resultsLeadShared:
    'Shared result: the position on each of the 12 political axes and the ideological matches calculated from it. Take the test to discover yours.',
  resultsSummaryAria: 'Analysis summary',
  metaAnswered: 'Questions answered',
  metaAxes: 'Axes analyzed',
  metaTop: 'Top match',
  axesSectionEyebrow: 'Political axes',
  axesSectionTitle: 'Percentage result per axis',
  proximityEyebrow: 'Ideological proximity',
  otherMatches: 'Other matches',
  navOnThisPage: 'On this page',
  resultsNavAxes: 'The 12 axes',
  resultsNavSignature: 'What sets you apart',
  resultsNavCountries: 'Countries',
  resultsNavPersonalities: 'Figures',
  resultsNavAreas: 'Fields',
  resultsNavBooks: 'Further reading',
  resultsNavIdeologies: 'Other ideologies',
  countriesSectionTitle: 'Countries closest to you',
  countryCurrentTab: 'Present-day',
  countryHistoricalTab: 'Historical',
  countriesDistantTitle: 'Furthest from you',
  personalitiesSectionTitle: 'Figures closest to you',
  personalitiesByAreaTitle: 'Also close to you, by field',
  dimensionsTitle: 'Also close to you, by dimension of your profile',
  dimensionLabels: {
    political: 'Politically',
    social: 'Socially',
    economic: 'Economically',
  },
  booksEyebrow: 'Go further',
  booksTitle: 'Further reading',
  booksTopLabel: 'Closest to you',
  booksAuthorLabel: 'Author',
  booksLead: 'One work by each of the figures closest to your results.',
  booksWhy: (pct) => `${pct}% compatible`,
  booksYearBc: (year) => `${year} BC`,
  booksCta: 'See on Amazon',
  areasGeneralTitle: 'The closest figures to your results',
  areasSectionTitle: 'The closest figures by field',
  areasTabsAria: 'How figures are grouped',
  areasGeneralTab: 'Overall compatibility',
  areasByAreaTab: 'Field',
  personalitiesDistantTitle: 'Furthest from you',
  ideologyDistantTitle: 'The ideology furthest from you',
  phraseTitle: 'A sentence that describes you',
  phraseNote: (ideology) => `This is how someone from ${ideology} would sum up the society they want.`,
  signatureTitle: 'What sets you apart',
  signatureUnusualLabel: 'Your most unusual position',
  signatureCommonLabel: 'Your most typical position',
  signatureUnusualLead: (pole, percent) => `You lean further toward ${pole.toLowerCase()} than ${Math.round(percent)}% of the ideologies in the catalog.`,
  signatureUnusualLeadMax: (pole) => `No ideology in the catalog leans as far toward ${pole.toLowerCase()} as you do.`,
  signatureUnusualLeadBalanced: (axis, pole, percent) =>
    `Your position on ${axis} is middle of the road. Even so, that puts you further toward ${pole.toLowerCase()} than ${Math.round(percent)}% of the ideologies in the catalog.`,
  signatureUnusualNote: (axis) => `Of all 12 axes, ${axis} is where you depart most from the field. It is the trait that sets you apart.`,
  signatureCommonLead: (axis) => `Your position on ${axis} sits almost exactly at the catalog median.`,
  signatureCommonNote: (pole) => `This is common ground. You lean neither toward ${pole.toLowerCase()} nor to the opposite pole.`,
  signatureCommonNoteBalanced: (axis) => `You sit at the centre on ${axis}, and so does the catalog. This is where your profile stands out least.`,
  tensionLabel: 'Your internal tension',
  tensionCombo: (firstPole, secondPole) => `${firstPole} and ${secondPole} at the same time`,
  tensionRare: (count, total) => `Only ${count} of the ${total} ideologies in the catalog hold both of these positions.`,
  tensionUnique: 'No ideology in the catalog holds both of these positions.',
  tensionExamples: (names) => `Closest matches: ${names}.`,
  tensionNote: (firstAxis, secondAxis) => `In the catalog, ${firstAxis} and ${secondAxis} usually move together. You reverse that pattern.`,
  signatureMedian: 'Ideology median',
  signatureYou: 'You',
  personalityCategories: {
    politico: 'Politics',
    religioso: 'Religion',
    economista: 'Economics',
    filosofo: 'Philosophy',
    teorico: 'Political theory',
    empresario: 'Business',
    intelectual: 'Intellectual life',
    ativista: 'Activism',
  },
  redoAnalysis: 'Retake analysis',
  share: 'Share',
  saveOrShare: 'Share result',
  generatingPng: 'Generating PNG...',
  generatingPdf: 'Generating PDF...',
  downloadPdf: 'Download PDF',
  report: {
    fileName: '12axes-report',
    docLabel: 'Full report',
    profileEyebrow: 'Your ideological profile',
    headerLabel: (ideology) => `Political profile report · ${ideology}`,
    kpiCountry: 'Closest country',
    kpiPersonality: 'Figure',
    kpiAxes: 'Axes analyzed',
    kpiAnswered: (count) => `${count} questions answered`,
    tocTitle: 'In this report',
    generatedOn: (date) => `Generated on ${date}`,
    axesIntro: 'Your position on each of the 12 axes. The bar starts at the center (50%) and extends toward the pole you lean to; the badge shows the intensity.',
    intensityLegend: 'Intensity',
    intensityLevels: ['Balanced · up to 57%', 'Leaning · 58 to 72%', 'Strong · 73 to 87%', 'Very strong · 88% or more'],
    alsoClose: 'Also close, by dimension of your profile',
    continued: 'continued',
    areasIntro: 'The figures in the catalog whose profile across the 12 axes most resembles yours.',
    booksIntro: 'One work by each of the figures closest to your results. Links in the online version of the result.',
    aboutTitle: 'About this report',
    aboutText: '12 Axes compares your answers with profiles of ideologies, countries and figures on the same 12 axes. Compatibility measures closeness between profiles; it is not a scientific diagnosis or a definitive label. Your answers are not stored.',
    ctaTitle: 'Retake the quiz or share it'
  },
  shareFilePrefix: '12axes-profile',
  shareMessage: (ideology, ideologyPct, country, countryPct, personality, personalityPct) =>
    `I discovered my ideological profile on the 12 Axes Political Quiz!\n\n` +
    `💡 Most compatible ideology:\n` +
    `${ideology} - ${ideologyPct}% compatibility\n\n` +
    `🌎 Most compatible country/nation:\n` +
    `${country} - ${countryPct}% compatibility\n\n` +
    `👤 Most compatible personality:\n` +
    `${personality} - ${personalityPct}% compatibility\n\n` +
    `👉 Take the test and share your result:\nhttps://12axes.vercel.app/en`,
  progress: (current, total) => `Question ${current} of ${total}`,
  progressDone: (percent) => `${percent}% complete`,
  archetypeHeader: 'Identifying your archetype',
  archetypeStep: (current, total) => `${current} of ${total}`,
  progressAria: (percent) => `Quiz progress: ${percent}%`,
  answersAria: 'Answer options',
  countryKicker: 'Most compatible country',
  flagLabel: 'Flag',
  flagHistoricLabel: 'Flag / historical symbol',
  flagAlt: (label, name) => `${label} of ${name}`,
  flagUnavailable: 'Flag unavailable',
  flagUnavailableAria: (name) => `Flag unavailable for ${name}`,
  personalityKicker: 'Most compatible personality',
  portraitAlt: (name) => `Portrait of ${name}`,
  portraitUnavailableAria: (name) => `Portrait unavailable for ${name}`,
  compatibilityAria: (pct) => `Compatibility: ${pct} percent`,
  matchWord: 'match',
  shareTitle: 'My ideological profile | 12axes.vercel.app',
  shareTopMatch: 'Top match',
  shareCountry: 'Most compatible country',
  sharePersonality: 'Personality',
  shareResultLabel: 'MY RESULT',
  shareMostCompatible: 'MOST COMPATIBLE',
  shareYourAxes: 'YOUR 12 AXES',
  shareOtherPersonalities: 'OTHER PERSONALITIES',
  shareNearbyCountries: 'NEARBY COUNTRIES',
  shareFooterCta: 'DISCOVER YOUR PROFILE',
  shareFooterUrl: '12AXES.VERCEL.APP',
  supportEyebrow: 'Support the project',
  supportTitle: '',
  ossEyebrow: 'Open source',
  ossTitle: 'An independent, transparent project',
  ossLead: "You don't have to take our word for it. The 12 Axes code is public: you can see how every answer is scored, how compatibility is calculated and where the profiles come from.",
  ossCards: [
    { title: 'Independent', text: 'No ties to parties, governments or campaigns. Nobody pays to appear in your result.' },
    { title: 'Auditable', text: 'Answer scoring and the compatibility calculation live in the code, with no black box.' },
    { title: 'Verifiable', text: 'Questions, ideologies, countries and personalities are stored in versioned files with a public history.' },
    { title: 'Collaborative', text: 'Found a biased question or an inaccurate profile? Open an issue or send a pull request.' }
  ],
  ossBarText: 'Read the code, audit the data and contribute on GitHub.',
  ossGithubCta: 'View on GitHub',
  ossIssueCta: 'Suggest an improvement',
  feedbackTitle: 'Found a problem or have an idea?',
  feedbackReport: 'Report a problem',
  feedbackSuggest: 'Suggest improvements',
  supportTitleEm: 'Support',
  supportLead:
    '12 Axes is independent and free. If the quiz helped you better understand your political ideology, consider donating via Pix or crypto to help keep the project running.',
  supportPrivacyNote: "We don't collect data. To donate without identifying yourself, use crypto.",
  supportCopy: 'Copy',
  supportCopied: 'Copied!',
  supportCopyAria: (label) => `Copy ${label} address`,
  supportCoins: [
    {
      id: 'pix',
      name: 'Pix',
      network: 'Random key',
      address: 'bf3e8e0b-27fe-4845-b5e2-358ca0281847'
    },
    {
      id: 'btc',
      name: 'Bitcoin',
      network: 'On-chain',
      address: 'bc1qsuy8r8gvl39apjykqzlgh7hku79ecarezhz2zj'
    },
    {
      id: 'lightning',
      name: 'Bitcoin',
      network: 'Lightning',
      address: 'lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhk2ctnw3jhymnsv96kcwfsa0gczg'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      network: 'ERC-20',
      address: '0xDe821e55D6101AA42D05DBf2C07ad0BB866C23a5'
    },
    {
      id: 'xmr',
      name: 'Monero',
      network: 'XMR',
      address:
        '85Du1EuRPkybMVXTVptC6z31dsGPpTthsiMKM3yjY7YE24BUCkyNMd9Q82kwe5CvE7BegtDTNxaG8VwYdVvTgbjDU6DpuN1'
    }
  ]
};

const nl: Strings = {
  htmlLang: 'nl',
  docTitle: '12 Assen — Politieke Quiz en Ideologietest over 12 Assen',
  loadingAnalysis: 'Politieke analyse laden...',
  loadingQuiz: 'Quiz laden...',
  loadingResult: 'Resultaten laden...',
  tryAgain: 'Probeer opnieuw',
  crashTitle: 'Er is iets misgegaan',
  crashBody: 'De pagina heeft een onverwachte fout ondervonden. Herlaad om opnieuw te proberen.',
  crashBodyWithProgress: 'De pagina heeft een onverwachte fout ondervonden, maar je antwoorden zijn opgeslagen. Herlaad en kies ervoor om verder te gaan waar je gebleven was.',
  crashReload: 'Pagina herladen',
  resumeEyebrow: 'Quiz bezig',
  resumeTitle: 'Ga verder waar je gebleven was',
  resumeBody: (answered, total) => `Je hebt ${answered} van de ${total} vragen beantwoord. Je antwoorden zijn opgeslagen in deze browser.`,
  resumeContinue: 'Doorgaan',
  resumeDiscard: 'Opnieuw beginnen',
  resumeUnavailable: 'De vorige quiz kon niet worden hervat. Start alsjeblieft een nieuwe.',
  skipToContent: 'Naar inhoud springen',
  backToStartAria: 'Terug naar start',
  mainNavAria: 'Hoofdnavigatie',
  navHow: 'Hoe het werkt',
  navAxes: '12 Assen',
  navSpectrum: 'Spectrum',
  navFaq: 'FAQ',
  navIdeologies: 'Ideologieën',
  navPersonalities: 'Persoonlijkheden',
  navCountries: 'Landen',
  navSupport: 'Ondersteuning',
  langToggleLabel: 'NL',
  langToggleAria: 'Wijzig naar Nederlands',
  redoQuiz: 'Quiz opnieuw doen',
  religionLabel: 'Religie',
  religionQuestion: 'Volg je een religie? We gebruiken dit alleen om je aanbevelingen af te stemmen.',
  religionNone: 'Geen religie',
  religionNames: { christianity: 'Christendom', judaism: 'Jodendom', islam: 'Islam', buddhism: 'Boeddhisme' },
  denominationLabel: 'Christelijke traditie',
  denominationQuestion: 'Welke christelijke traditie volg je?',
  denominationNames: { catholic: 'Katholiek', protestant: 'Protestant', orthodox: 'Orthodox' },
  restartQuiz: 'Quiz opnieuw starten',
  heroEyebrow: 'Politieke ontdekking',
  h1Pre: 'Ken jij echt je ',
  h1Em: 'politieke ideologie',
  h1Post: '?',
  introLead:
    'Je labelt jezelf misschien verkeerd. Ontdek binnen enkele minuten je echte ideologie, het land dat het meest zoals jij denkt, en de politieke leider die het dichtst bij jouw ideeën staat.',
  startQuiz: 'Ontdek mijn profiel',
  seeAxes: 'Bekijk de 12 assen',
  heroLabels: ['Gratis', 'Anoniem', 'Snel', 'Direct resultaat'],
  heroTeaserLabel: 'match',
  heroTeaserTag: 'Voorbeeldresultaat',
  formats: {
    short: {
      label: 'Kort',
      questionCount: '36 vragen',
      description: 'Een snel resultaat, ideaal voor een eerste lezing van je profiel',
      duration: 'Ongeveer 5 min',
      action: 'Start korte versie'
    },
    extended: {
      label: 'Volledig',
      questionCount: '60 vragen',
      description: 'Meer precisie om je resultaat dichter bij de ideologische profielen te brengen.',
      duration: 'Ongeveer 9 min',
      action: 'Start volledige versie'
    },
    extreme: {
      label: 'Extreem',
      questionCount: '240 vragen',
      description: 'Ken de exacte synthese van je denken met 100% precisie.',
      duration: 'Ongeveer 30 min',
      action: 'Start extreme versie'
    }
  },
  axisInfoAria: (label) => `Wat betekent de ${label} as?`,
  closeLabel: 'Sluiten',
  personalityInfoAria: (name) => `Bekijk details over ${name}`,
  closenessTitle: 'Wat jullie dichterbij brengt',
  closenessYou: 'Jij',
  compareEyebrow: 'Vergelijkende analyse',
  compareTitle: 'Vergelijk jezelf met elk profiel',
  compareLead: 'Kies een persoonlijkheid, land of ideologie en zie, as per as, waar je dichtbij of ver uit elkaar ligt.',
  compareSearchLabel: 'Zoek een profiel om te vergelijken',
  compareSearchPlaceholder: 'Zoek een persoonlijkheid, land of ideologie',
  compareView: 'Bekijken',
  compareAxesTitle: 'Jouw 12 assen',
  compareNoResults: 'Geen profielen gevonden.',
  compareLoading: 'Vergelijken…',
  compareLoadError: 'Kon de vergelijking niet laden. Probeer opnieuw.',
  compareTypeLabels: { personality: 'Persoonlijkheid', country: 'Land', ideology: 'Ideologie' },
  compareAxisAdverbs: {
    estrutura: 'structureel',
    economia: 'economisch',
    moral: 'moreel',
    tecnologia: 'technologisch',
    diplomacia: 'diplomatiek'
  },
  compareClosestLine: (adverb, name) => `Je bent ${adverb} compatibel met ${name}.`,
  compareFarthestLine: (adverb, name) => `Je bent ${adverb} verwijderd van ${name}.`,
  compareClosestFallback: (axis, name) => `Op ${axis} ben je compatibel met ${name}.`,
  compareFarthestFallback: (axis, name) => `Op ${axis} ben je verwijderd van ${name}.`,
  compareIdentical: (name) => `Jij en ${name} hebben praktisch identieke posities op elke as.`,
  compareNearestLine: (axis, name) => `Je dichtstbijzijnde as bij ${name} is ${axis}.`,
  compareNoFarLine: (name) => `Geen enkele as is ver van ${name}.`,
  compareValues: (pole, you, them, name) => `${pole}: jij ${you}% · ${name} ${them}%.`,
  compareOptionAria: (name, type) => `${name}, ${type}`,
  axisExplanations: {
    estrutura:
      'Meet of je de voorkeur geeft aan macht verdeeld over staten, steden en lokale gemeenschappen of aan een unitaire nationale staat met meer uniforme wetten en bevelvoering.',
    representacao:
      'Vergelijkt vertrouwen in verkiezingen, oppositie en democratische instituties met een voorkeur voor sterk leiderschap, technocratie, monarchie of autoritaire regimes.',
    poder:
      'Evalueert de balans tussen orde, toezicht, straf en staatscontrole versus privacy, individuele vrijheid en burgerlijke autonomie.',
    imigracao:
      'Kijkt of je waarde hecht aan culturele assimilatie, taal en nationale identiteit of aan multiculturalisme, open migratie en een pluraliteit aan gewoonten.',
    diplomacia:
      'Analyseert je positie ten aanzien van strijdkrachten, wapens, afschrikking en militaire interventie in tegenstelling tot onderhandeling, pacifisme en internationale organisaties.',
    intervencao:
      'Meet de neiging tussen extern non-interventionisme en een assertievere nationale soevereiniteit, geopolitiek nationalisme en actieve verdediging van nationale belangen.',
    economia:
      'Vergelijkt een voorkeur voor publiek eigendom, staatsbedrijven en collectieve diensten met privé-eigendom, privatisering en ondernemerschap.',
    controle:
      'Evalueert staatsplanning, regulering en actief economisch beleid tegenover vrije markten, lage inmenging, monetaire autonomie en concurrentie.',
    comercio:
      'Meet protectionisme, productieve soevereiniteit en verdediging van de nationale industrie tegenover globalisme, vrijhandel en internationale economische integratie.',
    religiao:
      'Vergelijkt secularisme, scheiding van religie en staat, en kritiek op religieuze privileges met de publieke invloed van geloof en religieuze waarden.',
    moral:
      'Evalueert cultureel progressivisme, burgerrechten en sociale verandering in tegenstelling tot traditie, familie, gewoonten en moreel conservatisme.',
    tecnologia:
      'Meet het enthousiasme voor technologie, AI, genetische manipulatie en technische ontwikkeling tegenover biologische, ecologische en conserverende voorzichtigheid.'
  },
  homeAxes: {
    estrutura: { label: 'Structuur', leftPole: 'Federaal', rightPole: 'Unitair' },
    representacao: { label: 'Representatie', leftPole: 'Democratie', rightPole: 'Autocratie' },
    poder: { label: 'Macht', leftPole: 'Veiligheid', rightPole: 'Vrijheid' },
    imigracao: { label: 'Immigratie', leftPole: 'Assimilatie', rightPole: 'Multiculturalisme' },
    diplomacia: { label: 'Diplomatie', leftPole: 'Militaristisch', rightPole: 'Pacifistisch' },
    intervencao: { label: 'Interventie', leftPole: 'Non-interventionistisch', rightPole: 'Nationalistisch' },
    economia: { label: 'Economie', leftPole: 'Publiek', rightPole: 'Privaat' },
    controle: { label: 'Controle', leftPole: 'Planning', rightPole: 'Vrije markt' },
    comercio: { label: 'Handel', leftPole: 'Protectionisme', rightPole: 'Globalisme' },
    religiao: { label: 'Religie', leftPole: 'Irreligieus', rightPole: 'Religieus' },
    moral: { label: 'Moraal', leftPole: 'Progressief', rightPole: 'Traditionalistisch' },
    tecnologia: { label: 'Technologie', leftPole: 'Technologie', rightPole: 'Biologie' }
  },
  spectrumItems: [
    {
      id: 'left-radical',
      label: 'Radicaal links',
      tone: 'darkred',
      description:
        'Revolutionair of totalitair eenpartijcommunisme, met een planeconomie, sterke centralisatie en geconcentreerde staatsmacht.'
    },
    {
      id: 'left',
      label: 'Links',
      tone: 'green',
      description:
        'Pleit voor sociale democratie, progressivisme en grotere staatsinterventie in de economie binnen een liberale democratie.'
    },
    {
      id: 'center',
      label: 'Centrum',
      tone: 'gray',
      description:
        'Zoekt balans tussen links en rechts, markt en staat, hervorming en stabiliteit, met een gematigde of pragmatische politieke houding.'
    },
    {
      id: 'right',
      label: 'Rechts',
      tone: 'blue',
      description:
        'Pleit voor conservatisme, economisch liberalisme en gematigd nationalisme binnen een liberale democratie.'
    },
    {
      id: 'right-extreme',
      label: 'Extreemrechts',
      tone: 'navy',
      description:
        'Fascisme, raciaal nationalisme en onderdrukkende theocratieën, met expliciete afwijzing van democratie en autoritaire machtsconcentratie.'
    },
    {
      id: 'third-position',
      label: 'Derde positie',
      tone: 'purple',
      description:
        'Een nationalistische, corporatistische synthese die zowel liberaal kapitalisme als marxisme afwijst, buiten de traditionele links-rechts as.'
    },
    {
      id: 'libertarian',
      label: 'Libertair',
      tone: 'amber',
      description:
        'Pleit voor een minimale staat, vrije markten, privé-eigendom en individuele vrijheden, zonder de totale afschaffing van de staat voor te stellen.'
    },
    {
      id: 'anarchist',
      label: 'Anarchist',
      tone: 'charcoal',
      description:
        'Verwerpt de staat en alle dwingende autoriteit, pleit voor vrije, vrijwillige en zelfbeheerde sociale organisatie, van links of rechts.'
    }
  ],
  faqItems: [
    {
      question: 'Is de test betrouwbaar?',
      answer:
        'De 12 Assen politieke test is betrouwbaar als hulpmiddel voor het lezen en vergelijken van politieke standpunten. Het gebruikt vragen verspreid over 12 assen om bias door enkelvoudige onderwerpen te verminderen, maar het vervangt geen studie, debat of academische analyse.'
    },
    {
      question: 'Hoe lang duurt het?',
      answer:
        'De korte versie duurt ongeveer 5 minuten. De volledige versie duurt ongeveer 9 minuten. De extreme versie, met 240 vragen, kan ongeveer 30 minuten duren.'
    },
    {
      question: 'Kan ik het opnieuw doen?',
      answer:
        'Ja. Je kunt de politieke quiz zo vaak als je wilt opnieuw doen, inclusief het kiezen van een andere diepte om te vergelijken of je resultaat verandert.'
    },
    {
      question: 'Is er een juist antwoord?',
      answer:
        'Er is geen juist antwoord. De ideologietest meet voorkeuren over democratie, monarchie, federalisme, immigratie, religie in de politiek, economisch beleid, internationale handel, liberalisme, conservatisme, progressivisme en andere onderwerpen.'
    },
    {
      question: 'Hoe berekent het algoritme?',
      answer:
        'Elk antwoord voegt punten toe aan een specifieke pool. Het algoritme berekent percentages per as, vergelijkt je ideologische vector met de profielen van politieke stromingen, landen en persoonlijkheden, en retourneert de hoogste compatibiliteiten.'
    },
    {
      question: 'Verandert het resultaat?',
      answer:
        'Het kan veranderen als je meningen veranderen, als je genuanceerder antwoordt, of als je een langere versie doet. De extreme versie heeft de neiging fluctuaties te verminderen door meer vragen te gebruiken.'
    },
    {
      question: 'Is de test wetenschappelijk?',
      answer:
        '12 Assen is geen klinisch gevalideerd wetenschappelijk instrument. Het is een educatieve politieke test, geïnspireerd op politieke spectrummodellen en ideologiequizzen, nuttig voor reflectie en vergelijking.'
    },
    {
      question: 'Kan ik het delen?',
      answer:
        'Ja. Als je klaar bent, kun je je resultaat delen om politieke ideologie, het politieke spectrum, links, rechts, centrum en de 12 assen met andere mensen te bespreken.'
    },
    {
      question: 'Verzamelt de test gegevens?',
      answer:
        'De test is anoniem en vereist geen aanmelding. Antwoorden worden gebruikt om het resultaat tijdens de quiz te berekenen, zonder te vragen naar je naam, e-mail of persoonlijke identificatie.'
    },
    {
      question: 'Kan ik het op mijn telefoon doen?',
      answer:
        'Ja. De interface is ontworpen voor mobiel en desktop, zodat je de politieke test in de browser van je smartphone kunt doen.'
    }
  ],
  howEyebrow: 'Hoe het werkt',
  howTitle: 'Hoe de 12 Assen politieke quiz werkt',
  howLead:
    'Een eenvoudige, visuele politieke ideologietest: je reageert op stellingen, 12 Assen berekent je percentages en toont waar je staat op het politieke spectrum in elke dimensie.',
  steps: [
    {
      title: 'Beantwoord de vragen',
      text: 'Eens of oneens zijn met stellingen over de economie, de staat, burgerlijke vrijheden, waarden, religie, buitenlands beleid en technologie.'
    },
    {
      title: 'Analyse over 12 assen',
      text: 'Elk antwoord positioneert je op 12 onafhankelijke ideologische assen - van vrije markten tot planning, van nationalisme tot globalisme.'
    },
    {
      title: 'Ontdek je profiel',
      text: 'Ontvang uw ideologisch profiel, meest compatibele ideologieën, dichtstbijzijnde land, gerelateerde persoonlijkheid en per-as-resultaten.'
    }
  ],
  axesGuideEyebrow: '12 assen',
  axesGuideTitle: 'Wat betekent elke as?',
  axesGuideLead:
    'De 12 Assen ideologie test analyseert federalisme, politieke vertegenwoordiging, democratie, verkiezingen, immigratie, internationale handel, religie in de politiek, economisch beleid, moraliteit en technologie in afzonderlijke dimensies.',
  discoveryEyebrow: 'Wat u zult ontdekken',
  discoveryTitle: 'Een compleet portret van uw politieke overtuigingen',
  discoveryLead:
    'Meer dan links of rechts: uw resultaat laat zien wie, waar en hoe sterk uw ideeën werkelijk overeenkomen.',
  discoveryItems: [
    { icon: 'ideology', title: 'Uw ideologie', text: 'Welke politieke stroming bij u past' },
    { icon: 'country', title: 'Uw land', text: 'Welke natie denkt het meest als u' },
    { icon: 'personality', title: 'Uw politieke leider', text: 'Welke historische figuur uw ideologische match is' },
    { icon: 'spectrum', title: 'Uw spectrum', text: 'Waar u valt tussen links en rechts' },
    { icon: 'profile', title: 'Uw profiel', text: 'Een compleet portret van uw overtuigingen' },
    { icon: 'compatibility', title: 'Compatibiliteit', text: 'Hoezeer u het werkelijk eens bent met uw eigen ideologie' }
  ],
  exampleEyebrow: 'Reëel voorbeeld',
  exampleTitle: 'Zo ziet uw resultaat eruit',
  exampleCaption: 'Illustratief voorbeeld met echte gegevens uit de 12 Assen catalogus.',
  exampleCta: 'Ik wil mijn resultaat zien',
  spectrumEyebrow: 'Politiek spectrum',
  spectrumTitle: 'Ontdek uw politieke spectrum',
  spectrumLead:
    'Het resultaat helpt u uw politieke positie tussen links, rechts en het midden te visualiseren, en identificeert ook meer radicale, autoritaire of libertaire vormen die buiten die as vallen, zoals extreemrechts, radicaal links, derde positie, libertarisme en anarchisme.',
  faqTitle: 'Veelgestelde vragen',
  faqLead: 'Alles wat mensen gewoonlijk vragen voordat ze de test doen.',
  navStart: 'Start',
  menuAria: 'Menu openen',
  roseAria: 'Roos van de 12 assen',
  spectrumBarAria: 'Politieke spectrumbalk met de acht categorieën',
  versionsEyebrow: 'Versies',
  versionsTitle: 'Kies de diepte',
  versionsLead:
    'Begin met de snelle quiz of ga dieper voor een preciezer portret van uw ideologische profiel. Alle versies gebruiken dezelfde 12 assen en retourneren het resultaat direct.',
  variantEyebrow: 'Kies het formaat',
  variantTitlePre: 'Wilt u snelheid of ',
  variantTitleEm: 'precisie?',
  backToStart: 'Terug naar start',
  depthLabel: 'Diepte',
  depthAria: (level) => `Diepte ${level} van 3`,
  recommended: 'Aanbevolen',
  formatNotes: ['Alle versies gebruiken dezelfde 12 assen', 'Anoniem, geen aanmelding', 'Direct resultaat'],
  variantLead:
    'De korte versie onthult snel het resultaat. De volledige versie verhoogt de precisie om uw resultaat dichter bij de ideologische profielen te brengen.',
  quizNavAria: 'Quiznavigatie',
  autoAdvance: 'Vooruit bij antwoord',
  back: 'Terug',
  next: 'Volgende',
  calculating: 'Bezig met berekenen…',
  seeResult: 'Zie resultaten',
  archetypeSkip: 'Overslaan',
  errMissingAnswer: 'U moet deze vraag nog beantwoorden voordat u het resultaat ziet.',
  errLoadQuiz: 'De quiz kon niet worden geladen.',
  errCalc: 'Het resultaat kon niet worden berekend.',
  errImage: 'De resultaat afbeelding kon niet worden gegenereerd.',
  errHttp: (status) => `HTTP-fout ${status}`,
  resultsEyebrow: 'Analyse voltooid',
  resultsH1Pre: 'Uw ideologisch ',
  resultsH1Em: 'profiel',
  resultsLead: (count) =>
    `Analyse gebaseerd op ${count} antwoorden verdeeld over 12 fundamentele dimensies van politieke ideologie. Controleer uw positie op elke as en uw ideologische matches.`,
  resultsLeadShared:
    'Gedeeld resultaat: de positie op elk van de 12 politieke assen en de daaruit berekende ideologische matches. Doe de test om de uwe te ontdekken.',
  resultsSummaryAria: 'Samenvatting analyse',
  metaAnswered: 'Vragen beantwoord',
  metaAxes: 'Assen geanalyseerd',
  metaTop: 'Top match',
  axesSectionEyebrow: 'Politieke assen',
  axesSectionTitle: 'Percentage resultaat per as',
  proximityEyebrow: 'Ideologische nabijheid',
  otherMatches: 'Andere matches',
  navOnThisPage: 'Op deze pagina',
  resultsNavAxes: 'De 12 assen',
  resultsNavSignature: 'Wat u onderscheidt',
  resultsNavCountries: 'Landen',
  resultsNavPersonalities: 'Figuren',
  resultsNavAreas: 'Gebieden',
  resultsNavBooks: 'Verder lezen',
  resultsNavIdeologies: 'Andere ideologieën',
  countriesSectionTitle: 'Landen die het dichtst bij u staan',
  countryCurrentTab: 'Heden',
  countryHistoricalTab: 'Historisch',
  countriesDistantTitle: 'Verst van u vandaan',
  personalitiesSectionTitle: 'Figuren die het dichtst bij u staan',
  personalitiesByAreaTitle: 'Ook dichtbij, per gebied',
  dimensionsTitle: 'Ook dichtbij, per dimensie van uw profiel',
  dimensionLabels: {
    political: 'Politiek',
    social: 'Sociaal',
    economic: 'Economisch',
  },
  booksEyebrow: 'Lees verder',
  booksTitle: 'Verder lezen',
  booksTopLabel: 'Het dichtst bij u',
  booksAuthorLabel: 'Auteur',
  booksLead: 'Eén werk van elk van de figuren die het dichtst bij uw resultaten staan.',
  booksWhy: (pct) => `${pct}% compatibel`,
  booksYearBc: (year) => `${year} v.Chr.`,
  booksCta: 'Bekijk op Amazon',
  areasGeneralTitle: 'De figuren die het dichtst bij uw resultaten staan',
  areasSectionTitle: 'De dichtstbijzijnde figuren per veld',
  areasTabsAria: 'Hoe figuren zijn gegroepeerd',
  areasGeneralTab: 'Algemene compatibiliteit',
  areasByAreaTab: 'Veld',
  personalitiesDistantTitle: 'Het verst van u verwijderd',
  ideologyDistantTitle: 'De ideologie die het verst van u verwijderd is',
  phraseTitle: 'Een zin die u beschrijft',
  phraseNote: (ideology) => `Dit is hoe iemand van ${ideology} de maatschappij zou samenvatten die zij willen.`,
  signatureTitle: 'Wat u onderscheidt',
  signatureUnusualLabel: 'Uw meest ongebruikelijke positie',
  signatureCommonLabel: 'Uw meest typische positie',
  signatureUnusualLead: (pole, percent) => `U neigt verder naar ${pole.toLowerCase()} dan ${Math.round(percent)}% van de ideologieën in de catalogus.`,
  signatureUnusualLeadMax: (pole) => `Geen enkele ideologie in de catalogus neigt zo ver naar ${pole.toLowerCase()} als u.`,
  signatureUnusualLeadBalanced: (axis, pole, percent) =>
    `Uw positie op ${axis} is gematigd. Toch plaatst dat u verder naar ${pole.toLowerCase()} dan ${Math.round(percent)}% van de ideologieën in de catalogus.`,
  signatureUnusualNote: (axis) => `Van alle 12 assen is ${axis} waar u het meest afwijkt van het veld. Het is de eigenschap die u onderscheidt.`,
  signatureCommonLead: (axis) => `Uw positie op ${axis} ligt bijna precies op de mediaan van de catalogus.`,
  signatureCommonNote: (pole) => `Dit is gemeenschappelijke grond. U neigt noch naar ${pole.toLowerCase()} noch naar de tegenovergestelde pool.`,
  signatureCommonNoteBalanced: (axis) => `U zit in het centrum op ${axis}, en de catalogus ook. Dit is waar uw profiel het minst opvalt.`,
  tensionLabel: 'Uw interne spanning',
  tensionCombo: (firstPole, secondPole) => `${firstPole} en ${secondPole} tegelijk`,
  tensionRare: (count, total) => `Slechts ${count} van de ${total} ideologieën in de catalogus hebben beide posities.`,
  tensionUnique: 'Geen enkele ideologie in de catalogus heeft beide posities.',
  tensionExamples: (names) => `Dichtstbijzijnde overeenkomsten: ${names}.`,
  tensionNote: (firstAxis, secondAxis) => `In de catalogus bewegen ${firstAxis} en ${secondAxis} meestal samen. U keert dat patroon om.`,
  signatureMedian: 'Ideologie mediaan',
  signatureYou: 'U',
  personalityCategories: {
    politico: 'Politiek',
    religioso: 'Religie',
    economista: 'Economie',
    filosofo: 'Filosofie',
    teorico: 'Politieke theorie',
    empresario: 'Bedrijfskunde',
    intelectual: 'Intellectueel leven',
    ativista: 'Activisme',
  },
  redoAnalysis: 'Analyse opnieuw doen',
  share: 'Delen',
  saveOrShare: 'Resultaat delen',
  generatingPng: 'PNG genereren...',
  generatingPdf: 'PDF genereren...',
  downloadPdf: 'PDF downloaden',
  report: {
    fileName: '12assen-rapport',
    docLabel: 'Volledig rapport',
    profileEyebrow: 'Uw ideologische profiel',
    headerLabel: (ideology) => `Politiek profielrapport · ${ideology}`,
    kpiCountry: 'Dichtstbijzijnde land',
    kpiPersonality: 'Figuur',
    kpiAxes: 'Assen geanalyseerd',
    kpiAnswered: (count) => `${count} vragen beantwoord`,
    tocTitle: 'In dit rapport',
    generatedOn: (date) => `Gegenereerd op ${date}`,
    axesIntro: 'Uw positie op elk van de 12 assen. De balk begint in het midden (50%) en strekt zich uit naar de pool waartoe u neigt; het insigne toont de intensiteit.',
    intensityLegend: 'Intensiteit',
    intensityLevels: ['Gematigd · tot 57%', 'Neiging · 58 tot 72%', 'Sterk · 73 tot 87%', 'Zeer sterk · 88% of meer'],
    alsoClose: 'Ook dichtbij, per dimensie van uw profiel',
    continued: 'vervolg',
    areasIntro: 'De figuren in de catalogus waarvan het profiel over de 12 assen het meest lijkt op het uwe.',
    booksIntro: 'Eén werk van elk van de figuren die het dichtst bij uw resultaten staan. Links in de online versie van het resultaat.',
    aboutTitle: 'Over dit rapport',
    aboutText: '12 Assen vergelijkt uw antwoorden met profielen van ideologieën, landen en figuren op dezelfde 12 assen. Compatibiliteit meet de nabijheid tussen profielen; het is geen wetenschappelijke diagnose of een definitief label. Uw antwoorden worden niet opgeslagen.',
    ctaTitle: 'Doe de quiz opnieuw of deel deze'
  },
  shareFilePrefix: '12assen-profiel',
  shareMessage: (ideology, ideologyPct, country, countryPct, personality, personalityPct) =>
    `Ik ontdekte mijn ideologische profiel op de 12 Assen Politieke Quiz!\n\n` +
    `💡 Meest compatibele ideologie:\n` +
    `${ideology} - ${ideologyPct}% compatibiliteit\n\n` +
    `🌎 Meest compatibele land/natie:\n` +
    `${country} - ${countryPct}% compatibiliteit\n\n` +
    `👤 Meest compatibele persoonlijkheid:\n` +
    `${personality} - ${personalityPct}% compatibiliteit\n\n` +
    `👉 Doe de test en deel uw resultaat:\nhttps://12axes.vercel.app/en`,
  progress: (current, total) => `Vraag ${current} van ${total}`,
  progressDone: (percent) => `${percent}% voltooid`,
archetypeHeader: 'Je archetype identificeren',
  archetypeStep: (current, total) => `${current} van ${total}`,
  progressAria: (percent) => `Voortgang quiz: ${percent}%`,
  answersAria: 'Antwoordopties',
  countryKicker: 'Meest compatibel land',
  flagLabel: 'Vlag',
  flagHistoricLabel: 'Vlag / historisch symbool',
  flagAlt: (label, name) => `${label} van ${name}`,
  flagUnavailable: 'Vlag niet beschikbaar',
  flagUnavailableAria: (name) => `Vlag niet beschikbaar voor ${name}`,
  personalityKicker: 'Meest compatibele persoonlijkheid',
  portraitAlt: (name) => `Portret van ${name}`,
  portraitUnavailableAria: (name) => `Portret niet beschikbaar voor ${name}`,
  compatibilityAria: (pct) => `Compatibiliteit: ${pct} procent`,
  matchWord: 'overeenkomst',
  shareTitle: 'Mijn ideologisch profiel | 12axes.vercel.app',
  shareTopMatch: 'Top overeenkomst',
  shareCountry: 'Meest compatibel land',
  sharePersonality: 'Persoonlijkheid',
  shareResultLabel: 'MIJN RESULTAAT',
  shareMostCompatible: 'MEEST COMPATIBEL',
  shareYourAxes: 'JOUW 12 AXES',
  shareOtherPersonalities: 'ANDERE PERSOONLIJKHEDEN',
  shareNearbyCountries: 'LANDEN IN DE BUURT',
  shareFooterCta: 'ONTDEK JE PROFIEL',
  shareFooterUrl: '12AXES.VERCEL.APP',
  supportEyebrow: 'Steun het project',
  supportTitle: '',
  ossEyebrow: 'Open source',
  ossTitle: 'Een onafhankelijk, transparant project',
  ossLead: "Je hoeft ons niet op ons woord te geloven. De 12 Axes code is publiek: je kunt zien hoe elk antwoord wordt gescoord, hoe compatibiliteit wordt berekend en waar de profielen vandaan komen.",
  ossCards: [
    { title: 'Onafhankelijk', text: 'Geen banden met partijen, overheden of campagnes. Niemand betaalt om in jouw resultaat te verschijnen.' },
    { title: 'Controleerbaar', text: 'Puntentelling van antwoorden en de compatibiliteitsberekening staan in de code, zonder black box.' },
    { title: 'Verifieerbaar', text: 'Vragen, ideologieën, landen en persoonlijkheden zijn opgeslagen in versiebeheerde bestanden met een publieke geschiedenis.' },
    { title: 'Samenwerking', text: 'Een bevooroordeelde vraag of een onnauwkeurig profiel gevonden? Open een issue of stuur een pull request.' }
  ],
  ossBarText: 'Lees de code, controleer de gegevens en draag bij op GitHub.',
  ossGithubCta: 'Bekijk op GitHub',
  ossIssueCta: 'Stel een verbetering voor',
  feedbackTitle: 'Een probleem gevonden of een idee?',
  feedbackReport: 'Meld een probleem',
  feedbackSuggest: 'Stel verbeteringen voor',
  supportTitleEm: 'Steun',
  supportLead:
    '12 Axes is onafhankelijk en gratis. Als de quiz je heeft geholpen om je politieke ideologie beter te begrijpen, overweeg dan een donatie via Pix of crypto om het project draaiende te houden.',
  supportPrivacyNote: "We verzamelen geen gegevens. Om anoniem te doneren, gebruik crypto.",
  supportCopy: 'Kopiëren',
  supportCopied: 'Gekopieerd!',
  supportCopyAria: (label) => `${label} adres kopiëren`,
  supportCoins: [
    {
      id: 'pix',
      name: 'Pix',
      network: 'Willekeurige sleutel',
      address: 'bf3e8e0b-27fe-4845-b5e2-358ca0281847'
    },
    {
      id: 'btc',
      name: 'Bitcoin',
      network: 'On-chain',
      address: 'bc1qsuy8r8gvl39apjykqzlgh7hku79ecarezhz2zj'
    },
    {
      id: 'lightning',
      name: 'Bitcoin',
      network: 'Lightning',
      address: 'lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhk2ctnw3jhymnsv96kcwfsa0gczg'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      network: 'ERC-20',
      address: '0xDe821e55D6101AA42D05DBf2C07ad0BB866C23a5'
    },
    {
      id: 'xmr',
      name: 'Monero',
      network: 'XMR',
      address:
        '85Du1EuRPkybMVXTVptC6z31dsGPpTthsiMKM3yjY7YE24BUCkyNMd9Q82kwe5CvE7BegtDTNxaG8VwYdVvTgbjDU6DpuN1'
    }
  ]
};

export const t: Strings = LANG === 'en' ? en : LANG === 'nl' ? nl : pt;
export const LOCALE = LANG === 'pt' ? 'pt-BR' : LANG === 'nl' ? 'nl-NL' : 'en-US';
