# Mattiás Pleš — softvér, priestorové systémy a zápisky z terénu

Responzívne portfólio a životopis vytvorené pomocou React, TypeScript a Vite.
Navigácia na strane klienta používa `HashRouter`, vďaka čomu všetky stránky
fungujú na GitHub Pages.

## Stránky

- `/` — Úvodná animácia, technický prehľad, predstavenie praxe a odkazy na hlavné sekcie.
- `/cv` — Vzdelanie, skúsenosti zo spoločnosti Corageo, interaktívny prehľad zručností a tlačová verzia.
- `/projects` — Filtrovatelné technické štúdie s interaktívnym výberom vrstiev architektúry. Ide o koncepčné návrhy, nie o tvrdenia o nasadených produktoch.
- `/expeditions` — Interaktívny prieskumník lokalít na Jáve a poznámky z terénu.

## Vývoj

```sh
npm install
npm run dev
npm run build
```

Úvodná animácia domovskej stránky sa zobrazí raz počas relácie prehliadača a možno
ju preskočiť. Kontaktný formulár v pätičke kontroluje vyplnené údaje v prehliadači
a pripraví koncept e-mailu; údaje neodosiela ani neukladá.
