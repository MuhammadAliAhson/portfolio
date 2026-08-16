import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, 762, "AI Systems & Backend Engineering Consultancy | Services & Capabilities Dossier")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(40, 756, 572, 756)

        # Footer
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(40, 42, 572, 42)
        
        self.drawString(40, 30, "Engineering Services Dossier · Confidential · Prepared for Technical & Executive Review")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 30, page_str)
        self.restoreState()

def create_services_portfolio_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=46,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom colors & typography
    c_dark = colors.HexColor("#0F172A")
    c_primary = colors.HexColor("#0284C7")
    c_slate = colors.HexColor("#334155")
    c_muted = colors.HexColor("#64748B")
    c_bg_light = colors.HexColor("#F8FAFC")
    c_border = colors.HexColor("#CBD5E1")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=21,
        textColor=c_dark
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=c_primary
    )

    meta_style = ParagraphStyle(
        'MetaText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=c_slate
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=c_dark,
        spaceAfter=3
    )

    h2_style = ParagraphStyle(
        'CardH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13.5,
        textColor=c_dark
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.5,
        textColor=c_slate
    )

    bold_body = ParagraphStyle(
        'BoldBody',
        parent=body_style,
        fontName='Helvetica-Bold',
        textColor=c_dark
    )

    tag_style = ParagraphStyle(
        'TagStyle',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=7.2,
        leading=9.5,
        textColor=c_primary
    )

    story = []

    # -------------------------------------------------------------
    # HEADER / CONSULTANCY EXECUTIVE PROFILE
    # -------------------------------------------------------------
    header_data = [
        [
            Paragraph("<b>AI SYSTEMS & BACKEND ENGINEERING CONSULTANCY</b>", title_style),
            Paragraph("<b>Service Model:</b> Technical Advisory & Implementation<br/><b>Focus:</b> Vibe Code → Production Software", meta_style)
        ],
        [
            Paragraph("Production AI Systems · Scalable Backend Architecture · Cloud Infrastructure", subtitle_style),
            Paragraph("<b>Target Audience:</b> CTOs, VPs of Engineering & Founders<br/><b>Engagements:</b> Audits, Refactoring & Deployments", meta_style)
        ]
    ]
    
    header_table = Table(header_data, colWidths=[330, 202])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 6))

    # Core Value Proposition & Mission Box
    summary_text = (
        "<b>Company Value Proposition:</b> AI-assisted development allows teams to build prototypes faster than ever, "
        "but rapidly generated code often accumulates critical technical debt — duplicated logic, coupled components, "
        "vulnerable authentication, and unstable latency. <b>We help engineering leaders transform vibe-coded applications "
        "into clean, resilient, enterprise-ready production software</b> with strict data contracts, high-throughput model serving, "
        "and automated cloud CI/CD pipelines."
    )
    summary_table = Table([[Paragraph(summary_text, body_style)]], colWidths=[532])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 1: CORE CONSULTING & ENGINEERING SERVICES
    # -------------------------------------------------------------
    story.append(Paragraph("1. CORE CONSULTING & ENGINEERING SERVICES", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=6, spaceBefore=2))

    services_data = [
        [
            Paragraph("<b>Codebase Audit & Architecture Assessment</b><br/>"
                      "<font color='#64748B'>Comprehensive review of existing applications to identify architecture flaws, security vulnerabilities, latency bottlenecks, and unmaintainable technical debt before it halts growth.</font><br/>"
                      "<b>Key Deliverables:</b> Architecture Assessment Report, Auth Inspection, Refactoring Roadmap", body_style),
            Paragraph("<b>Refactoring & Domain Modularization</b><br/>"
                      "<font color='#64748B'>Transform tightly coupled or vibe-coded prototypes into clean, modular architectures with strict service boundaries and isolated domain logic.</font><br/>"
                      "<b>Key Deliverables:</b> Domain Boundary Separation, Clean Schema Contracts, Decoupled Service Layers", body_style)
        ],
        [
            Paragraph("<b>Production Backend Engineering</b><br/>"
                      "<font color='#64748B'>Architect and build robust, asynchronous FastAPI microservices, scalable database layers, and complex third-party API orchestrations engineered for real load.</font><br/>"
                      "<b>Key Deliverables:</b> Asynchronous REST APIs, Relational/Vector Schemas, Third-Party Integration", body_style),
            Paragraph("<b>Applied AI & LLM Systems Engineering</b><br/>"
                      "<font color='#64748B'>Engineer production-ready LLM pipelines, dynamic contextual RAG frameworks, model fine-tuning (LoRA), and agentic workflows with strict validation.</font><br/>"
                      "<b>Key Deliverables:</b> High-Throughput vLLM Serving, Dynamic RAG Pipelines, LoRA Fine-Tuning", body_style)
        ],
        [
            Paragraph("<b>Enterprise Productionization & Security</b><br/>"
                      "<font color='#64748B'>Harden applications to meet enterprise compliance standards: Microsoft Entra ID RBAC, per-user OAuth 2.0 token handshakes, structured logging, and automated CI/CD.</font><br/>"
                      "<b>Key Deliverables:</b> Enterprise OAuth 2.0 / RBAC, Azure CI/CD Pipelines, Audit Trail Systems", body_style),
            Paragraph("<b>Performance & Throughput Optimization</b><br/>"
                      "<font color='#64748B'>Diagnose and resolve GPU memory leaks, KV-cache fragmentation, concurrency limits, and p99 latency spikes across backend and AI workloads.</font><br/>"
                      "<b>Key Deliverables:</b> GPU KV-Cache Tuning, Concurrency Stress Testing, Latency Profiling", body_style)
        ]
    ]

    services_table = Table(services_data, colWidths=[262, 262])
    services_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(services_table)
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 2: ENGINEERING CASE STUDIES & PROVEN DELIVERABLES
    # -------------------------------------------------------------
    story.append(Paragraph("2. FLAGSHIP CASE STUDIES & TECHNICAL DELIVERABLES", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=6, spaceBefore=2))

    # CASE STUDY 01
    cs1_content = [
        Paragraph("<b>CASE STUDY 01: Enterprise LLM Proposal Engine</b> &nbsp; <font color='#B45309'>[Client Deliverable]</font>", h2_style),
        Paragraph("<b>Client Profile:</b> Australian Engineering Consultancy &nbsp;|&nbsp; <b>Measurable Impact:</b> Turnaround reduced from <b>Days → < 1 Hour</b>", subtitle_style),
        Spacer(1, 3),
        Paragraph("<b>The Challenge:</b> Client required an automated enterprise solution to transform project briefs into client-ready fee proposals with strict rate-card pricing and branded Word/Excel deliverables without risking hallucinated fee data or security audit gaps.", body_style),
        Spacer(1, 2),
        Paragraph("<b>Consulting & Engineering Work Delivered:</b><br/>"
                  "• <b>FastAPI Architecture:</b> Built modular services on Azure App Service with isolated prompt-assembly logic.<br/>"
                  "• <b>Multi-Stage Generation:</b> Engineered context management preserving prompt fidelity across multi-step LLM workflows.<br/>"
                  "• <b>Zero-Audit-Gap Security:</b> Configured per-user OAuth 2.0 token handshakes with Total Synergy v4 API and Microsoft Entra ID RBAC across 24 mapped enterprise use cases, ensuring all mutations are tied to individual authenticated users.<br/>"
                  "• <b>CI/CD Pipeline:</b> Solved deployment timeouts and package limits using Azure DevOps Kudu async zipdeploy.", body_style),
        Spacer(1, 2),
        Paragraph("<b>Technologies:</b> Python, FastAPI, Azure App Service, Azure DevOps, Microsoft Entra ID, OAuth 2.0, RBAC, REST APIs, LLMs", tag_style)
    ]
    cs1_table = Table([[cs1_content]], colWidths=[532])
    cs1_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#94A3B8")),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(cs1_table)
    story.append(Spacer(1, 6))

    # CASE STUDY 02
    cs2_content = [
        Paragraph("<b>CASE STUDY 02: High-Throughput LLM Inference Service</b> &nbsp; <font color='#0284C7'>[AI Infrastructure]</font>", h2_style),
        Paragraph("<b>Target Environment:</b> Single NVIDIA RTX 2080 Ti &nbsp;|&nbsp; <b>Measurable Impact:</b> <b>100 Concurrent Requests</b> Supported", subtitle_style),
        Spacer(1, 3),
        Paragraph("<b>The Challenge:</b> Deploying high-concurrency LLM inference on budget-constrained hardware without running into GPU VRAM out-of-memory errors or unacceptable queue waiting times.", body_style),
        Spacer(1, 2),
        Paragraph("<b>Consulting & Engineering Work Delivered:</b><br/>"
                  "• <b>Continuous Batching & PagedAttention:</b> Integrated vLLM serving engine to eliminate memory fragmentation.<br/>"
                  "• <b>KV-Cache Optimization:</b> Tuned memory allocation chunks and configured asynchronous request schedulers.<br/>"
                  "• <b>Architecture Pipeline:</b> Client → API Gateway → Async Queue / Scheduler → vLLM Batcher → GPU VRAM → Streaming Tokens.<br/>"
                  "• <b>Synthetic Load Benchmarking:</b> Measured token-to-first-token (TTFT) and inter-token latency to maintain sub-second SLA.", body_style),
        Spacer(1, 2),
        Paragraph("<b>Technologies:</b> Python, vLLM, Continuous Batching, PagedAttention, PyTorch, FastAPI, Docker, GPU Profiling", tag_style)
    ]
    cs2_table = Table([[cs2_content]], colWidths=[532])
    cs2_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#94A3B8")),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(cs2_table)
    story.append(Spacer(1, 6))

    # CASE STUDY 03
    cs3_content = [
        Paragraph("<b>CASE STUDY 03: Contextual Dynamic RAG Framework</b> &nbsp; <font color='#0284C7'>[Search & Retrieval Infrastructure]</font>", h2_style),
        Paragraph("<b>Retrieval Architecture:</b> Dynamic Multi-Strategy Routing &nbsp;|&nbsp; <b>Measurable Impact:</b> <b>+60% Retrieval Efficiency Gain</b>", subtitle_style),
        Spacer(1, 3),
        Paragraph("<b>The Challenge:</b> Single-path naive RAG pipelines created unnecessary latency on exact-keyword searches and poor recall on multi-step reasoning queries across complex enterprise document sets.", body_style),
        Spacer(1, 2),
        Paragraph("<b>Consulting & Engineering Work Delivered:</b><br/>"
                  "• <b>Dynamic Query Classifier:</b> Upfront classifier analyzing user intent, keyword density, and semantic complexity.<br/>"
                  "• <b>Hybrid Retrieval Layer:</b> Routes between FAISS dense vector search and BM25 sparse keyword indices dynamically.<br/>"
                  "• <b>Cross-Encoder Reranking:</b> Applied fine-grained reranking over candidate chunks prior to context window assembly.<br/>"
                  "• <b>Context Compaction:</b> Deduplicated and compacted retrieved passages to prevent prompt bloating and LLM distraction.", body_style),
        Spacer(1, 2),
        Paragraph("<b>Technologies:</b> FAISS, BM25, Cross-Encoder, LangGraph, Python, FastAPI, Hugging Face Embeddings", tag_style)
    ]
    cs3_table = Table([[cs3_content]], colWidths=[532])
    cs3_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#94A3B8")),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(cs3_table)
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 3: TECHNICAL STACK & INFRASTRUCTURE MATRIX
    # -------------------------------------------------------------
    story.append(Paragraph("3. TECHNICAL STACK & CORE CAPABILITIES", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=6, spaceBefore=2))

    skills_data = [
        [
            Paragraph("<b>Backend & Cloud</b>", bold_body),
            Paragraph("FastAPI, REST APIs, Asynchronous Python, Docker, Git, Azure App Service, Azure DevOps, Microsoft Entra ID, OAuth 2.0, RBAC, CI/CD Automation", body_style)
        ],
        [
            Paragraph("<b>AI / LLM Systems</b>", bold_body),
            Paragraph("LoRA / PEFT, Unsloth, vLLM, llama.cpp, GGUF Quantization, Dynamic RAG, Prompt Engineering, LangChain, LangGraph, Hugging Face Transformers, OpenAI / Anthropic / Gemini APIs", body_style)
        ],
        [
            Paragraph("<b>ML / Vision / Audio</b>", bold_body),
            Paragraph("PyTorch, TensorFlow, TensorFlow Lite, Ultralytics YOLOv8, OpenCV, Whisper (Speech-to-Text), scikit-learn, Optuna, Weights & Biases, Pandas, NumPy", body_style)
        ],
        [
            Paragraph("<b>Data & Storage</b>", bold_body),
            Paragraph("PostgreSQL, MySQL, MongoDB, Supabase, FAISS Vector Databases, Power BI, Tableau", body_style)
        ]
    ]

    skills_table = Table(skills_data, colWidths=[130, 402])
    skills_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 4: CLIENT ENGAGEMENT HISTORY & TRACK RECORD
    # -------------------------------------------------------------
    story.append(Paragraph("4. CLIENT ENGAGEMENT HISTORY & TRACK RECORD", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=6, spaceBefore=2))

    exp_data = [
        [
            Paragraph("<b>Enterprise AI & Proposal Systems</b><br/><font color='#64748B'>Australian Engineering Firm<br/>2026 — Present</font>", bold_body),
            Paragraph("Delivered automated proposal generation architecture, multi-stage context assembly layer, Microsoft Entra ID RBAC across 24 use cases, and per-user OAuth 2.0 token handshakes with Total Synergy v4 API on Azure App Service.", body_style)
        ],
        [
            Paragraph("<b>AI Infrastructure & Model Serving</b><br/><font color='#64748B'>AI Engineering Consultancy<br/>2025 — 2026</font>", bold_body),
            Paragraph("Architected high-throughput vLLM inference services (100 concurrent requests on RTX 2080 Ti), dynamic RAG frameworks (+60% retrieval efficiency), edge vision deployments (TF Lite GPU), and offline Android GGUF RAG chatbots.", body_style)
        ],
        [
            Paragraph("<b>Analytics & Applied Machine Learning</b><br/><font color='#64748B'>FinTech & Healthcare Sector<br/>2023 — 2024</font>", bold_body),
            Paragraph("Built real-time financial price prediction models for banking decision support, digital receipt OCR extraction pipelines (+15% extraction precision), and executive data analytics dashboards.", body_style)
        ]
    ]

    exp_table = Table(exp_data, colWidths=[160, 372])
    exp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(exp_table)

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated Services PDF: {output_path}")

if __name__ == "__main__":
    out_file = os.path.join(os.path.dirname(__file__), "AI_Systems_Engineering_Services_Dossier.pdf")
    create_services_portfolio_pdf(out_file)
