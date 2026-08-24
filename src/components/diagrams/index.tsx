import { cn } from "@/lib/utils";

/**
 * The site's one memorable device: hand-authored architecture diagrams.
 * They live only on the ink register, so colours are fixed rather than tokenised.
 *
 * Accessibility: each figure is role="img" with a title and description, and
 * carries a text equivalent in a <details> element so the flow is readable
 * without seeing it. Wide diagrams scroll inside their own container.
 */

const C = {
  /* porcelain on ink, 16:1 */
  text: "#F2F4F3",
  /* on-dark, 12.7:1 — annotations stay legible rather than decorative */
  muted: "#CFDCDA",
  /* hairline on dark */
  line: "#2C5259",
  /* petrol nodes on the ink ground */
  nodeFill: "#123B42",
  nodeStroke: "#2C5259",
  /* brass carries the connectors and arrowheads, never a fill */
  accent: "#B4762A",
  accentStroke: "#B4762A",
};

function Defs() {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={C.accent} />
      </marker>
      <marker
        id="arrow-muted"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} />
      </marker>
    </defs>
  );
}

function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill={C.nodeFill}
        stroke={accent ? C.accentStroke : C.nodeStroke}
        strokeWidth={accent ? 1.25 : 1}
      />
      <text
        x={x + 16}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 5}
        className="font-sans"
        fontSize="14"
        fontWeight="500"
        fill={C.text}
      >
        {title}
      </text>
      {sub ? (
        <text x={x + 16} y={y + h / 2 + 17} className="font-mono" fontSize="11" fill={C.muted}>
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function GroupBox({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill="none"
        stroke={C.line}
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text x={x + 12} y={y - 8} className="font-mono" fontSize="10.5" fill={C.muted} letterSpacing="0.08em">
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function Flow({ d, muted = false }: { d: string; muted?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={muted ? C.muted : C.accent}
      strokeWidth="1.25"
      strokeDasharray={muted ? "4 4" : undefined}
      markerEnd={muted ? "url(#arrow-muted)" : "url(#arrow)"}
    />
  );
}

function Annot({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="font-mono" fontSize="11" fill={C.muted}>
      {children}
    </text>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <text x="24" y="26" className="font-mono" fontSize="10.5" fill={C.muted} letterSpacing="0.1em">
      {children.toUpperCase()}
    </text>
  );
}

/** Wrapper: scrolls on narrow screens, carries the text equivalent. */
export function Figure({
  caption,
  readAsText,
  minWidth = 720,
  className,
  children,
}: {
  caption: string;
  readAsText: string[];
  minWidth?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={cn("not-prose", className)}>
      <div className="min-w-0 overflow-x-auto rounded-card border border-hairline-dark bg-ink">
        <div style={{ minWidth }}>{children}</div>
      </div>
      <figcaption className="mt-3 font-mono text-eyebrow uppercase text-on-dark/70">
        {caption}
        <span className="ml-2 text-brass sm:hidden">Scroll for the full diagram</span>
      </figcaption>
      <details className="mt-3 text-small text-on-dark/80">
        <summary className="cursor-pointer font-mono text-eyebrow uppercase text-brass">
          Read as text
        </summary>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5">
          {readAsText.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </details>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: the positioning, drawn.                                       */
/* ------------------------------------------------------------------ */

export function HeroDiagram() {
  return (
    <svg
      viewBox="0 0 560 452"
      className="h-auto w-full"
      role="img"
      aria-labelledby="hero-diagram-title hero-diagram-desc"
    >
      <title id="hero-diagram-title">From prototype to production system</title>
      <desc id="hero-diagram-desc">
        A prototype that works in a demo, has one shared account, manual deployments and
        unknown running cost, becomes a production system with validated inputs, per-user
        authentication and audit trails, repeatable deployments and measured cost per
        request.
      </desc>
      <Defs />

      <Eyebrow>What changes</Eyebrow>

      {/* Before */}
      <rect
        x="24"
        y="48"
        width="512"
        height="146"
        rx="6"
        fill="none"
        stroke={C.line}
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text x="44" y="78" className="font-sans" fontSize="15" fontWeight="500" fill={C.muted}>
        The prototype you have
      </text>
      {[
        "works in a demo, breaks with real users",
        "one shared account writes everything",
        "deploys by hand, when the right person is free",
      ].map((line, i) => (
        <g key={line}>
          <line
            x1="44"
            y1={102 + i * 26}
            x2="56"
            y2={102 + i * 26}
            stroke={C.muted}
            strokeWidth="1"
          />
          <text
            x="68"
            y={106 + i * 26}
            className="font-mono"
            fontSize="11.5"
            fill={C.muted}
          >
            {line}
          </text>
        </g>
      ))}

      {/* Transition */}
      <Flow d="M 280 194 L 280 244" />
      <text x="300" y="224" className="font-mono" fontSize="11" fill={C.accent}>
        assess · design · build · hand over
      </text>

      {/* After */}
      <rect
        x="24"
        y="244"
        width="512"
        height="184"
        rx="6"
        fill={C.nodeFill}
        stroke={C.accent}
        strokeWidth="1.25"
      />
      <text x="44" y="276" className="font-sans" fontSize="15" fontWeight="500" fill={C.text}>
        The system you can run
      </text>
      {[
        "every input validated at the boundary",
        "per-user auth, every action traced to a person",
        "one-command deploys, with a rollback path",
        "cost and latency measured per request",
      ].map((line, i) => (
        <g key={line}>
          <path
            d={`M 44 ${296 + i * 28} l 4 5 l 8 -9`}
            fill="none"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="68" y={304 + i * 28} className="font-mono" fontSize="11.5" fill={C.text}>
            {line}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Case study 1: proposal engine                                       */
/* ------------------------------------------------------------------ */

function ProposalEngine() {
  return (
    <svg
      viewBox="0 0 920 460"
      className="h-auto w-full"
      role="img"
      aria-labelledby="d1-title d1-desc"
    >
      <title id="d1-title">Proposal generation request path</title>
      <desc id="d1-desc">
        An engineer submits a project brief to a FastAPI service on Azure App Service.
        Microsoft Entra ID enforces role-based access control across 24 mapped cases. A
        three-stage generation pipeline parses the brief, resolves the rate card and
        assembles the document, retaining state between stages, drawing on templates and
        rate cards. It outputs a branded Word proposal and Excel pricing sheet. The
        service also writes to the Total Synergy v4 API using per-user OAuth 2.0.
      </desc>
      <Defs />
      <Eyebrow>Proposal generation · request path</Eyebrow>

      <Node x={206} y={44} w={176} h={52} title="Microsoft Entra ID" accent />
      <Annot x={398} y={68}>RBAC · 24 mapped cases</Annot>
      <Annot x={398} y={86}>enforced before the handler runs</Annot>
      <Flow d="M 294 96 L 294 148" />

      <Node x={24} y={150} w={148} h={88} title="Engineer" sub="project brief in" />
      <Flow d="M 172 194 L 202 194" />

      <Node x={206} y={150} w={176} h={88} title="FastAPI service" sub="Azure App Service" />
      <Flow d="M 382 194 L 412 194" />

      {/* Pipeline */}
      <rect
        x="416"
        y="110"
        width="208"
        height="180"
        rx="4"
        fill={C.nodeFill}
        stroke={C.nodeStroke}
      />
      <text x="432" y="134" className="font-sans" fontSize="14" fontWeight="500" fill={C.text}>
        Generation pipeline
      </text>
      {["1 · parse brief", "2 · resolve rate card", "3 · assemble document"].map((label, i) => (
        <g key={label}>
          <rect
            x="432"
            y={146 + i * 38}
            width="176"
            height="30"
            rx="3"
            fill="#0F3037"
            stroke={C.accent}
            strokeWidth="0.75"
          />
          <text x="444" y={166 + i * 38} className="font-mono" fontSize="11" fill={C.text}>
            {label}
          </text>
        </g>
      ))}
      <text x="432" y="278" className="font-mono" fontSize="10.5" fill={C.muted}>
        state retained across stages
      </text>

      <Flow d="M 624 160 L 654 160" />
      <Flow d="M 624 240 L 654 240" />
      <Node x={658} y={130} w={170} h={60} title="Word proposal" sub="firm templates" />
      <Node x={658} y={210} w={170} h={60} title="Excel pricing" sub="rate-card rules" />

      {/* Inputs from storage */}
      <Flow d="M 520 336 L 520 294" />
      <Node x={416} y={336} w={208} h={56} title="Templates + rate cards" />

      {/* Third-party write. Dropped from the left of the service box so the
          annotation is not crossed by the connector. */}
      <Flow d="M 232 238 L 232 364 L 204 364" />
      <Annot x={244} y={358}>per-user OAuth 2.0</Annot>
      <Node x={24} y={336} w={176} h={56} title="Total Synergy v4" sub="writes attributed" accent />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Case study 2: inference serving                                     */
/* ------------------------------------------------------------------ */

function InferenceServing() {
  return (
    <svg
      viewBox="0 0 920 420"
      className="h-auto w-full"
      role="img"
      aria-labelledby="d2-title d2-desc"
    >
      <title id="d2-title">High-throughput inference on one GPU</title>
      <desc id="d2-desc">
        Up to 100 concurrent client requests reach an asynchronous scheduler that buffers
        and batches them. Continuous batching lets arriving requests join an in-flight
        batch. A single RTX 2080 Ti holds the model weights and a paged key-value cache
        allocated in fixed blocks, with chunked prefill preventing memory spikes. Tokens
        stream back to clients.
      </desc>
      <Defs />
      <Eyebrow>Inference serving · single GPU</Eyebrow>

      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="24"
          y={116 + i * 46}
          width="132"
          height="34"
          rx="3"
          fill={C.nodeFill}
          stroke={C.nodeStroke}
        />
      ))}
      <text x="40" y="138" className="font-mono" fontSize="11" fill={C.text}>
        request
      </text>
      <text x="40" y="184" className="font-mono" fontSize="11" fill={C.text}>
        request
      </text>
      <text x="40" y="230" className="font-mono" fontSize="11" fill={C.text}>
        request
      </text>
      <text x="24" y="272" className="font-mono" fontSize="11" fill={C.accent}>
        100 concurrent
      </text>

      <Flow d="M 156 178 L 198 178" />
      <Node x={202} y={140} w={168} h={76} title="Async scheduler" sub="buffers + batches" />
      <Flow d="M 370 178 L 400 178" />
      <Node x={404} y={140} w={176} h={76} title="Continuous batching" sub="joins in-flight batch" />
      <Flow d="M 580 178 L 610 178" />

      <GroupBox x={614} y={78} w={282} h={252} label="Single RTX 2080 Ti · 11 GB" />
      <Node x={634} y={102} w={242} h={58} title="Paged KV cache" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={634 + i * 30.5}
          y="172"
          width="24"
          height="20"
          rx="2"
          fill={i < 6 ? "#0F3037" : "none"}
          stroke={i < 6 ? C.accent : C.line}
          strokeWidth="0.75"
        />
      ))}
      <text x="634" y="212" className="font-mono" fontSize="10.5" fill={C.muted}>
        fixed blocks · chunked prefill
      </text>
      <Node x={634} y={232} w={242} h={54} title="Model weights" sub="loaded once" />
      <text x="634" y="312" className="font-mono" fontSize="10.5" fill={C.muted}>
        GPU kept busy, not idle
      </text>

      <Flow d="M 755 330 L 755 368 L 200 368" />
      <Annot x={214} y={362}>tokens streamed back to clients</Annot>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Case study 3: contextual RAG                                        */
/* ------------------------------------------------------------------ */

function ContextualRag() {
  return (
    <svg
      viewBox="0 0 920 420"
      className="h-auto w-full"
      role="img"
      aria-labelledby="d3-title d3-desc"
    >
      <title id="d3-title">Query routing across hybrid retrieval</title>
      <desc id="d3-desc">
        An incoming query reaches a router that inspects intent and keyword density. It
        routes to dense vector search with FAISS, to sparse keyword search with BM25, or
        to both, over your own corpus. Candidates are re-ranked by a cross-encoder, then
        compacted and deduplicated before the prompt is built and sent to the model.
      </desc>
      <Defs />
      <Eyebrow>Retrieval · query routing</Eyebrow>

      <Node x={24} y={182} w={136} h={64} title="Query" sub="from your user" />
      <Flow d="M 160 214 L 186 214" />

      <Node x={190} y={174} w={150} h={80} title="Router" sub="intent + density" accent />
      <Flow d="M 340 196 L 352 196 L 352 128 L 368 128" />
      <Flow d="M 340 232 L 352 232 L 352 316 L 368 316" />

      <GroupBox x={356} y={78} w={196} h={290} label="Hybrid retrieval · your corpus" />
      <Node x={372} y={98} w={164} h={60} title="Dense · FAISS" sub="conceptual match" />
      <Node x={372} y={286} w={164} h={60} title="Sparse · BM25" sub="exact terms" />
      <text x="372" y="196" className="font-mono" fontSize="10.5" fill={C.muted}>
        one path, or both,
      </text>
      <text x="372" y="214" className="font-mono" fontSize="10.5" fill={C.muted}>
        chosen per query
      </text>

      <Flow d="M 536 128 L 556 128 L 556 200 L 574 200" />
      <Flow d="M 536 316 L 556 316 L 556 228 L 574 228" />

      <Node x={578} y={174} w={158} h={80} title="Cross-encoder" sub="re-rank candidates" />
      <Flow d="M 736 214 L 758 214" />
      <Node x={762} y={174} w={134} h={80} title="Prompt" sub="compacted context" accent />
      <text x="578" y="292" className="font-mono" fontSize="10.5" fill={C.muted}>
        deduplicated, so tokens
      </text>
      <text x="578" y="310" className="font-mono" fontSize="10.5" fill={C.muted}>
        carry signal not volume
      </text>
    </svg>
  );
}

const DIAGRAMS = {
  "proposal-engine": {
    Component: ProposalEngine,
    caption: "Request path, generalised. Client-specific detail omitted.",
    readAsText: [
      "An engineer submits a project brief to a FastAPI service running on Azure App Service.",
      "Microsoft Entra ID enforces role-based access control across 24 mapped cases before the request handler runs.",
      "A three-stage pipeline parses the brief, resolves the rate card, then assembles the document, retaining state between stages.",
      "Templates and rate-card rules feed the pipeline.",
      "Output is a branded Word proposal and an Excel pricing sheet.",
      "The service writes back to the Total Synergy v4 API over per-user OAuth 2.0, so each write is attributed to the signed-in engineer.",
    ],
  },
  "inference-serving": {
    Component: InferenceServing,
    caption: "Serving path under concurrent load.",
    readAsText: [
      "Up to 100 concurrent client requests arrive.",
      "An asynchronous scheduler buffers and batches them rather than serving one at a time.",
      "Continuous batching lets a new request join a batch already in flight.",
      "A single RTX 2080 Ti with 11 GB holds the model weights and a paged key-value cache allocated in fixed blocks.",
      "Chunked prefill keeps memory use flat instead of spiking under burst traffic.",
      "Tokens stream back to the clients as they are generated.",
    ],
  },
  "contextual-rag": {
    Component: ContextualRag,
    caption: "Retrieval path, per query.",
    readAsText: [
      "A user query reaches a router that inspects intent and keyword density.",
      "The router sends it to dense vector search with FAISS, sparse keyword search with BM25, or both.",
      "Both retrievers run over your own corpus.",
      "A cross-encoder re-ranks the candidates so the best few reach the prompt rather than the nearest many.",
      "Context is compacted and deduplicated before the prompt is built.",
    ],
  },
} as const;

export type DiagramKey = keyof typeof DIAGRAMS;

export function ArchitectureDiagram({
  name,
  className,
}: {
  name: DiagramKey;
  className?: string;
}) {
  const { Component, caption, readAsText } = DIAGRAMS[name];
  return (
    <Figure caption={caption} readAsText={[...readAsText]} minWidth={780} className={className}>
      <Component />
    </Figure>
  );
}
