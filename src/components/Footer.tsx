import { useState, type FormEvent } from "react";
import { ArrowUpRight, Compass } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigation } from "../navigation";

export default function Footer() {
  const [contactStatus, setContactStatus] = useState("");

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setContactStatus("Your email app should open with a draft. Add the recipient and send when ready.");
  }

  return (
    <footer className="site-footer">
      <section className="footer-contact wrap">
        <div className="footer-contact-copy">
          <p className="eyebrow"><span>OPEN CHANNEL</span> CONTACT</p>
          <h2>Start with a<br /><em>clear question.</em></h2>
          <p>For project conversations, technical questions or a note about spatial systems, prepare a message here.</p>
        </div>
        <form className="footer-contact-form" onSubmit={prepareEmail}>
          <div className="contact-fields">
            <label>Name<input name="name" autoComplete="name" minLength={2} required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <label>Message<textarea name="message" rows={3} minLength={10} required /></label>
          <div className="contact-submit-row">
            <span className="contact-status" role="status">{contactStatus}</span>
            <button className="button button--primary" type="submit">Prepare email <ArrowUpRight size={15} /></button>
          </div>
        </form>
      </section>
      <div className="wrap footer-main">
        <div>
          <span className="eyebrow">JACOFAC / FIELD NOTES</span>
          <p>Software, spatial systems<br />and the places around them.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navigation.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>{label}</NavLink>
          ))}
        </nav>
        <div className="footer-coordinate"><Compass size={17} /> 48°56′ N / 20°34′ E</div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} J. F. / BUILT IN SLOVAKIA</span>
        <span>FIELD NOTES · TECHNICAL PRACTICE</span>
        <NavLink to="/cv">CV <ArrowUpRight size={13} /></NavLink>
      </div>
    </footer>
  );
}

