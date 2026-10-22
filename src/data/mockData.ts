import { Category, Product, PurchasedAsset, Order } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'templates-and-ui',
    name: 'Templates & UI Kits',
    description: 'Next.js 15, Tailwind, React & Figma',
    icon: 'layers',
    assetCount: '320 assets',
    badgeColorClass: 'text-primary'
  },
  {
    id: 'formations-and-guides',
    name: 'Formations & Vidéos',
    description: 'Masterclasses pratiques & code-alongs',
    icon: 'smart_display',
    assetCount: '85 heures',
    badgeColorClass: 'text-tertiary'
  },
  {
    id: 'ebooks',
    name: 'E-books & Guides',
    description: 'Playbooks d’ingénierie & solopreneuriat',
    icon: 'menu_book',
    assetCount: '48 manuels',
    badgeColorClass: 'text-secondary'
  },
  {
    id: 'boilerplates',
    name: 'Boilerplates SaaS',
    description: 'Auth, Stripe, Emailing prêt en 1h',
    icon: 'rocket_launch',
    assetCount: '19 stacks',
    badgeColorClass: 'text-primary-fixed'
  },
  {
    id: 'presets-audio',
    name: 'Presets & Audio',
    description: 'Shaders 3D, UI SFX & assets motion',
    icon: 'graphic_eq',
    assetCount: '140 packs',
    badgeColorClass: 'text-tertiary'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-nexus-saas',
    slug: 'nexus-saas-starter-kit',
    title: 'Nexus SaaS Starter Kit',
    category: 'boilerplates',
    tagline: 'Stack complète Next.js 14/15, Stripe Billing, Supabase Auth, Emails React et dashboards.',
    description: 'Nexus est le boilerplate TypeScript ultime pour expédier votre SaaS en quelques heures au lieu de mois. Comprend Stripe Checkout & Portal, Supabase Row-Level Security blindé, Tailwind CSS, Resend Emails transactionnels, authentification sociale (Google, GitHub), et support multitenant.',
    badge: 'Best Seller',
    badgeType: 'bestseller',
    rating: 4.9,
    reviewCount: 142,
    priceEUR: 69,
    originalPriceEUR: 119,
    priceFCFA: 45000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChyjSUycIHB-YD4xSVlGpBeONahaGJKbx9dmB1X4DIUKkWXWGEK6Z8XaoGBSWvouPibmK8VRC-wqxq1sRi3aEbnrayuUcs_4hn1NFbNJKerRu4eWOgG-EEBh_qyZhr8JVCbf14hgjXqTZHIXRhRX9eryv11NyD6q_VUx_tgV_pMibrxzFpMVlgRjXrhWrsfTmmJ3YnRwC3Hnc8ONRDeTSHO-qFNu9HJkeGxfCuJSpk7mc4oFauufhj',
    imageAlt: 'Nexus SaaS Starter Kit preview',
    tags: ['Next.js 15', 'Supabase', 'Stripe', 'Tailwind', 'TypeScript'],
    techStack: 'NEXT.JS • SUPABASE',
    featured: true,
    version: 'v2.4.1',
    downloadsCount: 1840,
    includedFeatures: [
      'Accès dépôt GitHub privé avec commits réguliers',
      'Intégration Stripe & portail client de gestion d\'abonnement',
      'Authentification Supabase RLS (OAuth Google + GitHub + Magic link)',
      '12 templates d\'emails HTML responsives (Resend / React Email)',
      'Licence commerciale illimitée pour projets SaaS infinis',
      'Canal Discord VIP dédié avec réponses des créateurs en < 4h'
    ],
    fileSize: '48.2 MB .zip',
    lastUpdated: '18 Octobre 2026',
    license: 'Licence Commerciale Illimitée',
    gitRepoUrl: 'https://github.com/novadigital-pro/nexus-saas-starter',
    downloadFileName: 'nexus-saas-starter-v2.4.1.zip'
  },
  {
    id: 'prod-figma-pro',
    slug: 'figma-pro-ui-kit',
    title: 'Figma Pro UI Kit & Design System',
    category: 'templates-and-ui',
    tagline: 'Plus de 3 500 variants, auto-layout 5.0, variables multi-modes et documentation.',
    description: 'Le design system le plus complet et méticuleusement architecturé de l\'écosystème Figma. Pensé pour les équipes produit modernes, les solopreneurs et les agences digitales qui exigent une cohérence visuelle sans faille.',
    badge: 'Nouveau',
    badgeType: 'new',
    rating: 5.0,
    reviewCount: 64,
    priceEUR: 49,
    originalPriceEUR: 89,
    priceFCFA: 32000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxcxzcs_2w-9QoBsryUQDqp-w1Sc8klDaSQoGX9cq7S5pG3-Uf49yd-7amEthXaLswjirBY6Mgfa0-3BU9UdB84pdgbLedMbdyzWq7uEDCzKMwPxw9BwDVqrJ9A2FTDkCs0Bk4fEgdROGQva2tb7hWpljkCfwQRepmKSSwkeuKdkM3Z-Yt2cl7oefCp-cRWk-TW4C06v72xSMNxqm-K6T1Ionyj4gbnwckH0_m8-5719EVIGcRD3I0',
    imageAlt: 'Figma Pro UI Kit & Design System',
    tags: ['Figma', 'Design System', 'Tokens', 'Auto-Layout 5.0', 'Dark Mode'],
    techStack: 'FIGMA • TOKENS 2024',
    featured: true,
    version: 'v3.1.0',
    downloadsCount: 1210,
    includedFeatures: [
      '3 500+ variants de composants avec typages stricts',
      'Tokens sémantiques complets (Color, Spacing, Elevation, Radius)',
      'Modes Clairs / Sombres commutables en 1 clic via Figma Variables',
      'Grilles responsives adaptées au mobile, tablette et écrans 4K',
      'Documentation de patterns UX pour concevoir des dashboards SaaS'
    ],
    fileSize: '115.0 MB .fig',
    lastUpdated: '12 Octobre 2026',
    license: 'Licence Commerciale & Freelance Illimitée',
    gitRepoUrl: 'https://figma.com/@novadigital/pro-design-system-2025',
    downloadFileName: 'figma-pro-design-system-v3.1.fig'
  },
  {
    id: 'prod-fullstack-masterclass',
    slug: 'developpeur-full-stack-moderne',
    title: 'Développeur Full-Stack Moderne',
    category: 'formations-and-guides',
    tagline: 'Concevez, déployez et scalez des microservices réels avec Node, TypeScript, Docker.',
    description: 'Une formation vidéo immersive de 24 heures en qualité 4K avec code source pas à pas. Vous bâtirez une plateforme temps réel complète de zéro jusqu\'à la mise en production sur infrastructure Kubernetes et Cloud Run.',
    badge: 'Top Noté',
    badgeType: 'top-rated',
    rating: 4.95,
    reviewCount: 289,
    priceEUR: 89,
    originalPriceEUR: 149,
    priceFCFA: 58000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCER-ey3mu-soEmcUuhMpz5Hh2o1KAgaoTDT7rdegMij9_gPX0vDuPvJUwWb9tD74CBB9AVYX2SWeaZUv_Z4wcJPWOFQf61ju8u0awx5Pz62V5ilKYv41a-OgCe8KoV4QB3FMnr5Ie_cMSxHhJxayBdwDpakRIJLrxSGbEP1OB6hbTuHD58OaTCj6e4L3tZ1V81mO7uAy41uhABKTICuoh6EwzA59RhlXRGhq9dGx0fo8EnUtuXW_ao',
    imageAlt: 'Développeur Full-Stack Moderne Course',
    tags: ['Masterclass', 'Node.js', 'Docker', 'PostgreSQL', 'TypeScript', 'Kubernetes'],
    techStack: 'MASTERCLASS • 24H 4K',
    featured: true,
    version: 'Édition 2025/2026',
    downloadsCount: 3420,
    includedFeatures: [
      '24 heures de vidéos 4K chapitrées téléchargeables sans DRM',
      '18 projets réels avec dépôts Git branches par étape',
      'Architecture propre hexagonale et domain-driven design',
      'CI/CD GitHub Actions & pipelines de déploiement automatisés',
      'Accès illimité aux sessions de Q&A mensuelles en direct'
    ],
    fileSize: '14.8 GB (Flux stream + archive zip)',
    lastUpdated: '05 Octobre 2026',
    license: 'Accès individuel illimité à vie',
    gitRepoUrl: 'https://github.com/novadigital-pro/fullstack-masterclass-repo',
    downloadFileName: 'fullstack-masterclass-course-pack.zip'
  },
  {
    id: 'prod-art-solopreneur',
    slug: 'art-du-solopreneur-tech',
    title: 'L’Art du Solopreneur Tech',
    category: 'ebooks',
    tagline: 'Stratégies concrètes pour passer de développeur salarié à 10k€/mois.',
    description: 'Le manuel de référence pour concevoir, marketer et vendre des micro-produits digitaux (SaaS, templates, APIs et newsletters payantes) sans lever de fonds ni recruter une armée.',
    badge: 'Guide Pro',
    badgeType: 'guide',
    rating: 4.85,
    reviewCount: 193,
    priceEUR: 29,
    originalPriceEUR: 45,
    priceFCFA: 19000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8gpPZyIuS9_Ha2A0mSTPTS57y9XWlAyQX4xJL6K9R60YgbXUx4SmOcRCOrweReqKVzbZP8ZqxaYOxFhTEEZwX1b6wEnPKPKCbD-U2S-GVaLr0tOHjnfe1wPANH5lEOj2cxeHpRttJLlN-sJf3JDDuxs52212Nm5VKY2263qy5yMlltDGDBtIr9VdKCsGGCgwwBrUAFEqBk8zZKjkQL6RMPY9NcTz-x0QxuULza2d4DwUuw4E1u7ep',
    imageAlt: 'L’Art du Solopreneur Tech Book',
    tags: ['E-book', 'Solopreneur', 'Business', 'Notion', 'Marketing Tech'],
    techStack: 'E-BOOK • 50 TEMPLATES',
    featured: true,
    version: 'v2.0 (PDF + EPUB + Notion)',
    downloadsCount: 2150,
    includedFeatures: [
      'Livre numérique de 320 pages au format PDF, EPUB et Kindle',
      '50 templates Notion interactifs (financier, prospection, lancements)',
      'Scripts de vente et séquences email de conversion testées',
      'Framework d\'analyse de concurrence et de pricing SaaS',
      'Liste de 120 répertoires où soumettre votre produit pour booster son SEO'
    ],
    fileSize: '34.5 MB .zip',
    lastUpdated: '15 Septembre 2026',
    license: 'Licence Personnelle & Templates Réutilisables',
    downloadFileName: 'art-du-solopreneur-pack-complet.zip'
  },
  {
    id: 'prod-bundle-founder',
    slug: 'bundle-founder-360',
    title: 'Le Pack Ultime « Founder 360° »',
    category: 'offres-speciales',
    tagline: 'Le SaaS Starter Nexus + Design System Figma + Masterclass Full-Stack + 50 Playbooks.',
    description: 'Tout ce dont un développeur ou une équipe fondatrice a besoin pour passer du concept au produit mondial rentable en un temps record. Économisez 45% sur l\'ensemble du catalogue phare.',
    badge: 'Pack Ultime -45%',
    badgeType: 'bestseller',
    rating: 5.0,
    reviewCount: 310,
    priceEUR: 129,
    originalPriceEUR: 236,
    priceFCFA: 84500,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChyjSUycIHB-YD4xSVlGpBeONahaGJKbx9dmB1X4DIUKkWXWGEK6Z8XaoGBSWvouPibmK8VRC-wqxq1sRi3aEbnrayuUcs_4hn1NFbNJKerRu4eWOgG-EEBh_qyZhr8JVCbf14hgjXqTZHIXRhRX9eryv11NyD6q_VUx_tgV_pMibrxzFpMVlgRjXrhWrsfTmmJ3YnRwC3Hnc8ONRDeTSHO-qFNu9HJkeGxfCuJSpk7mc4oFauufhj',
    imageAlt: 'Le Pack Ultime Founder 360',
    tags: ['Bundle', 'Next.js', 'Figma', 'Formation', 'E-book', 'VIP Discord'],
    techStack: 'ALL-IN-ONE BUNDLE',
    featured: false,
    version: '2026 Mega Pack',
    downloadsCount: 940,
    includedFeatures: [
      'Nexus SaaS Starter Kit (Next.js 15 + Supabase + Stripe)',
      'Figma Pro UI Kit & Design System (3 500+ variants)',
      'Masterclass Vidéo Développeur Full-Stack (24h 4K)',
      'Livre numérique & 50 templates Notion Solopreneur Tech',
      'Accès au salon VIP Discord avec support prioritaire garanti',
      'Mises à jour à vie pour l\'ensemble des 4 produits'
    ],
    fileSize: '15.2 GB (Pack bundle complet)',
    lastUpdated: '20 Octobre 2026',
    license: 'Licence Commerciale Illimitée & Multi-Projets',
    gitRepoUrl: 'https://github.com/novadigital-pro/founder-360-bundle',
    downloadFileName: 'nova-founder-360-mega-bundle.zip'
  },
  {
    id: 'prod-cyberpunk-audio',
    slug: 'cyberpunk-ui-sfx-pack',
    title: 'Cyberpunk UI SFX & Audio Pack',
    category: 'presets-audio',
    tagline: 'Plus de 450 effets sonores d’interfaces futuristes, clicks haptiques et notifications.',
    description: 'Conçu sur synthétiseurs modulaires analogiques pour doter vos applications web, jeux mobiles et dashboards SaaS d’une signature sonore inoubliable.',
    badge: 'Audio HD',
    badgeType: 'new',
    rating: 4.88,
    reviewCount: 78,
    priceEUR: 24,
    originalPriceEUR: 39,
    priceFCFA: 15500,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCER-ey3mu-soEmcUuhMpz5Hh2o1KAgaoTDT7rdegMij9_gPX0vDuPvJUwWb9tD74CBB9AVYX2SWeaZUv_Z4wcJPWOFQf61ju8u0awx5Pz62V5ilKYv41a-OgCe8KoV4QB3FMnr5Ie_cMSxHhJxayBdwDpakRIJLrxSGbEP1OB6hbTuHD58OaTCj6e4L3tZ1V81mO7uAy41uhABKTICuoh6EwzA59RhlXRGhq9dGx0fo8EnUtuXW_ao',
    imageAlt: 'Cyberpunk UI SFX Pack',
    tags: ['Audio', 'SFX', 'Web Audio API', 'WAV 96kHz', 'Sound Design'],
    techStack: 'WAV • FLAC • MP3',
    featured: false,
    version: 'v1.4',
    downloadsCount: 512,
    includedFeatures: [
      '450+ fichiers WAV 24-bit / 96kHz non compressés',
      'Versions WebP / MP3 optimisées pour temps de chargement web rapide',
      'Composant audio React prêt à l\'emploi avec useSound hook',
      'Licence libre de droits commerciale pour jeux et web apps'
    ],
    fileSize: '320 MB .zip',
    lastUpdated: '02 Octobre 2026',
    license: 'Royalty-Free Commercial License',
    downloadFileName: 'cyberpunk-ui-sfx-pack.zip'
  },
  {
    id: 'prod-react-native-expo',
    slug: 'react-native-expo-starter',
    title: 'Aura Mobile App Boilerplate (Expo 52)',
    category: 'boilerplates',
    tagline: 'Application iOS & Android native avec NativeWind, RevenueCat et Supabase.',
    description: 'Lancez votre application mobile iOS et Android en 48 heures. Structure Expo Router 4, authentification biométrique (Face ID), abonnements in-app RevenueCat et notifications push OneSignal.',
    badge: 'Mobile Pro',
    badgeType: 'new',
    rating: 4.92,
    reviewCount: 88,
    priceEUR: 79,
    originalPriceEUR: 129,
    priceFCFA: 52000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChyjSUycIHB-YD4xSVlGpBeONahaGJKbx9dmB1X4DIUKkWXWGEK6Z8XaoGBSWvouPibmK8VRC-wqxq1sRi3aEbnrayuUcs_4hn1NFbNJKerRu4eWOgG-EEBh_qyZhr8JVCbf14hgjXqTZHIXRhRX9eryv11NyD6q_VUx_tgV_pMibrxzFpMVlgRjXrhWrsfTmmJ3YnRwC3Hnc8ONRDeTSHO-qFNu9HJkeGxfCuJSpk7mc4oFauufhj',
    imageAlt: 'Aura Mobile App Boilerplate',
    tags: ['Expo', 'React Native', 'iOS', 'Android', 'RevenueCat', 'Supabase'],
    techStack: 'EXPO 52 • NATIVEWIND',
    featured: false,
    version: 'v2.1',
    downloadsCount: 890,
    includedFeatures: [
      'Structure complète Expo Router v4 et typage TypeScript strict',
      'Intégration RevenueCat pour abonnements App Store et Google Play',
      'Design inspiré d\'Apple HIG avec Tailwind / NativeWind v4',
      'Gestion hors-ligne (Offline caching) avec TanStack Query v5'
    ],
    fileSize: '62.0 MB .zip',
    lastUpdated: '14 Octobre 2026',
    license: 'Licence Commerciale Illimitée',
    gitRepoUrl: 'https://github.com/novadigital-pro/aura-expo-starter',
    downloadFileName: 'aura-mobile-expo-v2.1.zip'
  }
];

export const INITIAL_PURCHASED_ASSETS: PurchasedAsset[] = [
  {
    id: 'purch-1',
    productId: 'prod-nexus-saas',
    title: 'Nexus SaaS Starter Kit',
    licenseKey: 'NOVA-NX92-884A-COMMERCIAL-2025',
    purchaseDate: '21 Octobre 2026',
    downloadFileName: 'nexus-saas-starter-v2.4.1.zip',
    fileSize: '48.2 MB',
    version: 'v2.4.1',
    gitRepoUrl: 'https://github.com/novadigital-pro/nexus-saas-starter',
    pricePaid: '69 € (Payé par Carte)',
    invoiceId: 'INV-2026-9901'
  },
  {
    id: 'purch-2',
    productId: 'prod-art-solopreneur',
    title: 'L’Art du Solopreneur Tech (PDF + EPUB)',
    licenseKey: 'NOVA-SOLO-410F-PERSO-2025',
    purchaseDate: '15 Octobre 2026',
    downloadFileName: 'art-du-solopreneur-pack-complet.zip',
    fileSize: '34.5 MB',
    version: 'v2.0',
    pricePaid: '29 € (Payé par MTN MoMo)',
    invoiceId: 'INV-2026-8714'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'CMD-84920',
    date: '22 Octobre 2026, 14:32',
    items: [{ title: 'Nexus SaaS Starter Kit', price: '69 €' }],
    totalAmount: '69 €',
    currency: 'EUR',
    paymentMethod: 'MTN MoMo',
    status: 'Complété',
    customerEmail: 'jean.kouassi@tech.ci'
  },
  {
    id: 'CMD-84919',
    date: '22 Octobre 2026, 12:15',
    items: [{ title: 'Figma Pro UI Kit & Design System', price: '49 €' }],
    totalAmount: '32 000 FCFA',
    currency: 'XAF',
    paymentMethod: 'Orange Money',
    status: 'Complété',
    customerEmail: 'aminata.diallo@agency.sn'
  },
  {
    id: 'CMD-84918',
    date: '21 Octobre 2026, 21:04',
    items: [{ title: 'Le Pack Ultime « Founder 360° »', price: '129 €' }],
    totalAmount: '129 €',
    currency: 'EUR',
    paymentMethod: 'Stripe',
    status: 'Complété',
    customerEmail: 'florian.roux@studio.fr'
  },
  {
    id: 'CMD-84917',
    date: '21 Octobre 2026, 17:50',
    items: [{ title: 'Développeur Full-Stack Moderne', price: '89 €' }],
    totalAmount: '$96.12',
    currency: 'USD',
    paymentMethod: 'PayPal',
    status: 'Complété',
    customerEmail: 'alex.vance@startup.io'
  },
  {
    id: 'CMD-84916',
    date: '21 Octobre 2026, 09:22',
    items: [{ title: 'L’Art du Solopreneur Tech', price: '29 €' }],
    totalAmount: '19 000 FCFA',
    currency: 'XAF',
    paymentMethod: 'MTN MoMo',
    status: 'Complété',
    customerEmail: 'karistidegael@gmail.com'
  }
];

export const FAQS = [
  {
    question: "Comment se déroule le téléchargement immédiat après achat ?",
    answer: "Dès confirmation de votre transaction (par carte ou Mobile Money), votre page de confirmation génère instantanément vos liens de téléchargement directs (fichiers .zip, dépôts GitHub privés et clés de licence). Vous recevez également une copie sécurisée par e-mail et les produits sont liés pour toujours à votre espace client NovaDigital."
  },
  {
    question: "Quelle est la portée de la licence commerciale incluse ?",
    answer: "Tous nos templates et bibliothèques de code incluent une licence commerciale illimitée. Vous pouvez les utiliser pour un nombre indéfini de projets personnels, créer des SaaS monétisés pour vous-même ou livrer des applications clés en main pour vos clients finaux. La seule restriction formelle est la revente directe du template brut tel quel."
  },
  {
    question: "Puis-je payer avec mon compte Mobile Money (Orange, MTN) ?",
    answer: "Oui, absolument. Nous intégrons nativement les passerelles africaines sécurisées pour le règlement en Francs CFA (XOF/XAF) via MTN MoMo, Orange Money, Moov et Wave. La conversion est calculée au taux exact sans frais supplémentaires cachés."
  },
  {
    question: "Comment bénéficier des futures mises à jour de code ?",
    answer: "Toutes les mises à jour correctives et de versions majeures sont gratuites à vie. Si un template Next.js passe à une nouvelle version du framework, vous recevez une notification par mail et le nouveau zip ou pull-request est immédiatement téléchargeable depuis votre compte."
  },
  {
    question: "Puis-je obtenir une facture avec TVA ou mention d'entreprise ?",
    answer: "Oui, à chaque commande une facture proforma et acquittée au format PDF est instantanément téléchargeable depuis 'Mon Espace Client' ou par lien direct, comportant votre raison sociale et numéro de TVA ou identifiant fiscal."
  }
];
