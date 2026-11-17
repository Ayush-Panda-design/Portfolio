/** The page, in order. Used by the location chip and the active-section tracker. */
export type Scene = { id: string; label: string; sub: string; section: string };

export const SCENES: Scene[] = [
  { id: "home", label: "Home", sub: "Calton Hill, Edinburgh", section: "top" },
  { id: "royal", label: "Journey", sub: "How I got here", section: "journey" },
  { id: "victoria", label: "Work", sub: "Things I shipped", section: "work" },
  // { id: "princes", label: "Live", sub: "Real products", section: "live" }, // hidden with the Live section
  { id: "calton", label: "Stack", sub: "What I build with", section: "stack" },
  { id: "arthur", label: "Process", sub: "Idea to deploy", section: "process" },
  { id: "github", label: "GitHub", sub: "Activity & open source", section: "github" },
  { id: "recognition", label: "Recognition", sub: "Along the way", section: "recognition" },
  { id: "dean", label: "About", sub: "The person behind it", section: "about" },
  { id: "cafe", label: "Notes", sub: "From the build", section: "life" },
  { id: "forth", label: "Contact", sub: "Let's talk", section: "contact" },
];
