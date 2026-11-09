// types.ts
export interface FooterLink {
  label: string;
  href: string;
}

// footer.config.ts
export const companyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Readers", href: "/readers" },
  { label: "Services", href: "/services" },
  { label: "Horoscope", href: "/horoscope" },
];

export const serviceLinks: FooterLink[] = [
  { label: "Natal Chart Readings", href: "/services/natal-chart" },
  { label: "Compatibility Readings", href: "/services/compatibility" },
  { label: "Progression Readings", href: "/services/progression" },
  { label: "Specialty Readings", href: "/services/specialty" },
];

export const contactInfo = {
  email: "booking@celestial.com",
  phone: "(+62) 1234 5678",
  address: "Oak Building 19, North City",
};