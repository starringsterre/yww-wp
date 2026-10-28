/**
 * Voorbeeld van een blogbestand voor scripts/publish-blog.mjs.
 * Kopieer naar content/blogs/<slug>.mjs en vul in.
 *
 *   node scripts/publish-blog.mjs content/blogs/<slug>.mjs            # controle
 *   node scripts/publish-blog.mjs content/blogs/<slug>.mjs --draft    # concept in WP Admin
 *   node scripts/publish-blog.mjs content/blogs/<slug>.mjs --publish  # live
 *
 * Tekstvelden zijn HTML (<p>, <ul>, <h3>, <strong>, <a>). Maximaal 6 secties.
 * date en read_time mogen weg: dan wordt het vandaag en ~200 woorden per minuut.
 */

export default {
  slug: "voorbeeld-blog",
  title: "Titel als vraag of heldere belofte",
  excerpt: "Eén of twee zinnen die ook als meta description en in het blogoverzicht verschijnen.",
  author: "Ella Taal",
  category: "Mentale weerbaarheid",
  // date: "28 september 2026",
  // read_time: "6 min",
  image: {
    file: "public/eerste 5 jaar carriere.png",
    alt: "Omschrijving van de afbeelding",
  },

  intro: `<p><strong>Direct antwoord op de vraag uit de titel.</strong> Daarna context.</p>`,

  sections: [
    {
      heading: "Eerste tussenkop",
      body: `<p>Tekst.</p>`,
    },
    {
      heading: "Tweede tussenkop",
      body: `<p>Tekst.</p>`,
    },
  ],

  cta: {
    heading: "Wil je hier verder mee?",
    body: `<p>Korte uitnodiging.</p>`,
    button_label: "Bekijk het aanbod",
    button_url: "/aanbod/workshops",
  },

  conclusion: `<h2>Key takeaways</h2>
<ul>
  <li>Punt één</li>
</ul>`,
};
