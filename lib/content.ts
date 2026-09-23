// Core company copy and portfolio categories sourced from https://mjm-group.com/.

const ORIGIN = "https://mjm-group.com";

export const nav = [
  { label: "About Us", href: "#about" },
  { label: "Our services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "News", href: `${ORIGIN}/news` },
  { label: "Careers", href: `${ORIGIN}/careers` },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  title: "Exceptional",
  description: "Marine Outfitting",
  cta: "Discover More",
  slides: [
    { src: "/images/hero-1.jpg", location: "01 | 04" },
    { src: "/images/hero-2.jpg", location: "02 | 04" },
    { src: "/images/hero-3.jpg", location: "03 | 04" },
    { src: "/images/hero-4.jpg", location: "04 | 04" },
  ],
};

export const intro =
  "MJM Marine has over 40 years’ of World Class marine outfitting experience. With in-house manufacturing facilities, MJM can offer clients a complete project management service with bespoke and turnkey outfitting and innovative solutions.";

export const capabilities = {
  title: "In-house Capabilities",
  items: [
    {
      title: "Manufacturing Capabilities",
      text: "100,000 sq ft of Manufacturing facilities, joinery and metalwork, with some of the most advanced equipment available in the industry.",
      icon: "/icons/manufacturing.svg",
    },
    {
      title: "Design",
      text: "Our in-house design team, many of whom have been workshop craftsmen, have the ability to develop, and if required cost engineer the design of joinery installations.",
      icon: "/icons/design.svg",
    },
    {
      title: "Contract Management",
      text: "Our experienced contracts team can provide both office and on-site support, acting as the first point of contact for many ongoing projects.",
      icon: "/icons/check-list.svg",
    },
    {
      title: "Logistics",
      text: "MJM’s experienced Logistics department ensures that all tools and materials required to complete any contract arrive in a timely manner. The team has the ability to “think outside the box” to find solutions for time sensitive shipments.",
      icon: "/icons/expand.svg",
    },
    {
      title: "Research & Development",
      text: "MJM has a dedicated Research and Development department aimed both at improving MJM’s processes, and the development of specialised materials and products for use in the marine and commercial sectors.",
      icon: "/icons/research-dev.svg",
    },
    {
      title: "Installation",
      text: "No matter the space, application or location – we guarantee exceptional quality and craftsmanship.",
      icon: "/icons/shield.svg",
    },
  ],
};

export const services = {
  title: "Our services",
  text: "MJM Marine offers a full range of services to provide complete, bespoke solutions to any client, from initial enquiry, right through to project delivery and handover.",
  items: [
    {
      title: "Marine Outfitting",
      href: `${ORIGIN}/our-services#marine-outfitting`,
      image: "/images/service-marine-outfitting.jpg",
      width: 2000,
      height: 1333,
    },
    {
      title: "Manufacturing",
      href: `${ORIGIN}/our-services#manufacturing`,
      image: "/images/service-manufacturing.png",
      width: 333,
      height: 457,
    },
    {
      title: "Vyv - Antimicrobial Solutions",
      href: `${ORIGIN}/our-services#vyv-antimicrobial-solutions`,
      image: "/images/service-vyv.jpg",
      width: 200,
      height: 200,
      logo: true,
    },
    {
      title: "Carpet and Upholstery",
      href: `${ORIGIN}/our-services#carpet-and-upholstery`,
      image: "/images/service-carpet.png",
      width: 331,
      height: 453,
    },
  ],
};

export const supplier = {
  title: "Interested in becoming a supplier?",
  cta: "Register your interest",
  href: `${ORIGIN}/supplier-contact`,
  image: "/images/supplier-corner.jpg",
};

export const newsletter = {
  title: "The newsletter",
  text: "Would you like to receive updates about all things MJM Marine?",
  fields: ["First Name", "Surname", "Email Address"],
  consentPrefix: "Read our",
  consentLink: "Privacy Policy",
  cta: "Sign me up",
};

export const footer = {
  address: {
    label: "Address",
    lines: ["MJM Marine", "Carnbane Business Park", "Newry, Co. Down", "N. Ireland", "BT35 6QH"],
  },
  poland: {
    label: "Poland Office",
    lines: [
      "M.J.M. MARINE LTD",
      "SP. Z O.O. ODDZIAŁ W POLSCE",
      "Ul. Heweliusza 9",
      "80-890 Gdańsk",
      "Poland",
    ],
  },
  contact: {
    label: "Contact",
    phone: { label: "Phone", value: "+44 (0)28 3025 8450", href: "tel:442830258450" },
    email: { label: "Email", value: "info@mjmmarine.com", href: "mailto:info@mjmmarine.com" },
  },
  links: [
    { label: "About Us", href: `${ORIGIN}/about-us` },
    { label: "Our services", href: `${ORIGIN}/our-services` },
    { label: "Portfolio", href: `${ORIGIN}/portfolio` },
    { label: "News", href: `${ORIGIN}/news` },
    { label: "Careers", href: `${ORIGIN}/careers` },
    { label: "Contact", href: `${ORIGIN}/contact` },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/mjm-marine-ltd" },
    { label: "Instagram", href: "https://www.instagram.com/mjm_marine/" },
    { label: "Facebook", href: "https://www.facebook.com/MJMMarine" },
    { label: "Twitter", href: "https://twitter.com/LtdMJM" },
  ],
  copyright: "Copyright 2022 | MJM Marine",
  legal: [
    { label: "Anti-Slavery Policy", href: `${ORIGIN}/anti-slavery-policy` },
    { label: "Privacy Policy", href: `${ORIGIN}/privacy-policy` },
  ],
};

// Category imagery and destinations from https://mjm-group.com/portfolio.
export const portfolio = {
  title: "Our portfolio",
  text: "Our finished products are among some of the finest in the world, which you can discover for yourself in our project portfolio.",
  href: `${ORIGIN}/portfolio`,
  items: [
    { title: "Marine Interiors", image: "/images/portfolio-marine.jpg", href: `${ORIGIN}/portfolio/marine-interiors`, alt: "Light-filled observation lounge with panoramic ocean views" },
    { title: "Specialist Interiors", image: "/images/portfolio-specialist.jpg", href: `${ORIGIN}/portfolio/specialist-interiors`, alt: "Polished stone reception with sculptural chandeliers and bespoke interior finishes" },
  ],
};
