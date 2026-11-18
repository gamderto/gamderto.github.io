import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Layers3, Map } from "lucide-react";
import { NavLink } from "react-router-dom";
import IntroSequence from "../components/IntroSequence";
import PageFrame from "../components/PageFrame";

const overviewCards = [
  { index: "01", title: "Životopis", detail: "Štúdium, prax a technológie", to: "/cv", icon: Braces },
  { index: "02", title: "Projekty", detail: "Systémy, dáta a priestorové nástroje", to: "/projects", icon: Layers3 },
  { index: "03", title: "Expedície", detail: "Staroveká Indonézia v kontexte krajiny", to: "/expeditions", icon: Map },
];

const focusItems = [
  { label: "Systémy", detail: "C / C++ / Java", value: "01" },
  { label: "Dáta", detail: "SQL / návrh databázovej schémy", value: "02" },
  { label: "Web", detail: "Rozhrania / aplikačná logika", value: "03" },
  { label: "Terén", detail: "Geoinfraštruktúra / Corageo", value: "04" },
];

export default function HomePage() {
  const [introVisible, setIntroVisible] = useState(() => (
    (window.location.hash === "" || window.location.hash === "#/") && !sessionStorage.getItem("portfolio-intro-seen")
  ));
  const [focusIndex, setFocusIndex] = useState(0);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("portfolio-intro-seen", "true");
    setIntroVisible(false);
  }, []);

  return (
    <>
      <PageFrame>
        <section className="home-hero wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> ŠTUDENT TECHNICKÉHO ODBORU / VÝVOJÁR SOFTVÉRU</p>
            <h1>Tvorím systémy,<br />ktoré <em>dávajú zmysel</em><br />v skutočnom svete.</h1>
            <p className="hero-lede">Som študent technického odboru a vývojár zo Slovenska. Venujem sa systémovému programovaniu, relačným databázam, webovým rozhraniam a geoinfraštruktúre.</p>
            <div className="hero-meta"><span><Map size={14} /> Spišská Nová Ves, Slovensko</span><span>48°56′ N / 20°34′ E</span></div>
            <div className="hero-actions">
              <NavLink className="button button--primary" to="/projects">Pozrieť technické projekty <ArrowDownRight size={16} /></NavLink>
              <NavLink className="text-link" to="/cv">Zobraziť životopis <ArrowRight size={15} /></NavLink>
            </div>
          </div>
          <div className="hero-graphic" aria-label="Schematická mapa s prepojenou súradnicovou sieťou" role="img">
            <div className="graphic-top"><span>TERÉN / 48.9445° N</span><span>MAPOVÝ BOD 001</span></div>
            <svg className="contour-map" viewBox="0 0 640 520" aria-hidden="true">
              <path d="M35 162c70-82 155-57 218-98s151-30 202 20 105 53 150 35" />
              <path d="M13 203c70-82 155-57 218-98s151-30 202 20 105 53 150 35" />
              <path d="M-9 244c70-82 155-57 218-98s151-30 202 20 105 53 150 35" />
              <path d="M-20 305c92-35 142-78 222-62s149 57 222 16 111-25 168 5" />
              <path d="M-5 349c92-35 142-78 222-62s149 57 222 16 111-25 168 5" />
              <path d="M18 399c92-35 142-78 222-62s149 57 222 16 111-25 168 5" />
              <path d="M174 5c33 78 13 132 49 185s18 107 52 159 56 94 46 165" />
              <path d="M245 5c33 78 13 132 49 185s18 107 52 159 56 94 46 165" />
              <path d="M317 5c33 78 13 132 49 185s18 107 52 159 56 94 46 165" />
            </svg>
            <div className="graphic-crosshair"><span /><i /></div>
            <div className="graphic-coordinate"><span>SVK / 01</span><strong>48.9445° N</strong><strong>20.5615° E</strong></div>
            <span className="graphic-caption">TERÉN / DÁTA / SÚVISLOSTI</span>
          </div>
          <span className="hero-index">PORTFOLIO — 2026 / 01</span>
        </section>

        <section className="overview-section">
          <div className="wrap">
            <div className="section-intro">
              <div><p className="eyebrow"><span>01</span> ZAČNITE TU</p><h2>Tri cesty<br /><em>k mojej práci.</em></h2></div>
              <p>Technické poznatky sú najprínosnejšie, keď pomáhajú riešiť skutočný problém. Vyberte si oblasť a pozrite sa, ako k nej pristupujem.</p>
            </div>
            <div className="overview-grid">
              {overviewCards.map(({ index, title, detail, to, icon: Icon }) => (
                <NavLink className="overview-card" to={to} key={to}>
                  <span className="card-index">{index} / 03</span>
                  <span className="overview-icon"><Icon size={22} strokeWidth={1.6} /></span>
                  <span className="overview-card-copy"><strong>{title}</strong><small>{detail}</small></span>
                  <ArrowUpRight className="card-arrow" size={18} />
                </NavLink>
              ))}
            </div>
          </div>
        </section>

        <section className="focus-section">
          <div className="wrap focus-layout">
            <div className="focus-heading">
              <p className="eyebrow"><span>02</span> PREHĽAD</p>
              <h2>Od nízkoúrovňového<br />kódu až po <em>krajinu.</em></h2>
              <p>Široké technické vzdelávanie prepájam s praktickou prácou v oblasti geoinfraštruktúry v spoločnosti Corageo.</p>
            </div>
            <div className="focus-console">
              <div className="console-header"><span><i /> OBLASTI ZÁUJMU</span><span>VYBERTE OBLASŤ</span></div>
              <div className="focus-options" role="tablist" aria-label="Oblasti technického zamerania">
                {focusItems.map((item, index) => (
                  <button
                    className={focusIndex === index ? "is-selected" : ""}
                    key={item.value}
                    type="button"
                    role="tab"
                    aria-selected={focusIndex === index}
                    onClick={() => setFocusIndex(index)}
                  >
                    <span>{item.value}</span><strong>{item.label}</strong><ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
              <div className="focus-result" role="tabpanel">
                <span>VYBRANÁ OBLASŤ / {focusItems[focusIndex].value}</span>
                <strong>{focusItems[focusIndex].detail}</strong>
                <p>{[
                  "Osvojujem si kompilované jazyky, prácu s dátovými štruktúrami a základy algoritmického myslenia.",
                  "Navrhujem tabuľky a dopyty tak, aby štruktúrované informácie zostali konzistentné a užitočné.",
                  "Prepájam prehľadné responzívne rozhrania s aplikačnou logikou a dátami, ktoré ich poháňajú.",
                  "Využívam webové a dátové zručnosti pri práci s priestorovými údajmi a technickou infraštruktúrou.",
                ][focusIndex]}</p>
              </div>
              <div className="console-foot"><span>OBLASTI ZÁUJMU 04</span><span>ŽIVÉ / INTERAKTÍVNE</span></div>
            </div>
          </div>
        </section>
        <section className="bio-section">
          <div className="wrap bio-grid">
            <div><p className="eyebrow"><span>03</span> O MNE / PRAX</p><h2>Technické vzdelanie.<br /><em>Pevné spojenie s miestom.</em></h2></div>
            <div className="bio-copy">
              <p>V Spišskej Novej Vsi študujem technické odbory a zároveň získavam praktické skúsenosti s vývojom softvéru a geoinfraštruktúrou. V spoločnosti Corageo prepájam priestorové dáta a technickú podporu webových riešení s reálnymi pracovnými postupmi.</p>
              <p>Spoločným menovateľom je spoľahlivá štruktúra: programy, ktoré zodpovedne spracúvajú dáta, rozhrania uľahčujúce ich kontrolu a geografický kontext, ktorý systém prepája so svetom, ktorý opisuje.</p>
              <NavLink className="text-link" to="/cv">Vzdelanie a skúsenosti <ArrowRight size={15} /></NavLink>
            </div>
          </div>
        </section>
        <section className="home-outro wrap">
          <span className="eyebrow">ĎALŠÍ ZÁPISOK Z TERÉNU</span>
          <NavLink to="/expeditions">Spoznajte krajinu <ArrowRight size={17} /></NavLink>
          <p>Staroveká indonézska architektúra, geografia a technické riešenia, ktoré ich prepájajú.</p>
        </section>
      </PageFrame>
      <AnimatePresence>{introVisible && <IntroSequence onFinish={finishIntro} />}</AnimatePresence>
    </>
  );
}

