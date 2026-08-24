/**
 * Curriculum-vitae facts, kept as the source for the about page only.
 *
 * Client-facing positioning, services, case studies and contact details live in
 * src/lib/site.ts and src/content/*. Nothing about how the practice is presented
 * belongs in this file.
 */

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

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

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
      { label: "Turnaround Time", value: "Days to under 1 hr" },
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
