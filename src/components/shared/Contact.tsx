import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 space-y-6 md:scroll-mt-28">
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          <h1 className="text-2xl font-bold 2xl:text-4xl">Get in Touch</h1>
          <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
            Have a project in mind, want to collaborate, or just want to say hi?
            Whether it&apos;s a rapid prototype, a production-ready app, or a UX
            refresh, I&apos;m happy to help. Share the problem you&apos;re
            solving and I&apos;ll respond with practical next steps. I&apos;ll
            get back to you soon.
          </p>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
