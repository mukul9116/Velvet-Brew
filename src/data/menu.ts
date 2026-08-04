import latteImg from "@/assets/menu-latte.jpg";
import coldbrewImg from "@/assets/menu-coldbrew.jpg";
import pastryImg from "@/assets/menu-pastry.jpg";
import brunchImg from "@/assets/menu-brunch.jpg";
import tartImg from "@/assets/menu-tart.jpg";

export type MenuBadge = "Popular" | "Chef's Pick" | "New" | "Seasonal";

export type MenuCategory =
  | "coffee"
  | "beverage"
  | "breakfast"
  | "main"
  | "dessert";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  badge?: MenuBadge;
  available?: boolean;
  image: string;
  imageAlt: string;
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "coffee", label: "Coffee" },
  { id: "beverage", label: "Beverages" },
  { id: "breakfast", label: "Breakfast" },
  { id: "main", label: "Mains" },
  { id: "dessert", label: "Desserts" },
];

export const menuItems: MenuItem[] = [
  // ============ COFFEE ============
  {
    id: "velvet-latte",
    name: "Velvet Latte",
    description:
      "Double ristretto, silky steamed milk, and a whisper of vanilla bean. Pulled on our house espresso blend.",
    price: "$5.50",
    category: "coffee",
    badge: "Popular",
    image: latteImg,
    imageAlt: "A creamy latte with delicate rosetta latte art in a ceramic cup",
  },
  {
    id: "single-origin-espresso",
    name: "Single-Origin Espresso",
    description:
      "A rotating Ethiopian or Colombian microlot. Bright, floral, and served with a small glass of sparkling water.",
    price: "$4.00",
    category: "coffee",
    image: latteImg,
    imageAlt: "A warm ceramic espresso cup on a saucer",
  },
  {
    id: "honey-lavender-cold-brew",
    name: "Honey Lavender Cold Brew",
    description:
      "24-hour steeped cold brew sweetened with local wildflower honey and a touch of lavender syrup over ice.",
    price: "$6.00",
    category: "coffee",
    badge: "Chef's Pick",
    image: coldbrewImg,
    imageAlt: "A tall glass of iced cold brew with swirling cream",
  },
  {
    id: "cortado",
    name: "Cortado",
    description:
      "Equal parts espresso and warm textured milk in a heavy Gibraltar glass. Balanced, mellow, endlessly drinkable.",
    price: "$4.75",
    category: "coffee",
    image: latteImg,
    imageAlt: "A small cortado in a clear Gibraltar glass",
  },
  {
    id: "brown-butter-mocha",
    name: "Brown Butter Mocha",
    description:
      "House ganache stirred with brown-butter cocoa, espresso, and steamed milk. Finished with cacao nib dust.",
    price: "$6.25",
    category: "coffee",
    badge: "New",
    image: latteImg,
    imageAlt: "A dark mocha with cocoa dusting in a ceramic mug",
  },
  {
    id: "iced-shakerato",
    name: "Iced Shakerato",
    description:
      "Freshly pulled espresso shaken hard over ice with a whisper of demerara. Frothy, cold, and bracingly clean.",
    price: "$5.25",
    category: "coffee",
    available: false,
    image: coldbrewImg,
    imageAlt: "A frothy iced shakerato served in a coupe glass",
  },

  // ============ BEVERAGES ============
  {
    id: "matcha-cloud",
    name: "Matcha Cloud",
    description:
      "Ceremonial-grade Uji matcha whisked with oat milk and a delicate honey foam floated on top.",
    price: "$5.75",
    category: "beverage",
    badge: "Popular",
    image: coldbrewImg,
    imageAlt: "A vibrant green matcha latte topped with airy honey foam",
  },
  {
    id: "spiced-chai",
    name: "House-Spiced Chai",
    description:
      "Assam black tea steeped with cardamom, star anise, black pepper, and fresh ginger. Steamed whole milk.",
    price: "$5.00",
    category: "beverage",
    image: latteImg,
    imageAlt: "A steaming chai latte dusted with cinnamon",
  },
  {
    id: "hibiscus-cooler",
    name: "Hibiscus Rose Cooler",
    description:
      "Cold-steeped hibiscus with rose water, lime, and a splash of sparkling water. Bright, floral, refreshing.",
    price: "$5.50",
    category: "beverage",
    badge: "Seasonal",
    image: coldbrewImg,
    imageAlt: "A ruby-red hibiscus cooler with a rose petal garnish",
  },
  {
    id: "golden-turmeric",
    name: "Golden Turmeric Latte",
    description:
      "Turmeric, black pepper, cinnamon, and a knob of fresh ginger steamed into velvety coconut milk.",
    price: "$5.25",
    category: "beverage",
    image: latteImg,
    imageAlt: "A golden turmeric latte in a stoneware cup",
  },
  {
    id: "cucumber-mint-lemonade",
    name: "Cucumber Mint Lemonade",
    description:
      "House-pressed lemon juice, muddled cucumber, and garden mint over crushed ice. Zero refined sugar.",
    price: "$4.75",
    category: "beverage",
    image: coldbrewImg,
    imageAlt: "A tall glass of pale-green cucumber mint lemonade",
  },
  {
    id: "cold-drip-tonic",
    name: "Cold Drip & Tonic",
    description:
      "12-hour cold drip poured over premium tonic and orange peel. Effervescent, complex, and unmistakably grown-up.",
    price: "$6.50",
    category: "beverage",
    available: false,
    image: coldbrewImg,
    imageAlt: "A cold drip coffee and tonic with orange peel garnish",
  },

  // ============ BREAKFAST ============
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description:
      "Laminated by hand at dawn. Shatteringly crisp outside, tender honeycomb inside, brushed with cultured butter.",
    price: "$4.50",
    category: "breakfast",
    badge: "Popular",
    image: pastryImg,
    imageAlt: "A golden, flaky butter croissant on a ceramic plate",
  },
  {
    id: "avocado-poached-egg-toast",
    name: "Avocado & Poached Egg Toast",
    description:
      "Sourdough from the corner bakery, smashed avocado, soft poached egg, aleppo pepper, and microgreens.",
    price: "$12.00",
    category: "breakfast",
    badge: "Chef's Pick",
    image: brunchImg,
    imageAlt: "Avocado toast topped with a poached egg and microgreens",
  },
  {
    id: "ricotta-hotcakes",
    name: "Lemon Ricotta Hotcakes",
    description:
      "Cloud-soft hotcakes stacked with whipped ricotta, meyer lemon curd, and blistered blueberries.",
    price: "$14.00",
    category: "breakfast",
    image: brunchImg,
    imageAlt: "A stack of golden ricotta hotcakes with berries and syrup",
  },
  {
    id: "shakshuka",
    name: "Sunrise Shakshuka",
    description:
      "Slow-simmered tomatoes, smoked paprika, and roasted peppers with two baked eggs and warm sourdough soldiers.",
    price: "$13.50",
    category: "breakfast",
    image: brunchImg,
    imageAlt: "A cast-iron skillet of shakshuka with baked eggs",
  },
  {
    id: "granola-bowl",
    name: "House Granola Bowl",
    description:
      "Toasted oats, buckwheat, and coconut with cultured yogurt, poached stone fruit, and a drizzle of raw honey.",
    price: "$10.50",
    category: "breakfast",
    image: pastryImg,
    imageAlt: "A bowl of house granola layered with yogurt and stone fruit",
  },
  {
    id: "almond-danish",
    name: "Almond Frangipane Danish",
    description:
      "Twice-baked laminated pastry filled with brown-butter frangipane and finished with toasted almond slivers.",
    price: "$5.25",
    category: "breakfast",
    badge: "New",
    image: pastryImg,
    imageAlt: "A golden almond frangipane danish dusted with sugar",
  },

  // ============ MAINS ============
  {
    id: "wild-mushroom-toast",
    name: "Wild Mushroom Toast",
    description:
      "Chestnut and oyster mushrooms in brown butter and thyme over sourdough with whipped robiola and a soft egg.",
    price: "$16.00",
    category: "main",
    badge: "Chef's Pick",
    image: brunchImg,
    imageAlt: "Wild mushrooms piled onto grilled sourdough with a soft egg",
  },
  {
    id: "roast-chicken-sandwich",
    name: "Roast Chicken Sandwich",
    description:
      "Slow-roast chicken thigh, tarragon aioli, pickled shallot, and butter lettuce on toasted brioche.",
    price: "$15.50",
    category: "main",
    image: brunchImg,
    imageAlt: "A tall roast chicken sandwich stacked on toasted brioche",
  },
  {
    id: "grain-bowl",
    name: "Farro & Roasted Squash Bowl",
    description:
      "Warm farro, honey-roasted delicata, kale, feta, spiced pepitas, and a bright preserved-lemon dressing.",
    price: "$14.50",
    category: "main",
    image: brunchImg,
    imageAlt: "A grain bowl of farro, roasted squash, and kale",
  },
  {
    id: "smoked-salmon-plate",
    name: "Smoked Salmon Plate",
    description:
      "House-cured salmon, cream cheese, capers, pickled red onion, dill, and a warm everything bagel.",
    price: "$17.00",
    category: "main",
    badge: "Popular",
    image: brunchImg,
    imageAlt: "A plate of smoked salmon with bagel and accompaniments",
  },
  {
    id: "burrata-tomato",
    name: "Burrata & Heirloom Tomato",
    description:
      "Creamy burrata, sun-warmed heirloom tomatoes, torn basil, olio nuovo, and grilled country bread.",
    price: "$15.00",
    category: "main",
    badge: "Seasonal",
    image: brunchImg,
    imageAlt: "Burrata cheese with sliced heirloom tomatoes and basil",
  },
  {
    id: "truffle-croque",
    name: "Truffle Croque Monsieur",
    description:
      "Gruyère, black-forest ham, and shaved truffle inside a pressed sourdough with a golden mornay crust.",
    price: "$16.50",
    category: "main",
    available: false,
    image: brunchImg,
    imageAlt: "A pressed truffle croque monsieur with a golden crust",
  },

  // ============ DESSERTS ============
  {
    id: "seasonal-fruit-tart",
    name: "Seasonal Fruit Tart",
    description:
      "Vanilla bean custard, buttery pastry shell, and the ripest market fruit finished with a light citrus glaze.",
    price: "$7.00",
    category: "dessert",
    badge: "Chef's Pick",
    image: tartImg,
    imageAlt: "A colorful fruit tart with figs, berries, and glossy glaze",
  },
  {
    id: "olive-oil-cake",
    name: "Olive Oil & Citrus Cake",
    description:
      "Tender, moist cake made with Sicilian olive oil and blood orange, finished with candied peel and crème fraîche.",
    price: "$6.50",
    category: "dessert",
    badge: "Popular",
    image: tartImg,
    imageAlt: "A slice of olive oil citrus cake with candied peel",
  },
  {
    id: "dark-chocolate-pot",
    name: "Dark Chocolate Pot de Crème",
    description:
      "70% single-origin chocolate set into silky custard with sea salt, olive oil, and a shortbread finger.",
    price: "$7.50",
    category: "dessert",
    image: tartImg,
    imageAlt: "A dark chocolate pot de crème topped with sea salt",
  },
  {
    id: "pistachio-tiramisu",
    name: "Pistachio Tiramisu",
    description:
      "Espresso-soaked savoiardi layered with mascarpone cream and Sicilian pistachio, dusted with cocoa.",
    price: "$8.00",
    category: "dessert",
    badge: "New",
    image: tartImg,
    imageAlt: "A layered pistachio tiramisu in a small glass",
  },
  {
    id: "cardamom-cannele",
    name: "Cardamom Canelé",
    description:
      "Dark, caramelized crust with a soft, custardy center perfumed with cardamom and rum.",
    price: "$4.50",
    category: "dessert",
    image: tartImg,
    imageAlt: "Two dark caramelized canelés on a small plate",
  },
  {
    id: "affogato",
    name: "Vanilla Bean Affogato",
    description:
      "A scoop of house-churned vanilla bean gelato drowned tableside in a shot of hot espresso.",
    price: "$6.00",
    category: "dessert",
    available: false,
    image: tartImg,
    imageAlt: "A scoop of vanilla gelato with espresso poured over it",
  },
];

/** Curated subset shown on the homepage. */
export const signatureItems: MenuItem[] = [
  "velvet-latte",
  "honey-lavender-cold-brew",
  "butter-croissant",
  "avocado-poached-egg-toast",
  "seasonal-fruit-tart",
].map((id) => menuItems.find((m) => m.id === id)!);
