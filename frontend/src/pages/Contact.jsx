import { FaGithub } from "react-icons/fa6";

const Contact = () => (
  <section
    className="section"
    id="contact"
    style={{ textAlign: "center", margin: "2rem 0" }}
  >
    <h1
      style={{
        fontSize: "2rem",
        color: "#217dbb",
        marginBottom: "1rem",
        letterSpacing: "1.5px",
      }}
    >
      GET IN TOUCH
    </h1>
    <p style={{ marginBottom: "1.5rem", color: "#444" }}>
      I'm always open to discussing new projects, creative ideas, or
      opportunities to be part of your vision.
    </p>
    <div
      className="contact-links"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.2rem",
        flexWrap: "wrap",
      }}
    >
      <a
        href="mailto:kumar.work.1574@outlook.com?subject=Contact%20from%20Portfolio"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#217dbb", fontWeight: 500, textDecoration: "none" }}
      >
        ✉️ kumar.work.1574@outlook.com
      </a>
      <a
        href="https://github.com/Utsoft7"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#217dbb", fontWeight: 500, textDecoration: "none" }}
      >
        <FaGithub style={{ verticalAlign: "middle", marginRight: 4 }} />
        GitHub
      </a>
    </div>
  </section>
);

export default Contact;
