export const home = {
  highlightNews: {
    title:
      "Parte l'estate con oltre 300 eventi in centro e nei quartieri, tutti gli eventi previsti",
    paragraph:
      "***Inaugurazione lunedì 2 luglio*** con il concerto gratuito in piazza XX Settembre degli Sweet Soul Music Revue. Sul palco 20 musicisti dal tutto il mondo",
    category: "Estate in città",
    date: new Date().toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    thumbnail: {
      src: "https://picsum.photos/800/600",
      title: "titolo immagine",
      alt: "descrizione immagine",
    },
    link: {
      label: "Tutte le novità",
      href: "#articolo",
    },
  },
  govRoles: [
    {
      name: "Luca Martinelli",
      descr: "Sindaco",
      image: {
        src: "https://avatars.githubusercontent.com/u/124559758?v=4",
        title: "Luca",
      },
      link: { label: "Vai alla pagina", href: "#" },
    },
    {
      name: "Giunta comunale",
      descr:
        "La giunta, nominata dal sindaco, esercita collegialmente le funzioni ad essa attribuite dalla legge.",
      link: { label: "Vai alla pagina", href: "#" },
    },
    {
      name: "Il consiglio comunale",
      descr:
        "Il Consiglio è un organo collegiale ed elettivo che rimane in carica per 5 anni.",
      link: { label: "Vai alla pagina", href: "#" },
    },
  ],
};
