import { useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  Command,
  Layers3,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";

type ProjectCategory = "Interface" | "Identity" | "Interaction";

type Project = {
  number: string;
  title: string;
  description: string;
  category: ProjectCategory;
  className: string;
  label: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "A slower kind of store",
    description: "A considered storefront for objects made to be kept.",
    category: "Interface",
    className: "project-art--store",
    label: "GOOD THINGS, MADE WELL",
  },
  {
    number: "02",
    title: "Wild, in good company",
    description: "A visual identity with a little wilderness in it.",
    category: "Identity",
    className: "project-art--wild",
    label: "FIELD NOTES / NO. 08",
  },
  {
    number: "03",
    title: "Small moves, big feeling",
    description: "A motion study in rhythm, weight, and delightful detail.",
    category: "Interaction",
    className: "project-art--motion",
    label: "MOVE WITH INTENT",
  },
  {
    number: "04",
    title: "Room to think",
    description: "A calm, tactile toolkit for making ideas take shape.",
    category: "Interface",
    className: "project-art--studio",
    label: "A BETTER WAY TO BEGIN",
  },
];

const filters = ["All work", "Interface", "Identity", "Interaction"] as const;
type ProjectFilter = (typeof filters)[number];

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="Jacofac home">
      <span className="brand-mark" aria-hidden="true">
        <Asterisk size={23} strokeWidth={2.2} />
      </span>
      <span>jacofac</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#resume" onClick={closeMenu}>Experience</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="A sculptural green flower in a ceramic vase" role="img">
      <div className="art-glow" />
      <div className="art-sun" />
      <div className="art-stem art-stem--one" />
      <div className="art-stem art-stem--two" />
      <div className="art-leaf art-leaf--one" />
      <div className="art-leaf art-leaf--two" />
      <div className="art-leaf art-leaf--three" />
      <div className="art-flower">
        {Array.from({ length: 8 }, (_, index) => (
          <span className="flower-petal" key={index} style={{ "--petal": index } as CSSProperties} />
        ))}
        <span className="flower-center" />
      </div>
      <div className="art-vase">
        <span className="vase-neck" />
        <span className="vase-body" />
        <span className="vase-shine" />
      </div>
      <span className="art-caption">a little room to grow</span>
      <span className="art-stamp"><Sparkles size={16} /> CRAFTED WITH CARE</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-pad" id="home">
      <div className="hero-inner wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> INDEPENDENT DIGITAL PRACTICE</p>
          <h1>Make it work.<br /><em>Make it feel.</em></h1>
          <p className="hero-intro">
            Jacofac is a small, independent practice building thoughtful digital
            experiences—with a soft spot for the details that make them memorable.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">
              Explore the work <ArrowDownRight size={17} />
            </a>
            <a className="text-link" href="#about">A little about me <ArrowRight size={15} /></a>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            <span>DESIGN / DEVELOPMENT / DIGITAL CRAFT</span>
          </div>
        </div>
        <HeroArtwork />
      </div>
      <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
        <span>SCROLL TO WANDER</span><ArrowDown size={15} />
      </a>
    </section>
  );
}

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className={`project-art ${project.className}`}>
      <div className="art-topline">
        <span>J / F</span>
        <span>{project.label}</span>
        <span>↗</span>
      </div>
      {project.className === "project-art--store" && (
        <div className="store-scene">
          <div className="store-copy"><span>Objects for</span><br /><em>every day.</em></div>
          <div className="store-orb" />
          <div className="store-vessel"><i /></div>
          <div className="store-base" />
          <span className="store-index">01 — 04</span>
        </div>
      )}
      {project.className === "project-art--wild" && (
        <div className="wild-scene">
          <div className="wild-ring wild-ring--outer" />
          <div className="wild-ring wild-ring--inner" />
          <div className="wild-sun" />
          <div className="wild-horizon" />
          <div className="wild-word">WILD<br /><em>FORM</em></div>
          <span className="wild-detail">GROW A LITTLE WILD</span>
        </div>
      )}
      {project.className === "project-art--motion" && (
        <div className="motion-scene">
          <div className="motion-orbit motion-orbit--one" />
          <div className="motion-orbit motion-orbit--two" />
          <div className="motion-orbit motion-orbit--three" />
          <div className="motion-core"><MoveUpRight size={32} /></div>
          <span className="motion-word">PLAY<br /><em>IS A</em><br />PRACTICE</span>
          <span className="motion-dot" />
        </div>
      )}
      {project.className === "project-art--studio" && (
        <div className="studio-scene">
          <div className="studio-card studio-card--back"><span>01</span><i /></div>
          <div className="studio-card studio-card--middle"><span>02</span><i /></div>
          <div className="studio-card studio-card--front">
            <Command size={23} />
            <span>START WITH<br /><em>A QUESTION.</em></span>
            <small>SPACE TO MAKE A THING</small>
          </div>
          <span className="studio-spark">✳</span>
        </div>
      )}
      <span className="project-index">0{project.number}</span>
    </div>
  );
}

function Work() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All work");
  const visibleProjects = projects.filter(
    (project) => activeFilter === "All work" || project.category === activeFilter,
  );

  return (
    <section className="work section-pad" id="work">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>01</span> THE GOOD STUFF</p>
            <h2>Made with <em>intention.</em></h2>
          </div>
          <p className="section-aside">A few directions, disciplines, and details<br />from the digital garden.</p>
        </div>
        <div className="work-toolbar">
          <span className="work-count">{String(visibleProjects.length).padStart(2, "0")} SELECTED PIECES</span>
          <div className="filter-list" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                className={`filter-button${activeFilter === filter ? " is-active" : ""}`}
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.number}>
              <a className="project-link" href="#contact" aria-label={`Discuss ${project.title}`}>
                <ProjectArtwork project={project} />
                <div className="project-info">
                  <div>
                    <span className="project-category">{project.category} <span>·</span> Concept study</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="project-arrow"><ArrowUpRight size={18} /></span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className="work-footnote"><span className="footnote-star">✳</span> CONCEPTS, CRAFT, AND A HEALTHY AMOUNT OF CURIOSITY.</div>
      </div>
    </section>
  );
}

function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<"Shape" | "Tone" | "Motion">("Shape");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="lab section-pad">
      <div className="wrap lab-inner">
        <div className="lab-copy">
          <p className="eyebrow"><span>02</span> A TINY PLAYGROUND</p>
          <h2>Good work has<br /><em>a pulse.</em></h2>
          <p>Interfaces should reward a little curiosity. Here&apos;s a small interaction study—go ahead, give it a nudge.</p>
          <div className="lab-note"><Layers3 size={15} /> A STUDY IN INTERFACE FEEDBACK</div>
        </div>
        <div className="lab-card">
          <div className="lab-card-head">
            <span><span className="live-dot" /> LIVE STUDY <small> / 001</small></span>
            <span className="lab-card-mark">J✳F</span>
          </div>
          <div className={`lab-stage lab-stage--${activeTab.toLowerCase()}${isPlaying ? " is-playing" : ""}`}>
            <span className="stage-orbit stage-orbit--one" />
            <span className="stage-orbit stage-orbit--two" />
            <button
              type="button"
              className="stage-object"
              aria-label={isPlaying ? "Pause animation" : "Play animation"}
              aria-pressed={isPlaying}
              onClick={() => setIsPlaying((playing) => !playing)}
            >
              <span className="stage-object-inner"><Asterisk size={38} strokeWidth={1.5} /></span>
            </button>
            <span className="stage-caption">{isPlaying ? "IN MOTION / TAP TO PAUSE" : "TAP THE OBJECT"}</span>
          </div>
          <div className="lab-controls">
            <div className="lab-tabs" role="group" aria-label="Change interaction study">
              {(["Shape", "Tone", "Motion"] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={activeTab === tab ? "is-selected" : ""}
                  aria-pressed={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="lab-instruction"><span>01</span> PICK A FEELING</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="wrap about-grid">
        <div className="about-title">
          <p className="eyebrow"><span>03</span> THE PERSON BEHIND THE PIXELS</p>
          <h2>Curious by<br />nature. <em>Careful<br />by design.</em></h2>
        </div>
        <div className="about-content">
          <div className="about-quote"><span>“</span><p>The best digital things feel simple on the surface—and considered all the way down.</p></div>
          <p className="about-body">
            Jacofac is an independent digital practice for people with something
            worth putting into the world. The work moves between design and
            development, with equal care for the first impression and the tiny
            moments that come after.
          </p>
          <div className="skill-list">
            <div><span>01</span><span>Digital direction</span><span>CLARITY & CHARACTER</span></div>
            <div><span>02</span><span>Interface design</span><span>USEFUL, THEN UNEXPECTED</span></div>
            <div><span>03</span><span>Front-end craft</span><span>BUILT TO FEEL RIGHT</span></div>
            <div><span>04</span><span>Motion & detail</span><span>JUST ENOUGH MAGIC</span></div>
          </div>
          <a className="text-link about-link" href="#contact">Have a good one in mind? <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="resume section-pad" id="resume">
      <div className="wrap resume-grid">
        <div className="resume-intro">
          <p className="eyebrow"><span>04</span> HOW THE WORK COMES TOGETHER</p>
          <h2>Thought through.<br /><em>Built to last.</em></h2>
          <p>A compact view of the practice: the disciplines, principles, and tools that shape each project.</p>
          <a className="button button--outline" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
        </div>
        <div className="resume-list">
          <article className="resume-item">
            <span className="resume-number">01 / STRATEGY</span>
            <div><h3>Start with the why</h3><p>Find the sharpest version of the problem before reaching for a screen.</p></div>
            <ArrowDownRight size={18} />
          </article>
          <article className="resume-item">
            <span className="resume-number">02 / DESIGN</span>
            <div><h3>Give it a point of view</h3><p>Build a visual language with enough character to be remembered and enough restraint to stay useful.</p></div>
            <ArrowDownRight size={18} />
          </article>
          <article className="resume-item">
            <span className="resume-number">03 / DEVELOPMENT</span>
            <div><h3>Make the details real</h3><p>Bring design and engineering together in responsive, accessible, carefully tuned interfaces.</p></div>
            <ArrowDownRight size={18} />
          </article>
          <article className="resume-item">
            <span className="resume-number">04 / PARTNERSHIP</span>
            <div><h3>Keep the good things growing</h3><p>Leave room for iteration, clear handoff, and a site that can evolve with the people behind it.</p></div>
            <ArrowDownRight size={18} />
          </article>
          <div className="toolkit"><span>IN THE TOOLKIT</span><div><span>React</span><span>TypeScript</span><span>CSS</span><span>Prototyping</span><span>Motion</span></div></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFeedback("");

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const subject = encodeURIComponent(`A note from ${name.trim()}`);
    const body = encodeURIComponent(`From: ${name.trim()} (${email.trim()})\n\n${message.trim()}`);
    try {
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      setFeedback("Your email app should open with your note ready. Add a recipient and send it when you're happy.");
    } catch {
      setError("We couldn't open your email app. Please try again or copy your message before leaving this page.");
    }
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <p className="eyebrow"><span>05</span> THE NEXT GOOD THING</p>
          <h2>Have a little<br /><em>something?</em></h2>
          <p>Tell me what you&apos;re thinking. Big brief, tiny spark, half-formed idea—it&apos;s all a good place to start.</p>
          <div className="contact-aside"><span className="contact-aside-icon"><Asterisk size={21} /></span><span>NO DECK REQUIRED.<br />JUST SAY HELLO.</span></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-topline"><span>LET&apos;S MAKE SOMETHING GOOD</span><span>✳</span></div>
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="What should I call you?"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={2}
          />
          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@somewhere.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="contact-message">A little about it</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="The more context, the better—but a first thought is perfect."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={10}
            rows={3}
          />
          {error && <p className="form-feedback form-feedback--error" role="alert">{error}</p>}
          {feedback && <p className="form-feedback" role="status"><Check size={16} /> {feedback}</p>}
          <button className="button button--primary form-submit" type="submit">
            Prepare a note <ArrowUpRight size={17} />
          </button>
          <p className="form-privacy">Your details are only used to prepare this email draft.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <Logo />
        <p>Good things take<br /><em>a little thought.</em></p>
        <a className="back-top" href="#home"><span>BACK TO THE TOP</span><ArrowUpRight size={15} /></a>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} JACOFAC / INDEPENDENT BY NATURE</span>
        <span>DESIGNED WITH CARE <span className="footer-heart">✳</span></span>
        <a href="#contact">SAY HELLO <ArrowUpRight size={12} /></a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <InteractiveLab />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
