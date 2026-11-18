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
    const subject = encodeURIComponent(`Správa z portfólia od ${name}`);
    const body = encodeURIComponent(`Od: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setContactStatus("V e-mailovej aplikácii by sa mal otvoriť koncept. Doplňte adresáta a odošlite ho.");
  }

  return (
    <footer className="site-footer">
      <section className="footer-contact wrap">
        <div className="footer-contact-copy">
          <p className="eyebrow"><span>OTVORENÝ KANÁL</span> KONTAKT</p>
          <h2>Začnime<br /><em>konkrétnou otázkou.</em></h2>
          <p>Ak sa chcete porozprávať o projekte, technickej téme alebo priestorových systémoch, pripravte správu cez tento formulár.</p>
        </div>
        <form className="footer-contact-form" onSubmit={prepareEmail}>
          <div className="contact-fields">
            <label>Meno<input name="name" autoComplete="name" minLength={2} required /></label>
            <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <label>Správa<textarea name="message" rows={3} minLength={10} required /></label>
          <div className="contact-submit-row">
            <span className="contact-status" role="status">{contactStatus}</span>
            <button className="button button--primary" type="submit">Pripraviť e-mail <ArrowUpRight size={15} /></button>
          </div>
        </form>
      </section>
      <div className="wrap footer-main">
        <div>
          <span className="eyebrow">MATTIÁS PLEŠ / ZÁPISKY Z TERÉNU</span>
          <p>Softvér, priestorové systémy<br />a svet, v ktorom fungujú.</p>
        </div>
        <nav className="footer-nav" aria-label="Navigácia v pätičke">
          {navigation.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>{label}</NavLink>
          ))}
        </nav>
        <div className="footer-coordinate"><Compass size={17} /> 48°56′ N / 20°34′ E</div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Mattiás Pleš / TVORÍM NA SLOVENSKU</span>
        <span>ZÁPISKY Z TERÉNU · TECHNICKÁ PRAX</span>
        <NavLink to="/cv">Životopis <ArrowUpRight size={13} /></NavLink>
      </div>
    </footer>
  );
}

