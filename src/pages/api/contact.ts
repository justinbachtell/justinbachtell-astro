import type { APIRoute } from "astro";
import { Resend } from "resend";

// define the api route handler
export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_CONTACT_KEY);

  const payload = await request.formData();
  const name = payload.get("name");
  const email = payload.get("email");
  const message = payload.get("message");

  try {
    const data = await resend.emails.send({
      from: "no-reply@justinbachtell.com",
      to: ["support@justinbachtell.com"],
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    return new Response("Email sent successfully.");
  } catch (error) {
    console.error(error);

    return new Response("An error occurred. The message was not sent.");
  }
};
