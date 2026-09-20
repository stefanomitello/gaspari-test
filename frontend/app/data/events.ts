export interface EventItem {
  id: number
  title: string
  slug: string
  category: string
  description: string
  location: string
  address: string
  startsAt: string
  endsAt: string
  dateLabel: string
  timeLabel: string
  accent: "cultura" | "natura" | "sapori" | "famiglie"
  program: string[]
}

export const eventCategories = ["Tutte", "Cultura", "Enogastronomia", "Natura", "Famiglie"]

export const events: EventItem[] = [
  { id: 1, title: "Sagra del Tartufo", slug: "sagra-del-tartufo", category: "Enogastronomia", description: "Tre giorni di sapori locali, incontri con i produttori e menu speciali nel centro storico.", location: "Piazza del Municipio", address: "Piazza del Municipio, Bugliano", startsAt: "2026-10-10T18:00:00+02:00", endsAt: "2026-10-12T23:00:00+02:00", dateLabel: "10 — 12 ottobre 2026", timeLabel: "Dalle 18:00", accent: "sapori", program: ["Apertura degli stand gastronomici", "Degustazioni guidate con i produttori", "Musica dal vivo in piazza"] },
  { id: 2, title: "Passeggiata al tramonto", slug: "passeggiata-al-tramonto", category: "Natura", description: "Un percorso guidato tra sentieri e oliveti per osservare il paesaggio al calare del sole.", location: "Parco delle Querce", address: "Ingresso Parco delle Querce, Bugliano", startsAt: "2026-09-26T17:30:00+02:00", endsAt: "2026-09-26T20:00:00+02:00", dateLabel: "26 settembre 2026", timeLabel: "17:30 — 20:00", accent: "natura", program: ["Ritrovo all'ingresso del parco", "Camminata guidata di circa 4 km", "Piccolo ristoro finale"] },
  { id: 3, title: "Bugliano in scena", slug: "bugliano-in-scena", category: "Cultura", description: "Una serata di teatro sotto le stelle, con una compagnia locale e un testo contemporaneo.", location: "Chiostro di San Michele", address: "Via del Chiostro 4, Bugliano", startsAt: "2026-09-20T21:15:00+02:00", endsAt: "2026-09-20T23:00:00+02:00", dateLabel: "20 settembre 2026", timeLabel: "Ore 21:15", accent: "cultura", program: ["Apertura biglietteria alle 20:15", "Spettacolo teatrale", "Incontro con la compagnia"] },
  { id: 4, title: "Laboratorio di ceramica", slug: "laboratorio-di-ceramica", category: "Famiglie", description: "Un laboratorio creativo per bambine, bambini e adulti: mani nell'argilla e tanta fantasia.", location: "Biblioteca comunale", address: "Via della Biblioteca 8, Bugliano", startsAt: "2026-10-03T10:00:00+02:00", endsAt: "2026-10-03T12:00:00+02:00", dateLabel: "3 ottobre 2026", timeLabel: "10:00 — 12:00", accent: "famiglie", program: ["Accoglienza e presentazione", "Creazione di un piccolo oggetto", "Cottura e ritiro su prenotazione"] },
  { id: 5, title: "Mercato dei produttori", slug: "mercato-dei-produttori", category: "Enogastronomia", description: "I produttori del territorio portano in piazza frutta, ortaggi, formaggi e conserve di stagione.", location: "Piazza della Torre", address: "Piazza della Torre, Bugliano", startsAt: "2026-10-04T09:00:00+02:00", endsAt: "2026-10-04T13:00:00+02:00", dateLabel: "4 ottobre 2026", timeLabel: "9:00 — 13:00", accent: "sapori", program: ["Apertura del mercato", "Degustazione di prodotti locali", "Incontro con i produttori"] },
  { id: 6, title: "Storie nel bosco", slug: "storie-nel-bosco", category: "Famiglie", description: "Letture animate e piccole esplorazioni per vivere il bosco con occhi curiosi.", location: "Bosco di Valverde", address: "Località Valverde, Bugliano", startsAt: "2026-10-11T15:30:00+02:00", endsAt: "2026-10-11T17:30:00+02:00", dateLabel: "11 ottobre 2026", timeLabel: "15:30 — 17:30", accent: "famiglie", program: ["Benvenuto e merenda", "Letture animate", "Passeggiata breve con guida ambientale"] },
  { id: 7, title: "Visita guidata al borgo", slug: "visita-guidata-al-borgo", category: "Cultura", description: "Un itinerario a passo lento per conoscere piazze, palazzi e racconti del centro storico.", location: "Porta Fiorentina", address: "Porta Fiorentina, Bugliano", startsAt: "2026-10-18T10:30:00+02:00", endsAt: "2026-10-18T12:00:00+02:00", dateLabel: "18 ottobre 2026", timeLabel: "10:30 — 12:00", accent: "cultura", program: ["Ritrovo a Porta Fiorentina", "Visita del centro storico", "Saluto finale in piazza"] },
]

export function findEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug)
}
