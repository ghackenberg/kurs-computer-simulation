# Kapitel-Steckbrief 11: Epilog, Modell-Synthese, FMI/FMU & Virtuelle Inbetriebnahme

**Dokument-ID:** `Kapitel/11_Epilog/Konzept.md`  
**Rahmendokumente:** [`01_Didaktik_und_Lernziele.md`](../../Konzept/01_Didaktik_und_Lernziele.md) | [`02_Semestermatrix_und_Abhaengigkeiten.md`](../../Konzept/02_Semestermatrix_und_Abhaengigkeiten.md) | [`03_Beurteilung_und_Pruefungen.md`](../../Konzept/03_Beurteilung_und_Pruefungen.md)

---

## 1. Artefakte & Rolle im Curriculum
- **Foliensatz:** [`Folien/Folien.md`](./Folien/Folien.md)
- **Zugehörige Abschluss-Hausübung & Moodle-Sektion:** Gemeinsam mit [`Kapitel 10: Hybride Dynamik & Synthese`](../10_Hybride_Dynamik_Synthese/Konzept.md) in Termin 10.

## 2. Lernziele & Synthese-Inhalte
1. **Vergleichende Modell-Taxonomie:** Wann wählt man statische FEM ([`Kap. 07`](../07_Statik_FEM_Cholesky/Konzept.md)), kontinuierliche ODEs ([`Kap. 08`](../08_DGL_und_SFunctions/Konzept.md)), ereignisdiskrete DES ([`Kap. 09`](../09_Diskrete_Systeme_DES/Konzept.md)) oder hybride Automaten ([`Kap. 10`](../10_Hybride_Dynamik_Synthese/Konzept.md))?
2. **Multi-Fidelity & Co-Simulation (FMI/FMU):** Kopplung domänenspezifischer Teilmodelle über standardisierte Functional Mock-up Units (*Model Exchange* vs. *Co-Simulation*).
3. **Virtuelle Inbetriebnahme (VIBN):** Kopplung des C#-Anlagenzwillings mit realen Steuerungen (SiL / HiL) im deterministischen Echtzeittakt.