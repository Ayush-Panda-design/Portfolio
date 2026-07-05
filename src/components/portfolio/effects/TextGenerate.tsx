import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerate({
  words,
  className,
  delay = 0,
}: {
  words: string;
  className?: string;
  delay?: number;
}) {
  const parts = words.split(" ");

  return (
    <span className={cn(className)}>
      {parts.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="mr-[0.28em] inline"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
