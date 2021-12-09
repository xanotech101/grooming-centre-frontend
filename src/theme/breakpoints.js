const breakpoints = {
  "mobile-s": "320px",
  "mobile-m": "375px",
  "mobile-l": "425px",
  tablet: "768px",
  laptop: "1024px",
  "laptop-l": "1440px",
  "4k": "2560px",
};

export const maxWidthStyles_userPages = {
  maxWidth: breakpoints["laptop-l"],
  marginX: "auto",
  paddingX: { base: 3, laptop: 6 },
};

export default breakpoints;
