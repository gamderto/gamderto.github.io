import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Braces, Printer } from "lucide-react";
import { NavLink } from "react-router-dom";
import PageFrame from "../components/PageFrame";

type SkillCategory = "Systémy a nízkoúrovňové programovanie" | "Backend a databázy" | "Web a dizajn" | "Geoinfraštruktúra";
type Skill = { name: string; category: SkillCategory; detail: string; level: string; tags: string[] };

const skillCategories = ["Všetko", "Systémy a nízkoúrovňové programovanie", "Backend a databázy", "Web a dizajn", "Geoinfraštruktúra"] as const;
const skills: Skill[] = [
  { name: "C a C++", category: "Systémy a nízkoúrovňové programovanie", detail: "Programovanie systémov so zreteľom na prácu s pamäťou, výkonovo náročnú logiku a hardvérové či algoritmické základy efektívneho softvéru.", level: "HLAVNÁ OBLASŤ ŠTÚDIA", tags: ["Pamäť", "Algoritmy", "Výkon"] },
  { name: "Java", category: "Systémy a nízkoúrovňové programovanie", detail: "Objektovo orientovaný návrh, štruktúrovaná tvorba aplikácií a multiplatformové nástroje pre dobre udržiavateľný softvér.", level: "APLIKÁCIE", tags: ["OOP", "Architektúra", "Nástroje"] },
  { name: "Python", category: "Backend a databázy", detail: "Tvorba skriptov, spracovanie dát, automatizácia a opakovateľné priestorové či analytické postupy.", level: "DÁTA / AUTOMATIZÁCIA", tags: ["Skriptovanie", "Spracovanie", "Automatizácia"] },
  { name: "PHP a MySQL", category: "Backend a databázy", detail: "Serverová logika webových aplikácií, návrh relačných schém, dopytovanie pomocou SQL a dynamické aplikácie pracujúce s dátami.", level: "WEB / DÁTA", tags: ["SQL", "Návrh schémy", "CRUD"] },
  { name: "React, TypeScript a Tailwind CSS", category: "Web a dizajn", detail: "Návrh responzívnej architektúry rozhraní, moderné štýlovanie pomocou Tailwind CSS a interaktívne používateľské rozhrania pre rôzne veľkosti obrazoviek.", level: "POUŽÍVATEĽSKÉ ROZHRANIA", tags: ["HTML / CSS", "Responzívne rozhrania", "Interaktivita"] },
  { name: "Geoinfraštruktúra", category: "Geoinfraštruktúra", detail: "Spracovanie priestorových dát, mapová infraštruktúra a systémy založené na súradniciach, ktoré prepájajú digitálne záznamy so skutočnými miestami.", level: "TERÉN / DÁTA", tags: ["Priestorové dáta", "Mapovanie", "Súradnice"] },
];

export default function CvPage() {
  const [category, setCategory] = useState<(typeof skillCategories)[number]>("Všetko");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skills[0]);
  const visibleSkills = skills.filter((skill) => category === "Všetko" || skill.category === category);

  useEffect(() => {
    if (!visibleSkills.includes(selectedSkill)) setSelectedSkill(visibleSkills[0]);
  }, [category, selectedSkill, visibleSkills]);

  return (
    <PageFrame className="cv-page">
      <section className="page-hero wrap">
        <div className="page-hero-copy">
          <p className="eyebrow"><span>DOKUMENT 01</span> ŽIVOTOPIS</p>
          <h1>Spoznávam<br /><em>celý technologický svet.</em></h1>
          <p>Stredoškolské technické vzdelanie, praktická práca so softvérom a záujem o systémy prepájajúce dáta, infraštruktúru a konkrétne miesta.</p>
        </div>
        <div className="page-hero-index"><span>ŽIVOTOPIS / 2026</span><strong>01—04</strong><span>TECHNICKÁ PRAX</span></div>
      </section>

      <section className="cv-timeline-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>01</span> MOJA DOVTEDAJŠIA CESTA</p><h2>Vzdelanie a <em>prax.</em></h2></div><button className="button button--outline print-button" type="button" onClick={() => window.print()}><Printer size={16} /> Uložiť / vytlačiť CV</button></div>
          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-date">2024 — SÚČASNOSŤ</div><div className="timeline-marker"><i /></div>
              <div className="timeline-content"><span className="timeline-type">VZDELÁVANIE / STREDNÁ ŠKOLA</span><h3>Stredná priemyselná škola technická, Spišská Nová Ves</h3><p className="timeline-place">Spišská Nová Ves, Slovensko</p><p>Štúdium technických odborov so zameraním na základy inžinierstva, programovanie a praktické technické systémy. Výučba rozvíja systematické riešenie problémov a schopnosť uplatňovať technológie v praxi.</p><div className="timeline-tags"><span>Základy inžinierstva</span><span>Programovanie</span><span>Praktické systémy</span></div></div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">POČAS ŠTÚDIA</div><div className="timeline-marker"><i /></div>
              <div className="timeline-content"><span className="timeline-type">PRAX / GEOINFRAŠTRUKTÚRA</span><h3>Corageo</h3><p className="timeline-place">Praktická technická práca popri štúdiu</p><p>Práca s geoinfraštruktúrou, priestorovými dátami a webovými či systémovými riešeniami popri štúdiu. Skúsenosti z praxe ukazujú, aké dôležité sú kvalita dát, správne súradnicové systémy a spoľahlivé rozhrania.</p><div className="timeline-tags"><span>Priestorové dáta</span><span>Webové a systémové riešenia</span><span>Infraštruktúra</span></div></div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">OD ROKU 2030 — PLÁNOVANÉ</div><div className="timeline-marker"><i /></div>
              <div className="timeline-content"><span className="timeline-type">VYSOKOŠKOLSKÉ ŠTÚDIUM / PLÁN</span><h3>Technická univerzita v Prešove</h3><p className="timeline-place">Plánované pokračovanie v technickom a inžinierskom štúdiu</p><p>Plánované pokračovanie v štúdiu od roku 2030 s cieľom prehĺbiť technické vedomosti a zamerať sa na inžinierske odbory.</p><div className="timeline-tags"><span>Vysokoškolské technické štúdium</span><span>Inžinierstvo</span></div></div>
            </article>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>02</span> TECHNOLÓGIE A ZRUČNOSTI</p><h2>Vyberte si <em>oblasť.</em></h2></div><p className="section-side-note">Vyberte technológiu a pozrite sa, ako sa využíva v praxi.</p></div>
          <div className="skill-filters" role="group" aria-label="Filtrovať technické zručnosti">
            {skillCategories.map((item) => <button key={item} type="button" className={category === item ? "is-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="skill-explorer">
            <div className="skill-list" role="listbox" aria-label="Technológie">
              {visibleSkills.map((skill) => <button key={skill.name} type="button" role="option" aria-selected={selectedSkill.name === skill.name} className={selectedSkill.name === skill.name ? "is-selected" : ""} onClick={() => setSelectedSkill(skill)}><span>{skill.name}</span><small>{skill.category}</small><ArrowUpRight size={15} /></button>)}
            </div>
            <motion.article className="skill-detail" key={selectedSkill.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
              <div className="detail-topline"><span>TECHNOLÓGIA / 0{skills.indexOf(selectedSkill) + 1}</span><span>{selectedSkill.level}</span></div>
              <div className="skill-detail-icon"><Braces size={23} /></div>
              <p className="eyebrow">{selectedSkill.category}</p><h3>{selectedSkill.name}</h3><p>{selectedSkill.detail}</p>
              <div className="timeline-tags">{selectedSkill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </motion.article>
          </div>
          <div className="print-skills">
            {skills.map((skill) => (
              <article key={skill.name}>
                <span>{skill.category}</span>
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cv-foot-cta wrap"><div><span className="eyebrow">SÚVISIACE PROJEKTY</span><h2>Pozrite sa, ako sa nápady <em>menia na prax.</em></h2></div><NavLink className="button button--primary" to="/projects">Pozrieť projekty <ArrowRight size={16} /></NavLink></section>
    </PageFrame>
  );
}

