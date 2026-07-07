from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer


OUTPUT_PATH = r"C:\Users\panda\Desktop\Portfolio-Premium\Portfolio\resume\Ayush_Panda_ATS_Resume.pdf"
PUBLIC_OUTPUT_PATH = (
    r"C:\Users\panda\Desktop\Portfolio-Premium\Portfolio\public\resume\Ayush_Panda_ATS_Resume.pdf"
)


def build_styles():
    styles = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=24,
            alignment=TA_CENTER,
            textColor=colors.black,
            spaceAfter=4,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=12,
            alignment=TA_CENTER,
            textColor=colors.black,
            spaceAfter=6,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=14,
            textColor=colors.black,
            spaceBefore=8,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=12.4,
            textColor=colors.black,
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=12.2,
            textColor=colors.black,
            spaceAfter=1.2,
        ),
        "subhead": ParagraphStyle(
            "Subhead",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.8,
            leading=13,
            textColor=colors.black,
            spaceAfter=2,
        ),
        "links": ParagraphStyle(
            "Links",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=11.2,
            textColor=colors.HexColor("#444444"),
            spaceAfter=3,
        ),
    }


def bullet_list(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=13,
        bulletFontName="Helvetica",
        bulletFontSize=7.5,
        spaceBefore=0,
        spaceAfter=2,
    )


def project_block(title, stack, links, bullets, body_style, subhead_style, link_style):
    return [
        Paragraph(f"{title} | {stack}", subhead_style),
        Paragraph(links, link_style),
        bullet_list(bullets, body_style),
        HRFlowable(width="100%", thickness=0.35, color=colors.HexColor("#dddddd"), spaceBefore=4, spaceAfter=8),
    ]


def main():
    styles = build_styles()
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        leftMargin=12 * mm,
        rightMargin=12 * mm,
        topMargin=11 * mm,
        bottomMargin=11 * mm,
        title="Ayush Panda Resume",
        author="Ayush Panda",
    )

    story = [
        Paragraph("Ayush Panda", styles["name"]),
        Paragraph(
            "Full-Stack Development Intern Candidate",
            styles["contact"],
        ),
        Paragraph(
            "Sambalpur, Odisha | Open to Remote Internships | +91 8260355089",
            styles["contact"],
        ),
        Paragraph(
            "pandaayush25305@gmail.com | ayushdev-five.vercel.app | x.com/AyushPanda85699 | github.com/Ayush-Panda-design | linkedin.com/in/ayush-panda-a04280215",
            styles["contact"],
        ),
        HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#bdbdbd"), spaceBefore=2, spaceAfter=8),
        Paragraph("PROFILE", styles["section"]),
        Paragraph(
            "5th-semester B.Tech CSE student (CGPA 8.27) who has shipped four live, deployed full-stack products "
            "with end-to-end ownership of UI, APIs, databases, authentication, and deployment. Comfortable across "
            "React/Next.js, Node.js, PostgreSQL, MongoDB, realtime systems, and cloud deployment. Seeking a remote "
            "full-stack internship.",
            styles["body"],
        ),
        HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#d6d6d6"), spaceBefore=3, spaceAfter=8),
        Paragraph("EDUCATION", styles["section"]),
        Paragraph(
            "<b>Veer Surendra Sai University of Technology (VSSUT), Burla</b><br/>"
            "B.Tech in Computer Science and Engineering | 2024-2028 | 5th Semester | CGPA: 8.27",
            styles["body"],
        ),
        HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#d6d6d6"), spaceBefore=3, spaceAfter=8),
        Paragraph("TECHNICAL SKILLS", styles["section"]),
        Paragraph(
            "<b>Languages:</b> JavaScript, TypeScript, HTML, CSS, SQL<br/>"
            "<b>Frontend:</b> React, Next.js, Tailwind CSS<br/>"
            "<b>Backend:</b> Node.js, Express, tRPC, REST APIs, Socket.io<br/>"
            "<b>Databases:</b> PostgreSQL, MongoDB, Redis, Prisma, Drizzle<br/>"
            "<b>Other:</b> OAuth, JWT, Docker, Kafka, Inngest, Vercel, Render",
            styles["body"],
        ),
        HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#d6d6d6"), spaceBefore=3, spaceAfter=8),
        Paragraph("PROJECTS", styles["section"]),
    ]

    story.extend(
        project_block(
            "ShipFlow AI",
            "Next.js, Prisma, PostgreSQL, Inngest, GitHub App, OpenRouter",
            "Live: shipflowai.in | Repo: ShipFlowAI",
            [
                "Built a full-stack delivery workspace from idea intake to release approval using Next.js, PostgreSQL, and GitHub App integrations.",
                "Implemented AI PR reviews and background jobs with Inngest while owning auth, database flows, and deployment.",
            ],
            styles["bullet"],
            styles["subhead"],
            styles["links"],
        )
    )

    story.extend(
        project_block(
            "Relvion AI",
            "Next.js, PostgreSQL, pgvector, Gemini, MCP, Corsair",
            "Live: relvion-ai.vercel.app | Repo: Relvion-AI",
            [
                "Built a full-stack Gmail and Google Calendar workspace with AI triage, semantic search, and agent actions on live user data.",
                "Designed the search pipeline with PostgreSQL + pgvector and used webhook-to-SSE delivery for near real-time inbox updates.",
            ],
            styles["bullet"],
            styles["subhead"],
            styles["links"],
        )
    )

    story.extend(
        project_block(
            "EdinForm",
            "Next.js, Express, tRPC, Drizzle, PostgreSQL, Redis, Turborepo",
            "Live: edinform.in | Repo: EdinForm11",
            [
                "Built a full-stack SaaS form builder with multi-step UX, analytics dashboards, QR sharing, and CSV export.",
                "Implemented typed APIs with tRPC + Drizzle, PostgreSQL persistence, and Redis-backed rate limiting for public traffic.",
            ],
            styles["bullet"],
            styles["subhead"],
            styles["links"],
        )
    )

    story.extend(
        project_block(
            "Votora",
            "React, Express, MongoDB, Socket.io, JWT, Google OAuth",
            "Live: votora-client-jaam.vercel.app | Repo: Votora-Real-Time-Polling-Platform",
            [
                "Built a full-stack realtime polling platform with React frontend, Express APIs, MongoDB, and Socket.io rooms.",
                "Implemented synchronized lobby timers, live dashboards, and secure auth with JWT, Google OAuth, and rate limiting.",
            ],
            styles["bullet"],
            styles["subhead"],
            styles["links"],
        )
    )

    story.extend(
        [
            HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#d6d6d6"), spaceBefore=2, spaceAfter=8),
            Paragraph("ACHIEVEMENTS", styles["section"]),
            bullet_list(
                [
                    "Ranked 3rd out of 130 teams (86/100) at the Corsair Command Inbox Hackathon with Relvion AI, "
                    "an AI-powered Gmail and Google Calendar workspace.",
                ],
                styles["bullet"],
            ),
            HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#d6d6d6"), spaceBefore=2, spaceAfter=8),
            Paragraph("CERTIFICATIONS", styles["section"]),
            bullet_list(
                [
                    "Web Development Cohort 2026, ChaiCode (MasterJi) — Jan 2026 to Jun 2026",
                ],
                styles["bullet"],
            ),
            Spacer(1, 2),
        ]
    )

    doc.build(story)
    print(f"Generated resume PDF at: {OUTPUT_PATH}")

    import shutil

    shutil.copy2(OUTPUT_PATH, PUBLIC_OUTPUT_PATH)
    print(f"Copied resume PDF to: {PUBLIC_OUTPUT_PATH}")


if __name__ == "__main__":
    main()
