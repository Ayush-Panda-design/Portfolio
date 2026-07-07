import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const attachmentSchema = z.object({
  name: z.string(),
  mimeType: z.string(),
  data: z.string().max(7_000_000),
});

const chatSchema = z
  .object({
    projectId: z.string(),
    message: z.string().max(2000),
    history: z
      .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
      .max(12)
      .optional(),
    attachments: z.array(attachmentSchema).max(4).optional(),
  })
  .refine((data) => data.message.trim().length > 0 || (data.attachments?.length ?? 0) > 0, {
    message: "Message or attachment required",
  });

export const askProjectAgent = createServerFn({ method: "POST" })
  .inputValidator(chatSchema)
  .handler(async ({ data }) => {
    const { runProjectAgent } = await import("./project-agent.server");
    return runProjectAgent(data);
  });
