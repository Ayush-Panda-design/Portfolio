import { FileDownIcon as FileDown } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { MovingBorder } from "./effects/MovingBorder";
import { TextGenerate } from "./effects/TextGenerate";

export const RESUME_PDF_PATH = "/resume/Ayush_Panda_ATS_Resume.pdf";
export const RESUME_DOWNLOAD_NAME = "Ayush_Panda_ATS_Resume.pdf";

export function Resume() {
  return (
    <section id="resume" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-16">
      <SectionLabel num="02.">Resume</SectionLabel>
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
        <TextGenerate words="One click for recruiters." />
      </h2>
      <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">
        ATS-friendly one-page resume — full-stack projects, education, skills, hackathon result, and
        certifications. PDF opens in a new tab or downloads directly.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <MovingBorder>
          <a
            href={RESUME_PDF_PATH}
            download={RESUME_DOWNLOAD_NAME}
            className="inline-flex items-center gap-3 rounded-full bg-bg px-6 py-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface"
          >
            <FileDown size={16} className="text-accent" />
            Download resume (PDF)
          </a>
        </MovingBorder>
        <a
          href={RESUME_PDF_PATH}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-border-line px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
        >
          View in browser
        </a>
      </div>
    </section>
  );
}
