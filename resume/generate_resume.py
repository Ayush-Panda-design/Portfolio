from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer


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
            fontSize=17,
            leading=19,
            alignment=TA_CENTER,
            textColor=colors.black,
            spaceAfter=2,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=9.8,
            alignment=TA_CENTER,
            textColor=colors.black,
            spaceAfter=4,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9.8,
            leading=11,
            textColor=colors.black,
            spaceBefore=3,
            spaceAfter=2,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=9.8,
            textColor=colors.black,
            spaceAfter=1.5,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=7.95,
            leading=9.5,
            textColor=colors.black,
            spaceAfter=0.2,
        ),
        "subhead": ParagraphStyle(
            "Subhead",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.35,
            leading=9.8,
            textColor=colors.black,
            spaceAfter=0.5,
        ),
        "links": ParagraphStyle(
            "Links",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=7.4,
            leading=8.8,
            textColor=colors.black,
            spaceAfter=1,
        ),
    }


def bullet_list(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=11,
        bulletFontName="Helvetica",
        bulletFontSize=6.5,
        spaceBefore=0,
        spaceAfter=1,
    )


def project_block(title, stack, links, bullets, body_style, subhead_style, link_style):
    return [
        Paragraph(f"{title} | {stack}", subhead_style),
        Paragraph(links, link_style),
        bullet_list(bullets, body_style),
    ]


def main():
    styles = build_styles()
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        leftMargin=9.5 * mm,
        rightMargin=9.5 * mm,
        topMargin=7.5 * mm,
        bottomMargin=7.5 * mm,
        title="Ayush Panda Resume",
        author="Ayush Panda",
    )

    story = [
        Paragraph("Ayush Panda", styles["name"]),
        Paragraph(
            "Burla, Odisha | pandaayush25305@gmail.com | ayushdev-five.vercel.app | "
            "github.com/Ayush-Panda-design | linkedin.com/in/ayush-panda-a04280215",
            styles["contact"],
        ),
        Paragraph("PROFESSIONAL SUMMARY", styles["section"]),
        Paragraph(
            "5th-semester B.Tech CSE student at VSSUT (CGPA 8.27) who ships full-stack and AI products end-to-end. "
            "Built 4 live SaaS apps and advanced auth systems spanning OAuth 2.0/OIDC, RBAC, Zanzibar-style authorization, "
            "Redis rate limiting, Kafka event streaming, and observability. Open to software engineering internships.",
            styles["body"],
        ),
        Paragraph("TECHNICAL SKILLS", styles["section"]),
        Paragraph(
            "<b>Languages:</b> JavaScript, TypeScript, HTML, CSS, SQL<br/>"
            "<b>Frontend:</b> React, Next.js, Tailwind CSS, TanStack Router, Framer Motion<br/>"
            "<b>Backend:</b> Node.js, Express, tRPC, REST, Socket.io, Server-Sent Events (SSE)<br/>"
            "<b>Auth & Security:</b> OAuth 2.0, OpenID Connect (OIDC), PKCE, JWKS, JWT, RBAC, "
            "relationship-tuple authorization, rate limiting, distributed locks<br/>"
            "<b>Data:</b> PostgreSQL, MongoDB, Redis, Firebase, Drizzle ORM, Prisma, pgvector<br/>"
            "<b>Infra & Ops:</b> Docker, Docker Compose, Kafka, Inngest, Git, Vercel CI/CD, Render, "
            "OpenTelemetry, Winston, structured logging, health checks",
            styles["body"],
        ),
        Paragraph("PROJECTS", styles["section"]),
    ]

    story.extend(
        project_block(
            "ShipFlow AI",
            "Next.js, Prisma, PostgreSQL, Inngest, GitHub App, OpenRouter",
            "Live: shipflowai.in | GitHub: github.com/Ayush-Panda-design/ShipFlowAI",
            [
                "<b>Problem:</b> Product teams lose context between ideas, tickets, and pull requests. "
                "<b>Built</b> a 6-stage delivery workspace (idea to human-approved release) used to unify planning and shipping.",
                "Ran AI pull request reviews against approved requirements with blocking/non-blocking findings; "
                "offloaded 4+ background workflows (reviews, readiness, crons) to Inngest to keep the UI under 2s.",
                "Integrated GitHub App webhooks and BetterAuth (OAuth + email sessions); "
                "deployed with Vercel CI/CD on every push.",
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
            "Live: relvion-ai.vercel.app | GitHub: github.com/Ayush-Panda-design/Relvion-AI",
            [
                "<b>Problem:</b> Gmail and Calendar are split across tabs with slow search. "
                "<b>Built</b> a unified AI inbox without migrating user mail out of Google.",
                "Chose webhook-to-SSE over polling to push new mail in under 1s; "
                "used pgvector semantic search as a fallback after operator and cache hits.",
                "Shipped an MCP agent that drafts, sends, and schedules in one message with validated tool calls.",
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
            "Live: edinform.in | GitHub: github.com/Ayush-Panda-design/EdinForm11",
            [
                "<b>Problem:</b> Teams need Typeform-quality forms without enterprise pricing. "
                "<b>Built</b> a live SaaS form builder on a custom domain with analytics and limits.",
                "Enforced response caps and expiry server-side across 9 field types; "
                "added Redis-backed rate limiting (Upstash) with in-memory fallback for abuse protection.",
                "Shared Zod validators across a Turborepo monorepo (2 apps, 4 packages) with typed tRPC APIs; "
                "split deploy across Vercel and Render.",
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
            "Live: votora-client-jaam.vercel.app | GitHub: github.com/Ayush-Panda-design/Votora-Real-Time-Polling-Platform",
            [
                "<b>Problem:</b> Live events need synchronized polls, not static forms. "
                "<b>Built</b> realtime rooms with host dashboards and quiz integrity checks.",
                "Chose Socket.io room broadcasts over SSE because hosts and voters need bidirectional live sync; "
                "synced lobby timers across all clients in the same poll room.",
                "Secured cross-origin auth with JWT httpOnly cookies, Google OAuth, Helmet, CSRF guard, and API rate limits.",
            ],
            styles["bullet"],
            styles["subhead"],
            styles["links"],
        )
    )

    story.extend(
        project_block(
            "OIDC-Compatible Auth Microservice",
            "Node.js, Express, PostgreSQL, OpenTelemetry, Winston, Docker",
            "Production-grade curriculum project | OAuth 2.0 Authorization Code + PKCE + JWKS",
            [
                "<b>Problem:</b> Services need standards-based login instead of ad-hoc JWT logic. "
                "<b>Built</b> an OIDC-compatible auth service with Authorization Code flow, PKCE, and JWKS rotation.",
                "Validated issuer, audience, and token expiry on every request; "
                "added Winston structured logging, health endpoints, and OpenTelemetry traces for production debugging.",
                "Containerized the service with Docker Compose for repeatable local deploys and integration testing.",
            ],
            styles["bullet"],
            styles["subhead"],
            styles["links"],
        )
    )

    story.extend(
        project_block(
            "Zanzibar-Style Authorization System",
            "Node.js, PostgreSQL, TypeScript",
            "Curriculum production project | relationship-tuple authorization engine",
            [
                "<b>Problem:</b> RBAC breaks down for nested orgs and shared resources. "
                "<b>Modeled</b> permissions as relationship tuples with recursive graph traversal.",
                "Evaluated allow/deny across user, group, and resource hierarchies; "
                "compared results against RBAC baselines on multi-level access scenarios.",
                "Designed schema-first checks before API handlers to keep authorization logic auditable and testable.",
            ],
            styles["bullet"],
            styles["subhead"],
            styles["links"],
        )
    )

    story.extend(
        [
            Paragraph("EDUCATION", styles["section"]),
            Paragraph(
                "<b>Veer Surendra Sai University of Technology (VSSUT), Burla</b><br/>"
                "B.Tech in Computer Science and Engineering | 2024-2028 | 5th Semester | CGPA: 8.27 | Kendriya Vidyalaya",
                styles["body"],
            ),
            Paragraph("ENGINEERING PRACTICES", styles["section"]),
            bullet_list(
                [
                    "Applied Kafka in Live Location Tracker (github.com/Ayush-Panda-design/Live-Location-Tracker) "
                    "with 2 consumer groups to decouple realtime Socket.io broadcasts from MongoDB writes.",
                    "Validates APIs with Zod schemas, TypeScript strict mode, health checks, and structured logs before production deploys.",
                    "Debugged cross-origin auth, webhook retries, and rate-limit edge cases across 4 live apps on Vercel and Render.",
                    "Portfolio: ayushdev-five.vercel.app — 4 production products with case studies, live demos, and resume PDF download.",
                ],
                styles["bullet"],
            ),
            Spacer(1, 1),
        ]
    )

    doc.build(story)
    print(f"Generated resume PDF at: {OUTPUT_PATH}")

    import shutil

    shutil.copy2(OUTPUT_PATH, PUBLIC_OUTPUT_PATH)
    print(f"Copied resume PDF to: {PUBLIC_OUTPUT_PATH}")


if __name__ == "__main__":
    main()
