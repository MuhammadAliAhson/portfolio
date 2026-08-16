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
            self.drawString(40, 762, "Senior Software Engineer — AI Systems & Backend Architecture | Technical Dossier")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(40, 756, 572, 756)

        # Footer
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(40, 42, 572, 42)
        
        self.drawString(40, 30, "Technical & Architectural Dossier · Prepared for Engineering Leadership & Technical Review")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 30, page_str)
        self.restoreState()

def create_portfolio_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=46,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
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
        fontSize=18,
        leading=22,
        textColor=c_dark
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=c_primary
    )

    meta_style = ParagraphStyle(
        'MetaText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=c_slate
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_dark,
        spaceAfter=4
    )

    h2_style = ParagraphStyle(
        'CardH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=c_dark
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
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
        fontSize=7.5,
        leading=10,
        textColor=c_primary
    )

    story = []

    # -------------------------------------------------------------
    # HEADER / GENERAL EXECUTIVE SUMMARY (NO PERSONAL NAME / CONTACT)
    # -------------------------------------------------------------
    header_data = [
        [
            Paragraph("<b>SENIOR SOFTWARE ENGINEER</b>", title_style),
            Paragraph("<b>Document:</b> Technical Engineering Portfolio<br/><b>Focus:</b> AI Systems & Backend Architecture", meta_style)
        ],
        [
            Paragraph("AI Systems · Backend Architecture · Production Infrastructure", subtitle_style),
            Paragraph("<b>Audience:</b> CTOs, Engineering Managers & Founders<br/><b>Specialization:</b> Vibe Code → Production Ready", meta_style)
        ]
    ]
    
    header_table = Table(header_data, colWidths=[320, 212])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # Executive positioning box
    summary_text = (
        "<b>Executive Summary:</b> Senior Software Engineer specializing in taking rapidly built or "
        "vibe-coded applications and re-engineering them into clean, reliable, production-ready systems. "
        "Deep expertise across FastAPI backend microservices, high-throughput vLLM model serving, "
        "adaptive RAG pipelines, enterprise Microsoft Entra ID / OAuth 2.0 security, and automated CI/CD."
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
    story.append(Spacer(1, 12))

    # -------------------------------------------------------------
    # SECTION 1: ENGINEERING CASE STUDIES
    # -------------------------------------------------------------
    story.append(Paragraph("1. ENGINEERING CASE STUDIES (FLAGSHIP WORK)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8, spaceBefore=2))

    # CASE STUDY 01
    cs1_content = [
        Paragraph("<b>CASE STUDY 01: Enterprise LLM Application</b> &nbsp; <font color='#B45309'>[Confidential Client Work]</font>", h2_style),
        Paragraph("<b>Domain:</b> Australian Engineering Consultancy (Cerecon) &nbsp;|&nbsp; <b>Key Outcome:</b> Turnaround reduced from <b>Days → < 1 Hour</b>", subtitle_style),
        Spacer(1, 4),
        Paragraph("<b>The Problem:</b> Automated proposal generation needed to convert raw client briefs into audit-ready fee proposals with automated rate cards and branded Word/Excel deliverables without risking hallucinated pricing or audit gaps.", body_style),
        Spacer(1, 3),
        Paragraph("<b>Engineering Implementation:</b><br/>"
                  "• <b>Backend Architecture:</b> Built and maintained FastAPI services on Azure App Service with strict domain separation.<br/>"
                  "• <b>Multi-Stage Prompt Assembly:</b> Engineered structured context preservation across multi-phase LLM runs.<br/>"
                  "• <b>Security & Identity:</b> Implemented per-user OAuth 2.0 token handshakes with Total Synergy v4 API and Microsoft Entra ID RBAC across 24 mapped enterprise use cases, eliminating shared-account audit gaps.<br/>"
                  "• <b>DevOps:</b> Solved Azure App Service limits using Kudu async zipdeploy with zero commit loss migration.", body_style),
        Spacer(1, 3),
        Paragraph("<b>Tech Stack:</b> Python, FastAPI, Azure App Service, Azure DevOps, Microsoft Entra ID, OAuth 2.0, RBAC, REST APIs, LLMs", tag_style)
    ]
    cs1_table = Table([[cs1_content]], colWidths=[532])
    cs1_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#94A3B8")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(cs1_table)
    story.append(Spacer(1, 8))

    # CASE STUDY 02
    cs2_content = [
        Paragraph("<b>CASE STUDY 02: High-Throughput LLM Inference Service</b> &nbsp; <font color='#0284C7'>[AI Infrastructure]</font>", h2_style),
        Paragraph("<b>Hardware Target:</b> Single NVIDIA RTX 2080 Ti &nbsp;|&nbsp; <b>Key Outcome:</b> <b>100 Concurrent Requests</b> Supported", subtitle_style),
        Spacer(1, 4),
        Paragraph("<b>The Problem:</b> Deploying production LLM serving on constrained GPU hardware while handling high concurrent user loads without VRAM out-of-memory crashes or high time-to-first-token (TTFT) queue spikes.", body_style),
        Spacer(1, 3),
        Paragraph("<b>Engineering Implementation:</b><br/>"
                  "• <b>vLLM Engine Integration:</b> Leveraged continuous batching and PagedAttention to eliminate memory fragmentation.<br/>"
                  "• <b>KV-Cache Optimization:</b> Tuned memory allocation chunks and asynchronous request queue buffers.<br/>"
                  "• <b>Pipeline Flow:</b> Client → API Gateway → Async Queue / Scheduler → vLLM Batcher → GPU VRAM → Streamed Tokens.<br/>"
                  "• <b>Benchmarking:</b> Profiled token generation rates under synthetic load to maintain sub-second first-token response.", body_style),
        Spacer(1, 3),
        Paragraph("<b>Tech Stack:</b> Python, vLLM, Continuous Batching, PagedAttention, PyTorch, FastAPI, Docker, GPU Profiling", tag_style)
    ]
    cs2_table = Table([[cs2_content]], colWidths=[532])
    cs2_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#94A3B8")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(cs2_table)
    story.append(Spacer(1, 8))

    # CASE STUDY 03
    cs3_content = [
        Paragraph("<b>CASE STUDY 03: Contextual Dynamic RAG Framework</b> &nbsp; <font color='#0284C7'>[Search & LLM Infrastructure]</font>", h2_style),
        Paragraph("<b>Architecture:</b> Hybrid Dynamic Routing &nbsp;|&nbsp; <b>Key Outcome:</b> <b>+60% Retrieval Efficiency Improvement</b>", subtitle_style),
        Spacer(1, 4),
        Paragraph("<b>The Problem:</b> Standard naive RAG pipelines suffer from high latency on exact-match queries and poor context quality on complex multi-hop reasoning over heterogeneous enterprise documents.", body_style),
        Spacer(1, 3),
        Paragraph("<b>Engineering Implementation:</b><br/>"
                  "• <b>Dynamic Query Router:</b> Classifies incoming queries by intent, keyword density, and semantic complexity.<br/>"
                  "• <b>Hybrid Retrieval Layer:</b> Routes between FAISS dense vector search and BM25 sparse keyword indices dynamically.<br/>"
                  "• <b>Cross-Encoder Reranking:</b> Applied fine-grained reranking over candidate chunks before prompt context assembly.<br/>"
                  "• <b>Compaction:</b> Deduplicated context windows to maximize answer precision and minimize LLM inference tokens.", body_style),
        Spacer(1, 3),
        Paragraph("<b>Tech Stack:</b> FAISS, BM25, Cross-Encoder, LangGraph, Python, FastAPI, Hugging Face Embeddings", tag_style)
    ]
    cs3_table = Table([[cs3_content]], colWidths=[532])
    cs3_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#94A3B8")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(cs3_table)
    story.append(Spacer(1, 14))

    # -------------------------------------------------------------
    # SECTION 2: TECHNICAL STACK & SKILLS
    # -------------------------------------------------------------
    story.append(Paragraph("2. TECHNICAL STACK & CORE COMPETENCIES", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8, spaceBefore=2))

    skills_data = [
        [
            Paragraph("<b>Languages</b>", bold_body),
            Paragraph("Python, C++, SQL, JavaScript, HTML/CSS, Bash", body_style)
        ],
        [
            Paragraph("<b>AI / LLM Systems</b>", bold_body),
            Paragraph("LoRA / PEFT, Unsloth, vLLM, llama.cpp, GGUF, Dynamic RAG, Prompt Engineering, LangChain, LangGraph, Hugging Face Transformers, OpenAI / Anthropic / Gemini APIs, Coqui TTS", body_style)
        ],
        [
            Paragraph("<b>ML / Computer Vision</b>", bold_body),
            Paragraph("PyTorch, TensorFlow, TensorFlow Lite, Ultralytics YOLO (v8), OpenCV, scikit-learn, Optuna, Weights & Biases, Pandas, NumPy", body_style)
        ],
        [
            Paragraph("<b>Backend & Cloud</b>", bold_body),
            Paragraph("FastAPI, REST APIs, Docker, Git, Azure App Service, Azure DevOps, Microsoft Entra ID, OAuth 2.0, RBAC, CI/CD Pipelines, Hugging Face Spaces", body_style)
        ],
        [
            Paragraph("<b>Databases & Analytics</b>", bold_body),
            Paragraph("PostgreSQL, MySQL, MongoDB, Supabase, FAISS Vector Index, Power BI, Tableau", body_style)
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
    story.append(Spacer(1, 14))

    # -------------------------------------------------------------
    # SECTION 3: PUBLIC PROJECTS & WORK
    # -------------------------------------------------------------
    story.append(Paragraph("3. PUBLIC PROJECTS & OPEN-SOURCE ARTIFACTS", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8, spaceBefore=2))

    projects_data = [
        [
            Paragraph("<b>Kisan Rabta</b><br/><font color='#64748B'>Voice-to-Insight Agricultural AI Platform</font>", bold_body),
            Paragraph("Fine-tuned OpenAI Whisper on 18,000 scraped text samples & 2 hours of regional Urdu audio. Extracted structured agricultural information & crop disease diagnostics via custom NER pipelines, exposed via low-latency REST APIs.", body_style),
            Paragraph("<b>Stack:</b> Whisper, NER, Python, FastAPI, React Native", tag_style)
        ],
        [
            Paragraph("<b>Medical Reasoning LLM</b><br/><font color='#64748B'>DeepSeek R1 Distill LLaMA 8B</font>", bold_body),
            Paragraph("Fine-tuned DeepSeek R1 Distill LLaMA 8B on clinical diagnostic reasoning datasets using Unsloth 4-bit QLoRA to maximize VRAM efficiency. Published model weights for public research and experimentation.", body_style),
            Paragraph("<b>Stack:</b> DeepSeek, LLaMA, LoRA, Unsloth, PyTorch", tag_style)
        ],
        [
            Paragraph("<b>ID Document Parsing</b><br/><font color='#64748B'>Structured National Identity Extraction</font>", bold_body),
            Paragraph("Computer vision and OCR pipeline for localized bounding box detection (Name, ID number, DOB, Barcode/QR) with automated cross-field checksum validation deployed to interactive web spaces.", body_style),
            Paragraph("<b>Stack:</b> YOLOv8, OCR, OpenCV, Python, HF Spaces", tag_style)
        ],
        [
            Paragraph("<b>Automatic Number Plate Recognition (ANPR)</b><br/><font color='#64748B'>Real-Time Vehicle Localization</font>", bold_body),
            Paragraph("High-accuracy object detection achieving <b>97.5% Precision and 97.5% Recall</b> on benchmark splits across challenging lighting and video stream angles.", body_style),
            Paragraph("<b>Stack:</b> YOLOv8, OpenCV, Python, HF Spaces", tag_style)
        ]
    ]

    proj_table = Table(projects_data, colWidths=[150, 242, 140])
    proj_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(proj_table)
    story.append(Spacer(1, 14))

    # -------------------------------------------------------------
    # SECTION 4: CLIENT ENGAGEMENTS & TECHNICAL TRACK RECORD
    # -------------------------------------------------------------
    story.append(Paragraph("4. CLIENT ENGAGEMENTS & TECHNICAL TRACK RECORD", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8, spaceBefore=2))

    exp_data = [
        [
            Paragraph("<b>Enterprise AI & Cloud Systems</b><br/><font color='#64748B'>Australian Engineering Consultancy<br/>Jun 2026 — Present</font>", bold_body),
            Paragraph("Lead engineering delivery on AI enterprise software, backend architecture, third-party integrations, and Azure deployments. Rebuilt prompt-assembly layer to reduce proposal turnaround from days to <1 hr; implemented Microsoft Entra ID RBAC across 24 enterprise use cases and per-user OAuth 2.0 with Total Synergy v4 API.", body_style)
        ],
        [
            Paragraph("<b>Applied AI & High-Throughput Serving</b><br/><font color='#64748B'>AI Engineering Consultancy<br/>Jun 2025 — Jun 2026</font>", bold_body),
            Paragraph("Shipped client AI systems including vLLM inference microservices (100 concurrent requests on RTX 2080 Ti), dynamic RAG frameworks (+60% retrieval efficiency), edge computer vision deployments (TF Lite GPU), and quantized offline Android GGUF RAG chatbots.", body_style)
        ],
        [
            Paragraph("<b>Analytics & Applied Machine Learning</b><br/><font color='#64748B'>FinTech & Healthcare Engagements<br/>2023 — 2024</font>", bold_body),
            Paragraph("Engineered real-time financial price prediction models for banking decision support, digital receipt OCR extraction pipelines (+15% extraction precision), and executive data analytics pipelines.", body_style)
        ],
        [
            Paragraph("<b>Technical Standards & Core Rigor</b><br/><font color='#64748B'>Computer Science Foundation</font>", bold_body),
            Paragraph("<b>Bachelor of Science in Computer Science (B.S. CS)</b> — Rigorous foundation in Distributed Backend Systems, Scalable Software Architecture, Machine Learning, and Production Infrastructure.", body_style)
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
    print(f"Successfully generated PDF: {output_path}")

if __name__ == "__main__":
    out_file = os.path.join(os.path.dirname(__file__), "Senior_Software_Engineer_Portfolio.pdf")
    create_portfolio_pdf(out_file)
