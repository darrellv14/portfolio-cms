import { z } from "zod";
import { ContactEmailTemplate } from "~/components/emails/ContactEmailTemplate";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { resend } from "~/server/api/resend";

const contactFormSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const contactRouter = createTRPCRouter({
  sendEmail: protectedProcedure
    .input(contactFormSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, email, image } = ctx.session.user;
      const { message } = input;

      if (!name || !email) {
        throw new Error("User name or email is missing.");
      }

      try {
        const { data, error } = await resend.emails.send({
          from: "Contact Form <noreply@darrellvalentino.com>",
          to: [env.ADMIN_EMAIL],
          subject: `New Portfolio Message from ${name}`,
          replyTo: email,
          react: ContactEmailTemplate({
            name,
            email,
            message,
            userImage: image,
          }),
        });

        if (error) {
          console.error("Resend error:", error);
          throw new Error(error.message || "Failed to send email.");
        }

        return { success: true, data };
      } catch (error) {
        console.error("Email sending error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        throw new Error(errorMessage);
      }
    }),
});
