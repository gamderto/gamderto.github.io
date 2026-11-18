import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Layers3, Map } from "lucide-react";
import { NavLink } from "react-router-dom";
import IntroSequence from "../components/IntroSequence";
import PageFrame from "../components/PageFrame";

const overviewCards = [
  { index: "01", title: "Curriculum vitae", detail: "Study, practice & technical stack", to: "/cv", icon: Braces },
  { index: "02", title: "Projects", detail: "Systems, data & spatial tooling", to: "/projects", icon: Layers3 },
  { index: "03", title: "Expeditions", detail: "Ancient Indonesia, read through place", to: "/expeditions", icon: Map },
];

const focusItems = [
  { label: "Systems", detail: "C / C++ / Java", value: "01" },
  { label: "Data", detail: "SQL / schema design", value: "02" },
  { label: "Web", detail: "Interfaces / application logic", value: "03" },
  { label: "Field", detail: "Geo-infrastructure / Corageo", value: "04" },
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
            <p className="eyebrow"><span className="status-dot" /> TECHNICAL STUDENT / SOFTWARE DEVELOPER</p>
            <h1>Building systems<br />that <em>make sense</em><br />in the real world.</h1>
            <p className="hero-lede">I’m a technical student and software developer in Slovakia, working across systems programming, relational data, web interfaces and geospatial infrastructure.</p>
            <div className="hero-meta"><span><Map size={14} /> Spišská Nová Ves, Slovakia</span><span>48°56′ N / 20°34′ E</span></div>
            <div className="hero-actions">
              <NavLink className="button button--primary" to="/projects">Explore engineering work <ArrowDownRight size={16} /></NavLink>
              <NavLink className="text-link" to="/cv">View the CV <ArrowRight size={15} /></NavLink>
            </div>
          </div>
          <div className="hero-graphic" aria-label="Schematic map with a connected coordinate grid" role="img">
            <div className="graphic-top"><span>FIELD / 48.9445° N</span><span>MAP REF. 001</span></div>
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
            <span className="graphic-caption">TERRAIN / DATA / CONNECTION</span>
          </div>
          <span className="hero-index">PORTFOLIO — 2026 / 01</span>
        </section>

        <section className="overview-section">
          <div className="wrap">
            <div className="section-intro">
              <div><p className="eyebrow"><span>01</span> START HERE</p><h2>Three ways into<br /><em>the work.</em></h2></div>
              <p>Technical learning is most useful when it meets a real problem. Choose a route to see how I approach it.</p>
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
              <p className="eyebrow"><span>02</span> AT A GLANCE</p>
              <h2>From the low<br />level to the <em>landscape.</em></h2>
              <p>A broad technical education, connected to practical geo-infrastructure work at Corageo.</p>
            </div>
            <div className="focus-console">
              <div className="console-header"><span><i /> FOCUS MATRIX</span><span>SELECT A DOMAIN</span></div>
              <div className="focus-options" role="tablist" aria-label="Technical focus areas">
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
                <span>ACTIVE DOMAIN / {focusItems[focusIndex].value}</span>
                <strong>{focusItems[focusIndex].detail}</strong>
                <p>{[
                  "Building confidence with compiled languages, explicit data structures and algorithmic foundations.",
                  "Designing tables and queries that keep structured information consistent and useful.",
                  "Connecting clear responsive interfaces with the logic and data behind them.",
                  "Applying technical web and data skills to spatial workflows and infrastructure support.",
                ][focusIndex]}</p>
              </div>
              <div className="console-foot"><span>FOCUS AREAS 04</span><span>LIVE / INTERACTIVE</span></div>
            </div>
          </div>
        </section>
        <section className="bio-section">
          <div className="wrap bio-grid">
            <div><p className="eyebrow"><span>03</span> ABOUT / PRACTICE</p><h2>Technical by training.<br /><em>Grounded in place.</em></h2></div>
            <div className="bio-copy">
              <p>I’m studying technical systems in Spišská Nová Ves while building practical experience in software and geospatial infrastructure. At Corageo, spatial data and technical web support connect classroom ideas to real operational workflows.</p>
              <p>The through-line is dependable structure: programs that handle data carefully, interfaces that make it easier to inspect, and geographic context that keeps the system connected to the world it represents.</p>
              <NavLink className="text-link" to="/cv">Education and experience <ArrowRight size={15} /></NavLink>
            </div>
          </div>
        </section>
        <section className="home-outro wrap">
          <span className="eyebrow">NEXT FIELD NOTE</span>
          <NavLink to="/expeditions">Read the landscape <ArrowRight size={17} /></NavLink>
          <p>Ancient Indonesian architecture, geography and the engineering choices that tie them together.</p>
        </section>
      </PageFrame>
      <AnimatePresence>{introVisible && <IntroSequence onFinish={finishIntro} />}</AnimatePresence>
    </>
  );
}

