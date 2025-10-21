import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  message: string;
  userImage: string | null | undefined;
}

const defaultAvatarUrl = "https://placehold.co/48x48/8b5cf6/FFFFFF?text=??";

export const ContactEmailTemplate = ({
  name,
  email,
  message,
  userImage,
}: ContactEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>New message from your portfolio from {name}!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={heading}>You&apos;ve got a new message! ✨</Heading>
        </Section>
        <Section style={messageSection}>
          <Text style={paragraph}>
            Here are the details from the submission on your portfolio:
          </Text>
          <Hr style={hr} />
          <Section style={detailsSection}>
            <Img
              src={userImage ?? defaultAvatarUrl}
              width="48"
              height="48"
              alt="User Avatar"
              style={{ borderRadius: "50%" }}
            />
            <div style={{ marginLeft: "20px" }}>
              <Text style={details}>
                <strong>From:</strong> {name}
              </Text>
              <Text style={details}>
                <strong>Email:</strong>{" "}
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>
            </div>
          </Section>
        </Section>

        <Section style={messageBox}>
          <Text style={messageHeader}>Their Message:</Text>
          <Text style={messageText}>&quot;{message}&quot;</Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Sent via your personal portfolio at darrellvalentino.com
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// --- STYLES ---

const main = {
  backgroundColor: "#0f172a",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const header = {
  padding: "0 24px",
  background: "linear-gradient(to right, #4c1d95, #8b5cf6)",
  borderRadius: "12px 12px 0 0",
};

const heading = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  padding: "24px 0",
};

const messageSection = {
  padding: "24px",
  backgroundColor: "#1e293b",
};

const paragraph = {
  color: "#cbd5e1",
  fontSize: "16px",
  lineHeight: "26px",
};

const detailsSection = {
  display: "flex",
  alignItems: "center",
  paddingTop: "16px",
};

const details = {
  color: "#f8fafc",
  fontSize: "16px",
  margin: "0 0 8px 0",
};

const link = {
  color: "#a78bfa",
  textDecoration: "underline",
};

const messageBox = {
  backgroundColor: "#1e293b",
  padding: "0 24px 24px 24px",
  borderTop: "1px solid #334155",
};

const messageHeader = {
  color: "#94a3b8",
  fontSize: "14px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  marginBottom: "16px",
};

const messageText = {
  ...paragraph,
  color: "#f1f5f9",
  fontStyle: "italic",
};

const hr = {
  borderColor: "#334155",
  margin: "20px 0",
};

const footer = {
  backgroundColor: "#1e293b",
  borderRadius: "0 0 12px 12px",
  padding: "16px",
};

const footerText = {
  color: "#64748b",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "0",
};
