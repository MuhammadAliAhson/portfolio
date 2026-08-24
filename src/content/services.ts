export interface Service {
  slug: string;
  name: string;
  /** The outcome, in the buyer's language. One sentence. */
  outcome: string;
  /** Buyer-side symptoms this service answers. Feeds the qualification cards. */
  signals: string[];
  /**
   * Plain-English business case — how this helps you, why it's for you.
   * Written for a non-technical reader and shown before any of the technical
   * detail below it.
   */
  benefit: string[];
  deliverables: string[];
  duration: string;
  engagement: string;
  /** Long-form body for /services/[slug]. */
  overview: string[];
  steps: { name: string; detail: string }[];
  youReceive: string[];
  notFor: string;
  relatedWork: string[];
  seo: { title: string; description: string; phrase: string };
}

export const SERVICES: Service[] = [
  {
    slug: "production-readiness-audit",
    name: "Production readiness audit",
    outcome:
      "You get a written, prioritised view of what stops your system going live, and what it takes to fix each item.",
    signals: [
      "Our AI demo works. It falls over with real users.",
      "We think we are close to launch, but nobody can say what is left.",
    ],
    benefit: [
      "If you are not sure your system can handle real users, this gives you a clear, written answer in plain English, before you spend another dollar building on shaky ground.",
      "You will know exactly what is solid, what is risky, and what it costs to fix, so you can decide with confidence either way.",
    ],
    deliverables: [
      "Architecture and data-flow review",
      "Security, auth and audit-trail gap list",
      "Prioritised remediation plan with effort estimates",
    ],
    duration: "1–2 weeks",
    engagement: "Fixed scope, fixed fee",
    overview: [
      "Most stalled AI projects are not stalled on the model. They are stalled on everything around it: no request validation, secrets in the wrong place, one shared service account writing to a client system, no way to reproduce a deployment, and no measurement of which part is slow.",
      "This audit finds those things and writes them down in an order you can act on. You end up with a document your team can work from, or take to another engineer entirely. There is no obligation to hire me for the fixes.",
    ],
    steps: [
      {
        name: "Access and context",
        detail:
          "Read-only repository access, a walkthrough with whoever built it, and your definition of done.",
      },
      {
        name: "Static review",
        detail:
          "Architecture, module boundaries, data contracts, error handling, dependency and secret handling.",
      },
      {
        name: "Behavioural review",
        detail:
          "Run the system, load the paths that matter, and measure where latency and cost actually come from.",
      },
      {
        name: "Report and walkthrough",
        detail:
          "Written findings ranked by risk and effort, then a call to talk through the order of work.",
      },
    ],
    youReceive: [
      "A findings document, typically 8–15 pages, written for your engineers and your decision makers",
      "Each finding rated by risk, effort, and whether it blocks launch",
      "A recommended sequence of work with rough durations",
      "A 60-minute walkthrough call, recorded if you want it",
    ],
    notFor:
      "This is not a code-style review or a security certification. It does not produce a compliance attestation, and it does not include implementing the fixes.",
    relatedWork: ["enterprise-proposal-engine"],
    seo: {
      title: "Production readiness audit for AI systems",
      description:
        "A fixed-scope audit of your AI or backend system: architecture, security, auth, performance and cost, written up as a prioritised plan you can act on.",
      phrase: "AI production engineering",
    },
  },
  {
    slug: "codebase-rescue",
    name: "Codebase rescue and refactor",
    outcome:
      "Your codebase becomes something your team can change without fear: same behaviour, structure they can follow.",
    signals: [
      "Our codebase was built fast and nobody wants to touch it now.",
      "Every change breaks something else we did not expect.",
    ],
    benefit: [
      "If new features take longer every month and your developers are afraid to touch parts of the code, this fixes that without a costly rewrite.",
      "Your product keeps working exactly as it does today, while the foundation underneath becomes something your team can build on with confidence.",
    ],
    deliverables: [
      "Business logic pulled out of routes and UI",
      "Explicit module interfaces and data contracts",
      "Test coverage over the paths that matter",
    ],
    duration: "3–8 weeks",
    engagement: "Fixed scope, or retainer for larger estates",
    overview: [
      "Software built quickly under deadline pressure accumulates the same problems in the same places: logic buried inside request handlers, one business rule implemented three times slightly differently, no validation at the edges, and a database schema that grew one column at a time.",
      "The work is not a rewrite. It is a sequence of behaviour-preserving changes, each small enough to review and ship, ending with clear boundaries between your domain logic, your API surface and your storage.",
    ],
    steps: [
      {
        name: "Map",
        detail:
          "Establish what the system actually does today, including the behaviour nobody wrote down.",
      },
      {
        name: "Fence",
        detail:
          "Add tests around current behaviour first, so refactoring cannot change results silently.",
      },
      {
        name: "Separate",
        detail:
          "Move domain logic out of handlers into testable modules with named interfaces.",
      },
      {
        name: "Tighten",
        detail:
          "Add schema validation at every boundary, then delete the defensive code it makes redundant.",
      },
    ],
    youReceive: [
      "A refactored codebase, merged in reviewable increments rather than one large branch",
      "Automated tests over the critical paths, running in CI",
      "An architecture document describing the new boundaries and why they sit where they do",
      "A walkthrough with your team, so the structure survives after I leave",
    ],
    notFor:
      "If the product direction is still changing weekly, refactoring is premature. Stabilise the requirements first, or start with an audit instead.",
    relatedWork: ["enterprise-proposal-engine"],
    seo: {
      title: "Codebase rescue and refactoring",
      description:
        "Behaviour-preserving refactoring for fast-built Python and TypeScript codebases: clear module boundaries, real data contracts, and tests your team can rely on.",
      phrase: "codebase refactoring consultant",
    },
  },
  {
    slug: "backend-api-development",
    name: "Backend and API development",
    outcome:
      "You get the service layer your product needs: APIs, data models and integrations that behave predictably under load.",
    signals: [
      "We need a real backend behind the prototype our team built.",
      "Our integration with a third-party system keeps breaking.",
    ],
    benefit: [
      "If your product idea is ready but you need the engine behind it — the part that stores data, talks to other systems and never falls over — this is that engine.",
      "You get software that keeps working when real customers show up, not just when it is a demo in front of investors.",
    ],
    deliverables: [
      "Asynchronous FastAPI services with typed contracts",
      "Relational and document data models",
      "Third-party API integration and orchestration",
    ],
    duration: "4–10 weeks",
    engagement: "Fixed scope, or retainer alongside your team",
    overview: [
      "This is the ordinary, unglamorous engineering that decides whether a product holds together: request validation, transaction boundaries, retry and timeout policy, idempotent writes, and integrations that fail in ways you can diagnose.",
      "I have built this layer for document generation, rate-card pricing, per-user OAuth against a third-party engineering platform, and model-serving front ends. The pattern is the same each time. Make the contract explicit, then make failure legible.",
    ],
    steps: [
      {
        name: "Contract first",
        detail:
          "Agree the API surface and data shapes before implementation, so your front end can build in parallel.",
      },
      {
        name: "Build",
        detail:
          "Typed, validated services with structured logging and error handling from the first commit.",
      },
      {
        name: "Integrate",
        detail:
          "Third-party APIs with explicit auth, retry and timeout policy, and a clear story for partial failure.",
      },
      {
        name: "Hand over",
        detail:
          "Documentation, environment setup, and a walkthrough so your team can extend it.",
      },
    ],
    youReceive: [
      "A running service, deployed to your cloud account rather than mine",
      "API documentation generated from the code, so it cannot drift",
      "Structured logs and health checks wired in from the start",
      "Setup documentation any competent engineer can follow",
    ],
    notFor:
      "I do not take on front-end design work, mobile app development, or data-warehouse and BI platform builds.",
    relatedWork: ["enterprise-proposal-engine"],
    seo: {
      title: "FastAPI backend and API development",
      description:
        "Backend engineering for AI products: asynchronous FastAPI services, typed data contracts, relational schemas, and third-party API integration with real auth.",
      phrase: "FastAPI developer",
    },
  },
  {
    slug: "llm-rag-agents",
    name: "LLM, RAG and agent development",
    outcome:
      "Your AI feature gives answers you can defend, grounded in your own data, at a cost you can predict.",
    signals: [
      "Our chatbot answers confidently and is sometimes wrong.",
      "We need AI over our own documents, not the public internet.",
    ],
    benefit: [
      "If your AI feature sometimes gives wrong or made-up answers, this grounds it in your own information, so what it says is accurate and you can point to why.",
      "You get an AI feature your customers can trust, at a cost that does not spiral as usage grows.",
    ],
    deliverables: [
      "Retrieval pipelines over your own content",
      "Multi-stage generation with state retention",
      "Model serving, or a routed mix of hosted APIs",
    ],
    duration: "4–10 weeks",
    engagement: "Fixed scope, or retainer for ongoing tuning",
    overview: [
      "A single retrieval strategy is the most common reason an AI feature disappoints. Keyword lookups get slow, conceptual questions get poor recall, and nobody can explain why a given answer appeared.",
      "The systems I build route each query to the retrieval method that suits it, combine dense and sparse search, re-rank candidates before they reach the prompt, and compact context so you are not paying for tokens that add nothing. On my own test set, that routing approach retrieved 60% more efficiently than a single-path pipeline.",
    ],
    steps: [
      {
        name: "Ground truth",
        detail:
          "Build an evaluation set from your real questions before changing anything, so improvement is measurable.",
      },
      {
        name: "Retrieve",
        detail:
          "Hybrid dense and sparse search, with a classifier routing each query to the right path.",
      },
      {
        name: "Rank and compact",
        detail:
          "Cross-encoder re-ranking and deduplication, so the prompt carries signal rather than volume.",
      },
      {
        name: "Observe",
        detail:
          "Log every retrieval and generation, so you can explain any answer after the fact.",
      },
    ],
    youReceive: [
      "A retrieval and generation pipeline running against your own content",
      "An evaluation set and scores, so quality changes are visible rather than felt",
      "Cost and latency figures per request path",
      "Fallback behaviour for when a model or provider is unavailable",
    ],
    notFor:
      "I do not train foundation models from scratch, and I will push back on agent architectures where a direct function call does the same job more reliably.",
    relatedWork: ["contextual-rag-framework", "high-throughput-inference"],
    seo: {
      title: "LLM, RAG and agent development",
      description:
        "Production RAG and LLM systems: hybrid retrieval, query routing, cross-encoder re-ranking, evaluation sets and observability over your own data.",
      phrase: "RAG development",
    },
  },
  {
    slug: "security-auth-deployment",
    name: "Security, auth and deployment",
    outcome:
      "Every user sees only what their role permits, every action traces to a named person, and releases stop being an event.",
    signals: [
      "We need enterprise auth and audit trails before we can sell this.",
      "Deployments are manual and only one person knows how.",
    ],
    benefit: [
      "If enterprise buyers are asking who can see what and who did what before they will sign, this answers those questions properly, and unblocks the deal.",
      "You get a system that passes security review, with every action traceable to a real person, and releases that happen safely without you in the room.",
    ],
    deliverables: [
      "Identity and role-based access control",
      "Per-user OAuth against third-party systems",
      "Automated CI/CD pipelines",
    ],
    duration: "2–6 weeks",
    engagement: "Fixed scope",
    overview: [
      "Enterprise buyers ask the same questions before they sign: who can see what, who did what, and what happens when someone leaves. If the answer involves a shared service account, the deal stalls.",
      "On one engagement I mapped role-based access control across 24 distinct use cases with Microsoft Entra ID, and replaced a shared service account with per-user OAuth 2.0 against a third-party platform. That closed a standing audit gap, because every write became traceable to the individual engineer who made it.",
    ],
    steps: [
      {
        name: "Map roles",
        detail:
          "Enumerate who does what, then write the permission matrix down before touching code.",
      },
      {
        name: "Wire identity",
        detail:
          "Entra ID, OAuth 2.0 or your existing provider, with tokens scoped per user rather than per service.",
      },
      {
        name: "Trace actions",
        detail:
          "Structured audit logging that attributes every write to an authenticated identity.",
      },
      {
        name: "Automate release",
        detail:
          "Repeatable pipelines, so deploying is the same action every time regardless of who runs it.",
      },
    ],
    youReceive: [
      "A documented permission matrix mapped to your real roles",
      "Identity integration in your own tenant, with no credentials held by me",
      "Audit logging that satisfies an internal reviewer asking who changed what",
      "A CI/CD pipeline in your account, plus a rollback procedure",
    ],
    notFor:
      "This is engineering, not certification. I do not issue SOC 2 or ISO attestations, and I am not a penetration testing service.",
    relatedWork: ["enterprise-proposal-engine"],
    seo: {
      title: "Enterprise auth, RBAC and deployment automation",
      description:
        "Microsoft Entra ID and OAuth 2.0 integration, role-based access control, audit trails, and automated CI/CD for AI and backend systems.",
      phrase: "enterprise authentication engineering",
    },
  },
  {
    slug: "performance-and-cost",
    name: "Performance and cost optimisation",
    outcome:
      "Your system serves more traffic on the hardware you already own, and you can see where every dollar goes.",
    signals: [
      "Our LLM costs are climbing and we do not know why.",
      "We were quoted a GPU budget that does not fit our plan.",
    ],
    benefit: [
      "If your AI or cloud bill keeps climbing and nobody can say exactly why, this finds the real cause instead of guessing at a fix.",
      "You serve more users on the infrastructure you already have, and you can finally see where every dollar of spend is going.",
    ],
    deliverables: [
      "Measured bottleneck analysis, not guesswork",
      "GPU memory, batching and cache tuning",
      "Query and request-path optimisation",
    ],
    duration: "2–4 weeks",
    engagement: "Fixed scope",
    overview: [
      "Cost problems in AI systems are usually shape problems: prompts carrying context nobody reads, a model larger than the task needs, requests handled one at a time when they could be batched, or a GPU sitting idle between calls.",
      "On constrained hardware I have served 100 concurrent inference requests from a single RTX 2080 Ti by tuning KV-cache allocation, continuous batching and chunked prefill. That is production throughput with no new hardware spend. The method starts with measurement, every time.",
    ],
    steps: [
      {
        name: "Instrument",
        detail:
          "Add timing and token accounting to the real request paths before changing anything.",
      },
      {
        name: "Find the ceiling",
        detail:
          "Load-test to the point of failure, to learn what actually limits you rather than what seems likely.",
      },
      {
        name: "Tune",
        detail:
          "Batching, cache allocation, model choice, prompt size and query plans, in order of measured impact.",
      },
      {
        name: "Prove it",
        detail: "Re-run the same load profile and report before-and-after numbers.",
      },
    ],
    youReceive: [
      "Before-and-after measurements on an agreed load profile",
      "The instrumentation left in place, so regressions surface later",
      "A cost model per request path, so pricing decisions have a basis",
      "A written note on which optimisations were deliberately not taken, and why",
    ],
    notFor:
      "If the system has no instrumentation and no reproducible load profile, the first week goes into building those. That is included, but it shortens the tuning window.",
    relatedWork: ["high-throughput-inference", "contextual-rag-framework"],
    seo: {
      title: "LLM performance and cost optimisation",
      description:
        "Measured performance work for AI systems: GPU memory and KV-cache tuning, continuous batching, prompt and token cost reduction, query optimisation.",
      phrase: "LLM cost optimisation",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
