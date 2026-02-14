import type { ImageMetadata } from 'astro';

// Referenzbilder importieren (massivholztisch-1 bis -4 sind jetzt in leistungen/massivholztische/)
import massivholztisch1 from '../assets/images/leistungen/massivholztische/massivholztisch-1.jpg';
import massivholztisch2 from '../assets/images/leistungen/massivholztische/massivholztisch-2.jpg';
import massivholztisch3 from '../assets/images/leistungen/massivholztische/massivholztisch-3.jpg';
import massivholztisch4 from '../assets/images/leistungen/massivholztische/massivholztisch-4.jpg';
import kardiermaschineMaus01 from '../assets/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-maus-01.jpg';
import kardiermaschineMaus02 from '../assets/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-maus-02.jpg';
import kardiermaschineTiger01 from '../assets/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-01.jpg';
import kardiermaschineTiger02 from '../assets/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-02.jpg';
import kardiermaschineTiger03 from '../assets/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-03.jpg';
import kardiermaschineTigerXxl01 from '../assets/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-xxl-01.jpg';
import sitzbuehneCoworkingspace1 from '../assets/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-1.jpg';
import sitzbuehneCoworkingspace3 from '../assets/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-3.jpg';
import sitzbuehneCoworkingspace4 from '../assets/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-4.jpg';
import sitzbuehneCoworkingspace5 from '../assets/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-5.jpg';
import sitzbuehneCoworkingspace6 from '../assets/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-6.jpg';
import sitzbuehneCoworkingspace7 from '../assets/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-7.jpg';
import sitzbuehneCoworkingspaceCad from '../assets/images/referenzen/sitzbuehne-coworkingspace/cad-buehne-basislager-leipzig.png';
import heckauszugCampingbox2 from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_2.jpg';
import heckauszugCampingbox3 from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_3.jpg';
import heckauszugCampingbox4 from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_4.jpg';
import heckauszugCampingbox5 from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_5.jpg';
import heckauszugCampingbox6 from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_6.jpg';
import campingboxCadBett from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett.jpeg';
import campingboxCadBettOffen from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett-offen.jpeg';
import campingboxCadBettSchubladeBettOffen from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett-schublade-bett-offen.jpeg';
import campingboxCadBettSchubladeOffen from '../assets/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett-schublade-offen.jpeg';
import couchtischBongossi1 from '../assets/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_1.jpg';
import couchtischBongossi2 from '../assets/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_2.jpg';
import couchtischBongossi4 from '../assets/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_4.jpg';
import couchtischBongossi5 from '../assets/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_5.jpg';
import couchtischEiche1 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_1.jpg';
import couchtischEiche2 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_2.jpg';
import couchtischEiche4 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_4.jpg';
import couchtischEiche5 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_5.jpg';
import couchtischEiche6 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_6.jpg';
import couchtischEiche7 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_7.jpeg';
import couchtischEiche9 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_9.jpg';
import couchtischEiche10 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_10.jpg';
import couchtischEiche11 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_11.jpg';
import couchtischEiche12 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_12.jpg';
import couchtischEiche13 from '../assets/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_13.jpg';
import esstischAhorn1 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_1.jpg';
import esstischAhorn2 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_2.jpg';
import esstischAhorn3 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_3.jpg';
import esstischAhorn4 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_4.jpg';
import esstischAhorn5 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_5.jpg';
import esstischAhorn6 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_6.jpg';
import esstischAhorn7 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_7.jpg';
import esstischAhorn8 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_8.jpg';
import esstischAhorn9 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_9.jpg';
import esstischAhorn10 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_10.jpg';
import esstischAhorn11 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_11.jpg';
import esstischAhorn12 from '../assets/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_12.jpg';
import campervanMagnetregal01 from '../assets/images/referenzen/van-camper-zubehoer/campervan-magnetregal_01.webp';
import campervanMagnetregal02 from '../assets/images/referenzen/van-camper-zubehoer/campervan-magnetregal_02.webp';
import euroboxHolzdeckel01 from '../assets/images/referenzen/van-camper-zubehoer/eurobox-holzdeckel_01.webp';
import euroboxHolzdeckel02 from '../assets/images/referenzen/van-camper-zubehoer/eurobox-holzdeckel_02.webp';
import muelleimerEinstiegshilfe01 from '../assets/images/referenzen/van-camper-zubehoer/muelleimer-einstiegshilfe-bett-vw-grand-california_01.webp';
import muelleimerEinstiegshilfe02 from '../assets/images/referenzen/van-camper-zubehoer/muelleimer-einstiegshilfe-bett-vw-grand-california_02.webp';
import schuhregalVwT5T6 from '../assets/images/referenzen/van-camper-zubehoer/schuhregal-vw-T5-T6-T6-1.webp';
import trittstufeneinsatzVwT701 from '../assets/images/referenzen/van-camper-zubehoer/trittstufeneinsatz-vw-t7-01.webp';
import trittstufeneinsatzVwT702 from '../assets/images/referenzen/van-camper-zubehoer/trittstufeneinsatz-vw-t7-02.webp';
import schreibtischBuche1 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_1.jpg';
import schreibtischBuche2 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_2.jpg';
import schreibtischBuche3 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_3.jpg';
import schreibtischBuche4 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_4.jpg';
import schreibtischBuche5 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_5.jpg';
import schreibtischBuche6 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_6.jpg';
import schreibtischBuche7 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_7.jpg';
import schreibtischBuche8 from '../assets/images/referenzen/schreibtisch-buche/schreibtisch_buche_8.jpg';
import raumtrennerEichenregal1 from '../assets/images/referenzen/eichenregal-raumtrenner/raumtrenner-eichenregal-leimholz-1.jpeg';
import raumtrennerEichenregal2 from '../assets/images/referenzen/eichenregal-raumtrenner/raumtrenner-eichenregal-leimholz-2.jpeg';
import raumtrennerEichenregalCad from '../assets/images/referenzen/eichenregal-raumtrenner/raumtrenner-eichenregal-cad.jpeg';
import eichenregalXxl1 from '../assets/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-1.jpeg';
import eichenregalXxl2 from '../assets/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-2.jpeg';
import eichenregalXxl3 from '../assets/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-3.jpeg';
import eichenregalXxl4 from '../assets/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-4.jpeg';
import eichenregalXxl5 from '../assets/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-5.jpeg';
import eichenregalXxl6 from '../assets/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-6.jpeg';
import campingbusBlue00 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-00.jpg';
import campingbusBlue01 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-01.jpg';
import campingbusBlue02 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-02.jpg';
import campingbusBlue03 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-03.jpg';
import campingbusBlue05 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-05.jpg';
import campingbusBlue06 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-06.jpg';
import campingbusBlue07 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-07.jpg';
import campingbusBlue08 from '../assets/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-08.jpg';
import campingbusBlueCadOben from '../assets/images/referenzen/campingbus-blue/cad-blue-oben.png';
import campingbusBlueCadRueckseite from '../assets/images/referenzen/campingbus-blue/cad-blue-rueckseite.png';
import campingbusBlueCadVorderseite from '../assets/images/referenzen/campingbus-blue/cad-blue-vorderseite.png';
import campingbusBlueCadVorderseiteInklChassi from '../assets/images/referenzen/campingbus-blue/cad-blue-vorderseite-inkl-chassi.png';
import campingbusBlueCadRueckseiteInklChassi from '../assets/images/referenzen/campingbus-blue/cad-blue-rueckseite-inkl-chassi.png';
import campingbusTonyCadVorderseite from '../assets/images/referenzen/campingbus-tony/cad-camper-blue-v2-vorderseite.png';
import campingbusTonyCadRueckseite from '../assets/images/referenzen/campingbus-tony/cad-camper-blue-v2-rueckseite.png';
import campingbusCordulaCadOben from '../assets/images/referenzen/campingbus-cordula/cad-camper-cordula_oben.png';
import campingbusCordulaCadRueckseite from '../assets/images/referenzen/campingbus-cordula/cad-camper-cordula_rueckeseite.png';
import campingbusCordulaCadVorderseite from '../assets/images/referenzen/campingbus-cordula/cad-camper-cordula_vorderseite.png';
import campingbusDianaCadPreview from '../assets/images/referenzen/campingbus-diana/cad-camper-diana_preview.png';
import camperGrundrissKastenwagenBlue from '../assets/images/camper-grundriss/camper-grundriss-kastenwagen-blue.png';

// Leistungsbilder importieren
import camperWald from '../assets/images/leistungen/camperausbau/camper-wald.jpg';
import cnc from '../assets/images/leistungen/cnc-fraesarbeiten/cnc.jpg';
import planungAhorn from '../assets/images/leistungen/massivholztische/planung-ahorn.jpg';
import eichenscheibeFraesen from '../assets/images/leistungen/cnc-fraesarbeiten/eichenscheibe-fraesen.jpg';
import schweissen from '../assets/images/leistungen/massivholztische/schweissen.jpg';
import zusammenbauPoster from '../assets/images/leistungen/cnc-fraesarbeiten/zusammenbau-poster.jpg';
import schleifenPoster from '../assets/images/leistungen/massivholztische/schleifen-poster.jpg';
import massivholzSchreibtisch from '../assets/images/leistungen/massivholztische/massivholz-schreibtisch.jpg';
import massivholzEichentisch from '../assets/images/leistungen/massivholztische/massivholztisch-eichentisch.jpg';
import massivholzAhorntisch from '../assets/images/leistungen/massivholztische/massivholz-ahorntisch.jpg';
import massivholztischBalkon from '../assets/images/leistungen/massivholztische/massivholztisch-balkon.jpeg';
import heckauszugCamperKueche from '../assets/images/leistungen/camperausbau/heckauszug-camper-kueche.jpg';
import buehneVeranstaltung from '../assets/images/leistungen/cnc-fraesarbeiten/buehne-veranstaltung-coworkingspace.jpg';
import campervanTrittstufeneinsatz from '../assets/images/leistungen/cnc-fraesarbeiten/campervan-Trittstufeneinsatz-einzelteile-cnc-fraese.jpg';
import cncFraeseHerstellung from '../assets/images/leistungen/cnc-fraesarbeiten/cnc-fraese-herstellung.jpg';
import cncFraeseProduktion from '../assets/images/leistungen/cnc-fraesarbeiten/cnc-fraese-produktion.jpg';
import deckelEuroboxCamper from '../assets/images/leistungen/cnc-fraesarbeiten/deckel-eurobox-camper-cnc-fraese.jpg';
import fraesteileCampervan from '../assets/images/leistungen/cnc-fraesarbeiten/fraesteile-campervan.jpg';
import multiplexFraeseteileZusammebauen from '../assets/images/leistungen/cnc-fraesarbeiten/multiplex-fraeseteile-zusammebauen.jpg';
import ahorntischMassivLeipzig from '../assets/images/leistungen/massivholztische/ahorntisch-massiv-leipzig.jpg';
import camperausbauVwCrafter from '../assets/images/leistungen/camperausbau/camperausbau-vw-crafter.jpeg';
import camperausbauJpg from '../assets/images/leistungen/camperausbau/camperausbau.jpg';
import camperbusInnenausbau from '../assets/images/leistungen/camperausbau/camperbus-innenausbau.jpeg';
import camperbusKonstruktionCad from '../assets/images/leistungen/camperausbau/camperbus-konstruktion-cad.png';
import camperbusKonstruktionCadCnc from '../assets/images/leistungen/cnc-fraesarbeiten/camperbus-konstruktion-cad.png';
import cadTvSideboardCncFraese from '../assets/images/leistungen/cnc-fraesarbeiten/cad-tv-sideboard-cnc-fraese.png';
import camperbusMercedes from '../assets/images/leistungen/camperausbau/camperbus-mercedes.jpg';
import campingbusMercedesSprinter from '../assets/images/leistungen/camperausbau/campingbus-mercedes-sprinter.jpg';

// Teambilder importieren
import ralfImage from '../assets/images/team/ralf.jpg';
import tonyImage from '../assets/images/team/tony.jpg';
import clemensImage from '../assets/images/team/clemens.jpg';
import teamImage from '../assets/images/team/teamfoto-stammbrueder-camper.jpeg';

/**
 * Zentrales Mapping von Bildpfaden (wie sie in Content-Dateien verwendet werden)
 * zu importierten Astro ImageMetadata-Objekten.
 * 
 * Dies ermöglicht die Verwendung der Astro Image-Komponente für optimierte Bilder,
 * während die Content-Dateien weiterhin einfache String-Pfade verwenden können.
 */
export const imageMap: Record<string, ImageMetadata> = {
  // Referenzbilder (massivholztisch-1 bis -4 sind jetzt in leistungen/massivholztische/)
  '/images/leistungen/massivholztische/massivholztisch-1.jpg': massivholztisch1,
  '/images/leistungen/massivholztische/massivholztisch-2.jpg': massivholztisch2,
  '/images/leistungen/massivholztische/massivholztisch-3.jpg': massivholztisch3,
  '/images/leistungen/massivholztische/massivholztisch-4.jpg': massivholztisch4,
  '/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-maus-01.jpg': kardiermaschineMaus01,
  '/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-maus-02.jpg': kardiermaschineMaus02,
  '/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-01.jpg': kardiermaschineTiger01,
  '/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-02.jpg': kardiermaschineTiger02,
  '/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-03.jpg': kardiermaschineTiger03,
  '/images/referenzen/kardiermaschine-cnc-fertigung/kardiermaschine-tiger-xxl-01.jpg': kardiermaschineTigerXxl01,
  '/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-1.jpg': sitzbuehneCoworkingspace1,
  '/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-3.jpg': sitzbuehneCoworkingspace3,
  '/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-4.jpg': sitzbuehneCoworkingspace4,
  '/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-5.jpg': sitzbuehneCoworkingspace5,
  '/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-6.jpg': sitzbuehneCoworkingspace6,
  '/images/referenzen/sitzbuehne-coworkingspace/sitzbuehne-coworkingspace-7.jpg': sitzbuehneCoworkingspace7,
  '/images/referenzen/sitzbuehne-coworkingspace/cad-buehne-basislager-leipzig.png': sitzbuehneCoworkingspaceCad,
  '/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_2.jpg': heckauszugCampingbox2,
  '/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_3.jpg': heckauszugCampingbox3,
  '/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_4.jpg': heckauszugCampingbox4,
  '/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_5.jpg': heckauszugCampingbox5,
  '/images/referenzen/heckauszug-campingbox-vw-t7/heckauszug_campingbox_6.jpg': heckauszugCampingbox6,
  '/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett.jpeg': campingboxCadBett,
  '/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett-offen.jpeg': campingboxCadBettOffen,
  '/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett-schublade-bett-offen.jpeg': campingboxCadBettSchubladeBettOffen,
  '/images/referenzen/heckauszug-campingbox-vw-t7/campingbox-cad-bett-schublade-offen.jpeg': campingboxCadBettSchubladeOffen,
  '/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_1.jpg': couchtischBongossi1,
  '/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_2.jpg': couchtischBongossi2,
  '/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_4.jpg': couchtischBongossi4,
  '/images/referenzen/couchtisch-bongossi/couchtisch_bongossi_5.jpg': couchtischBongossi5,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_1.jpg': couchtischEiche1,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_2.jpg': couchtischEiche2,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_4.jpg': couchtischEiche4,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_5.jpg': couchtischEiche5,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_6.jpg': couchtischEiche6,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_7.jpeg': couchtischEiche7,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_9.jpg': couchtischEiche9,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_10.jpg': couchtischEiche10,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_11.jpg': couchtischEiche11,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_12.jpg': couchtischEiche12,
  '/images/referenzen/couchtisch-eichenscheibe/couchtisch_eiche_13.jpg': couchtischEiche13,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_1.jpg': esstischAhorn1,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_2.jpg': esstischAhorn2,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_3.jpg': esstischAhorn3,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_4.jpg': esstischAhorn4,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_5.jpg': esstischAhorn5,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_6.jpg': esstischAhorn6,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_7.jpg': esstischAhorn7,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_8.jpg': esstischAhorn8,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_9.jpg': esstischAhorn9,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_10.jpg': esstischAhorn10,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_11.jpg': esstischAhorn11,
  '/images/referenzen/esstisch-ahorn/Ahorntisch-massivholz_12.jpg': esstischAhorn12,
  '/images/referenzen/van-camper-zubehoer/campervan-magnetregal_01.webp': campervanMagnetregal01,
  '/images/referenzen/van-camper-zubehoer/campervan-magnetregal_02.webp': campervanMagnetregal02,
  '/images/referenzen/van-camper-zubehoer/eurobox-holzdeckel_01.webp': euroboxHolzdeckel01,
  '/images/referenzen/van-camper-zubehoer/eurobox-holzdeckel_02.webp': euroboxHolzdeckel02,
  '/images/referenzen/van-camper-zubehoer/muelleimer-einstiegshilfe-bett-vw-grand-california_01.webp': muelleimerEinstiegshilfe01,
  '/images/referenzen/van-camper-zubehoer/muelleimer-einstiegshilfe-bett-vw-grand-california_02.webp': muelleimerEinstiegshilfe02,
  '/images/referenzen/van-camper-zubehoer/schuhregal-vw-T5-T6-T6-1.webp': schuhregalVwT5T6,
  '/images/referenzen/van-camper-zubehoer/trittstufeneinsatz-vw-t7-01.webp': trittstufeneinsatzVwT701,
  '/images/referenzen/van-camper-zubehoer/trittstufeneinsatz-vw-t7-02.webp': trittstufeneinsatzVwT702,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_1.jpg': schreibtischBuche1,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_2.jpg': schreibtischBuche2,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_3.jpg': schreibtischBuche3,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_4.jpg': schreibtischBuche4,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_5.jpg': schreibtischBuche5,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_6.jpg': schreibtischBuche6,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_7.jpg': schreibtischBuche7,
  '/images/referenzen/schreibtisch-buche/schreibtisch_buche_8.jpg': schreibtischBuche8,
  '/images/referenzen/eichenregal-raumtrenner/raumtrenner-eichenregal-leimholz-1.jpeg': raumtrennerEichenregal1,
  '/images/referenzen/eichenregal-raumtrenner/raumtrenner-eichenregal-leimholz-2.jpeg': raumtrennerEichenregal2,
  '/images/referenzen/eichenregal-raumtrenner/raumtrenner-eichenregal-cad.jpeg': raumtrennerEichenregalCad,
  '/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-1.jpeg': eichenregalXxl1,
  '/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-2.jpeg': eichenregalXxl2,
  '/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-3.jpeg': eichenregalXxl3,
  '/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-4.jpeg': eichenregalXxl4,
  '/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-5.jpeg': eichenregalXxl5,
  '/images/referenzen/eichenregal-xxl/eichenregal-xxl-leimholz-6.jpeg': eichenregalXxl6,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-00.jpg': campingbusBlue00,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-01.jpg': campingbusBlue01,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-02.jpg': campingbusBlue02,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-03.jpg': campingbusBlue03,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-05.jpg': campingbusBlue05,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-06.jpg': campingbusBlue06,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-07.jpg': campingbusBlue07,
  '/images/referenzen/campingbus-blue/campingbus-mercedes-sprinter-blue-08.jpg': campingbusBlue08,
  '/images/referenzen/campingbus-blue/cad-blue-oben.png': campingbusBlueCadOben,
  '/images/referenzen/campingbus-blue/cad-blue-rueckseite.png': campingbusBlueCadRueckseite,
  '/images/referenzen/campingbus-blue/cad-blue-vorderseite.png': campingbusBlueCadVorderseite,
  '/images/referenzen/campingbus-blue/cad-blue-vorderseite-inkl-chassi.png': campingbusBlueCadVorderseiteInklChassi,
  '/images/referenzen/campingbus-blue/cad-blue-rueckseite-inkl-chassi.png': campingbusBlueCadRueckseiteInklChassi,
  '/images/referenzen/campingbus-tony/cad-camper-blue-v2-vorderseite.png': campingbusTonyCadVorderseite,
  '/images/referenzen/campingbus-tony/cad-camper-blue-v2-rueckseite.png': campingbusTonyCadRueckseite,
  '/images/referenzen/campingbus-cordula/cad-camper-cordula_oben.png': campingbusCordulaCadOben,
  '/images/referenzen/campingbus-cordula/cad-camper-cordula_rueckeseite.png': campingbusCordulaCadRueckseite,
  '/images/referenzen/campingbus-cordula/cad-camper-cordula_vorderseite.png': campingbusCordulaCadVorderseite,
  '/images/referenzen/campingbus-diana/cad-camper-diana_preview.png': campingbusDianaCadPreview,
  '/images/camper-grundriss/camper-grundriss-kastenwagen-blue.png': camperGrundrissKastenwagenBlue,
  
  // Leistungsbilder
  '/images/leistungen/camperausbau/camper-wald.jpg': camperWald,
  '/images/leistungen/cnc-fraesarbeiten/cnc.jpg': cnc,
  '/images/leistungen/massivholztische/planung-ahorn.jpg': planungAhorn,
  '/images/leistungen/cnc-fraesarbeiten/eichenscheibe-fraesen.jpg': eichenscheibeFraesen,
  '/images/leistungen/massivholztische/schweissen.jpg': schweissen,
  '/images/leistungen/cnc-fraesarbeiten/zusammenbau-poster.jpg': zusammenbauPoster,
  '/images/leistungen/massivholztische/schleifen-poster.jpg': schleifenPoster,
  '/images/leistungen/massivholztische/massivholz-schreibtisch.jpg': massivholzSchreibtisch,
  '/images/leistungen/massivholztische/massivholztisch-eichentisch.jpg': massivholzEichentisch,
  '/images/leistungen/massivholztische/massivholz-ahorntisch.jpg': massivholzAhorntisch,
  '/images/leistungen/massivholztische/massivholztisch-balkon.jpeg': massivholztischBalkon,
  '/images/leistungen/camperausbau/heckauszug-camper-kueche.jpg': heckauszugCamperKueche,
  '/images/leistungen/cnc-fraesarbeiten/buehne-veranstaltung-coworkingspace.jpg': buehneVeranstaltung,
  '/images/leistungen/cnc-fraesarbeiten/campervan-Trittstufeneinsatz-einzelteile-cnc-fraese.jpg': campervanTrittstufeneinsatz,
  '/images/leistungen/cnc-fraesarbeiten/cnc-fraese-herstellung.jpg': cncFraeseHerstellung,
  '/images/leistungen/cnc-fraesarbeiten/cnc-fraese-produktion.jpg': cncFraeseProduktion,
  '/images/leistungen/cnc-fraesarbeiten/deckel-eurobox-camper-cnc-fraese.jpg': deckelEuroboxCamper,
  '/images/leistungen/cnc-fraesarbeiten/fraesteile-campervan.jpg': fraesteileCampervan,
  '/images/leistungen/cnc-fraesarbeiten/multiplex-fraeseteile-zusammebauen.jpg': multiplexFraeseteileZusammebauen,
  '/images/leistungen/massivholztische/ahorntisch-massiv-leipzig.jpg': ahorntischMassivLeipzig,
  '/images/leistungen/camperausbau/camperausbau-vw-crafter.jpeg': camperausbauVwCrafter,
  '/images/leistungen/camperausbau/camperausbau.jpg': camperausbauJpg,
  '/images/leistungen/camperausbau/camperbus-innenausbau.jpeg': camperbusInnenausbau,
  '/images/leistungen/camperausbau/camperbus-konstruktion-cad.png': camperbusKonstruktionCad,
  '/images/leistungen/cnc-fraesarbeiten/camperbus-konstruktion-cad.png': camperbusKonstruktionCadCnc,
  '/images/leistungen/cnc-fraesarbeiten/cad-tv-sideboard-cnc-fraese.png': cadTvSideboardCncFraese,
  '/images/leistungen/camperausbau/camperbus-mercedes.jpg': camperbusMercedes,
  '/images/leistungen/camperausbau/campingbus-mercedes-sprinter.jpg': campingbusMercedesSprinter,
  
  // Teambilder
  '/images/team/ralf.jpg': ralfImage,
  '/images/team/tony.jpg': tonyImage,
  '/images/team/clemens.jpg': clemensImage,
  '/images/team/teamfoto-stammbrueder-camper.jpeg': teamImage,
};

/**
 * Hilfsfunktion zum Abrufen eines Bildes aus dem Mapping.
 * Gibt das ImageMetadata-Objekt zurück, falls vorhanden, sonst wirft es einen Fehler.
 * 
 * @throws Error wenn das Bild nicht im Mapping gefunden wird
 */
export function getImage(imagePath: string): ImageMetadata {
  const image = imageMap[imagePath];
  if (!image) {
    throw new Error(`Bild nicht gefunden: ${imagePath}. Bitte füge es zu src/utils/imageMap.ts hinzu.`);
  }
  return image;
}

/**
 * Prüft, ob ein Bild im Mapping vorhanden ist.
 */
export function hasImage(imagePath: string): boolean {
  return imagePath in imageMap;
}

