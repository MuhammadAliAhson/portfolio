export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  problem: string;
  engineeringWork: string[];
  outcomes: string[];
  metricHighlight: { value: string; label: string };
  engineeringFocus: string[];
}

export interface PublicProjectItem {
  id: string;
  title: string;
  category: 'GenAI & LLMs' | 'Computer Vision & OCR' | 'Speech & Audio';
  subtitle: string;
  description: string;
  technologies: string[];
  details: string[];
  metrics?: string;
  link?: string;
  isExperimental?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export const PERSONAL_INFO = {
  name: "Muhammad Ali Ahson",
  role: "Senior Software Engineer",
  subRole: "AI Systems · Backend Engineering · Production Infrastructure",
  headline: "Turning AI-powered prototypes into production-ready software.",
  // Strict voice constraint: under 40 words, concrete engineering tone
  bio: "I take rapidly built AI applications and rebuild them into clean, scalable backend systems — with strict data contracts, high-throughput model serving, and automated cloud deployments.",
  aboutText: [
    "I'm a Senior Software Engineer focused on building reliable software around modern AI systems.",
    "My work sits at the intersection of backend engineering and applied AI — from designing APIs and database systems to building RAG pipelines, LLM inference services, agentic workflows and production deployment infrastructure.",
    "I particularly enjoy taking systems that were built quickly and turning them into software that a real engineering team can confidently maintain and extend."
  ],
  location: "Islamabad, Pakistan",
  education: "B.S. Computer Science, FAST-NUCES Islamabad",
  email: "aliahson56@gmail.com",
  phone: "+92 324 774 8900",
  socials: {
    github: "https://github.com/MuhammadAliAhson",
    linkedin: "https://www.linkedin.com/in/muhammadaliahson/",
    huggingface: "https://huggingface.co/maliahson",
    medium: "https://aliahson.medium.com/"
  }
};

export const TRUST_STRIP_ITEMS = [
  "Senior Software Engineer",
  "AI / LLM Systems",
  "Backend Architecture",
  "Cloud & CI/CD",
  "Production Engineering"
];

export const VALUE_PROPOSITION = {
  title: "From Vibe Code to Production",
  paragraphs: [
    "AI-assisted development has made it possible to build software faster than ever. But rapidly generated applications can accumulate technical debt — duplicated logic, tightly coupled components, weak error handling, poor database design, security gaps and difficult-to-maintain code.",
    "I help teams take those rapidly built applications and turn them into structured, reliable and production-ready systems."
  ],
  pipeline: [
    { step: "01", name: "Prototype", desc: "Evaluate original prototype code and domain assumptions." },
    { step: "02", name: "Audit", desc: "Locate memory leaks, unvalidated inputs, and auth gaps." },
    { step: "03", name: "Refactor", desc: "Isolate tangled business logic into testable modules." },
    { step: "04", name: "Architect", desc: "Define explicit API schemas and persistent data boundaries." },
    { step: "05", name: "Test", desc: "Build automated test suites across edge and failure cases." },
    { step: "06", name: "Secure", desc: "Configure per-user OAuth 2.0 tokens and granular RBAC." },
    { step: "07", name: "Deploy", desc: "Implement deterministic CI/CD pipelines on cloud infrastructure." },
    { step: "08", name: "Scale", desc: "Tune KV-cache memory, request batching, and query latency." }
  ]
};

// Grounded in concrete real-world experience as specified in v2 guidelines
export const PHILOSOPHY_PRINCIPLES = [
  {
    number: "01",
    title: "Clear Architecture",
    description: "Business logic should not be buried inside routes or UI code. At Cerecon, isolating the multi-stage prompt assembler from API handlers kept document generation testable independently.",
    badge: "Service Isolation"
  },
  {
    number: "02",
    title: "Explicit Boundaries",
    description: "APIs, services, and AI layers require strict schema contracts. At TechQuest.Ai, Pydantic validation barriers in FastAPI stopped malformed requests before hitting vLLM batch queues.",
    badge: "Strict Contracts"
  },
  {
    number: "03",
    title: "Production First",
    description: "Authentication, logging, and error handling are integral features. At Cerecon, Microsoft Entra ID RBAC across 24 scenarios shipped in the initial release alongside core LLM logic.",
    badge: "Enterprise Security"
  },
  {
    number: "04",
    title: "Performance Matters",
    description: "Measure bottlenecks rather than guessing. Profiling KV-cache memory and continuous batching on an RTX 2080 Ti unlocked 100 concurrent inference streams without VRAM crashes.",
    badge: "Empirical Profiling"
  },
  {
    number: "05",
    title: "AI With Engineering Discipline",
    description: "LLMs require deterministic fallback strategies and observability. Implementing dynamic routing and cross-encoder reranking improved retrieval efficiency by 60% over naive RAG.",
    badge: "Robust Retrieval"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "cerecon",
    role: "Senior Software Engineer",
    company: "Cerecon — Australian Engineering Consultancy",
    location: "Remote / Melbourne, AU",
    period: "Jun 2026 — Present",
    badge: "Confidential Client Work",
    description: "Lead engineer working on AI-powered enterprise software, backend architecture, third-party integrations, authentication, document generation and cloud deployment.",
    responsibilities: [
      "Lead engineer on an internal LLM application that transforms project briefs into client-ready fee proposals with automated rate-card pricing and branded Word/Excel deliverables.",
      "Reduced proposal turnaround from days to under an hour.",
      "Rebuilt the backend prompt-assembly layer to improve prompt fidelity and context retention across multi-stage generation.",
      "Built and maintain the FastAPI backend on Azure App Service.",
      "Developed document generation, template management and third-party API orchestration.",
      "Designed per-user OAuth 2.0 integration with the Total Synergy v4 API.",
      "Eliminated a long-standing audit gap by ensuring writes are attributed to individual engineers rather than a shared service account.",
      "Implemented authentication and role-based access control using Microsoft Entra ID across 24 mapped use cases.",
      "Built CI/CD pipelines using Azure DevOps.",
      "Solved deployment limitations using Kudu async zipdeploy and publish-profile authentication.",
      "Fixed oversized build artifacts and recurring deployment timeouts.",
      "Migrated the codebase from GitHub to Azure DevOps with zero loss of commit history."
    ],
    technologies: ["Python", "FastAPI", "Azure", "Azure DevOps", "Microsoft Entra ID", "OAuth 2.0", "RBAC", "REST APIs", "LLMs"],
    metrics: [
      { label: "Turnaround Time", value: "Days → <1 Hr" },
      { label: "RBAC Mapped Cases", value: "24 Scenarios" },
      { label: "Audit Integrity", value: "100% User Attributed" }
    ]
  },
  {
    id: "techquest",
    role: "Software Engineer — AI",
    company: "TechQuest.Ai",
    location: "Islamabad, Pakistan",
    period: "Jun 2025 — Jun 2026",
    description: "Built and shipped production systems across generative AI, RAG, computer vision and backend engineering for multiple clients.",
    responsibilities: [
      "Fine-tuned text classification models using LoRA, achieving 85% accuracy.",
      "Built an LLM inference service using vLLM handling 100 concurrent requests on a single RTX 2080 Ti.",
      "Used continuous batching and paged attention to improve inference performance.",
      "Designed a contextual RAG framework with dynamic routing between retrieval strategies.",
      "Improved retrieval efficiency by 60%.",
      "Fine-tuned YOLO for aerial object detection, achieving 22% higher small-object recall and 40% lower inference latency using TensorFlow Lite GPU deployment.",
      "Built an offline Android RAG chatbot using quantized GGUF models.",
      "Achieved sub-3.5-second responses and 30% improvement in retrieval accuracy.",
      "Automated large-scale web and document ingestion using Crawl4AI.",
      "Improved semantic search precision by 35%.",
      "Built LLM-driven podcast editing workflows using OpenAI and Gemini APIs.",
      "Reduced podcast editing effort by 60%.",
      "Built real-time object tracking using Python, C++, OpenCV and Kalman filters."
    ],
    technologies: ["Python", "C++", "PyTorch", "TensorFlow", "FastAPI", "vLLM", "RAG", "LangChain", "LangGraph", "YOLO", "OpenCV", "Docker", "Hugging Face"],
    metrics: [
      { label: "vLLM Serving", value: "100 Concurr. on RTX 2080 Ti" },
      { label: "RAG Retrieval", value: "+60% Efficiency" },
      { label: "Podcast Workflow", value: "-60% Manual Effort" }
    ]
  },
  {
    id: "atomcamp",
    role: "Data Science Intern",
    company: "Atomcamp",
    location: "Islamabad, Pakistan",
    period: "Jul 2024 — Aug 2024",
    description: "Developed machine learning models and data visualization pipelines for client financial and analytics datasets.",
    responsibilities: [
      "Built real-time price prediction models for banking-sector decision support.",
      "Applied LLMs using LangChain and Transformers to NLP and image-generation tasks.",
      "Delivered Power BI dashboards over large client datasets."
    ],
    technologies: ["Python", "LangChain", "Hugging Face", "Power BI", "Scikit-Learn", "Data Analytics"],
    metrics: [
      { label: "Application Domain", value: "Banking Decision Support" }
    ]
  },
  {
    id: "datainsight",
    role: "AI Intern",
    company: "DataInsight Lab",
    location: "Islamabad, Pakistan",
    period: "Jan 2023 — Aug 2023",
    description: "Assisted in computer vision research and document extraction pipelines for healthcare digitization.",
    responsibilities: [
      "Built a digital receipt processing pipeline for hospitals using YOLO and OCR.",
      "Improved extraction accuracy by 15%.",
      "Performed preprocessing and hyperparameter tuning for model optimization."
    ],
    technologies: ["Python", "YOLO", "OCR", "OpenCV", "PyTorch", "Hyperparameter Tuning"],
    metrics: [
      { label: "Extraction Gain", value: "+15% Accuracy" }
    ]
  }
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "case-enterprise-llm",
    title: "Enterprise LLM Application",
    subtitle: "Automated Project Briefs to Client-Ready Fee Proposals with Strict Rate Cards",
    tag: "Confidential Client Work",
    problem: "An enterprise team needed to automate the generation of complex project proposals using LLMs while preserving company-specific pricing, templates, branding and business rules.",
    engineeringWork: [
      "FastAPI backend architecture deployed on Azure App Service",
      "Multi-stage LLM generation pipeline with state retention",
      "Prompt assembly and context management layer",
      "Automated document generation for branded Word and Excel deliverables",
      "Template management and rate-card pricing integration",
      "Total Synergy v4 API integration with per-user OAuth 2.0 handshakes",
      "Microsoft Entra ID RBAC enforcing permissions across 24 use cases",
      "Azure DevOps CI/CD automation with async zipdeploy"
    ],
    outcomes: [
      "Reduced proposal turnaround from days to under an hour.",
      "Eliminated audit risks by binding all API writes directly to authenticated engineer IDs.",
      "Established a structured foundation for continuous feature expansion."
    ],
    metricHighlight: {
      value: "Days → < 1 Hr",
      label: "Proposal Turnaround"
    },
    engineeringFocus: ["OAuth 2.0 / Entra ID", "Multi-Stage LLM", "Azure App Service", "Document Automation"]
  },
  {
    id: "case-vllm-inference",
    title: "High-Throughput LLM Inference",
    subtitle: "Serving 100 Concurrent Requests on Single RTX 2080 Ti",
    tag: "AI Infrastructure",
    problem: "Deploying an LLM inference service on constrained GPU hardware while supporting high concurrent traffic without running out of VRAM or experiencing excessive queue latency.",
    engineeringWork: [
      "vLLM engine integration with continuous batching and PagedAttention",
      "Tuned KV-cache memory allocation and chunked prefill to prevent VRAM spikes",
      "Asynchronous request scheduler buffering and batching incoming traffic",
      "Latency and throughput instrumentation across concurrent load tests"
    ],
    outcomes: [
      "Supported 100 concurrent requests on a single RTX 2080 Ti GPU.",
      "Maintained stable token generation rates by minimizing GPU idle time."
    ],
    metricHighlight: {
      value: "100 Concurrent",
      label: "Requests on Single RTX 2080 Ti"
    },
    engineeringFocus: ["Continuous Batching", "PagedAttention", "KV-Cache Management", "Async Scheduling"]
  },
  {
    id: "case-contextual-rag",
    title: "Contextual RAG Framework",
    subtitle: "Adaptive Retrieval Routing Balancing Semantic Recall and Query Speed",
    tag: "LLM / Search Infrastructure",
    problem: "Different queries require different retrieval strategies. A single retrieval approach creates unnecessary latency on keyword lookups and poor recall on conceptual queries.",
    engineeringWork: [
      "Dynamic query classifier analyzing intent and keyword density upfront",
      "Hybrid retrieval layer combining FAISS dense vector search and BM25 sparse search",
      "Cross-encoder reranking over candidate chunks before prompt construction",
      "Context compaction and deduplication to prevent prompt bloating"
    ],
    outcomes: [
      "Improved overall retrieval efficiency by 60% compared to standard single-path RAG.",
      "Balanced response latency and answer quality dynamically based on query type."
    ],
    metricHighlight: {
      value: "+60%",
      label: "Retrieval Efficiency Improvement"
    },
    engineeringFocus: ["Dense + Sparse Hybrid", "Dynamic Routing", "Cross-Encoder Rerank", "Context Compaction"]
  }
];

export const PUBLIC_PROJECTS: PublicProjectItem[] = [
  {
    id: "kisan-rabta",
    title: "Kisan Rabta",
    category: "Speech & Audio",
    subtitle: "Voice-to-Insight Agricultural Intelligence Platform",
    description: "An AI-powered agricultural intelligence platform that transforms farmer voice recordings in native regional languages into structured agricultural insights.",
    technologies: ["Whisper", "NLP", "Named Entity Recognition", "Python", "FastAPI", "React Native", "Hugging Face"],
    details: [
      "Fine-tuned Whisper for Urdu speech recognition.",
      "Processed 18,000 scraped text samples and 2 hours of Urdu audio.",
      "Extracted structured agricultural information from farmer voice notes.",
      "Translated Urdu transcription to English.",
      "Applied NER to identify crop diseases and field problems.",
      "Deployed the pipeline through an API."
    ]
  },
  {
    id: "medical-reasoning",
    title: "Medical Reasoning LLM",
    category: "GenAI & LLMs",
    subtitle: "DeepSeek R1 Distill LLaMA 8B Fine-Tuning",
    description: "An experimental fine-tuned LLM optimized for multi-step clinical reasoning and healthcare diagnostic workflows using parameter-efficient fine-tuning.",
    technologies: ["DeepSeek R1", "LLaMA", "LoRA", "Unsloth", "Hugging Face", "PyTorch"],
    details: [
      "Fine-tuned DeepSeek R1 Distill LLaMA 8B on curated clinical datasets.",
      "Trained with Unsloth 4-bit QLoRA to maximize VRAM efficiency.",
      "Evaluated reasoning step consistency across diagnostic benchmarks.",
      "Published open-source model weights on Hugging Face."
    ],
    isExperimental: true,
    link: "https://huggingface.co/maliahson/deepseek-finetune-medical"
  },
  {
    id: "id-extraction",
    title: "ID Document Information Extraction",
    category: "Computer Vision & OCR",
    subtitle: "Structured National Identity Parsing",
    description: "Computer vision pipeline for detecting and extracting structured information from national ID documents.",
    technologies: ["YOLOv8", "OCR", "Computer Vision", "OpenCV", "Python", "Hugging Face Spaces"],
    details: [
      "Name detection",
      "ID number detection",
      "Date detection",
      "Barcode / QR detection",
      "Cross-field validation"
    ],
    link: "https://huggingface.co/spaces/maliahson/CNIC_Detector"
  },
  {
    id: "anpr-detector",
    title: "Automatic Number Plate Recognition",
    category: "Computer Vision & OCR",
    subtitle: "Real-Time License Plate Localization",
    description: "Object detection system for automatic number plate localization and recognition.",
    technologies: ["YOLOv8", "Computer Vision", "Python", "OpenCV", "Hugging Face Spaces"],
    details: [
      "Trained YOLOv8 detector for license plate localization across varied lighting and angles.",
      "Engineered preprocessing filters for alphanumeric character clarity.",
      "Deployed interactive space demonstrating live video and image inference."
    ],
    metrics: "97.5% Precision · 97.5% Recall",
    link: "https://huggingface.co/spaces/maliahson/YOLO_Lisencse_Plate_Detector"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    iconName: "Code2",
    skills: ["Python", "C++", "SQL", "JavaScript", "HTML/CSS"]
  },
  {
    title: "AI / LLM Systems",
    iconName: "Cpu",
    skills: [
      "LoRA / PEFT",
      "Unsloth",
      "vLLM",
      "llama.cpp",
      "GGUF",
      "RAG",
      "Prompt Engineering",
      "LangChain",
      "LangGraph",
      "Hugging Face Transformers",
      "OpenAI APIs",
      "Anthropic APIs",
      "Gemini APIs",
      "Coqui TTS"
    ]
  },
  {
    title: "Machine Learning / Computer Vision",
    iconName: "Eye",
    skills: [
      "PyTorch",
      "TensorFlow",
      "TensorFlow Lite",
      "Ultralytics YOLO",
      "OpenCV",
      "scikit-learn",
      "Optuna",
      "Weights & Biases",
      "Pandas",
      "NumPy"
    ]
  },
  {
    title: "Backend / Infrastructure",
    iconName: "Server",
    skills: [
      "FastAPI",
      "REST APIs",
      "Docker",
      "Git",
      "Azure App Service",
      "Azure DevOps",
      "Microsoft Entra ID",
      "OAuth 2.0",
      "RBAC",
      "Hugging Face Spaces"
    ]
  },
  {
    title: "Databases / Data",
    iconName: "Database",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Power BI",
      "Tableau"
    ]
  }
];

// Distinct descriptions and deliverables — no shared stems with philosophy
export const SERVICES: ServiceItem[] = [
  {
    id: "codebase-audit",
    title: "Codebase Audit",
    description: "Review an existing application and identify architectural, performance, security and maintainability issues.",
    deliverables: ["Architecture flaw analysis", "Security & auth gap inspection", "Prioritized remediation roadmap"],
    icon: "FileSearch"
  },
  {
    id: "refactoring",
    title: "Refactoring",
    description: "Turn tightly coupled or duplicated code into a clean modular architecture.",
    deliverables: ["Domain boundary decoupling", "Clear module interfaces", "Elimination of redundant logic"],
    icon: "Wrench"
  },
  {
    id: "backend-engineering",
    title: "Backend Engineering",
    description: "Build reliable APIs, services, database layers and integrations.",
    deliverables: ["Asynchronous FastAPI services", "Relational & document schemas", "Third-party API orchestration"],
    icon: "Server"
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    description: "Build production-ready LLM, RAG and agentic systems.",
    deliverables: ["vLLM serving pipelines", "Contextual RAG frameworks", "LoRA model fine-tuning"],
    icon: "Bot"
  },
  {
    id: "productionization",
    title: "Productionization",
    description: "Add authentication, testing, logging, deployment and monitoring.",
    deliverables: ["Microsoft Entra ID & OAuth 2.0", "Automated CI/CD pipelines", "Comprehensive structured logging"],
    icon: "ShieldAlert"
  },
  {
    id: "performance",
    title: "Performance",
    description: "Identify bottlenecks and optimize application and AI workloads.",
    deliverables: ["GPU memory & KV-cache tuning", "Throughput & concurrency testing", "Database query optimization"],
    icon: "Zap"
  }
];
