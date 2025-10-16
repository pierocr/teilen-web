import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export type WaitlistJoinProps = {
  email: string;
  baseUrl: string;          // https://teilen.cl o http://localhost:3000
  createdAtISO?: string;
  createdAtLabel?: string;
};

export default function WaitlistJoin({
  email,
  baseUrl,
  createdAtLabel,
}: WaitlistJoinProps) {
  const preheader = "Gracias por unirte a la lista de espera de Teilen.";
  const logoSrc = `${baseUrl}/logo_teilen.png`;
  const heroSrc = `${baseUrl}/hero.jpg`;

  return (
    <Html lang="es">
      <Head />
      <Preview>{preheader}</Preview>

      <Body style={styles.body}>
        <Container style={styles.card}>
          {/* Hero */}
          <Section style={styles.heroWrap}>
            <Img
              src={heroSrc}
              alt="Teilen - Comparte y administra gastos"
              width={560}
              height={180}
              style={styles.heroImg}
            />
          </Section>

          {/* Header: logo + texto */}
          <Section style={styles.header}>
            <table
              role="presentation"
              width="100%"
              style={{ borderCollapse: "collapse" }}
            >
              <tr>
                <td style={{ verticalAlign: "middle" }}>
                  <Img
                    src={logoSrc}
                    alt="Logo Teilen"
                    width={38}
                    height={38}
                    style={styles.logo}
                  />
                </td>
                <td style={{ paddingLeft: 10, verticalAlign: "middle" }}>
                  <Text style={styles.brandName}>Teilen</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Título y descripción */}
          <Section style={{ padding: "0 24px 8px" }}>
            <h1 style={styles.h1}>¡Bienvenido a la lista de espera!</h1>
            <Text style={styles.lead}>
              Gracias por registrarte para acceder anticipadamente a{" "}
              <strong>Teilen</strong>, la forma más simple y moderna de dividir,
              compartir y administrar tus gastos con tu gente.
            </Text>
          </Section>

          {/* Bloque de información */}
          <Section style={{ padding: "0 24px" }}>
            <div style={styles.infoBox}>
              <div style={styles.row}>
                <span style={styles.label}>Email</span>
                <a href={`mailto:${email}`} style={styles.valueLink}>
                  {email}
                </a>
              </div>

              {createdAtLabel && (
                <div style={styles.row}>
                  <span style={styles.label}>Fecha de registro</span>
                  <span style={styles.value}>{createdAtLabel}</span>
                </div>
              )}

              <div style={styles.rowLast}>
                <span style={styles.label}>Estado</span>
                <span style={styles.badge}>En lista de espera</span>
              </div>
            </div>
          </Section>

          {/* CTA */}
          <Section style={{ padding: "8px 24px 0" }}>
            <Button style={styles.cta} href="https://teilen.cl">
              Conoce más de Teilen
            </Button>
            <Text style={styles.helper}>
              ¿Te entusiasma? Invita a tus amigos; mientras más se sumen, antes
              liberaremos acceso.
            </Text>
          </Section>

          <Hr style={styles.hr} />

          {/* Legal + footer */}
          <Section style={{ padding: "0 24px 24px" }}>
            <Text style={styles.small}>
              Este es un correo transaccional. Si no reconoces este registro,
              escríbenos a{" "}
              <Link href="mailto:soporte@teilen.cl" style={styles.link}>
                soporte@teilen.cl
              </Link>
              .
            </Text>
            <Text style={styles.footer}>
              © {new Date().getFullYear()} Teilen · Santiago de Chile
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// 🎨 Estilos
const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f5f7f9",
    margin: 0,
    padding: "24px 12px",
    color: "#0f1720",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif',
  },
  card: {
    width: "100%",
    maxWidth: 560,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(1,154,87,0.15)",
    overflow: "hidden",
  },
  heroWrap: { padding: 0, lineHeight: 0 },
  heroImg: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  header: {
    padding: "16px 24px 0",
  },
  logo: {
    display: "block",
    border: "0",
    width: 38,
    height: 38,
  },
  brandName: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: "#019a57",
    letterSpacing: 0.2,
  },
  h1: {
    margin: "10px 0 8px",
    fontSize: 24,
    lineHeight: "30px",
    color: "#0f1720",
  },
  lead: {
    margin: "0 0 8px",
    fontSize: 15,
    lineHeight: "22px",
    color: "#334155",
  },
  infoBox: {
    border: "1px solid #e6eef0",
    borderRadius: 12,
    padding: 0,
    backgroundColor: "#f8fbfa",
    overflow: "hidden",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    borderBottom: "1px dashed #e6eef0",
  },
  rowLast: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
  },
  label: { color: "#64748b", fontSize: 13 },
  value: { color: "#0f1720", fontSize: 14, fontWeight: 600 },
  valueLink: {
    color: "#0f1720",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "underline",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    backgroundColor: "#e9f8f1",
    color: "#0a7e4a",
    fontSize: 12,
    fontWeight: 700,
    border: "1px solid #bdebd5",
  },
  cta: {
    display: "block",
    width: "100%",
    textAlign: "center" as const,
    backgroundColor: "#019a57",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
  },
  helper: { marginTop: 10, fontSize: 13, color: "#486174" },
  hr: { border: "none", borderTop: "1px solid #ecf2f3", margin: "20px 24px" },
  small: { fontSize: 12, color: "#708494", margin: 0 },
  link: { color: "#019a57", textDecoration: "underline" },
  footer: { marginTop: 10, fontSize: 12, color: "#93a4af" },
};
