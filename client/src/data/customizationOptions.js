// Options for customizing cars. Each option has an id, label, value and optional metadata (image, price delta)
export const exteriorOptions = [
  {
    id: "ex-1",
    label: "Gloss White",
    value: "gloss_white",
    price: 0,
    color: "#ffffff",
  },
  {
    id: "ex-2",
    label: "Midnight Black",
    value: "midnight_black",
    price: 250,
    color: "#0b0b0b",
  },
  {
    id: "ex-3",
    label: "Racing Red",
    value: "racing_red",
    price: 350,
    color: "#d32f2f",
  },
  {
    id: "ex-4",
    label: "Ocean Blue",
    value: "ocean_blue",
    price: 300,
    color: "#1976d2",
  },
  {
    id: "ex-5",
    label: "Sunset Orange",
    value: "sunset_orange",
    price: 300,
    color: "#fb8c00",
  },
  {
    id: "ex-6",
    label: "Matte Graphite",
    value: "matte_graphite",
    price: 450,
    color: "#4b4b4b",
  },
  {
    id: "ex-7",
    label: "Pearl Silver",
    value: "pearl_silver",
    price: 200,
    color: "#cfcfcf",
  },
];

export const roofOptions = [
  { id: "rf-1", label: "Body-colored roof", value: "body_color", price: 0 },
  { id: "rf-2", label: "Panoramic glass roof", value: "panoramic", price: 700 },
  { id: "rf-3", label: "Carbon fiber roof", value: "carbon_fiber", price: 900 },
  {
    id: "rf-4",
    label: "Black contrast roof",
    value: "black_contrast",
    price: 150,
  },
];

export const wheelsOptions = [
  {
    id: "wh-1",
    label: '17" Standard',
    value: "17_standard",
    price: 0,
    svg: '<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#ddd"/><circle cx="12" cy="12" r="4" fill="#999"/></svg>',
  },
  {
    id: "wh-2",
    label: '18" Sport',
    value: "18_sport",
    price: 400,
    svg: '<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#ccc"/><path d="M12 3v18" stroke="#333" stroke-width="1.5"/></svg>',
  },
  {
    id: "wh-3",
    label: '19" Alloy',
    value: "19_alloy",
    price: 700,
    svg: '<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#bbb"/><path d="M4 12h16" stroke="#444" stroke-width="1.5"/></svg>',
  },
  {
    id: "wh-4",
    label: '20" Performance',
    value: "20_performance",
    price: 1100,
    svg: '<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#aaa"/><path d="M6 6l12 12" stroke="#222" stroke-width="1.5"/></svg>',
  },
  {
    id: "wh-5",
    label: '21" Aero',
    value: "21_aero",
    price: 1500,
    svg: '<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#999"/><path d="M12 3c3 4 6 6 0 18" stroke="#111" stroke-width="1.2"/></svg>',
  },
];

export const interiorOptions = [
  { id: "in-1", label: "Cloth - Black", value: "cloth_black", price: 0 },
  {
    id: "in-2",
    label: "Cloth - Light Grey",
    value: "cloth_light_grey",
    price: 100,
  },
  { id: "in-3", label: "Leather - Black", value: "leather_black", price: 700 },
  { id: "in-4", label: "Leather - Tan", value: "leather_tan", price: 700 },
  {
    id: "in-5",
    label: "Vegan Leather - White",
    value: "vegan_white",
    price: 850,
  },
  {
    id: "in-6",
    label: "Sport Seats - Alcantara",
    value: "alcantara",
    price: 1200,
  },
];

export default {
  exteriorOptions,
  roofOptions,
  wheelsOptions,
  interiorOptions,
};
