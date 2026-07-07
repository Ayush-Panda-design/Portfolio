import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const chatSchema = z.object({
  projectId: z.string(),
  message: z.string().min(1).max(2000),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .max(12)
    .optional(),
});

export const askProjectAgent = createServerFn({ method: "POST" })
  .inputValidator(chatSchema)
  .handler(async ({ data }) => {
    const { runProjectAgent } = await import("./project-agent.server");
    return runProjectAgent(data);
  });
