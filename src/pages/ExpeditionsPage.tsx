import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { NavLink } from "react-router-dom";
import PageFrame from "../components/PageFrame";

type Waypoint = { id: string; name: string; region: string; coordinates: string; period: string; architecture: string; context: string; left: string; top: string };
const waypoints: Waypoint[] = [
  { id: "borobudur", name: "Borobudur", region: "Stredná Jáva", coordinates: "7.6079° S / 110.2038° E", period: "8. – 9. storočie n. l.", architecture: "Stupňovitý pôdorys v tvare mandaly sa dvíha cez galérie a terasy až k centrálnej stúpe. Reliéfy lemujúce výstup premieňajú pohyb návštevníka na súčasť príbehu monumentu.", context: "Monument stojí na sopečnej nížine obklopenej horami. Jeho poloha zreteľne ukazuje, ako sa tu prepájajú sakrálna geometria, reliéf krajiny a vodohospodárske systémy.", left: "35%", top: "38%" },
  { id: "prambanan", name: "Prambanan", region: "Yogyakarta / Stredná Jáva", coordinates: "7.7520° S / 110.4915° E", period: "9. storočie n. l.", architecture: "Komplex vysokých hinduistických chrámov s výrazným vertikálnym členením je usporiadaný okolo ústrednej skupiny stavieb. Pôdorys vedie pohyb cez niekoľko do seba vložených posvätných nádvorí.", context: "Lokalita na východnom okraji oblasti Yogyakarta ponúka odlišný pohľad na vzťah monumentu, sídel a rozsiahlej poľnohospodárskej krajiny.", left: "70%", top: "48%" },
  { id: "trowulan", name: "Trowulan", region: "Východná Jáva", coordinates: "7.5530° S / 112.3730° E", period: "Sídelná krajina z obdobia ríše Majapahit", architecture: "Trowulan netvorí jediný izolovaný monument. Rozptýlené pozostatky tehlových stavieb, brán, nádrží a kanálov naznačujú, že išlo o súčasť rozsiahlejšieho mestského systému.", context: "Zachované stopy sa nachádzajú v obývanej krajine. Ich spoločné mapovanie pomáha vysvetliť možné prepojenia vodných systémov, trás a verejných priestorov.", left: "78%", top: "79%" },
];

export default function ExpeditionsPage() {
  const [activeId, setActiveId] = useState(waypoints[0].id);
  const active = waypoints.find((waypoint) => waypoint.id === activeId) ?? waypoints[0];

  return (
    <PageFrame className="expedition-page">
      <section className="expedition-hero">
        <div className="wrap expedition-hero-inner">
          <div><p className="eyebrow"><span>ZÁPISOK Z TERÉNU 03</span> INDONÉZIA / ARCHITEKTÚRA / MIESTO</p><h1>Starobylý kameň<br />v kontexte <em>krajiny.</em></h1><p>Staroveká indonézska architektúra je zároveň lekciou z geografie: ukazuje, ako cesty, voda, nadmorská výška a podoba stavieb formujú vnímanie miesta.</p><span className="field-note-stamp"><Compass size={15} /> POHĽAD Z TERÉNU / JÁVA</span></div>
          <div className="expedition-orb" aria-hidden="true"><div className="orb-ring" /><div className="orb-sun" /><span>OSTROV<br />JÁVA</span><small>7°30′ S / 110° E</small></div>
        </div>
      </section>
      <section className="waypoint-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>01</span> PRIESKUMNÍK LOKALÍT</p><h2>Tri miesta, jedna <em>krajina.</em></h2></div><p className="section-side-note">Vyberte lokalitu a preskúmajte jej polohu, architektúru a geografické súvislosti.</p></div>
          <div className="waypoint-explorer">
            <div className="schematic-map">
              <div className="map-topline"><span>JÁVA / SCHEMATICKÁ TRASA</span><span>N ↑</span></div>
              <svg viewBox="0 0 700 480" preserveAspectRatio="none" aria-hidden="true">
                <path className="island-outline" d="M74 225 114 173 190 156 250 130 331 141 382 169 439 157 503 184 546 224 602 253 624 287 581 307 541 336 482 351 435 376 376 367 316 386 254 358 195 363 149 329 109 311 81 273Z" />
                <path className="island-ridge" d="M112 256c76-83 128-61 193-85s139 34 203 11 92 42 122 58" />
                <path className="route-line" d="M244 219Q390 226 484 275T542 346" />
                <path className="map-grid-line" d="M80 160h520M80 240h520M80 320h520M180 110v280M300 110v280M420 110v280M540 110v280" />
              </svg>
              {waypoints.map((waypoint, index) => (
                <button key={waypoint.id} className={`waypoint-pin${activeId === waypoint.id ? " is-active" : ""}`} type="button" style={{ left: waypoint.left, top: waypoint.top }} onClick={() => setActiveId(waypoint.id)} aria-pressed={activeId === waypoint.id} aria-label={`Preskúmať lokalitu ${waypoint.name}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span><i />{activeId === waypoint.id && <strong>{waypoint.name}</strong>}
                </button>
              ))}
              <div className="map-scale"><span>0</span><i /><span>200 KM</span></div>
              <div className="map-legend"><i /> LOKALITA <i className="legend-route" /> TRASA</div>
            </div>
            <motion.article className="waypoint-detail" key={active.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
              <div className="waypoint-number"><span>VYBRANÁ LOKALITA</span><strong>0{waypoints.indexOf(active) + 1}</strong></div>
              <p className="eyebrow">{active.region} / {active.period}</p><h3>{active.name}</h3><div className="waypoint-coordinate"><Compass size={15} /> {active.coordinates}</div>
              <div className="field-observation"><span>ARCHITEKTONICKÉ POZOROVANIE</span><p>{active.architecture}</p></div>
              <div className="field-observation"><span>SÚVISLOSTI KRAJINY</span><p>{active.context}</p></div>
              <div className="waypoint-switch">{waypoints.map((waypoint, index) => <button key={waypoint.id} className={active.id === waypoint.id ? "is-active" : ""} type="button" aria-label={`Zobraziť lokalitu ${waypoint.name}`} onClick={() => setActiveId(waypoint.id)}>{String(index + 1).padStart(2, "0")}</button>)}</div>
            </motion.article>
          </div>
        </div>
      </section>
      <section className="field-notes-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>02</span> POZNÁMKY Z TERÉNU</p><h2>Monumenty sú <em>systémy.</em></h2></div><p className="section-side-note">Pohľad na stavbu, pohyb a okolitý terén z perspektívy pozorovateľa.</p></div>
          <div className="field-grid">
            <article className="field-card field-card--large"><div className="field-art field-art--terrace"><span>TVAR / 01</span><div className="terrace-shapes"><i /><i /><i /><i /><b /></div></div><span className="field-card-index">01 / VERTIKALITA</span><h3>Stavať v súlade so svahom</h3><p>Terasy zvýrazňujú pohyb smerom nahor. Jednotlivé úrovne, prahy a meniace sa výhľady sa stávajú súčasťou architektúry, nie iba jej ozdobou.</p></article>
            <article className="field-card"><div className="field-art field-art--water"><span>VODNÉ SYSTÉMY / 02</span><div className="water-lines"><i /><i /><i /><i /><i /></div></div><span className="field-card-index">02 / VODA A TRASY</span><h3>Infraštruktúra zanecháva stopy</h3><p>Kanály, nádrže a cesty ukazujú, ako je monument súčasťou širšej, človekom spravovanej krajiny.</p></article>
            <article className="field-card"><div className="field-art field-art--relief"><span>DETAIL / 03</span><div className="relief-pattern"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><span className="field-card-index">03 / POVRCH</span><h3>Kameň ako záznam</h3><p>Reliéf mení stenu na nositeľa informácií. Obrázky a ich radenie odmeňujú pomalé, pozorné čítanie.</p></article>
          </div>
          <p className="field-source-note">Súradnice označujú približnú polohu lokalít. Historické opisy slúžia ako stručné úvodné informácie; poznanie miest sa naďalej rozvíja vďaka výskumu a pamiatkovej starostlivosti.</p>
        </div>
      </section>
      <section className="expedition-end wrap"><span className="eyebrow">SPÄŤ K TECHNICKÝM TÉMAM</span><NavLink to="/projects">Pozrieť priestorové systémy <ArrowRight size={16} /></NavLink></section>
    </PageFrame>
  );
}

