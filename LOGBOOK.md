# Logboek - Lessons Learned

## 2026-02-15

### 1) Eerst verifiëren welke component daadwerkelijk gerenderd wordt
- Foutpatroon: wijzigingen in een component maken die niet op de pagina actief is.
- Afsprak: altijd eerst checken welke component een route echt rendert (bijv. `Home.tsx` import + JSX).
- Praktijk: `RetreatTestimonialsSection` werd op Home gebruikt, niet de oude testimonial-component.

### 2) Eén bron van waarheid voor slider-logica
- Foutpatroon: parallel handmatige sliderlogica in meerdere bestanden.
- Afsprak: `InfiniteTwoUpCarousel` is de centrale slider-engine; sections leveren alleen data + card markup + buttons.
- Resultaat: minder regressies, eenvoudiger debuggen.

### 3) Infinite loop zonder zichtbare reset
- Werkt betrouwbaar met clone-strategie:
  - desktop 2-up: 2 clones links/rechts
  - mobile 1-up: 1 clone links/rechts
- Teleport alleen zonder transitie, na transition end.
- Tijdens drag: transition uit; bij release weer aan en dan pas snap.

### 4) Nauwkeurige translate-berekening
- Foutpatroon: procentuele stappen geven drift/overshoot.
- Afsprak: stappen in px berekenen op basis van gemeten viewport + gemeten gap.
- Implementatie:
  - `slidePx` + `gapPx` => `stepPx`
  - `transform: translate3d(-index * stepPx, 0, 0)`

### 5) UX regressies voorkomen met vaste checklist
Voor slider-aanpassingen altijd controleren:
- actieve kaart volledig zichtbaar na next/prev
- exact 2 kaarten desktop, 1 kaart mobile
- geen zichtbare jump/reset aan clone-randen
- drag/swipe threshold voelt natuurlijk
- knoppen links sturen dezelfde carousel-instance aan

### 6) Prompting die sneller tot juiste output leidt
Wat goed werkte:
- "Do not change typography/colors/layout"
- "Output only code diff/file"
- "Target file: ..."
- "Non-negotiable geometry/behavior"
- "Desktop/mobile exact rules"

### 7) Implementatie-afspraak voor volgende iteraties
- Eerst pad + actieve component bevestigen.
- Dan pas patchen.
- Na patch: kort valideren op compile/type issues en expliciet melden welke fouten buiten scope vallen.

## 2026-02-16

### 1) Wireframeblok op `Persoonlijke ontwikkeling` aangepast naar tekst + beeld
- Gewijzigd: in `client/pages/Retreats.tsx` is het blok met `Weekend Training` en `Workshop` omgezet naar per kolom:
  - `h2` titel
  - 1 bodytekst
  - afbeelding direct onder de tekstkaart
- Resultaat: visuele structuur volgt nu de referentie-opzet (kop + body + foto per kolom).

### 2) Validatiebeperking in deze omgeving
- `pnpm` is niet beschikbaar in de huidige shell (`command not found`), daardoor geen lokale typecheck kunnen draaien.
- Reusable beslissing: bij ontbreken van `pnpm` expliciet melden en alleen gerichte, veilige file-level wijzigingen doen.

### 3) Eén visueel blok per kaart voor consistente uitlijning
- Gewijzigd: tekst en foto van `Weekend Training` en `Workshop` staan nu binnen dezelfde container (`overflow-hidden`).
- Reusable beslissing: gebruik een vaste `min-h` op het tekstdeel zodat beeldblokken in een 2-kolomsgrid op gelijke hoogte beginnen.

### 4) Kaarttitels met menu-consistente hover-underline
- Gewijzigd: titels in de trainingskaarten gebruiken nu dezelfde `after:` underline-animatie in terracotta als de navigatielinks.
- Gewijzigd: kaartachtergronden op terracotta gezet met 25% transparantie (`bg-[#B46555]/25`) voor visuele consistentie.

### 5) Anchor-navigatie vanaf kaarten en submenu
- Gewijzigd: `Retreats` heeft nu een anker-id op de sectie `De Drie Pijlers van de Weekend Training` (`#drie-pijlers`).
- Gewijzigd: kaarttitel + `Lees meer` van `Weekend Trainingen` linken naar dit anker; `Dag Workshops` kaarttitel + `Lees meer` linken naar `/groepstrainingen/ontwikkeling-workshops`.
- Gewijzigd: submenu-item voor weekenden wijst nu ook naar `/groepstrainingen#drie-pijlers`; active-state logica negeert hash-fragmenten.

### 6) Vaste verticale uitlijning in kaart-grid
- Gewijzigd: kaarten gebruiken `h-full` + `flex-col`, tekstdeel gebruikt `flex-col` met `flex-1` op bodytekst zodat `Lees meer` op gelijke hoogte blijft.
- Gewijzigd: fotohoogte blijft vast en start daardoor in beide kaarten op dezelfde hoogte in de 2-kolomslayout.
- Gewijzigd: kaartranden verwijderd op verzoek (geen border).

### 7) Underline-breedte begrensd op tekst
- Gewijzigd: titel- en CTA-links in de kaarten gebruiken `self-start`, zodat hover-underline alleen onder de tekst staat en niet over de volledige kaartbreedte.

### 8) Hash-anchor scrolling gefixt met vaste header
- Probleem: `#drie-pijlers` navigatie werd soms overschreven door generieke `scrollTo(0,0)` op routechange.
- Oplossing: in `Layout` scroll-effect hash-aware gemaakt (`location.hash`), met fallback retry en header-offset zodat anchors betrouwbaar en visueel correct landen.

### 9) Terminologie-update `In company` naar `Bedrijfstrajecten`
- Gewijzigd: navigatie- en footerlabel aangepast naar `Bedrijfstrajecten`.
- Gewijzigd: zichtbare copy op B2B-pagina's aangepast (`Bedrijfstrajecten`, `bedrijfstrajecten brochure`, relevante subtitles/alt-tekst).
- Beslissing: routes blijven technisch `/in-company` voor backward compatibility.

### 10) Hero-subtitle copy-update op bedrijfspagina
- Gewijzigd: hero-onderzin op `VoorOrganisaties` aangepast naar: `Het Netwerk voor jonge vrouwelijke professionals`.

### 11) Copy-correctie: hero-subtitle hoort op homepage
- Correctie: subtitle gewijzigd op `Home` hero naar `Het Netwerk voor jonge vrouwelijke professionals`.
- Les: bij copy-aanvragen altijd eerst doelpagina expliciet valideren als meerdere hero's bestaan.

### 12) Homepage-secties consistent `full frame`
- Gewijzigd: laatste niet-full-frame sectie in `Home.tsx` (Inspiratie) ook omgezet naar `min-h-screen` + `flex items-center`.
- Resultaat: alle `<section>` blocks in de homepage volgen nu hetzelfde full-frame patroon.

## 2026-02-17

### 1) Sitebrede full-frame sectie-standaard doorgevoerd
- Gewijzigd: alle `<section>`-blokken in relevante pagina's en gedeelde sectie-componenten naar full-frame gebracht met `min-h-screen`.
- Gewijzigd: waar passend ook `flex items-center` toegevoegd voor consistente verticale uitlijning.
- Reusable beslissing: nieuwe secties standaard starten met `min-h-screen`; alleen afwijken als functioneel noodzakelijk.

### 2) Testimonials- en organisatiesecties herbruikbaar gemaakt over meerdere pagina's
- Gewijzigd: titel in `RetreatTestimonialsSection` aangepast naar `Ervaringen van deelneemsters` en layout full-frame gemaakt met volledige breedtecontainer.
- Gewijzigd: dezelfde testimonial-sectie nu hergebruikt op `Home`, `LidWorden` en `Retreats` voor consistente uitstraling en gedrag.
- Gewijzigd: sectie `Krachtige vrouwen bij deze organisaties gingen je voor` toegevoegd op `Home` (na `Wat de trainingen opleveren`) en op `VoorOrganisaties` (onder `Jaarprogramma voor jonge vrouwelijke professionals`).
- Wat ging minder: lokale `pnpm` ontbreekt in deze omgeving (`command not found`), waardoor verificatie via `npm run typecheck` is gedaan; bestaande typefouten buiten deze wijziging blijven aanwezig.

### 3) Anchor-CTA toegevoegd van `De Drie Pijlers` naar `Event Kalender`
- Gewijzigd: `Event Kalender` sectie heeft nu expliciete anchor-id `event-kalender` in `client/components/EventCalendar.tsx`.
- Gewijzigd: in `client/pages/Retreats.tsx` staat onder `De Drie Pijlers van de Weekend Training` nu een knop `Bekijk kalender` die linkt naar `/kalender#event-kalender`.
- Reusable beslissing: voor sectie-jumps altijd stabiele, lowercase kebab-case ids gebruiken zodat links vanaf andere pagina's consistent blijven werken.

### 4) Uitzondering op full-frame en footer opgeschoond
- Gewijzigd: `Blijf op de hoogte voor de volgende editie` in `client/components/NewsletterSignup.tsx` teruggezet naar originele, compacte sectiehoogte (geen `min-h-screen` meer).
- Gewijzigd: footerkop in `client/components/Layout.tsx` aangepast van `Navigatie` naar `Quick Links`.
- Gewijzigd: subpagina-links verwijderd uit footer; alleen hoofdpagina's blijven staan.
- Reusable beslissing: full-frame blijft de standaard, behalve expliciet uitgezonderde CTA-secties zoals de nieuwsbriefblok onderaan.

### 5) CTA toegevoegd onder `Ons Gedachtegoed`
- Gewijzigd: in `client/pages/Contact.tsx` is onder de tekst in de sectie `Ons Gedachtegoed` een CTA-knop toegevoegd met label `Meer over Founder Ella`.
- Gewijzigd: knop is gestyled volgens de bestaande primaire CTA-stijl (`bg-primary`, `hover:bg-accent`, lichte scale-hover) voor visuele consistentie.
- Reusable beslissing: extra context-CTA's in verhalende tekstblokken onderaan de copy plaatsen en dezelfde primaire button-stijl hergebruiken.

### 6) Copy override voor organisatiesectie op `Bedrijfstrajecten`
- Gewijzigd: `FloatingBrandsSection` ondersteunt nu een optionele `title` prop met defaulttekst voor alle bestaande pagina's.
- Gewijzigd: op `client/pages/VoorOrganisaties.tsx` is de titel ingesteld op `Talent uit deze organisaties ontwikkelde zich via trainingen van Young Wise Women`.
- Reusable beslissing: voor pagina-specifieke copy in gedeelde secties eerst parametriseren via props, in plaats van componenten te dupliceren.

### 7) Compacte hoogte hersteld voor `Interesse in een programma op maat?`
- Gewijzigd: sectie `Interesse in een programma op maat?` op `client/pages/VoorOrganisaties.tsx` teruggezet naar compacte hoogte (zonder `min-h-screen`).
- Wat ging mis: sectie stond opnieuw op full-frame na opvolgende wijzigingen.
- Reusable beslissing: na copy-aanpassingen op een pagina altijd nogmaals de classnames van uitzonderingssecties checken.

### 8) Grote tekstsecties gecomprimeerd voor 1-scherm-overzicht
- Gewijzigd: voorbeeldsecties `Persoonlijke Ontwikkeling trainingen & Workshops`, `Jouw Transformatie`, `Ervaringen van deelneemsters`, `Volgende Editie: 12-14 juni 2025` en `Schrijf je in` compacter gemaakt.
- Technisch: `min-h-screen` verwijderd op deze secties, verticale padding en tussenruimtes verkleind, en in de trainings-intro afbeeldingshoogtes verlaagd.
- Reusable beslissing: full-frame alleen inzetten waar echt nodig; informatieve tekst- en formuliersecties standaard compact houden voor directe scanbaarheid.

### 9) Extra compact gemaakt op kalenderpagina
- Gewijzigd: `Event Kalender` in `client/components/EventCalendar.tsx` compacter gemaakt (geen `min-h-screen`, kleinere verticale spacing).
- Gewijzigd: `Volgende Weekend groepstraining` in `client/pages/Kalender.tsx` compacter gemaakt (geen `min-h-screen`, kleinere paddings/gaps).
- Reusable beslissing: lange informatiesecties op kalender- en detailpagina's prioriteren op scanbaarheid boven full-frame vulling.

### 10) Wireframe-achtige blogs-layout toegevoegd
- Gewijzigd: `client/pages/Blogs.tsx` vervangen van placeholdertekst naar een 3-koloms wireframe met toplabel, grote visual cards, titel, excerpt en `Read more`.
- Gewijzigd: hovergedrag op blogtitels toegevoegd: terracottakleur (`#B46555`) en bold.
- Reusable beslissing: voor inspiratie-overzichten eerst visuele grid-wireframe neerzetten met consistente card-structuur, daarna pas koppelen aan CMS-data.

### 11) Blogs-sectie aangescherpt op frame-fit en bestaande stijlregels
- Gewijzigd: blogs-overzicht op `client/pages/Blogs.tsx` nu binnen 1 frame op desktop (`min-h-screen lg:h-screen`) met compactere spacing.
- Gewijzigd: `Lees meer`-linkstijl gelijkgetrokken met de stijl van `Persoonlijke ontwikkeling` (zelfde underline-animatie/kleur).
- Gewijzigd: alle blogafbeeldingen hebben nu afgeronde randen (`rounded-2xl`).
- Gewijzigd: onderwerpen vervangen naar `Motivation Factor als tool`, `Persoonlijke groei en voorbeelden`, `Vrouwelijk leiderschap`.

### 12) Toplabel blogs verwijderd, lijnen behouden
- Gewijzigd: tekst `most popular must-reads` verwijderd uit `client/pages/Blogs.tsx`.
- Gewijzigd: horizontale lijnen boven de blogcards behouden.

### 13) Aangeleverde afbeeldingen gekoppeld op blogs
- Gewijzigd: 2e blogkaart gebruikt nu `public/persoonlijke-groei-training.jpg`.
- Gewijzigd: 3e blogkaart gebruikt nu `public/vrouwelijk-leiderschap-training.webp`.

### 14) Nieuwe `Weekend training` highlight op pagina `Persoonlijke ontwikkeling`
- Gewijzigd: in `client/pages/Retreats.tsx` direct na de eerste introsectie een nieuwe sectie toegevoegd in dezelfde visuele stijl als de homepage-editiekaart.
- Inhoud: titel `Weekend training`, twee blokken (`Wat het oplevert`, `Wat is inbegrepen`) en daaronder prijs + vriendinnenkorting (`€50` per persoon).
- Reusable beslissing: edition/offer-secties als compacte kaart op accent-achtergrond inzetten voor snelle scanbaarheid en style-consistentie.

### 15) `Weekend training` herschreven vanuit koopintentie
- Gewijzigd: sectie op `client/pages/Retreats.tsx` aangevuld met kernvragen van potentiële deelneemsters: wanneer, waar, voor wie.
- Gewijzigd: programma-overzicht toegevoegd in 3 dagblokken (vrijdag, zaterdag, zondag), inhoudelijk afgestemd op `Volgende Weekend groepstraining` van de evenementenpagina.
- Gewijzigd: onder prijs + vriendinnenkorting nu duidelijke vervolgacties (`Bevestig je deelname` en `Bekijk kalender`).

### 16) Weekend training opgesplitst in twee delen + terracotta achtergrond
- Gewijzigd: sectie `Weekend training` in `client/pages/Retreats.tsx` heeft nu terracotta achtergrond (`#B46555`).
- Gewijzigd: content opgesplitst in twee witte cards: (1) kerninfo + opbrengst/inbegrepen, (2) 3-daags programma + prijs/korting + CTA's.

### 17) Weekend-sectie verplaatst en vereenvoudigd
- Gewijzigd: sectie verplaatst naar onder `Beleef de Weekend Training` op `client/pages/Retreats.tsx`.
- Gewijzigd: titel aangepast naar `beleef een weekend met Young Wise Women`.
- Gewijzigd: twee kaarten samengevoegd naar één kaart; `Wat het oplevert` verwijderd.
- Gewijzigd: inhoud van `Wat is inbegrepen` verwerkt in `Persoonlijke groei & ontwikkeling - de reis` + investeringstekst.

### 18) Weekend-sectie afgestemd op evenementenstructuur
- Gewijzigd: drie bovenste infoblokken omgezet naar verticale icon-rijen (datum, locatie, doelgroep) in dezelfde structuur als `Volgende Weekend groepstraining`.
- Gewijzigd: investeringsbloktekst vervangen door expliciete `Inclusief:` checklist met intake, Motivation Factor test, begeleiding, accommodatie, maaltijden/dranken en werkboek/tools.

### 19) Copy verfijnd in bovenste infoset van weekend-sectie
- Gewijzigd: datumregel vervangen door `Op vrijdag vanaf 17:30 uur tot zondag 16:00 uur` (zonder onderzin).
- Gewijzigd: `Oudega, Friesland` verwijderd onder locatie.
- Gewijzigd: `Beperkte plaatsen beschikbaar` aangepast naar `Plek voor acht vrouwen`.

### 20) Weekend-sectie verder vereenvoudigd op verzoek
- Gewijzigd: achtergrond van de sectie teruggezet naar groen (`#B8B7A3`) en titel aangepast naar `Beleef een weekend met Young Wise Women`.
- Gewijzigd: dagblokken onder elkaar gezet (geen 3-kolomslayout meer).
- Gewijzigd: investeringstekst + vriendinnenkorting verwijderd; `Inclusief` links uitgelijnd.
- Gewijzigd: CTA's teruggebracht naar één knop: `Meer details`.

### 21) Layoutherplaatsing binnen weekend-sectie
- Gewijzigd: `Inclusief`-blok rechts geplaatst van de kerninfo (datum/locatie/doelgroep) in een 2-koloms topstructuur.
- Gewijzigd: CTA gecentreerd en hernoemd naar `Evenement details`.
- Gewijzigd: kaartbreedte verkleind naar `max-w-4xl` en sectie op full-frame gezet (`min-h-screen`) voor 1-schermweergave.

### 22) Typografie en visuele hiërarchie verfijnd in weekend-sectie
- Gewijzigd: labels (`Wanneer`, `Waar`, `Voor wie`, `Inclusief`) als consistente uppercase micro-headings toegevoegd voor betere scanbaarheid.
- Gewijzigd: dagblokken visueel sterker van elkaar onderscheiden met subtiele kleurafwisseling, randen, schaduw en day-badges.
- Gewijzigd: titel- en bodygroottes binnen het blok gestandaardiseerd voor consistent ritme en betere leesbaarheid.

### 23) Copycorrecties + blokuitlijning in weekend-sectie
- Gewijzigd: `Plek voor acht vrouwen` aangepast naar `Beperkt plek voor 8 vrouwen`.
- Gewijzigd: `Voorafganade` gecorrigeerd naar `Voorafgaande`.
- Gewijzigd: kop `Persoonlijke groei & ontwikkeling - de reis` aangepast naar `Programma: Persoonlijke groei & authenticiteit`.

## 2026-02-18

### 1) Laatste nieuwsbrief-sectie niet meer laten invliegen
- Gewijzigd: in `client/pages/Home.tsx` is de `ScrollFadeInUp` wrapper rond `NewsletterSignup` verwijderd.
- Resultaat: sectie `Blijf op de hoogte voor de volgende editie` verschijnt nu direct, zonder scroll-in animatie.
- Wat ging minder: lokale `pnpm` ontbreekt in deze shell (`command not found`), daardoor geen `pnpm typecheck` kunnen draaien.
- Reusable beslissing: voor uitzonderingen op scroll-animatie de parent-wrapper verwijderen i.p.v. de nieuwsbriefcomponent zelf te wijzigen.
- Gewijzigd: `uur` verwijderd uit de tijdregel en lettergrootte van die regel verkleind.
- Gewijzigd: top-2-kolomsblok op stretch gezet zodat onderkanten van blok 1 en blok 2 uitlijnen.

### 24) Consistente tekstmaat in event-info regels
- Gewijzigd: `Wanneer`, `Waar` en `Voor wie` hoofdregels in de weekend-sectie staan nu op exact dezelfde tekstgrootte (`text-sm md:text-base`).
- Reusable beslissing: binnen één informatiegroep altijd identieke typografische schaal gebruiken en uitlijning afdwingen.

### 25) Extra uitzoom voor 1-frame leesbaarheid
- Gewijzigd: weekend-highlight verder gecomprimeerd met kleinere paddings, kleinere kaartbreedte (`max-w-3xl`) en subtiel kleinere typografie.
- Gewijzigd: kopafstand en CTA-marges verkleind zodat de volledige sectie beter in één scherm past.

### 26) Dag Workshops geïntegreerd als anchor-sectie op `Persoonlijke ontwikkeling`
- Gewijzigd: in `client/pages/Retreats.tsx` een nieuwe sectie met id `dag-workshops` toegevoegd direct na `Ervaringen van deelneemsters`.
- Gewijzigd: links `Dag Workshops` en `Lees meer` in de intro-kaart verwijzen nu naar `/groepstrainingen#dag-workshops`.
- Gewijzigd: submenu-link `Workshops (1 dag)` in `client/components/Layout.tsx` verwijst nu naar dezelfde anchor.
- Gewijzigd: route `/groepstrainingen/ontwikkeling-workshops` redirect nu naar `/groepstrainingen#dag-workshops` voor backward compatibility.
- Reusable beslissing: detailpagina's consolideren naar één hoofdpagina met stabiele anchor-id's en legacy-routes laten redirecten.

### 27) Dag Workshops-sectie omgezet naar wireframe kaart-layout
- Gewijzigd: `client/pages/Retreats.tsx` sectie `#dag-workshops` vervangen door een visuele wireframe-opzet met 3 kaarten.
- Inhoud: `Female leadership workshop`, `Workshop vitaliteit`, `Workshop mentale weerbaarheid`.
- Gewijzigd: accentvlak van de sectie staat nu op terracotta met 25% opacity (`bg-[#B46555]/25`) zoals gevraagd.
- Reusable beslissing: voor snelle inhoudsrichting eerst wireframe cards gebruiken met vaste structuur (beeld, titel, korte beschrijving), daarna pas detaildata toevoegen.

### 28) Dag Workshops scrollbaar gemaakt met voorbereidende navigatie
- Gewijzigd: in `client/pages/Retreats.tsx` is de 3-kaarten-grid vervangen door een responsive carousel (1/2/3 kaarten per view).
- Gewijzigd: pijlen + dots toegevoegd met stateful navigatie (`workshopSlideIndex`) zodat uitbreiding naar een 4e workshop direct werkt zonder layoutrefactor.
- Reusable beslissing: carousels opbouwen met `maxIndex = items - perView` zodat controls nu al aanwezig zijn en vanzelf actief worden bij extra cards.
- Validatie: `npm run typecheck` toont alleen al bestaande fouten buiten deze wijziging (`ScrollFadeInUp.tsx`, `Home.tsx`).

### 29) Vierde dagworkshop toegevoegd voor directe carousel-validatie
- Gewijzigd: in `client/pages/Retreats.tsx` een 4e kaart toegevoegd: `Workshop persoonlijke effectiviteit`.
- Resultaat: op desktop is horizontale navigatie nu direct functioneel (meer items dan zichtbaar per view).

### 30) Motion effects gelijkgetrokken in Dag Workshops-cards
- Gewijzigd: workshopkaart-titels hebben nu dezelfde hover-underline animatie als elders op de site.
- Gewijzigd: workshopafbeeldingen krijgen nu een subtiele zoom-in op hover (`group-hover:scale-105`).
- Reusable beslissing: interactieve card-onderdelen altijd combineren met consistente title-underline en image-hover motion voor herkenbaar gedrag.

### 31) Underline op workshoptitels begrensd op tekstbreedte
- Gewijzigd: workshoptitel in `client/pages/Retreats.tsx` heeft `w-fit`, waardoor de hover-streep alleen onder de tekst loopt en niet over kaartbreedte.

### 32) Underline opgesplitst per woord in workshoptitel
- Gewijzigd: workshoptitels in `client/pages/Retreats.tsx` renderen nu per woord met aparte hover-underline.
- Resultaat: onder meer `Female`, `leadership` en `workshop` krijgen elk een eigen streep.

### 33) Underline visueel doorgetrokken tussen woorden op dezelfde regel
- Gewijzigd: underline-breedte per woord in `client/pages/Retreats.tsx` uitgebreid met de inter-woord spacing (behalve laatste woord).
- Resultaat: wanneer woorden op dezelfde regel staan, loopt de streep visueel door zonder onderbreking.

### 34) Weekend-sectie herstructurering naar vaste info + dag-slider
- Gewijzigd: titelblok aangepast naar `Weekend Trainingen` met gecentreerde underline en terracotta vlak (`bg-[#B46555]/25`), gelijk aan de Dag Workshops-stijl.
- Gewijzigd: `Programma: Persoonlijke groei & authenticiteit` heeft nu een eigen slider met alleen `Dag 1`, `Dag 2`, `Dag 3` (met dots + pijlen).
- Gewijzigd: achtergrondblok rond `Inclusief` verwijderd; `Inclusief` staat nu zonder extra kaart op dezelfde top-uitlijning als `WANNEER`.
- Validatie: `npm run typecheck` toont alleen bestaande fouten buiten deze wijziging (`ScrollFadeInUp.tsx`, `Home.tsx`).

### 35) Weekend-programma navigatie verwijderd en infoblok compacter gemaakt
- Gewijzigd: dots en pijlen onder de weekend-programmaslider verwijderd; cards blijven horizontaal scrollbaar.
- Gewijzigd: bovenste info-rij (`Wanneer/Waar/Voor wie` + `Inclusief`) op `md:w-2/3` gezet met kleinere gap, zodat de kolommen dichter bij elkaar staan.

### 36) Weekend-sectie verder versmald met compactere dagcards
- Gewijzigd: bovenste info-rij en dag-1/2/3 track verder versmald naar `md:w-[58%]` voor minder horizontale witruimte.
- Gewijzigd: dagcards compacter gemaakt (lagere beeldhoogte, kleinere titel/body typografie, kleinere paddings).
- Reusable beslissing: bij smalle contentblokken de breedte limiteren op dezelfde parentbreedte voor zowel info als card-track om visuele samenhang te bewaren.

### 37) Roze binnenruimte gebalanceerd gemaakt in weekendblok
- Gewijzigd: weekendblok als geheel versmald (`max-w-4xl`) en interne `md:w-[58%]` wrappers verwijderd.
- Resultaat: minder lege roze zijruimte; de binnenmarges voelen nu gelijkmatiger op horizontale en verticale as.

### 38) Weekend-sectie gecomprimeerd voor 1-oogopslag
- Gewijzigd: weekendsectie op `min-h-screen` + `flex items-center` gezet en verticale spacing/paddings compacter gemaakt.
- Gewijzigd: typografie van info- en programmadelen verkleind en dagcards compacter gemaakt (lagere image-height, kleinere paddings en tekst).
- Gewijzigd: CTA en tussenmarges verkleind zodat titel, info, programma en CTA beter binnen één viewport passen.

### 39) Dag Workshops-sectie gecomprimeerd voor 1-oogopslag
- Gewijzigd: `Dag Workshops` op `min-h-screen` + `flex items-center` gezet met compactere paddings en titelspacing.
- Gewijzigd: workshopcards compacter gemaakt (lagere image-height, kleinere titel/body-typografie en paddings).
- Gewijzigd: dots, pijlen en CTA verkleind met minder verticale marges zodat de volledige sectie beter in één viewport past.

### 40) Navigatie/copy-opschoning voor inspiratie, podcasts en programma-secties
- Gewijzigd: bloglabel aangepast naar `Tools & Handvatten` in inspiratie-overzichten en menu (`client/pages/Blogs.tsx`, `client/lib/inspirationItems.ts`, `client/components/Layout.tsx`).
- Gewijzigd: blog-herobeeld vervangen naar een inhoudelijk passender beeld en blogtitel-hover niet meer bold (alleen kleurverandering).
- Gewijzigd: podcast-zoeksectie `Zoek op titel, teaser of gast` teruggezet naar compacte sectiehoogte (geen full-frame).
- Gewijzigd: `Interesse in een programma op maat?` op `Bedrijfstrajecten` terug naar compacte sectiehoogte (geen full-frame).
- Gewijzigd: CTA `Bekijk de kalender` verwijderd uit de intro-sectie `Persoonlijke Ontwikkeling trainingen & Workshops`.
- Gewijzigd: submenu-volgorde onder `Persoonlijke ontwikkeling` aangepast naar eerst `Weekend trainingen`, daarna `Workshops (1 dag)`.

### 41) Event Kalender uitgezoomd voor betere 1-oogopslag
- Gewijzigd: `client/components/EventCalendar.tsx` compacter gemaakt met `min-h-screen` en kleinere sectie/titel/jaarselector spacing.
- Gewijzigd: maandgrid verdicht naar `md:3` en `xl:4` kolommen met kleinere cards, tekst en event-badges.
- Gewijzigd: event-tooltip compacter gemaakt voor minder visuele dominantie.

### 42) Meer kleur en hover/motion in `Wat zit er in het programma`
- Gewijzigd: de 4 kaarten in `client/pages/VoorOrganisaties.tsx` hebben nu elk een eigen zachte kleurtoon binnen het bestaande palette.
- Gewijzigd: hover-interactie toegevoegd met subtiele lift (`-translate-y-1`), sterkere schaduw en accent-randkleur per kaart.
- Gewijzigd: titel- en bodytekst reageren nu licht op hover voor betere visuele feedback.

### 43) Submenu-label aangepast onder `Persoonlijke ontwikkeling`
- Gewijzigd: label `Workshops (1 dag)` in `client/components/Layout.tsx` gewijzigd naar `Dag workshops`.

### 44) Weekendtrainingen en dagworkshops ook op Home verwerkt
- Gewijzigd: in `client/pages/Home.tsx` een nieuwe spotlight-sectie `Weekend Trainingen` toegevoegd met link naar `/groepstrainingen#drie-pijlers`.
- Gewijzigd: in `client/pages/Home.tsx` een nieuwe spotlight-sectie `Dag workshops` toegevoegd met link naar `/groepstrainingen#dag-workshops`.
- Structuur: secties staan niet direct na elkaar; de bestaande `Onze Coaches`-sectie blijft ertussen.

### 45) Home-secties samengevoegd naar één `Weekend Trainingen` spotlight
- Gewijzigd: `Dag workshops` spotlight verwijderd uit `client/pages/Home.tsx`.
- Gewijzigd: overgebleven `Weekend Trainingen` spotlight linkt nu door naar de pagina `Persoonlijke ontwikkeling` (`/groepstrainingen`) i.p.v. een sectie-anchor.

### 46) Gecombineerde home-sectie voor beide trainingsvormen
- Gewijzigd: home-spotlight in `client/pages/Home.tsx` nu inhoudelijk gecombineerd naar `Weekend trainingen & Dag workshops`.
- Gewijzigd: binnen dezelfde sectie twee compacte informatieblokken toegevoegd (één per trainingsvorm) met één centrale CTA naar `/groepstrainingen`.

### 47) Extra hero-achtig blok voor `Bedrijfstrajecten` toegevoegd op Home
- Gewijzigd: direct na de sectie `Volgende Editie` in `client/pages/Home.tsx` een nieuw full-frame promotieblok toegevoegd in de stijl van de `Bedrijfstrajecten` hero.
- Gewijzigd: CTA toegevoegd die doorlinkt naar `/in-company`.

### 48) Volgorde home-secties aangepast: editie vóór coaches
- Gewijzigd: in `client/pages/Home.tsx` zijn `Onze Coaches` en de editie-sectie omgedraaid.
- Gewijzigd: sectietitel aangepast naar `Volgende weekend intensive editie: 12-14 juni 2025`.

### 49) Twee interne infoblokken verwijderd uit trainingsspotlight op Home
- Gewijzigd: in `client/pages/Home.tsx` de twee extra tekstkaarten (`Weekend trainingen` en `Dag workshops`) uit de gecombineerde spotlight verwijderd.
- Resultaat: sectie is visueel rustiger met alleen kerntekst en CTA.

### 50) Sectieverplaatsing `Persoonlijke ontwikkeling` naar subpagina `Weekend trainingen`
- Gewijzigd: `client/pages/Retreats.tsx` teruggebracht naar alleen `hero + sectie Dag workshops` (jouw sectie 9).
- Gewijzigd: `client/pages/Weekenden.tsx` vult nu de weekend-georiënteerde secties (jouw sectie 1-8 en 10), inclusief bestaande anchors zoals `#drie-pijlers`.
- Gewijzigd: submenu-link `Weekend trainingen` wijst nu naar `/groepstrainingen/weekenden#drie-pijlers` in `client/components/Layout.tsx`.
- Validatie: `npm run typecheck` toont alleen bestaande fouten buiten deze wijziging (`ScrollFadeInUp.tsx`, `Home.tsx`).

### 51) `Weekend Trainingen` sectie 4 verplaatst naar tussen laatste twee secties
- Gewijzigd: in `client/pages/Weekenden.tsx` is `sectie 4` (`Weekend Training Highlight`) verplaatst naar tussen `RetreatTestimonialsSection` en `FAQ Section`.

### 52) Sectie-uitwisseling tussen `Persoonlijke ontwikkeling`, `Weekend trainingen` en `Dag workshops`
- Gewijzigd: `sectie 1` van `Weekend trainingen` teruggezet naar `client/pages/Retreats.tsx` (pagina `Persoonlijke ontwikkeling & groei`).
- Gewijzigd: de eerdere `sectie 1` van `Persoonlijke ontwikkeling & groei` (dagworkshops-blok) verplaatst naar `client/pages/OntwikkelingWorkshops.tsx`.
- Gewijzigd: route `/groepstrainingen/ontwikkeling-workshops` rendert weer de dagworkshop-pagina in `client/App.tsx`.
- Gewijzigd: submenu-link `Dag workshops` wijst nu naar `/groepstrainingen/ontwikkeling-workshops` in `client/components/Layout.tsx`.
- Gewijzigd: verwijzingen naar oude dagworkshops-anchor in `client/pages/Weekenden.tsx` omgezet naar de dagworkshop-pagina.
- Validatie: `npm run typecheck` toont alleen bestaande fouten buiten deze wijziging (`ScrollFadeInUp.tsx`, `Home.tsx`).

### 53) Workshoppagina uitgebreid met geselecteerde weekend-secties en eindvolgorde
- Gewijzigd: `client/pages/OntwikkelingWorkshops.tsx` bevat nu naast hero ook `Jouw Transformatie`, `Voor wie`, testimonials en FAQ.
- Gewijzigd: de huidige workshop-sectie (oude sectie 1) staat nu als laatste op de pagina, conform verzoek.
- Gewijzigd: `client/pages/Retreats.tsx` bevat weer de introductiesectie met kaarten naar `Weekend trainingen` en `Dag workshops`.

### 54) FAQ verwijderd van workshoppagina
- Gewijzigd: `Veelgestelde Vragen`-sectie verwijderd uit `client/pages/OntwikkelingWorkshops.tsx`.
- Gewijzigd: bijbehorende FAQ-state en icon-imports (`Plus`/`Minus`) opgeschoond.

## 2026-02-18

### 1) `Weekendtrainingen` opgeschoond naar subpagina met alleen secties 2-8
- Gewijzigd: `client/pages/Weekenden.tsx` bevat nu geen hero, geen gecombineerde introsectie en geen FAQ meer.
- Behouden secties: `De Drie Pijlers`, `Beleef de Weekend Training`, `Jouw Transformatie`, `Op een inspirerende locatie`, `Voor wie`, `RetreatTestimonialsSection`, `Weekend Trainingen` highlight.
- Gewijzigd: ongebruikte imports/state verwijderd (`HeroSection`, `Plus`, `Minus`, `expandedFaq`, `faqs`).

### 2) Navigatie-linkcontrole voor weekend-subpagina
- Gecontroleerd: links naar weekendtrainingen verwijzen naar `/groepstrainingen/weekenden#drie-pijlers` in:
  - `client/pages/Retreats.tsx`
  - `client/components/Layout.tsx`
- Routecontrole: `client/App.tsx` bevat route naar `Weekenden` op `/groepstrainingen/weekenden`.

### 3) Validatiebeperking in deze shell
- `pnpm` is in deze omgeving niet beschikbaar (`command not found`), daarom kon geen typecheck met `pnpm typecheck` draaien.
- Reusable beslissing: bij afwezige package manager altijd expliciet melden en wijzigingen beperken tot gerichte, veilige file-edits.

### 4) Menu-link `Weekend trainingen` naar nieuwe URL gezet
- Gewijzigd: submenu-link in `client/components/Layout.tsx` wijst nu naar `/persoonlijke-ontwikkeling-weekend-training`.
- Gewijzigd: route toegevoegd in `client/App.tsx` zodat `/persoonlijke-ontwikkeling-weekend-training` de `Weekenden`-pagina rendert.

### 5) Hero teruggezet op `Weekend trainingen`
- Gewijzigd: `client/pages/Weekenden.tsx` gebruikt weer `HeroSection` bovenaan de pagina.
- Inhoud: titel `Weekend trainingen` met bijpassende subtitle voor commerciële intent.

### 6) SEO + CRO doorgevoerd op `Weekend trainingen` en `Dag workshops`
- Gewijzigd: canonical weekend-URL afgedwongen met redirect in `client/App.tsx` van `/groepstrainingen/weekenden` naar `/persoonlijke-ontwikkeling-weekend-training`.
- Gewijzigd: interne links naar weekend geüpdatet in `client/pages/Retreats.tsx` naar de canonieke URL.
- Gewijzigd: `client/components/HeroSection.tsx` ondersteunt nu optioneel `headingTag` zodat per pagina een semantisch juiste H1-structuur mogelijk is.
- Gewijzigd: `client/pages/Weekenden.tsx` uitgebreid met compacte commerciële intro bovenaan (H1, primaire/secondaire CTA, kerninformatie inclusief investering/plekken en social proof).
- Gewijzigd: CTA-copy op weekendpagina aangescherpt naar intent-zuivere labels (`Bekijk data & beschikbaarheid`, `Reserveer je plek`).
- Gewijzigd: `client/pages/OntwikkelingWorkshops.tsx` herbouwd met klikbare workshopcards naar anchor-secties, datum + vanaf-prijs op cards, detailblokken per workshop en extra CRO-secties (`Wat je krijgt`, `Praktisch`, `Voor wie niet`) plus tweede CTA-pad.
- Gewijzigd: route-specifieke SEO toegevoegd op beide pagina's via `useEffect`: title, meta description, canonical link en JSON-LD structured data (`Event`).
- Gewijzigd: `index.html` naar `lang="nl"`, basis-title en basis-meta description.
- Validatie: `npm run -s typecheck` geeft alleen bestaande fouten buiten deze scope (`client/components/ScrollFadeInUp.tsx`, `client/pages/Home.tsx`).

### 7) Groeiscan op homepage toegevoegd met n8n/Mailchimp leadflow
- Gewijzigd: nieuwe component `client/components/GroeiScanSection.tsx` met 7-staps scan (meerkeuze), progress indicator, uitslag en leadformulier met alleen naam + e-mail na uitslag.
- Gewijzigd: `client/pages/Home.tsx` toont de Groeiscan direct na de sectie `Evenementen voor persoonlijke ontwikkeling`.
- Gewijzigd: nieuw server endpoint `POST /api/groeiscan/lead` in `server/routes/groeiscan.ts` en geregistreerd in `server/index.ts`.
- Integratie: endpoint stuurt scan-data door naar `https://guidocroon.com/n8n/webhook-test/Groeiscan` (of `N8N_GROEISCAN_WEBHOOK_URL`), met `double_opt_in: true`.
- Gewijzigd: gedeelde request-types toegevoegd in `shared/api.ts` voor consistente payloadstructuur.
- Validatie: `npm run -s typecheck` uitgevoerd; alleen bestaande fouten buiten deze scope (`client/components/ScrollFadeInUp.tsx`, `client/pages/Home.tsx` Sanity typefouten).

### 8) Groeiscan CTA uitgebreid met reset + kennismaking
- Gewijzigd: in `client/components/GroeiScanSection.tsx` is naast `Stuur mijn advies` een `Opnieuw`-actie toegevoegd met reset-icoon.
- Gewijzigd: leadbloktekst aangepast naar `Ontvang persoonlijk advies, of plan een kennismaking in` met directe Calendly-link.
- Gewijzigd: ook in de successtatus blijft de Calendly-optie zichtbaar.

### 9) Groeiscan uitgebreid met pijnpuntvraag en conditionele CTA's
- Gewijzigd: extra eindvraag toegevoegd in `client/components/GroeiScanSection.tsx` met focus op grootste actuele pijnpunt.
- Gewijzigd: uitslag-CTA's zijn nu conditioneel op antwoord `next_step`.
- Bij `Eerst een laagdrempelige kennismaking`: primaire CTA wordt `Bekijk Dag Workshops` en secundaire CTA wordt `Plan een vrijblijvende kennismaking in` (Calendly).
- Overige gevallen: primaire CTA blijft weekendgericht en secundair `Bekijk Dag Workshops`.

### 10) Cookie pop-up in huisstijl toegevoegd
- Gewijzigd: nieuwe globale component `client/components/CookieConsentBanner.tsx` met keuzes `Alle cookies accepteren`, `Alleen noodzakelijk` en instelbare categorieen (`Analytics`, `Marketing`).
- Gewijzigd: consent wordt opgeslagen in `localStorage` onder `yww_cookie_consent_v1` met timestamp.
- Gewijzigd: component sitebreed geladen via `client/components/Layout.tsx` zodat de banner op alle pagina's werkt.

### 11) Footerlink voor cookiebeheer toegevoegd
- Gewijzigd: `Beheer cookies` knop toegevoegd in de footer van `client/components/Layout.tsx`.
- Gewijzigd: `client/components/CookieConsentBanner.tsx` luistert nu naar het event `yww:open-cookie-settings` en opent direct de instellingenweergave.
- Resultaat: bezoekers kunnen op elk moment hun cookievoorkeuren aanpassen.

### 12) Sitebrede Vraagbaak MVP + cookiebeheer aangepast
- Gewijzigd: nieuwe zwevende widget `client/components/VraagbaakWidget.tsx` (rechtsonder) met vrije vraagmodus, website-gebaseerde antwoordbank, intakeflow van 5 vragen en `Sla over` op elke intakevraag.
- Gewijzigd: lead-trigger na 3 interacties (berichten + intakestappen) met CTA `Plan vrijblijvende intake` (Calendly) en alternatief `Stuur me suggesties per mail`.
- Gewijzigd: chatgeschiedenis en intakevoortgang worden opgeslagen in `localStorage` onder `yww_vraagbaak_state_v1`.
- Gewijzigd: nieuw backend endpoint `POST /api/vraagbaak/lead` in `server/routes/vraagbaak.ts`, geregistreerd in `server/index.ts`, doorsturing naar n8n met `double_opt_in: true`.
- Gewijzigd: `Beheer cookies` knop verplaatst naar linksonder in `client/components/Layout.tsx` en verdwijnt na consent; consent-updates triggeren nu een custom event vanuit `client/components/CookieConsentBanner.tsx`.
- Validatie: `npm run -s typecheck` geeft alleen bestaande fouten buiten scope (`client/components/ScrollFadeInUp.tsx`, `client/pages/Home.tsx` Sanity typefouten).

### 13) Vraagbaak: eerst naam/e-mail, geen mail-suggestie optie
- Gewijzigd: in `client/components/VraagbaakWidget.tsx` moet bezoeker nu eerst naam + e-mail invullen voordat chat/intake beschikbaar wordt.
- Gewijzigd: optie `Stuur me suggesties per mail` volledig verwijderd uit de UI en uit intake-antwoorden.
- Gewijzigd: warm-lead blok toont nu alleen intake-route met Calendly CTA.

### 14) Nieuwe sectie `De balans tussen denken en voelen` op weekend + homepage
- Gewijzigd: uitgebreide sectie toegevoegd op `client/pages/Weekenden.tsx` met twee componenten in 1 blok: `Ademsessie (breathwork)` en `Yogalessen`.
- Gewijzigd: Chris Rauwendaal en Liene Molendijk worden elk met een korte 1-zin context genoemd.
- Gewijzigd: compacte teaser-versie toegevoegd op `client/pages/Home.tsx` met CTA `Bekijk weekendintensive` naar de weekendpagina.
- Assets: gebruikt uit `public/` (`ademwerk.png`, `breathwork-sessie.png`, `yoga-weekend-persoonlijke-ontwikkeling.HEIC`).

### 15) Lazy-loading op afbeeldingen sitebreed doorgevoerd
- Gewijzigd: alle `<img>` elementen binnen `client/` voorzien van `loading="lazy"` voor technische SEO en performance.
- Controle: repo-brede scan gedaan op ontbrekende `loading="lazy"` binnen `client/` en geen missende gevallen gevonden.

### 16) Yoga-foto van Liene definitief gefixt
- Oorzaak: HEIC-bestand was niet web-compatibel in browser.
- Gewijzigd: HEIC omgezet naar `public/yoga-weekend-persoonlijke-ontwikkeling.png`.
- Gewijzigd: verwijzingen in `client/pages/Home.tsx` en `client/pages/Weekenden.tsx` wijzen nu naar deze lokale PNG.

### 17) Kadering aangepast + volledige balans-sectie op homepage
- Gewijzigd: beeldkadering geoptimaliseerd op beide pagina's: Chris-foto toont meer bovenkant (`objectPosition: center 20%`), yoga-foto meer onderkant (`objectPosition: center 78%`).
- Gewijzigd: compacte homepage-versie van `De balans tussen denken en voelen` vervangen door de volledige sectie-inhoud van de weekendtrainingpagina.

### 18) Groeiscan: onderkant wit/roze aansluiting zonder tussenruimte
- Datum: 2026-02-18
- Gewijzigd: `client/components/GroeiScanSection.tsx` aangepast zodat de vraagkaart (wit) en onderbalk (roze) in dezelfde parent zitten met `overflow-hidden`.
- Gewijzigd: verticale ruimte tussen beide lagen verwijderd (geen `mt/mb` tussen de blokken) en radius logisch opgesplitst (`rounded-b-none` boven, `rounded-t-none` onder).
- Gewijzigd: onderste wrapper-padding verwijderd (`pb-0`) zodat er onderaan geen extra roze witruimte meer zichtbaar is.
- Wat ging mis: lokale check met `pnpm` niet mogelijk (`pnpm: command not found`) in deze shell.
- Reusable decision: voor strak gestapelde kaarten altijd 1 container gebruiken met `overflow-hidden` + gesplitste radius per laag in plaats van losse marges/gaps.

### 19) Groeiscan: roze onderruimte met 130px verminderd
- Datum: 2026-02-18
- Gewijzigd: `client/components/GroeiScanSection.tsx` `min-h` van roze container verlaagd van `700/720` naar `570/590` (exact -130px).
- Ongewijzigd: breedte en border-radius.
- Resultaat: minder bottom height in het roze blok, zonder layout-breedte aan te passen.

### 20) Homepage sectievolgorde aangepast (balans/organisaties/groeiscan)
- Datum: 2026-02-18
- Gewijzigd: `client/pages/Home.tsx`.
- `FloatingBrandsSection` ("Krachtige vrouwen bij deze organisaties gingen je voor") verplaatst naar direct na de sectie `De balans tussen denken en voelen`.
- `GroeiScanSection` verplaatst naar direct na de sectie `Weekend trainingen & Dag workshops`.
- Geen inhoudelijke/visuele wijzigingen buiten de volgorde.

### 21) Homepage: Onze Coaches direct na Ervaringen
- Datum: 2026-02-18
- Gewijzigd: `client/pages/Home.tsx` sectievolgorde aangepast.
- `Onze Coaches` staat nu direct na `RetreatTestimonialsSection` (ervaringen).
- `Next Retreat Section` verplaatst naar onder `Onze Coaches`.

### 22) CTA toegevoegd in Onze Coaches
- Datum: 2026-02-18
- Gewijzigd: `client/pages/Home.tsx`.
- In de sectie `Onze Coaches` een extra knop toegevoegd: `Lees ons unieke verhaal` met link naar `/ons-verhaal`.

### 23) Weekend `Inclusief` uitgebreid met breathwork + yoga
- Datum: 2026-02-18
- Gewijzigd: `client/pages/Weekenden.tsx` in de `Inclusief`-lijst toegevoegd:
  - `Ademsessie (breathwork) met Chris Rauwendaal`
  - `Yogalessen met Liene Molendijk`
- Gewijzigd: dezelfde twee items ook toegevoegd in het weekend `Wat is Inbegrepen` blok op `client/pages/Home.tsx` voor consistentie.

### 24) Naam verwijderd uit `Inclusief` yoga-item
- Datum: 2026-02-18
- Gewijzigd: tekst aangepast van `Yogalessen met Liene Molendijk` naar `Yogalessen`.
- Doorgevoerd in `client/pages/Weekenden.tsx` en `client/pages/Home.tsx`.

### 25) Nieuwe transactionele SEO-pagina voor weekendevent + kalenderkoppeling
- Datum: 2026-02-18
- Nieuw: `client/pages/WeekendIntensiveTransactie.tsx` aangemaakt op route `/weekendintensive-12-14-juni-2026`.
- Inhoud: geen hero, wel H1; transactionele opzet met sticky boekingskolom, 3 pakketopties (solo, duo met 10% korting, werkgever/factuur) en `Inquire` via vooringevulde mailto naar `info@youngwisewomen.nl`.
- CRO: schaarste toegevoegd met `5 van 8 plekken gereserveerd`, plus visuele social proof met ronde, geblurde avatars.
- Praktisch: expliciet opgenomen `8 deelneemsters`, `4 slaapkamers`, `bedden kunnen uit elkaar`.
- Layout: tekst compacter gemaakt met extra 2-koloms fotoblok (2 beelden) tussendoor.
- SEO/AI search: page-specifieke title, meta description, canonical en JSON-LD (`Event` met `Offer`s + `FAQPage`).
- Router: nieuwe route geregistreerd in `client/App.tsx`.
- Kalender-CTA: `client/pages/Kalender.tsx` hoofdknop verwijst nu naar de nieuwe transactiespagina.
- Event-kalender tooltip-CTA: `client/components/EventCalendar.tsx` verwijst voor weekendevents naar de nieuwe transactiespagina en voor workshopevents naar `/groepstrainingen/ontwikkeling-workshops`.
- Validatie: `npm run -s typecheck` uitgevoerd; bestaande pre-existente fouten buiten scope blijven aanwezig in `client/components/ScrollFadeInUp.tsx` en `client/pages/Home.tsx`.

### 26) Transactionele weekendpagina aangescherpt (slug, productselectie, FAQ, video)
- Datum: 2026-02-18
- Slug verkort naar `/weekendintensive-juni-2026` en alle interne links bijgewerkt in `client/App.tsx`, `client/pages/Kalender.tsx`, `client/components/EventCalendar.tsx`, `client/pages/WeekendIntensiveTransactie.tsx`.
- Productkeuze aangepast: in plaats van losse `Inquire` links per kaart nu 1 selectiemechanisme (radio: kies 1 van 3 producten) + 1 centrale `Inquire nu` knop met gekozen pakket in de aanvraag.
- FAQ uitgebreid en afgestemd op de weekendpagina-inhoud: doelgroep, wanneer/waar, inbegrepen onderdelen, plekken/kamers en facturatie via werkgever.
- Onder `Praktisch` toegevoegd: videoblok met eerst een foto; bij hover schakelt deze naar embedded YouTube playback (`https://www.youtube.com/watch?v=3djy4-X1-3s`).
- Validatie: `npm run -s typecheck` uitgevoerd; bestaande pre-existente fouten blijven in `client/components/ScrollFadeInUp.tsx` en `client/pages/Home.tsx`.

### 27) Schaarsteblok transactiespagina gefixt (overlap + aantallen)
- Datum: 2026-02-18
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Overlap opgelost door avatars en tekst onder elkaar te plaatsen i.p.v. naast elkaar.
- Aantallen aangepast naar `3 van 8 plekken al gereserveerd` en `Nog 5 plekken beschikbaar`.

### 28) Inquire succesmelding toegevoegd
- Datum: 2026-02-18
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Na klik op `Inquire nu` verschijnt nu een success-melding met bedanktekst en ondertekening: `Hartelijke groet, Ella`.
- Mailto-flow blijft actief (aanvraag opent nog steeds e-mailclient).

### 29) Inquire-flow met formulier vóór verzenden
- Datum: 2026-02-18
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- `Inquire nu` opent nu eerst een kort formulier (naam + e-mail verplicht, telefoon en opmerking optioneel).
- Na `Verstuur aanvraag` wordt pas de mailaanvraag opgebouwd met ingevulde gegevens en verschijnt de successmelding.
- Validatie toegevoegd op verplichte velden met foutmelding.

### 30) Videoblok los onder Praktisch geplaatst
- Datum: 2026-02-18
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- De video is uit het `Praktisch`-blok gehaald en in een aparte sectie direct eronder geplaatst.
- Titel toegevoegd: `Hoe andere deelneemsters het ervaren:`.
- Hover-play gedrag van de video is behouden.

### 31) CTA's voor eerstvolgende weekendtraining doorgezet naar transactionele URL
- Datum: 2026-02-18
- Doel-URL: `/weekendintensive-juni-2026`.
- Gewijzigd in `client/pages/Weekenden.tsx`: CTA's `Bekijk data & beschikbaarheid`, `Bekijk weekendintensive` en `Reserveer je plek` verwijzen nu naar de transactionele pagina.
- Gewijzigd in `client/pages/Home.tsx`: CTA `Plaats je Reservering` in de sectie `Volgende weekend intensive editie` verwijst nu naar de transactionele pagina.
- Extra consistentie: jaartal in die homesectie aangepast naar `12-14 juni 2026`.
- Reeds actief: kalender-CTA's in `client/pages/Kalender.tsx` en `client/components/EventCalendar.tsx` wijzen al naar deze URL voor weekend-events.

### 32) Favicon + logo naar lokale `public` assets gezet
- Datum: 2026-02-19
- Gewijzigd: `index.html` en `client/components/Layout.tsx`.
- Favicon gekoppeld aan `/favicon-young-wise-women.svg` met PNG fallback `/favicon-young-wise-women.png`.
- Header- en footer-logo vervangen van externe URL naar lokaal `/logo-young-wise-women.svg`.
- Wat ging mis: geen functionele issues; wel ontbrak eerder een expliciete favicon-link in `index.html`.
- Herbruikbare beslissing: merkassets altijd via `public` en root-paden (`/bestandsnaam`) koppelen om externe afhankelijkheden te vermijden.

### 33) Meest recente geuploade favicon/logo geactiveerd
- Datum: 2026-02-19
- Gewijzigd: `index.html` en `client/components/Layout.tsx`.
- Op basis van laatste uploadtijd in `public/` overgezet naar:
  - favicon: `/favicon.svg` (met fallback `/favicon.ico`)
  - logo: `/young-wise-women-logo.png` (header + footer)
- Wat ging mis: geen functionele issues.
- Herbruikbare beslissing: bij meerdere merk-bestanden altijd eerst op modified timestamp valideren vóór referenties aanpassen.

### 34) Headerlogo linksboven vergroot
- Datum: 2026-02-19
- Gewijzigd: `client/components/Layout.tsx`.
- Headerlogo vergroot van `h-16` naar `h-20` voor betere zichtbaarheid in de topnavigatie.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: logo-schaal in header tunen via Tailwind hoogteklasse, zonder footerlogo mee te schalen.

### 35) Laatste geuploade logo opnieuw doorgezet
- Datum: 2026-02-19
- Gewijzigd: `client/components/Layout.tsx`.
- Nieuwste logo in `public/` (`/LOGO.png`) gekoppeld voor zowel header als footer.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: bij nieuwe uploads met afwijkende bestandsnaam/casing (`LOGO.png`) expliciet pad exact overnemen.

### 36) Allerlaatste logo-update doorgezet
- Datum: 2026-02-19
- Gewijzigd: `client/components/Layout.tsx`.
- Nieuwste logo-bestand in `public/` (`/logo-yww.png`) gekoppeld voor header en footer.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: voor elke nieuwe upload eerst timestamp-check doen en daarna paden direct consistent op beide logoposities vervangen.

### 37) Nieuwste logo-bestand opnieuw gekoppeld
- Datum: 2026-02-20
- Gewijzigd: `client/components/Layout.tsx`.
- Header- en footer-logo bijgewerkt van `/logo-yww.png` naar het meest recent geuploade bestand `/logo-young-wise-women.png` in `public/`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: bij logo-swaps altijd modified timestamp in `public/` controleren en beide logo-posities (header + footer) in één wijziging synchroniseren.

### 38) Footerjaar automatisch op huidig jaar gezet
- Datum: 2026-02-20
- Gewijzigd: `client/components/Layout.tsx`.
- Hardcoded footerjaar (`© 2025`) vervangen door dynamisch jaar via `new Date().getFullYear()` (`© {currentYear}`).
- Wat ging mis: geen issues.
- Herbruikbare beslissing: datums/jaartallen in UI die jaarlijks wijzigen standaard dynamisch renderen om handmatig onderhoud te voorkomen.

### 39) Favicon bijgewerkt naar nieuw bestand
- Datum: 2026-02-21
- Gewijzigd: `index.html`.
- Favicon verwijzing aangepast naar het nieuwe bestand in `public/`: `/YWW%20Favicon.svg` met PNG-fallback `/logo-yww.png`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: bij bestandsnamen met spaties in `public/` altijd URL-encoding (`%20`) gebruiken in HTML-referenties.

### 40) Nieuwste logo doorgezet
- Datum: 2026-02-21
- Gewijzigd: `client/components/Layout.tsx`, `index.html`.
- Nieuwste geuploade logo (`/Logo-Young-Wise-Women.png`) gekoppeld voor header, footer en PNG icon-fallback.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: logo-updates altijd baseren op `ls -lt public` en alle zichtbare merkverwijzingen in dezelfde wijziging synchroniseren.

### 41) Vraagbaak betrouwbaarder gemaakt bij API-storing
- Datum: 2026-02-21
- Gewijzigd: `client/components/VraagbaakWidget.tsx`.
- Vraagbaak start niet meer geblokkeerd bij mislukte `/api/vraagbaak/lead` call; profiel wordt lokaal geactiveerd en gebruiker kan doorgaan.
- Lead payloads sturen nu echte `chatMessages` en `intakeAnswers` mee i.p.v. lege arrays, inclusief stille synchronisatie na chat/intake interacties.
- Extra invoercontrole toegevoegd voor e-mailformaat vóór submit.
- Wat ging mis: projectbrede typecheck faalt nog op bestaande issues buiten de vraagbaak (`client/components/ScrollFadeInUp.tsx`, `client/pages/Home.tsx`).
- Herbruikbare beslissing: kritieke UX-flows (chat/intake) niet blokkeren op externe webhook-beschikbaarheid; backend-sync best effort uitvoeren.

### 42) Vraagbaak triggerknop naar avatar-bubble
- Datum: 2026-02-21
- Gewijzigd: `client/components/VraagbaakWidget.tsx`.
- Tekstknop “Vraagbaak met Ella” vervangen door ronde knop met Ella-foto en badge `1` in terracotta (`#B46555`) rechtsboven.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: compacte chat-trigger als avatar + badge gebruiken voor minder visuele ruis en hogere herkenbaarheid.

### 43) Tarieven juni-transactiepagina aangepast
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Particulier tarief aangepast naar `€ 850` excl. BTW.
- Werkgeverstarief aangepast naar vaste prijs `€ 1450` excl. BTW (tekst niet langer “factuur op maat”).
- Structured data (`Offer`) voor werkgever aangevuld met vaste prijs `1450`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: bij prijsupdates op transactionele pagina altijd zowel UI-copy als JSON-LD offer-prijs synchroniseren.

### 44) Werkgever-optie uitgebreid met factuurvelden
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Bij selectie “Betaald vanuit werkgever (factuur)” toont het aanvraagformulier nu extra velden voor facturatie.
- Verplicht gemaakt: werkgevernaam, factuur e-mail, KvK, BTW-nummer, straat, huisnummer, postcode en plaats.
- Optioneel toegevoegd: referentie/afdeling en inkoopnummer (PO).
- Deze gegevens worden nu ook meegenomen in de `mailto` aanvraagtekst.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: employer-flow altijd voorzien van conditionele, verplichte factuurvelden i.p.v. generieke contactvelden alleen.

### 45) Werkgever-flow uitgebreid met betaalroute (factuur/platform)
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Bij werkgever-inschrijving is nu expliciete keuze toegevoegd: `Op factuur` of `Via platform (bijv. Alleo)`.
- Bij platform-keuze is `platformnaam` verplicht.
- Betaalroute en platformnaam worden nu meegestuurd in de aanvraag (`mailto`).
- Wat ging mis: geen issues.
- Herbruikbare beslissing: zakelijke inschrijving altijd laten specificeren via welke betaalroute de organisatie afrekent.

### 46) Transactionele juni-pagina SEO-proof gemaakt (zonder designwijzigingen)
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- H1, subheadline, SEO-intro, semantische H2-secties, resultaten- en inbegrepen-lijsten toegevoegd met logische headingstructuur.
- FAQ-sectie uitgebreid naar 8 vragen + JSON-LD `FAQPage`; structured data aangevuld met `Event` en `Organization`.
- Metadata geoptimaliseerd: nieuwe meta title/description, canonical, Open Graph tags inclusief `og:image`.
- Interne links toegevoegd naar persoonlijke ontwikkeling (`/groepstrainingen`), bedrijfstrajecten (`/in-company`) en inspiratie (`/inspiratie`).
- CTA “Boek jouw plek” toegevoegd met scroll naar `Inquire now` en subtiele pulse van 2 seconden, met respect voor `prefers-reduced-motion`.
- Wat ging mis: projectbrede typecheck faalt nog op bestaande, niet-gerelateerde issues in `client/components/ScrollFadeInUp.tsx` en `client/pages/Home.tsx`.
- Herbruikbare beslissing: SEO-aanpassingen op transactionele pagina’s combineren met valide JSON-LD en minimale UI-impact voor behoud van performance en ontwerpconsistentie.

### 47) Homepage prijs aangepast van €1.450 naar €850
- Datum: 2026-02-21
- Gewijzigd: `client/pages/Home.tsx`.
- Investeringstarief op homepage aangepast van `€1.450` naar `€850`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: prijswijzigingen eerst gericht doorvoeren op transactionele en homepage prijsblokken om inconsistentie te voorkomen.

### 48) Doelgroep-leeftijd gecorrigeerd naar 24-29
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Leeftijdsrange aangepast van `24–35` naar `24–29` in subheadline, meta description en FAQ-tekst.
- Wat ging mis: eerdere range stond te breed.
- Herbruikbare beslissing: doelgroep-range in content en metadata altijd synchroon houden met productdefinitie.

### 49) Woordgebruik aangepast: 'retreat' verwijderd
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Alle vermeldingen van `retreat` vervangen door `training`, `trainingsweekend` of `weekend training` in FAQ, metadata, JSON-LD, body-copy en alt-tekst.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: terminologie op transactionele pagina's centraal consistent houden met gekozen positioneringstaal.

### 50) Transactionele pakketten herpositioneerd naar werkgever-first
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Pakketvolgorde aangepast naar: 1) werkgever (voorkeur), 2) duo, 3) particulier (uitzondering).
- Standaardselectie gewijzigd naar `Betaald vanuit werkgever (factuur)`.
- Particulier pakket toont geen prijs meer; copy verduidelijkt gereduceerd uitzonderingstarief met beperkte beschikbaarheid.
- Duotarief aangepast naar bedrijfstarief-basis (`2 x €1450` = `€2900` totaal excl. BTW voor 2 personen).
- FAQ-prijsantwoord en Event-offers aangepast op nieuwe prijslogica (werkgever + duo met vaste prijs, particulier zonder expliciet prijsbedrag).
- Wat ging mis: geen issues.
- Herbruikbare beslissing: transactionele pakketvolgorde altijd laten starten met commerciële voorkeursroute en alternatieven als expliciete uitzonderingsflow positioneren.

### 51) Duo-prijslogica aangepast + veld Naam vriendin
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Duo-prijs aangepast naar werkgeverstarief per persoon met 10% korting (`€1305 p.p.`), totaal `€2610` excl. BTW.
- Nieuw conditioneel formulier-veld toegevoegd bij duo-optie: `Naam vriendin *`.
- Validatie toegevoegd: bij duo-selectie is naam vriendin verplicht.
- Naam vriendin wordt nu meegestuurd in de aanvraagtekst (`mailto`).
- Wat ging mis: geen issues.
- Herbruikbare beslissing: duo-pakketten expliciet per-persoon tarief tonen én partner-identificatie opnemen voor operationele opvolging.

### 52) YouTube preview-afbeelding gelijkgetrokken met video-thumbnail
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Statische preview-foto in videoblok vervangen door de echte YouTube-thumbnail van hetzelfde video-ID (`img.youtube.com`).
- Video-embed URL nu opgebouwd vanuit één gedeelde `VIDEO_ID` voor consistentie tussen preview en iframe.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: video-preview altijd afleiden van hetzelfde video-ID als de iframe-bron om mismatch te voorkomen.

### 53) Aangeleverde testimonial-afbeelding gebruikt als video-preview
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Preview-afbeelding van het YouTube-blok aangepast naar `/persoonlijke-ontwikkeling-training-vrouwen-testimonial-yww.png`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: bij expliciet aangeleverde merkassets de exacte bestandsnaam uit `public/` direct gebruiken als primaire visual.

### 54) Slug transactiepagina gewijzigd naar lange SEO-slug
- Datum: 2026-02-21
- Gewijzigd: `client/App.tsx`, `client/pages/WeekendIntensiveTransactie.tsx`, `client/pages/Weekenden.tsx`, `client/pages/Home.tsx`, `client/components/EventCalendar.tsx`, `client/pages/Kalender.tsx`.
- Nieuwe slug ingesteld: `/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026`.
- Interne links naar de oude slug bijgewerkt naar de nieuwe slug.
- Redirect toegevoegd van oude slug `/weekendintensive-juni-2026` naar de nieuwe slug om bestaande links te behouden.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: bij slug-wijzigingen altijd zowel route als alle interne verwijzingen updaten en een backward-compatible redirect toevoegen.

### 55) Inquire now scroll/focus gedrag gefixt
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- `Inquire now` opent nu altijd direct het formulier (niet meer togglen) en scrollt meteen naar de formuliersectie.
- Focus gaat direct naar het eerste naamveld zodat invoer meteen kan starten.
- Zowel de CTA-link als de sidebar-knop gebruiken nu dezelfde `scrollToInquiry` flow.
- Wat ging mis: eerder moest gebruiker alsnog handmatig doorscrollen naar de velden.
- Herbruikbare beslissing: CTA’s die naar formulieren verwijzen altijd koppelen aan open+scroll+focus in één consistente handler.

### 56) Aangeleverde investering/inbegrepen copy verwerkt op transactionele pagina
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Inhoud van `Wat is inbegrepen?` geüpdatet met aangeleverde punten (intake, self-assessment €145, 2 coaches, catering, 2 nachten accommodatie).
- Werkgeverkaart copy aangepast naar `Je eenmalige investering` met `€1450 ex. BTW`.
- Termijnbetalingstekst toegevoegd: mogelijkheid tot betalen in 3 termijnen.
- Gereduceerd tarief-tekst toegevoegd voor gevallen zonder werkgeversvergoeding.
- Groepsaanvraagtekst toegevoegd inclusief contactmail `info@awarenessinbusiness.com`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: commerciële kerncopy op transactionele pagina bundelen in bestaande secties (inbegrepen, investering, voorwaarden) voor consistentie zonder layoutwijziging.

### 57) FAQ-tekst exact overgenomen + losse termijnblok verwijderd + favicon teruggezet
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`, `index.html`.
- FAQ bijgewerkt met aangeleverde tekst over `Paticulier solo reis` en betaling in 3 termijnen.
- Losse tekstblok onder de pakketkaarten (termijnen/gereduceerd tarief) verwijderd zoals gevraagd.
- Favicon teruggezet naar enkel de originele verwijzing (`/YWW%20Favicon.svg`) en logo-fallback verwijderd.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: beleidsuitleg die op meerdere plekken staat centraliseren in FAQ als dat expliciet gewenst is.

### 58) FAQ-vraagvormen, CTA-interactie en datum aangepast op transactionele pagina
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- FAQ-teksten herschreven naar vraagvormen:
  - `Wat betekent 'Particulier solo reis' als je niet via je werkgever kunt deelnemen?`
  - `Kan ik als particulier betalen in 3 termijnen?`
- Tekst over groepsretreats + extern mailadres vervangen door verwijzing naar bedrijfstrajecten op aanvraag met interne link naar `/in-company`.
- Interactie gefixt:
  - CTA `Ga naar Inquire now` blijft scrollen + pulsen.
  - Sidebar knop `Inquire now` opent alleen het formulier (geen scroll-jump, geen pulse).
- Datums geüpdatet naar `24-26 juni 2026` in UI, mail-onderwerp en JSON-LD (`startDate`/`endDate`).
- Wat ging mis: geen issues.
- Herbruikbare beslissing: CTA-gedrag scheiden per context (navigatie-CTA vs. lokale actieknop) om onverwachte scroll/animatie te voorkomen.

### 59) Duo-optie gebruikt nu ook bedrijfs-/factuurflow
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Bij `Samen met een vriendin` zijn bedrijfs- en factuurgegevens nu net als bij werkgever verplicht en zichtbaar.
- `Naam vriendin` blijft het extra onderscheidende veld voor de duo-optie.
- Validatie en `mailto` payload sturen deze bedrijfsgegevens nu ook mee voor duo-inschrijvingen.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: wanneer duo op werkgeverstarief is gebaseerd, dezelfde zakelijke intakevelden afdwingen voor consistente afhandeling.

### 60) Duo totaalregel verwijderd uit prijskaart
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Regel `totaal excl. BTW (voor 2 personen): € 2.610` verwijderd uit de duo-optie.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: alleen prijslabels tonen die commercieel nodig zijn voor de gekozen funnelstap.

### 61) Duo-label aangepast naar vriendin/collega
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Benaming aangepast van `Samen met een vriendin` naar `Samen met een vriendin/collega*` in weergave en pakketwaarde.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: productlabels consistent doorvoeren in UI én onderliggende pakketwaarden om validatie/payloads stabiel te houden.

### 62) Aanvraagcopy aangepast naar weekenden op aanvraag
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Tekst aangepast naar: `Weekenden op aanvraag*` voor groepen young professionals, met bestaande link naar de bedrijfspagina.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: korte terminologie-aanpassingen direct in bestaande contentblokken doorvoeren zonder layoutwijzigingen.

### 63) Duo btw-label en particulier prijslabel aangepast
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Bij duo-prijs (`€ 1.305 p.p.`) expliciet label `excl. BTW` toegevoegd.
- Bij `Particulier solo reis` toegevoegd: `Prijs in overleg`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: prijslabels altijd direct voorzien van btw-context en commerciële statuslabel waar relevant.

### 64) Inquire now in sidebar scrollt nu direct naar invulvelden
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Sidebar-knop `Inquire now` opent niet alleen het formulier, maar scrollt nu direct naar het formulier en focust op het naamveld.
- Smooth scroll respecteert `prefers-reduced-motion`.
- Wat ging mis: eerder moest gebruiker alsnog handmatig naar de velden navigeren.
- Herbruikbare beslissing: formulier-CTA’s altijd koppelen aan open + scroll + focus om drop-off tussen klik en invullen te verlagen.

### 65) Sterretje verwijderd bij aanvraagtekst
- Datum: 2026-02-21
- Gewijzigd: `client/pages/WeekendIntensiveTransactie.tsx`.
- Tekst aangepast van `Weekenden op aanvraag*` naar `Weekenden op aanvraag`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: microcopy symbolen zoals `*` alleen gebruiken als er direct een bijbehorende toelichting staat.

### 66) Footerbeschrijving geactualiseerd
- Datum: 2026-02-21
- Gewijzigd: `client/components/Layout.tsx`.
- Footertekst aangepast naar nieuwe positionering met toevoeging: `Trainingen, Workshops en Bedrijfstrajecten op maat`.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: kernpropositie in footer compact combineren met doelgroepsbeschrijving voor consistente sitebrede messaging.

### 67) Netwerkpagina checkboxtekst aangepast naar WhatsApp Community groepchats
- Datum: 2026-02-21
- Gewijzigd: `client/pages/LidWorden.tsx`.
- Tekst gewijzigd van `WhatsApp Netwerk` naar `WhatsApp Community groepchats` in de inschrijfformulier-checkbox.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: community-termen in opt-in copy expliciet en concreet benoemen voor duidelijkere verwachting bij inschrijving.

### 68) Testimonial quote-symbool visueel aangepast naar outlined dubbele quotes
- Datum: 2026-02-21
- Gewijzigd: `client/components/RetreatTestimonialsSection.tsx`, `client/components/TestimonialsCarousel.tsx`.
- Huidige quote-glyf vervangen door een outlined dubbele-quote variant boven testimonialteksten, in lijn met aangeleverde referentiestijl.
- Wat ging mis: exacte referentie-afbeelding stond nog niet als los bestand in `public/`.
- Herbruikbare beslissing: bij aangeleverde visuele referenties eerst een stijlnabootsing doorvoeren en daarna 1-op-1 image-koppeling zodra het asset-bestand beschikbaar is.

### 69) Testimonial quotesymbool gekoppeld aan echt assetbestand
- Datum: 2026-02-21
- Gewijzigd: `client/components/RetreatTestimonialsSection.tsx`, `client/components/TestimonialsCarousel.tsx`.
- Tijdelijke outlined tekst-quote vervangen door daadwerkelijk beeldasset `public/quotation.svg` boven testimonial quotes.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: zodra definitieve merkasset beschikbaar is, tijdelijke CSS-benadering vervangen door direct image-gebruik voor consistente branding.

### 70) Quotesymbool verkleind en kleur aangepast
- Datum: 2026-02-21
- Gewijzigd: `public/quotation.svg`, `client/components/RetreatTestimonialsSection.tsx`, `client/components/TestimonialsCarousel.tsx`.
- Quotesymbool kleur gewijzigd naar `#B8B7A3`.
- Weergavegrootte verkleind van `h-14` naar `h-10` op testimonialkaarten.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: icon-kleur centraal in SVG vastleggen als er op meerdere componenten exact dezelfde merktoon nodig is.

### 71) Homepage investeringstarief teruggezet naar werkgeverstarief
- Datum: 2026-02-21
- Gewijzigd: `client/pages/Home.tsx`.
- Prijs in blok `Investering in jezelf` aangepast van `€850` terug naar `€1450` met bestaande copy `Vergoed uit het opleidingstarief van je werkgever`.
- Wat ging mis: prijs stond tijdelijk op particulier niveau terwijl context werkgeververgoeding was.
- Herbruikbare beslissing: prijs in werkgever-context op homepage altijd laten matchen met transactionele werkgeverstarief.

### 72) Vercel basisconfig toegevoegd
- Datum: 2026-02-21
- Gewijzigd: `api/[...all].ts`, `vercel.json`.
- Serverless API-entry toegevoegd voor Express (`createServer`) via `serverless-http`.
- Vercel config toegevoegd met `pnpm build`, output `dist/spa`, API rewrite en SPA fallback rewrite.
- Wat ging mis: geen issues.
- Herbruikbare beslissing: voor Vite + Express op Vercel standaard een catch-all serverless API route combineren met frontend rewrite naar `index.html`.
