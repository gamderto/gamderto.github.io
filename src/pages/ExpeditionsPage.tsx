import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { NavLink } from "react-router-dom";
import PageFrame from "../components/PageFrame";

type Waypoint = { id: string; name: string; region: string; coordinates: string; period: string; architecture: string; context: string; left: string; top: string };
const waypoints: Waypoint[] = [
  { id: "borobudur", name: "Borobudur", region: "Central Java", coordinates: "7.6079° S / 110.2038° E", period: "8th–9th century CE", architecture: "A stepped mandala plan rises through galleries and terraces to a central stupa. Relief sequences are built into the ascent, making circulation part of the monument’s narrative.", context: "The monument sits within a volcanic plain framed by mountains. Its position makes the relationship between sacred geometry, terrain and water systems especially legible.", left: "35%", top: "38%" },
  { id: "prambanan", name: "Prambanan", region: "Yogyakarta / Central Java", coordinates: "7.7520° S / 110.4915° E", period: "9th century CE", architecture: "A compound of tall, vertically articulated Hindu temples arranged around a central group. The layout organizes movement through nested sacred enclosures.", context: "On the eastern side of the Yogyakarta region, the site provides a contrasting reading of monument, settlement and the broad agricultural landscape.", left: "70%", top: "48%" },
  { id: "trowulan", name: "Trowulan", region: "East Java", coordinates: "7.5530° S / 112.3730° E", period: "Majapahit-era settlement landscape", architecture: "Rather than one isolated monument, Trowulan is read through dispersed remains including brick structures, gateways, pools and channels that suggest a larger urban system.", context: "The surviving traces sit within a populated landscape. Mapping fragments together helps explain how water, routes and civic space may have related.", left: "78%", top: "79%" },
];

export default function ExpeditionsPage() {
  const [activeId, setActiveId] = useState(waypoints[0].id);
  const active = waypoints.find((waypoint) => waypoint.id === activeId) ?? waypoints[0];

  return (
    <PageFrame className="expedition-page">
      <section className="expedition-hero">
        <div className="wrap expedition-hero-inner">
          <div><p className="eyebrow"><span>FIELD NOTE 03</span> INDONESIA / ARCHITECTURE / PLACE</p><h1>Reading old stone<br />through <em>the land.</em></h1><p>Ancient Indonesian architecture is also a study in geography: how routes, water, elevation and built form shape an experience of place.</p><span className="field-note-stamp"><Compass size={15} /> FIELD PERSPECTIVE / JAVA</span></div>
          <div className="expedition-orb" aria-hidden="true"><div className="orb-ring" /><div className="orb-sun" /><span>JAVA<br />ISLAND</span><small>7°30′ S / 110° E</small></div>
        </div>
      </section>
      <section className="waypoint-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>01</span> WAYPOINT EXPLORER</p><h2>Three sites, one <em>landscape.</em></h2></div><p className="section-side-note">Select a site to inspect its location, architecture and geographic setting.</p></div>
          <div className="waypoint-explorer">
            <div className="schematic-map">
              <div className="map-topline"><span>JAVA / SCHEMATIC ROUTE</span><span>N ↑</span></div>
              <svg viewBox="0 0 700 480" preserveAspectRatio="none" aria-hidden="true">
                <path className="island-outline" d="M74 225 114 173 190 156 250 130 331 141 382 169 439 157 503 184 546 224 602 253 624 287 581 307 541 336 482 351 435 376 376 367 316 386 254 358 195 363 149 329 109 311 81 273Z" />
                <path className="island-ridge" d="M112 256c76-83 128-61 193-85s139 34 203 11 92 42 122 58" />
                <path className="route-line" d="M244 219Q390 226 484 275T542 346" />
                <path className="map-grid-line" d="M80 160h520M80 240h520M80 320h520M180 110v280M300 110v280M420 110v280M540 110v280" />
              </svg>
              {waypoints.map((waypoint, index) => (
                <button key={waypoint.id} className={`waypoint-pin${activeId === waypoint.id ? " is-active" : ""}`} type="button" style={{ left: waypoint.left, top: waypoint.top }} onClick={() => setActiveId(waypoint.id)} aria-pressed={activeId === waypoint.id} aria-label={`Explore ${waypoint.name}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span><i />{activeId === waypoint.id && <strong>{waypoint.name}</strong>}
                </button>
              ))}
              <div className="map-scale"><span>0</span><i /><span>200 KM</span></div>
              <div className="map-legend"><i /> WAYPOINT <i className="legend-route" /> ROUTE</div>
            </div>
            <motion.article className="waypoint-detail" key={active.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
              <div className="waypoint-number"><span>SELECTED SITE</span><strong>0{waypoints.indexOf(active) + 1}</strong></div>
              <p className="eyebrow">{active.region} / {active.period}</p><h3>{active.name}</h3><div className="waypoint-coordinate"><Compass size={15} /> {active.coordinates}</div>
              <div className="field-observation"><span>ARCHITECTURAL OBSERVATION</span><p>{active.architecture}</p></div>
              <div className="field-observation"><span>LANDSCAPE CONTEXT</span><p>{active.context}</p></div>
              <div className="waypoint-switch">{waypoints.map((waypoint, index) => <button key={waypoint.id} className={active.id === waypoint.id ? "is-active" : ""} type="button" aria-label={`Show ${waypoint.name}`} onClick={() => setActiveId(waypoint.id)}>{String(index + 1).padStart(2, "0")}</button>)}</div>
            </motion.article>
          </div>
        </div>
      </section>
      <section className="field-notes-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>02</span> FIELD NOTES</p><h2>Monuments are <em>systems.</em></h2></div><p className="section-side-note">An observer’s lens on structure, movement and the terrain around it.</p></div>
          <div className="field-grid">
            <article className="field-card field-card--large"><div className="field-art field-art--terrace"><span>FORM / 01</span><div className="terrace-shapes"><i /><i /><i /><i /><b /></div></div><span className="field-card-index">01 / VERTICALITY</span><h3>Build with the slope</h3><p>Terraced form makes ascent visible. Levels, thresholds and changes in view become part of the architecture rather than decoration around it.</p></article>
            <article className="field-card"><div className="field-art field-art--water"><span>HYDROLOGY / 02</span><div className="water-lines"><i /><i /><i /><i /><i /></div></div><span className="field-card-index">02 / WATER & ROUTE</span><h3>Infrastructure leaves traces</h3><p>Channels, basins and paths reveal how a monument participates in a larger managed landscape.</p></article>
            <article className="field-card"><div className="field-art field-art--relief"><span>DETAIL / 03</span><div className="relief-pattern"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><span className="field-card-index">03 / SURFACE</span><h3>Stone as a record</h3><p>Carved surfaces make the wall an information layer: images and sequence reward a slower, close reading.</p></article>
          </div>
          <p className="field-source-note">Coordinates are approximate site references. Historical descriptions are concise orientation notes; site interpretation continues to develop through research and conservation.</p>
        </div>
      </section>
      <section className="expedition-end wrap"><span className="eyebrow">BACK TO THE TECHNICAL ROUTE</span><NavLink to="/projects">Explore spatial systems <ArrowRight size={16} /></NavLink></section>
    </PageFrame>
  );
}

