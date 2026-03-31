import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import {
  WEIGHT_OPTIONS,
  type WeightOption,
  parsePrice,
  useCart,
} from "../context/CartContext";
import { useNavigation } from "../context/NavigationContext";
import {
  CATEGORY_ACCENT,
  CATEGORY_BADGE_COLORS,
  CATEGORY_BTN,
  CATEGORY_BTN_OUTLINE,
  CATEGORY_COLORS,
  CATEGORY_PRICE_COLOR,
  CATEGORY_WEIGHT_ACTIVE,
  PRODUCT_IMAGES,
  STATIC_PRODUCTS,
} from "./ProductsSection";

// Multi-photo gallery per product
const PRODUCT_GALLERY: Record<string, { src: string; label: string }[]> = {
  "Turmeric Powder": [
    {
      src: "/assets/generated/product-turmeric.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-turmeric-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-turmeric-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-turmeric-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-turmeric-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Kashmiri Chilli Powder": [
    {
      src: "/assets/generated/product-kashmiri-chilli.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-kashmiri-chilli-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-kashmiri-chilli-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-kashmiri-chilli-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-kashmiri-chilli-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Garam Masala": [
    {
      src: "/assets/generated/product-garam-masala.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-garam-masala-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-garam-masala-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-garam-masala-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-garam-masala-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Coriander Powder": [
    {
      src: "/assets/generated/product-coriander.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-coriander-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-coriander-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-coriander-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-coriander-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Chai Masala": [
    {
      src: "/assets/generated/product-chai-masala.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-chai-masala-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-chai-masala-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-chai-masala-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-chai-masala-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Cumin Powder": [
    {
      src: "/assets/generated/product-cumin.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-cumin-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-cumin-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-cumin-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-cumin-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Amla Powder": [
    { src: "/assets/generated/product-amla.dim_400x300.jpg", label: "Product" },
    {
      src: "/assets/generated/product-amla-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-amla-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-amla-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-amla-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Onion Powder": [
    {
      src: "/assets/generated/product-onion.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-onion-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-onion-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-onion-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-onion-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Garlic Powder": [
    {
      src: "/assets/generated/product-garlic.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-garlic-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-garlic-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-garlic-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-garlic-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Banana Powder": [
    {
      src: "/assets/generated/product-banana.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-banana-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-banana-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-banana-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-banana-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Beetroot Powder": [
    {
      src: "/assets/generated/product-beetroot.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-beetroot-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-beetroot-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-beetroot-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-beetroot-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Spinach Powder": [
    {
      src: "/assets/generated/product-spinach.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-spinach-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-spinach-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-spinach-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-spinach-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Tomato Powder": [
    {
      src: "/assets/generated/product-tomato-powder.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-tomato-powder-packaging.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-tomato-powder-inuse.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-tomato-powder-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-tomato-powder-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Dehydrated Tomato": [
    {
      src: "/assets/generated/product-dehydrated-tomato.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-dehydrated-tomato-packaging.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-dehydrated-tomato-inuse.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-dehydrated-tomato-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-dehydrated-tomato-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Black Pepper Powder": [
    {
      src: "/assets/generated/product-black-pepper.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-black-pepper-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-black-pepper-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-black-pepper-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-black-pepper-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Cardamom Powder": [
    {
      src: "/assets/generated/product-cardamom.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-cardamom-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-cardamom-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-cardamom-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-cardamom-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Fenugreek Powder": [
    {
      src: "/assets/generated/product-fenugreek.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-fenugreek-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-fenugreek-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-fenugreek-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-fenugreek-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Dry Ginger Powder": [
    {
      src: "/assets/generated/product-dry-ginger.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-dry-ginger-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-dry-ginger-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-dry-ginger-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-dry-ginger-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Mint Powder": [
    {
      src: "/assets/generated/product-fudina.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-fudina-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-fudina-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-fudina-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-fudina-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Sambar Powder": [
    {
      src: "/assets/generated/product-sambar.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-sambar-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-sambar-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-sambar-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-sambar-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Rasam Powder": [
    {
      src: "/assets/generated/product-rasam.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-rasam-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-rasam-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-rasam-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-rasam-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Chole Masala": [
    {
      src: "/assets/generated/product-chole-masala.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-chole-masala-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-chole-masala-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-chole-masala-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-chole-masala-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Pav Bhaji Masala": [
    {
      src: "/assets/generated/product-pav-bhaji-masala.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-pav-bhaji-masala-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-pav-bhaji-masala-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-pav-bhaji-masala-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-pav-bhaji-masala-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Kitchen King Masala": [
    {
      src: "/assets/generated/product-kitchen-king-masala.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-kitchen-king-masala-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-kitchen-king-masala-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-kitchen-king-masala-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-kitchen-king-masala-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Haldi Doodh Mix": [
    {
      src: "/assets/generated/product-haldi-doodh.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-haldi-doodh-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-haldi-doodh-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-haldi-doodh-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-haldi-doodh-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Moringa Latte Mix": [
    {
      src: "/assets/generated/product-moringa-latte.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-moringa-latte-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-moringa-latte-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-moringa-latte-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-moringa-latte-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Tulsi Green Tea Powder": [
    {
      src: "/assets/generated/product-tulsi-green-tea.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-tulsi-green-tea-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-tulsi-green-tea-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-tulsi-green-tea-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-tulsi-green-tea-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Ashwagandha Milk Mix": [
    {
      src: "/assets/generated/product-ashwagandha-milk.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-ashwagandha-milk-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-ashwagandha-milk-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-ashwagandha-milk-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-ashwagandha-milk-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Moringa Powder": [
    {
      src: "/assets/generated/product-moringa.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-moringa-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-moringa-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-moringa-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-moringa-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Ashwagandha Powder": [
    {
      src: "/assets/generated/product-ashwagandha.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-ashwagandha-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-ashwagandha-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-ashwagandha-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-ashwagandha-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Neem Powder": [
    { src: "/assets/generated/product-neem.dim_400x300.jpg", label: "Product" },
    {
      src: "/assets/generated/product-neem-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-neem-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-neem-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-neem-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Wheatgrass Powder": [
    {
      src: "/assets/generated/product-wheatgrass.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-wheatgrass-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-wheatgrass-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-wheatgrass-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-wheatgrass-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
  "Triphala Powder": [
    {
      src: "/assets/generated/product-triphala.dim_400x300.jpg",
      label: "Product",
    },
    {
      src: "/assets/generated/product-triphala-pack.dim_400x300.jpg",
      label: "Packaging",
    },
    {
      src: "/assets/generated/product-triphala-dish.dim_400x300.jpg",
      label: "In Use",
    },
    {
      src: "/assets/generated/product-triphala-closeup.dim_400x300.jpg",
      label: "Close Up",
    },
    {
      src: "/assets/generated/product-triphala-farm.dim_400x300.jpg",
      label: "Farm Fresh",
    },
  ],
};

const HOW_TO_USE: Record<string, { step: string; desc: string }[]> = {
  "Turmeric Powder": [
    {
      step: "Step 1 – Add to Curries",
      desc: "Add ½ tsp while cooking dal, curries, or vegetable dishes for vibrant colour and depth.",
    },
    {
      step: "Step 2 – Turmeric Milk",
      desc: "Mix 1 tsp in warm milk with a pinch of black pepper. Drink before bed for immunity boost.",
    },
    {
      step: "Step 3 – Marinades",
      desc: "Rub onto paneer, chicken or fish before grilling for a golden, flavourful crust.",
    },
    {
      step: "Step 4 – Store Correctly",
      desc: "Keep in a cool, dry place away from direct sunlight. Use within 12 months of opening.",
    },
  ],
  "Kashmiri Chilli Powder": [
    {
      step: "Step 1 – Colour Curries",
      desc: "Add 1 tsp to hot oil before other spices to release its deep red pigment.",
    },
    {
      step: "Step 2 – Tandoori Marinades",
      desc: "Blend with yoghurt and spices for authentic tandoori chicken or tikka marinade.",
    },
    {
      step: "Step 3 – Gravies",
      desc: "Stir into tomato-based gravies for a rich red colour with mild heat.",
    },
    {
      step: "Step 4 – Storage",
      desc: "Store in an airtight container away from moisture and heat for best shelf life.",
    },
  ],
  "Garam Masala": [
    {
      step: "Step 1 – Finish Dishes",
      desc: "Add a pinch at the end of cooking to preserve its aroma in curries and dals.",
    },
    {
      step: "Step 2 – Rice Dishes",
      desc: "Sprinkle over biryani or pulao layers before covering and steaming.",
    },
    {
      step: "Step 3 – Soups & Stews",
      desc: "Stir 1/4 tsp into soups and lentil stews for warmth and depth.",
    },
    {
      step: "Step 4 – Don't Overcook",
      desc: "Best added late in the cooking process — long cooking reduces fragrance.",
    },
  ],
  "Coriander Powder": [
    {
      step: "Step 1 – Base for Curries",
      desc: "Add 1–2 tsp along with onion and tomato while building the masala base.",
    },
    {
      step: "Step 2 – Chutneys",
      desc: "Blend into fresh chutneys or dry rubs for kebabs and grilled vegetables.",
    },
    {
      step: "Step 3 – Spice Blends",
      desc: "Combine with cumin and chilli powder for an all-purpose curry spice blend.",
    },
    {
      step: "Step 4 – Storage",
      desc: "Keep in an airtight jar away from heat. Best used within 6 months of opening.",
    },
  ],
  "Chai Masala": [
    {
      step: "Step 1 – Brew the Tea",
      desc: "Boil 1 cup water + 1 cup milk in a pan. Add 1 tsp chai masala and tea leaves.",
    },
    {
      step: "Step 2 – Simmer",
      desc: "Simmer for 3–5 minutes on low heat until flavours are fully infused.",
    },
    {
      step: "Step 3 – Sweeten",
      desc: "Add sugar or jaggery to taste. Strain into cups and serve hot.",
    },
    {
      step: "Step 4 – Other Uses",
      desc: "Add to coffee, warm almond milk, or baked goods like cookies and cakes.",
    },
  ],
  "Cumin Powder": [
    {
      step: "Step 1 – Tadka/Tempering",
      desc: "Add to hot oil or ghee at the start of cooking for a nutty, smoky base flavour.",
    },
    {
      step: "Step 2 – Raita & Yoghurt",
      desc: "Sprinkle over raita, buttermilk, or lassi for a refreshing flavour lift.",
    },
    {
      step: "Step 3 – Soups & Roasted Veg",
      desc: "Season roasted vegetables, soups, and lentil dishes generously.",
    },
    {
      step: "Step 4 – Storage",
      desc: "Store in an airtight container. Use within 6 months for best aroma.",
    },
  ],
  "Amla Powder": [
    {
      step: "Step 1 – Morning Drink",
      desc: "Mix 1 tsp in a glass of warm water with honey and lemon. Drink on an empty stomach.",
    },
    {
      step: "Step 2 – Smoothies",
      desc: "Add 1 tsp to fruit smoothies or green juices for a vitamin C boost.",
    },
    {
      step: "Step 3 – Chutneys & Pickles",
      desc: "Blend into chutneys or use in amla pickle recipes for tangy depth.",
    },
    {
      step: "Step 4 – Hair Care",
      desc: "Mix with coconut oil and apply to scalp for traditional hair nourishment.",
    },
  ],
  "Onion Powder": [
    {
      step: "Step 1 – Curries & Gravies",
      desc: "Add 1–2 tsp to your curry base during sautéing for deep onion flavour without any prep.",
    },
    {
      step: "Step 2 – Marinades",
      desc: "Mix into marinades for meats, paneer, or tofu to infuse rich savoury taste.",
    },
    {
      step: "Step 3 – Soups & Stews",
      desc: "Stir into soups, dals, and stews for an instant flavour boost.",
    },
    {
      step: "Step 4 – Spice Rubs",
      desc: "Blend with other spice powders to create dry rubs for grilling and roasting.",
    },
  ],
  "Garlic Powder": [
    {
      step: "Step 1 – Sauces & Dips",
      desc: "Stir ½ tsp into sauces, chutneys, or dips for an instant garlic punch.",
    },
    {
      step: "Step 2 – Breads & Butter",
      desc: "Mix into butter with herbs for garlic bread or flatbreads.",
    },
    {
      step: "Step 3 – Curries",
      desc: "Add during tempering to enhance the base flavour of any Indian curry.",
    },
    {
      step: "Step 4 – Roasted Vegetables",
      desc: "Toss with veggies and oil before roasting for a savoury, golden crust.",
    },
  ],
  "Banana Powder": [
    {
      step: "Step 1 – Smoothies",
      desc: "Blend 1–2 tbsp with milk or yoghurt for a creamy banana smoothie.",
    },
    {
      step: "Step 2 – Baby Food",
      desc: "Mix with warm water or milk for a gentle, nutritious meal for infants.",
    },
    {
      step: "Step 3 – Baking",
      desc: "Replace fresh bananas in banana bread, muffins, or pancakes for convenience.",
    },
    {
      step: "Step 4 – Energy Boost",
      desc: "Add to pre-workout shakes or oatmeal for a natural energy lift.",
    },
  ],
  "Beetroot Powder": [
    {
      step: "Step 1 – Juice & Smoothies",
      desc: "Mix 1 tsp in water or juice for a vibrant, nutrient-dense beetroot drink.",
    },
    {
      step: "Step 2 – Smoothie Bowls",
      desc: "Blend into smoothie bowls for rich colour and earthy sweetness.",
    },
    {
      step: "Step 3 – Dips & Hummus",
      desc: "Stir into hummus or yoghurt dip for a colourful, nutritious spread.",
    },
    {
      step: "Step 4 – Baked Goods",
      desc: "Add to cakes, pancakes, or pasta dough as a natural pink-red food colour.",
    },
  ],
  "Spinach Powder": [
    {
      step: "Step 1 – Morning Smoothies",
      desc: "Blend 1 tsp into green smoothies with banana and milk for a daily iron boost.",
    },
    {
      step: "Step 2 – Palak Dishes",
      desc: "Dissolve in warm water and use as a base for palak paneer, palak dal, or soups.",
    },
    {
      step: "Step 3 – Pasta & Dough",
      desc: "Mix into pasta dough or chapati dough for natural green colour and nutrition.",
    },
    {
      step: "Step 4 – Omelettes & Eggs",
      desc: "Stir into egg dishes or omelette batter for an easy veggie boost.",
    },
  ],
  "Tomato Powder": [
    {
      step: "Step 1 – Gravies & Curries",
      desc: "Add 1-2 tsp to curries and gravies as a natural tomato base without peeling.",
    },
    {
      step: "Step 2 – Soups & Sauces",
      desc: "Dissolve in warm water or stock to create a rich tomato base for soups.",
    },
    {
      step: "Step 3 – Marinades",
      desc: "Mix with spices to create a tangy marinade for paneer, chicken, or vegetables.",
    },
    {
      step: "Step 4 – Seasoning",
      desc: "Sprinkle over pasta, pizza, or salads for a concentrated tomato flavour.",
    },
  ],
  "Dehydrated Tomato": [
    {
      step: "Step 1 – Rehydrate & Use",
      desc: "Soak in warm water for 10-15 minutes to rehydrate before adding to dishes.",
    },
    {
      step: "Step 2 – Pasta & Pizza",
      desc: "Add directly to pasta sauces or pizza toppings for intense tomato flavour.",
    },
    {
      step: "Step 3 – Stews & Dals",
      desc: "Add to slow-cooked dals and stews for deep, concentrated tomato taste.",
    },
    {
      step: "Step 4 – Snacking",
      desc: "Season with salt and oregano for a healthy, fibre-rich snack on its own.",
    },
  ],
  "Black Pepper Powder": [
    {
      step: "Step 1 – Season Everything",
      desc: "Sprinkle freshly over salads, soups, eggs, and pasta for instant warmth.",
    },
    {
      step: "Step 2 – Marinades",
      desc: "Add to marinades for meats and paneer along with lemon juice and oil.",
    },
    {
      step: "Step 3 – Rasam & Soups",
      desc: "Add a generous pinch to rasam, pepper chicken, or bone broth for depth.",
    },
    {
      step: "Step 4 – With Turmeric",
      desc: "Combine with turmeric milk — piperine in pepper enhances curcumin absorption by 2000%.",
    },
  ],
  "Cardamom Powder": [
    {
      step: "Step 1 – Sweets & Desserts",
      desc: "Add ¼ tsp to kheer, halwa, or ladoo for a fragrant, floral sweetness.",
    },
    {
      step: "Step 2 – Chai",
      desc: "Stir into masala chai or black tea for an authentic South Asian flavour.",
    },
    {
      step: "Step 3 – Biryani",
      desc: "Add to biryani rice water or whole spice blend for aromatic layers.",
    },
    {
      step: "Step 4 – Storage",
      desc: "Store in an airtight container away from light. Use within 6 months of opening.",
    },
  ],
  "Fenugreek Powder": [
    {
      step: "Step 1 – Curries",
      desc: "Add ¼ tsp to sambar, dal fry, or fish curry for a distinctive bitter-nutty note.",
    },
    {
      step: "Step 2 – Flatbreads",
      desc: "Mix into methi thepla or paratha dough for traditional fenugreek flavour.",
    },
    {
      step: "Step 3 – Digestive Tea",
      desc: "Steep ½ tsp in hot water with honey for a digestive and blood-sugar-balancing tea.",
    },
    {
      step: "Step 4 – Use Sparingly",
      desc: "Fenugreek is potent — start with small amounts and adjust to taste.",
    },
  ],
  "Dry Ginger Powder": [
    {
      step: "Step 1 – Ginger Tea",
      desc: "Dissolve ½ tsp in hot water with honey and lemon for a warming, soothing tea.",
    },
    {
      step: "Step 2 – Curries & Soups",
      desc: "Add to curry pastes and soups for warming depth without fresh ginger prep.",
    },
    {
      step: "Step 3 – Baking",
      desc: "Use in gingerbread, spiced cookies, or cakes for warming spice notes.",
    },
    {
      step: "Step 4 – Digestive Remedy",
      desc: "Mix ¼ tsp with honey after meals to aid digestion and reduce bloating.",
    },
  ],
  "Mint Powder": [
    {
      step: "Step 1 – Chutneys & Dips",
      desc: "Mix 1 tsp with coriander, lemon juice, and green chilli for an instant mint chutney.",
    },
    {
      step: "Step 2 – Raita & Lassi",
      desc: "Stir into yoghurt for a refreshing mint raita or blend into a cooling mint lassi.",
    },
    {
      step: "Step 3 – Rice & Biriyani",
      desc: "Add to the cooking water or sprinkle on top of rice and biriyani for a fragrant finish.",
    },
    {
      step: "Step 4 – Beverages",
      desc: "Dissolve in water or lemonade for a quick mint drink; also great in mocktails.",
    },
  ],
  "Sambar Powder": [
    {
      step: "Step 1 – Prepare Sambar",
      desc: "Add 1–2 tsp to cooked toor dal with tamarind water and vegetables. Simmer for 10 minutes.",
    },
    {
      step: "Step 2 – Tadka",
      desc: "Finish with a mustard seed and curry leaf tadka in sesame oil for authentic flavour.",
    },
    {
      step: "Step 3 – Chutneys",
      desc: "Mix into coconut chutney or powder-based dry chutneys for a spicy kick.",
    },
    {
      step: "Step 4 – Storage",
      desc: "Keep in an airtight container. Use within 6 months for best aroma and colour.",
    },
  ],
  "Rasam Powder": [
    {
      step: "Step 1 – Make Rasam",
      desc: "Boil tamarind water with tomatoes and ½ tsp rasam powder. Add cooked dal if desired.",
    },
    {
      step: "Step 2 – Season",
      desc: "Finish with a tadka of mustard, dried chilli, and curry leaves in ghee.",
    },
    {
      step: "Step 3 – Pepper Rasam",
      desc: "Add extra rasam powder for a potent, therapeutic pepper rasam good for colds.",
    },
    {
      step: "Step 4 – Storage",
      desc: "Store in a cool, dry place in an airtight jar for freshness.",
    },
  ],
  "Chole Masala": [
    {
      step: "Step 1 – Pressure Cook Chickpeas",
      desc: "Soak chickpeas overnight. Pressure cook with salt until tender.",
    },
    {
      step: "Step 2 – Make Masala Base",
      desc: "Sauté onion, tomato, ginger, and garlic. Add 1.5 tsp chole masala and cook until oil separates.",
    },
    {
      step: "Step 3 – Combine & Simmer",
      desc: "Add cooked chickpeas to masala, stir well, and simmer for 10–15 minutes until thick.",
    },
    {
      step: "Step 4 – Serve",
      desc: "Garnish with ginger juliennes and fresh coriander. Serve with bhatura or rice.",
    },
  ],
  "Pav Bhaji Masala": [
    {
      step: "Step 1 – Boil Vegetables",
      desc: "Boil potatoes, cauliflower, peas, and carrots. Mash well.",
    },
    {
      step: "Step 2 – Cook on Tawa",
      desc: "Heat butter on tawa, add onions, tomatoes, and 1.5 tsp pav bhaji masala. Mix in mashed vegetables.",
    },
    {
      step: "Step 3 – Simmer & Mash",
      desc: "Mash and stir everything on the tawa until the mixture is thick and buttery.",
    },
    {
      step: "Step 4 – Serve Hot",
      desc: "Serve with toasted pav rolls, chopped onion, lemon wedge, and extra butter.",
    },
  ],
  "Kitchen King Masala": [
    {
      step: "Step 1 – Vegetable Curries",
      desc: "Add 1 tsp while cooking any vegetable sabzi for a rich, restaurant-style flavour.",
    },
    {
      step: "Step 2 – Paneer Dishes",
      desc: "Use in shahi paneer, paneer butter masala, or matar paneer for depth.",
    },
    {
      step: "Step 3 – Dal & Lentils",
      desc: "Stir into dal tadka for an elevated flavour without using multiple individual spices.",
    },
    {
      step: "Step 4 – Adjust to Taste",
      desc: "Start with ½ tsp and increase gradually — Kitchen King is a concentrated blend.",
    },
  ],
  "Haldi Doodh Mix": [
    {
      step: "Step 1 – Heat Milk",
      desc: "Warm 1 cup full-fat milk in a saucepan over medium heat — do not boil.",
    },
    {
      step: "Step 2 – Add Mix",
      desc: "Stir in 1–1.5 tsp Haldi Doodh Mix and whisk until fully dissolved.",
    },
    {
      step: "Step 3 – Sweeten",
      desc: "Add honey, jaggery, or sugar to taste. A pinch of black pepper boosts absorption.",
    },
    {
      step: "Step 4 – Drink Nightly",
      desc: "Enjoy 30 minutes before bedtime for best sleep and recovery benefits.",
    },
  ],
  "Moringa Latte Mix": [
    {
      step: "Step 1 – Warm Your Milk",
      desc: "Heat 1 cup oat milk, almond milk, or regular milk until steaming.",
    },
    {
      step: "Step 2 – Blend",
      desc: "Add 1 tsp Moringa Latte Mix to your mug. Pour in hot milk and whisk vigorously.",
    },
    {
      step: "Step 3 – Froth",
      desc: "Use a milk frother for a cafe-style frothy green latte.",
    },
    {
      step: "Step 4 – Customise",
      desc: "Add a touch of honey or maple syrup. Best enjoyed in the morning for energy.",
    },
  ],
  "Tulsi Green Tea Powder": [
    {
      step: "Step 1 – Brew Hot",
      desc: "Add ½ tsp powder to 1 cup of 80°C water (not boiling). Steep for 2–3 minutes.",
    },
    {
      step: "Step 2 – Stir Well",
      desc: "Stir until the powder dissolves completely. Strain if needed.",
    },
    {
      step: "Step 3 – Sweeten",
      desc: "Add a little honey or stevia. Avoid sugar to preserve the natural benefits.",
    },
    {
      step: "Step 4 – Iced Version",
      desc: "Brew double strength, let cool, then pour over ice for a refreshing iced tulsi tea.",
    },
  ],
  "Ashwagandha Milk Mix": [
    {
      step: "Step 1 – Warm Milk",
      desc: "Gently heat 1 cup milk of your choice until warm but not boiling.",
    },
    {
      step: "Step 2 – Add Mix",
      desc: "Stir in 1 tsp Ashwagandha Milk Mix. Whisk until completely blended.",
    },
    {
      step: "Step 3 – Sweeten",
      desc: "Add honey or dates syrup for natural sweetness and extra adaptogenic benefit.",
    },
    {
      step: "Step 4 – Take Consistently",
      desc: "Drink nightly for 30 days for best stress-relief and sleep improvement results.",
    },
  ],
  "Moringa Powder": [
    {
      step: "Step 1 – Morning Smoothie",
      desc: "Add 1 tsp to a green smoothie with banana, spinach, and coconut water.",
    },
    {
      step: "Step 2 – Soups & Curries",
      desc: "Stir into soups or lentil curries at the end of cooking for a nutrition boost.",
    },
    {
      step: "Step 3 – Juice or Water",
      desc: "Mix ½–1 tsp in a glass of water with lemon and honey as a daily tonic.",
    },
    {
      step: "Step 4 – Storage",
      desc: "Store in a cool, dark place. Sensitive to heat — add to dishes after cooking.",
    },
  ],
  "Ashwagandha Powder": [
    {
      step: "Step 1 – Morning Tonic",
      desc: "Mix ½ tsp in warm water with honey and a pinch of cinnamon on an empty stomach.",
    },
    {
      step: "Step 2 – Smoothies",
      desc: "Blend into smoothies with dates, banana, and almond milk for an adaptogenic boost.",
    },
    {
      step: "Step 3 – Milk Mix",
      desc: "Stir into warm milk with honey before bed for deep sleep and recovery.",
    },
    {
      step: "Step 4 – Consistency is Key",
      desc: "Use daily for 4–8 weeks to experience full adaptogenic benefits.",
    },
  ],
  "Neem Powder": [
    {
      step: "Step 1 – Internal Use",
      desc: "Mix ¼ tsp in a glass of water or juice. Consume on an empty stomach for blood purification.",
    },
    {
      step: "Step 2 – Face Pack",
      desc: "Mix with turmeric and rose water to make an acne-fighting, brightening face mask.",
    },
    {
      step: "Step 3 – Scalp Treatment",
      desc: "Blend with coconut oil and massage into scalp for dandruff and hair health.",
    },
    {
      step: "Step 4 – Caution",
      desc: "Use in small amounts. Not recommended for pregnant women or young children without medical advice.",
    },
  ],
  "Wheatgrass Powder": [
    {
      step: "Step 1 – Morning Shot",
      desc: "Mix 1 tsp in 100ml cold water. Stir well and drink immediately on an empty stomach.",
    },
    {
      step: "Step 2 – Smoothies",
      desc: "Add to green smoothies with apple, cucumber, and lemon for a refreshing detox drink.",
    },
    {
      step: "Step 3 – Juices",
      desc: "Blend with coconut water and a pinch of pink salt for a light, alkalising drink.",
    },
    {
      step: "Step 4 – Start Small",
      desc: "Begin with ½ tsp daily and gradually increase. Best results with consistent daily use.",
    },
  ],
  "Triphala Powder": [
    {
      step: "Step 1 – Bedtime Tonic",
      desc: "Mix ½ tsp in warm water and drink at bedtime for overnight detox and gentle bowel support.",
    },
    {
      step: "Step 2 – Honey Mix",
      desc: "Blend with honey for a traditional Ayurvedic preparation (Triphala Leha).",
    },
    {
      step: "Step 3 – Gradual Increase",
      desc: "Start with ¼ tsp and increase to ½–1 tsp over 2 weeks as your body adjusts.",
    },
    {
      step: "Step 4 – Long-Term Use",
      desc: "Best taken for at least 4–12 weeks as a digestive tonic. Consult a practitioner for high doses.",
    },
  ],
};

const PRODUCT_BENEFITS: Record<
  string,
  { icon: string; title: string; desc: string }[]
> = {
  "Turmeric Powder": [
    {
      icon: "🧬",
      title: "Anti-Inflammatory",
      desc: "Curcumin in turmeric is one of nature's most powerful anti-inflammatory compounds.",
    },
    {
      icon: "🛡️",
      title: "Boosts Immunity",
      desc: "Regular use helps strengthen the immune system and fight seasonal infections.",
    },
    {
      icon: "✨",
      title: "Skin Glow",
      desc: "Traditional use for radiant skin, reduces blemishes and evens skin tone.",
    },
    {
      icon: "🫀",
      title: "Heart Health",
      desc: "Supports healthy circulation and cardiovascular function.",
    },
  ],
  "Kashmiri Chilli Powder": [
    {
      icon: "🌶️",
      title: "Rich in Vitamins",
      desc: "High in Vitamin C and Vitamin A, supporting immunity and vision.",
    },
    {
      icon: "🔥",
      title: "Mild Heat",
      desc: "Gives beautiful colour to dishes without excessive spiciness — suitable for all ages.",
    },
    {
      icon: "💊",
      title: "Antioxidants",
      desc: "Contains capsaicin and carotenoids that protect cells from oxidative stress.",
    },
    {
      icon: "🫁",
      title: "Respiratory Support",
      desc: "Traditionally used to support healthy respiratory function.",
    },
  ],
  "Garam Masala": [
    {
      icon: "🌡️",
      title: "Warming Effect",
      desc: "Helps warm the body from within — ideal in cold seasons.",
    },
    {
      icon: "🌿",
      title: "Aids Digestion",
      desc: "The blend of whole spices promotes healthy digestion and reduces bloating.",
    },
    {
      icon: "🦠",
      title: "Antimicrobial",
      desc: "Clove and cinnamon in the blend have natural antimicrobial properties.",
    },
    {
      icon: "😋",
      title: "Enhances Flavour",
      desc: "Elevates any dish with its complex, aromatic, deep flavour profile.",
    },
  ],
  "Coriander Powder": [
    {
      icon: "🫀",
      title: "Heart Friendly",
      desc: "Helps lower bad cholesterol and supports healthy blood pressure.",
    },
    {
      icon: "🩺",
      title: "Blood Sugar",
      desc: "Traditionally used to support healthy blood sugar regulation.",
    },
    {
      icon: "💧",
      title: "Cooling Effect",
      desc: "Helps cool the digestive system and reduce heat-related discomfort.",
    },
    {
      icon: "🌿",
      title: "Rich in Iron",
      desc: "Good source of dietary iron and essential minerals.",
    },
  ],
  "Chai Masala": [
    {
      icon: "🫚",
      title: "Aids Digestion",
      desc: "Ginger and cardamom soothe the digestive tract and reduce nausea.",
    },
    {
      icon: "🧠",
      title: "Mental Clarity",
      desc: "Cardamom and cinnamon support focus and mental alertness.",
    },
    {
      icon: "🤧",
      title: "Cold Relief",
      desc: "Warming spices help relieve cold, cough, and congestion symptoms.",
    },
    {
      icon: "⚡",
      title: "Natural Energy",
      desc: "A natural energy boost without the crash of processed stimulants.",
    },
  ],
  "Cumin Powder": [
    {
      icon: "🫃",
      title: "Digestive Aid",
      desc: "One of the best natural remedies for indigestion, bloating and gas.",
    },
    {
      icon: "⚖️",
      title: "Weight Management",
      desc: "Studies suggest cumin supports metabolism and healthy weight management.",
    },
    {
      icon: "💉",
      title: "Iron Source",
      desc: "One of the richest plant-based sources of dietary iron.",
    },
    {
      icon: "🛡️",
      title: "Antibacterial",
      desc: "Natural antibacterial properties help protect the gut microbiome.",
    },
  ],
  "Amla Powder": [
    {
      icon: "🍊",
      title: "Vitamin C Powerhouse",
      desc: "One of the richest natural sources of Vitamin C — far higher than oranges.",
    },
    {
      icon: "💇",
      title: "Hair Growth",
      desc: "Nourishes hair follicles and promotes thick, lustrous hair growth.",
    },
    {
      icon: "👁️",
      title: "Eye Health",
      desc: "Rich in carotene, supporting healthy vision and reducing eye strain.",
    },
    {
      icon: "🔋",
      title: "Anti-Ageing",
      desc: "Powerful antioxidants slow oxidative ageing from within.",
    },
  ],
  "Onion Powder": [
    {
      icon: "🧅",
      title: "Rich in Quercetin",
      desc: "A natural antioxidant that helps reduce inflammation and supports heart health.",
    },
    {
      icon: "🦠",
      title: "Antibacterial",
      desc: "Natural compounds in onion help fight harmful bacteria in the gut and body.",
    },
    {
      icon: "🩸",
      title: "Blood Sugar Control",
      desc: "May help regulate blood sugar levels and support metabolic health.",
    },
    {
      icon: "🏃",
      title: "Convenient Flavour",
      desc: "Saves prep time while delivering the full flavour of fresh onions in every dish.",
    },
  ],
  "Garlic Powder": [
    {
      icon: "❤️",
      title: "Heart Health",
      desc: "Allicin in garlic helps reduce cholesterol and supports cardiovascular wellness.",
    },
    {
      icon: "🛡️",
      title: "Immunity Boost",
      desc: "Natural compounds strengthen the immune system and fight common infections.",
    },
    {
      icon: "🦴",
      title: "Bone Support",
      desc: "Contains manganese and calcium which are beneficial for bone strength.",
    },
    {
      icon: "🔥",
      title: "Anti-Inflammatory",
      desc: "Bioactive compounds help reduce chronic inflammation in the body.",
    },
  ],
  "Banana Powder": [
    {
      icon: "⚡",
      title: "Instant Energy",
      desc: "Natural sugars and carbohydrates provide a quick, sustained energy release.",
    },
    {
      icon: "💪",
      title: "Potassium Rich",
      desc: "High potassium content supports muscle function and healthy blood pressure.",
    },
    {
      icon: "🍼",
      title: "Gentle on Digestion",
      desc: "Easy to digest and ideal for babies, elderly, and those with sensitive stomachs.",
    },
    {
      icon: "😊",
      title: "Mood Support",
      desc: "Contains tryptophan which helps produce serotonin, supporting mood and sleep.",
    },
  ],
  "Beetroot Powder": [
    {
      icon: "🏋️",
      title: "Stamina Booster",
      desc: "Dietary nitrates improve blood flow and oxygen delivery during physical activity.",
    },
    {
      icon: "🫀",
      title: "Heart Health",
      desc: "Helps lower blood pressure and supports healthy cardiovascular function.",
    },
    {
      icon: "🩸",
      title: "Iron Rich",
      desc: "Good source of plant-based iron, supporting red blood cell production.",
    },
    {
      icon: "✨",
      title: "Skin Glow",
      desc: "Antioxidants and vitamin C promote radiant, youthful-looking skin.",
    },
  ],
  "Spinach Powder": [
    {
      icon: "🩸",
      title: "Iron Powerhouse",
      desc: "One of the best plant-based iron sources for energy and blood health.",
    },
    {
      icon: "👁️",
      title: "Eye Health",
      desc: "Lutein and zeaxanthin protect eyes from age-related macular degeneration.",
    },
    {
      icon: "🦴",
      title: "Bone Strength",
      desc: "Rich in Vitamin K and calcium, essential for strong and healthy bones.",
    },
    {
      icon: "🧠",
      title: "Brain Health",
      desc: "Folate and antioxidants support cognitive function and mental clarity.",
    },
  ],
  "Tomato Powder": [
    {
      icon: "🍅",
      title: "Lycopene Rich",
      desc: "Concentrated source of lycopene, a powerful antioxidant that protects cells.",
    },
    {
      icon: "❤️",
      title: "Heart Health",
      desc: "Lycopene and potassium support healthy blood pressure and cardiovascular function.",
    },
    {
      icon: "🌟",
      title: "Vitamin C",
      desc: "High in vitamin C to boost immunity and support collagen production.",
    },
    {
      icon: "🏋️",
      title: "Low Calorie",
      desc: "Adds rich flavour to dishes with minimal calories, ideal for weight management.",
    },
  ],
  "Dehydrated Tomato": [
    {
      icon: "🍅",
      title: "Nutrient Dense",
      desc: "Dehydration concentrates vitamins and minerals without added preservatives.",
    },
    {
      icon: "❤️",
      title: "Antioxidant Boost",
      desc: "Rich in lycopene and beta-carotene to protect against oxidative stress.",
    },
    {
      icon: "🌿",
      title: "Gut Friendly",
      desc: "High dietary fibre supports healthy digestion and gut microbiome.",
    },
    {
      icon: "⚡",
      title: "Long Shelf Life",
      desc: "Dehydrated form preserves freshness for months without refrigeration.",
    },
  ],
  "Black Pepper Powder": [
    {
      icon: "🧬",
      title: "Bioavailability",
      desc: "Piperine dramatically increases absorption of nutrients and other herbal compounds.",
    },
    {
      icon: "🌿",
      title: "Digestive Health",
      desc: "Stimulates digestive enzymes and helps improve gut motility and comfort.",
    },
    {
      icon: "🛡️",
      title: "Antioxidant",
      desc: "Rich in piperine and flavonoids that protect cells from free radical damage.",
    },
    {
      icon: "🧠",
      title: "Brain Function",
      desc: "Traditional Ayurvedic use for mental clarity and cognitive sharpness.",
    },
  ],
  "Cardamom Powder": [
    {
      icon: "😮‍💨",
      title: "Fresh Breath",
      desc: "Natural compounds in cardamom neutralise oral bacteria and freshen breath.",
    },
    {
      icon: "🫀",
      title: "Heart Health",
      desc: "Contains antioxidants that may help lower blood pressure and support heart health.",
    },
    {
      icon: "🌿",
      title: "Digestive Aid",
      desc: "Traditionally used to relieve indigestion, bloating, and nausea after meals.",
    },
    {
      icon: "😴",
      title: "Calming Effect",
      desc: "Aromatic compounds have mild calming and mood-lifting properties.",
    },
  ],
  "Fenugreek Powder": [
    {
      icon: "🩸",
      title: "Blood Sugar Balance",
      desc: "Well-studied for its role in managing blood sugar and insulin sensitivity.",
    },
    {
      icon: "💪",
      title: "Testosterone Support",
      desc: "Traditional use to support healthy testosterone levels and male vitality.",
    },
    {
      icon: "🤱",
      title: "Lactation Support",
      desc: "Commonly used by new mothers to support breast milk production.",
    },
    {
      icon: "🫃",
      title: "Digestive Relief",
      desc: "Natural fibre and mucilage soothe the gut and relieve constipation.",
    },
  ],
  "Dry Ginger Powder": [
    {
      icon: "🤢",
      title: "Anti-Nausea",
      desc: "One of the most effective natural remedies for nausea, morning sickness, and motion sickness.",
    },
    {
      icon: "🔥",
      title: "Warming & Circulation",
      desc: "Improves blood circulation and keeps the body warm from within.",
    },
    {
      icon: "🫁",
      title: "Respiratory Health",
      desc: "Traditional remedy for cough, cold, and congestion — opens up airways.",
    },
    {
      icon: "🌿",
      title: "Gut Health",
      desc: "Supports healthy digestion, reduces bloating, and soothes the intestinal lining.",
    },
  ],
  "Mint Powder": [
    {
      icon: "🌬️",
      title: "Cooling Effect",
      desc: "Naturally cools the body and helps combat heat and acidity.",
    },
    {
      icon: "🫃",
      title: "Digestive Aid",
      desc: "Relieves bloating, indigestion, and stomach cramps.",
    },
    {
      icon: "🦷",
      title: "Fresh Breath",
      desc: "Natural antibacterial properties help freshen breath.",
    },
    {
      icon: "🧘",
      title: "Stress Relief",
      desc: "Menthol aroma has calming and stress-relieving properties.",
    },
  ],
  "Sambar Powder": [
    {
      icon: "🌶️",
      title: "Rich in Spice Compounds",
      desc: "Blend of chillies, coriander, and pepper provides antioxidants and anti-inflammatory benefits.",
    },
    {
      icon: "🌿",
      title: "Digestive Blend",
      desc: "Cumin, coriander, and asafoetida in sambar powder aid digestion and reduce gas.",
    },
    {
      icon: "💪",
      title: "Protein-Friendly",
      desc: "Perfectly formulated to complement lentil dishes for a complete, nutritious meal.",
    },
    {
      icon: "🫀",
      title: "Heart Supportive",
      desc: "Curry leaves and coriander in the blend support healthy cholesterol levels.",
    },
  ],
  "Rasam Powder": [
    {
      icon: "🤧",
      title: "Cold & Flu Remedy",
      desc: "Black pepper and dry ginger in rasam are time-tested remedies for respiratory infections.",
    },
    {
      icon: "🌿",
      title: "Digestive Aid",
      desc: "Helps stimulate appetite, improve digestion, and relieve bloating.",
    },
    {
      icon: "🛡️",
      title: "Immunity Booster",
      desc: "Loaded with antioxidant spices that strengthen the immune system.",
    },
    {
      icon: "🫀",
      title: "Heart Health",
      desc: "Garlic and tamarind used in rasam support cardiovascular wellness.",
    },
  ],
  "Chole Masala": [
    {
      icon: "💪",
      title: "Protein Pairing",
      desc: "Perfectly balanced to bring out the best in high-protein chickpeas.",
    },
    {
      icon: "🌿",
      title: "Rich in Antioxidants",
      desc: "Pomegranate seed and amchur in the blend add unique antioxidant power.",
    },
    {
      icon: "🫃",
      title: "Digestive Spices",
      desc: "Cumin and coriander base aids in digesting legumes and reduces gas.",
    },
    {
      icon: "😋",
      title: "Authentic Flavour",
      desc: "Replicates the deep, smoky Punjabi dhaba flavour at home.",
    },
  ],
  "Pav Bhaji Masala": [
    {
      icon: "🥦",
      title: "Vegetable Boost",
      desc: "Designed for vegetable-heavy dishes, enhancing the nutrition of every veggie used.",
    },
    {
      icon: "🌶️",
      title: "Vitamin C Rich",
      desc: "Capsicum and tomato-friendly blend is naturally high in vitamin C.",
    },
    {
      icon: "🌿",
      title: "Digestive Blend",
      desc: "Aromatic spices in the blend support healthy digestion after hearty meals.",
    },
    {
      icon: "😋",
      title: "Street Food Magic",
      desc: "Captures the irresistible Mumbai street food flavour profile.",
    },
  ],
  "Kitchen King Masala": [
    {
      icon: "🌿",
      title: "All-Round Nutrition",
      desc: "Combines over 12 spices, providing a wide spectrum of micronutrients in one blend.",
    },
    {
      icon: "😋",
      title: "Flavour Versatility",
      desc: "Works perfectly in any sabzi, dal, or paneer dish — truly the king of masalas.",
    },
    {
      icon: "🛡️",
      title: "Antioxidant Power",
      desc: "Multi-spice blend delivers powerful combined antioxidant protection.",
    },
    {
      icon: "⏱️",
      title: "Saves Time",
      desc: "Replaces multiple individual spices — one teaspoon does the work of many.",
    },
  ],
  "Haldi Doodh Mix": [
    {
      icon: "😴",
      title: "Better Sleep",
      desc: "Ashwagandha and warm spices calm the nervous system for deep, restful sleep.",
    },
    {
      icon: "🛡️",
      title: "Immunity Shield",
      desc: "Turmeric and ginger work together to strengthen the immune response.",
    },
    {
      icon: "🧬",
      title: "Anti-Inflammatory",
      desc: "Curcumin and black pepper provide potent anti-inflammatory benefits.",
    },
    {
      icon: "🦴",
      title: "Bone & Joint Health",
      desc: "Calcium from milk combined with turmeric supports healthy bones and joints.",
    },
  ],
  "Moringa Latte Mix": [
    {
      icon: "🌿",
      title: "Superfood Dense",
      desc: "Moringa contains 90+ nutrients, 46 antioxidants, and all essential amino acids.",
    },
    {
      icon: "⚡",
      title: "Natural Energy",
      desc: "Provides sustained, clean energy without caffeine jitters or crashes.",
    },
    {
      icon: "🩸",
      title: "Iron & Protein",
      desc: "One of the richest plant-based sources of both iron and complete protein.",
    },
    {
      icon: "🌱",
      title: "Alkalising",
      desc: "Helps balance body pH and supports an alkaline internal environment.",
    },
  ],
  "Tulsi Green Tea Powder": [
    {
      icon: "🛡️",
      title: "Immunity Booster",
      desc: "Tulsi (holy basil) is revered in Ayurveda as the supreme adaptogen for immunity.",
    },
    {
      icon: "😌",
      title: "Stress Relief",
      desc: "Calming compounds in tulsi reduce cortisol and promote mental tranquillity.",
    },
    {
      icon: "🧬",
      title: "Rich in Antioxidants",
      desc: "Green tea catechins and tulsi flavonoids provide exceptional cellular protection.",
    },
    {
      icon: "🫁",
      title: "Respiratory Health",
      desc: "Tulsi's eugenol and camphor compounds support healthy breathing and airways.",
    },
  ],
  "Ashwagandha Milk Mix": [
    {
      icon: "🧘",
      title: "Stress Adaptogen",
      desc: "Withaferin-A in ashwagandha lowers cortisol and helps the body adapt to stress.",
    },
    {
      icon: "😴",
      title: "Deep Sleep",
      desc: "Promotes GABA activity in the brain for longer, deeper, more restorative sleep.",
    },
    {
      icon: "💪",
      title: "Muscle Strength",
      desc: "Clinically studied to increase muscle mass and physical endurance.",
    },
    {
      icon: "🧠",
      title: "Cognitive Health",
      desc: "Supports memory, focus, and neuroprotection over long-term use.",
    },
  ],
  "Moringa Powder": [
    {
      icon: "🌿",
      title: "Nature's Multivitamin",
      desc: "Contains Vitamins A, B, C, E, calcium, iron, and all essential amino acids.",
    },
    {
      icon: "🩸",
      title: "Anaemia Support",
      desc: "Exceptional plant-based iron content makes it ideal for combating iron deficiency.",
    },
    {
      icon: "🧬",
      title: "Anti-Inflammatory",
      desc: "Isothiocyanates in moringa are powerful natural anti-inflammatory compounds.",
    },
    {
      icon: "🌱",
      title: "Detoxifying",
      desc: "Supports liver function and natural detoxification processes in the body.",
    },
  ],
  "Ashwagandha Powder": [
    {
      icon: "🧘",
      title: "Reduces Cortisol",
      desc: "Clinical trials show ashwagandha significantly reduces stress hormone levels.",
    },
    {
      icon: "⚡",
      title: "Energy & Vitality",
      desc: "Combats fatigue and supports sustained energy throughout the day.",
    },
    {
      icon: "🧠",
      title: "Brain Tonic",
      desc: "Traditional Rasayana herb used to sharpen memory and cognitive performance.",
    },
    {
      icon: "🛡️",
      title: "Immune Support",
      desc: "Stimulates immune cell activity and enhances the body's natural defences.",
    },
  ],
  "Neem Powder": [
    {
      icon: "🩸",
      title: "Blood Purifier",
      desc: "Traditional Ayurvedic blood-purifying herb that removes toxins from the body.",
    },
    {
      icon: "✨",
      title: "Skin Health",
      desc: "Antibacterial and antifungal properties help clear acne, eczema, and skin infections.",
    },
    {
      icon: "🦠",
      title: "Antimicrobial",
      desc: "Azadirachtin in neem is a powerful natural antimicrobial and antiviral compound.",
    },
    {
      icon: "🦷",
      title: "Oral Health",
      desc: "Traditional use as a tooth-cleaning herb that kills oral bacteria and prevents gum disease.",
    },
  ],
  "Wheatgrass Powder": [
    {
      icon: "🌱",
      title: "Chlorophyll Rich",
      desc: "High chlorophyll content detoxifies the liver and alkalises the blood.",
    },
    {
      icon: "🩸",
      title: "Blood Builder",
      desc: "Structurally similar to haemoglobin — supports healthy red blood cell production.",
    },
    {
      icon: "⚡",
      title: "Energy Boost",
      desc: "Dense nutrients and enzymes provide a clean, sustained energy lift without stimulants.",
    },
    {
      icon: "🧬",
      title: "Anti-Ageing",
      desc: "Superoxide dismutase enzyme in wheatgrass is one of nature's most potent antioxidants.",
    },
  ],
  "Triphala Powder": [
    {
      icon: "🫃",
      title: "Gut Health",
      desc: "Gentle laxative effect cleanses the bowel and promotes healthy digestive rhythm.",
    },
    {
      icon: "🧬",
      title: "Antioxidant Triad",
      desc: "Three fruits provide a remarkable combination of antioxidant compounds and tannins.",
    },
    {
      icon: "👁️",
      title: "Eye Health",
      desc: "Traditionally used as an eyewash and internally to support vision health.",
    },
    {
      icon: "🛡️",
      title: "Immune Modulator",
      desc: "Balances and strengthens the immune system through multi-pathway action.",
    },
  ],
};

const WHY_CHOOSE_US = [
  {
    icon: "🌾",
    title: "Farm Direct",
    desc: "Sourced directly from trusted farms across India. No middlemen, no compromises.",
  },
  {
    icon: "✅",
    title: "FSSAI Certified",
    desc: "All products are certified and tested to meet strict Indian food safety standards.",
  },
  {
    icon: "🚫",
    title: "No Preservatives",
    desc: "100% natural — absolutely no artificial colours, flavours, or preservatives added.",
  },
  {
    icon: "🏭",
    title: "Hygienic Processing",
    desc: "Stone-ground in fully hygienic, food-grade facilities to retain natural oils and aroma.",
  },
  {
    icon: "📦",
    title: "Secure Packaging",
    desc: "Sealed in food-safe resealable pouches to lock in freshness until the last pinch.",
  },
  {
    icon: "💚",
    title: "Eco Friendly",
    desc: "Eco-conscious kraft paper packaging that is biodegradable and kind to the planet.",
  },
];

const HIGHLIGHTS = [
  { icon: "✅", text: "FSSAI Certified" },
  { icon: "🌿", text: "100% Natural Ingredients" },
  { icon: "🚫", text: "No Additives or Preservatives" },
  { icon: "🌾", text: "Directly Sourced from Farms" },
  { icon: "📦", text: "Hygienically Packed" },
];

const STAR_RATINGS: Record<string, { stars: number; count: number }> = {
  "Turmeric Powder": { stars: 4.8, count: 214 },
  "Kashmiri Chilli Powder": { stars: 4.6, count: 189 },
  "Garam Masala": { stars: 4.7, count: 302 },
  "Coriander Powder": { stars: 4.5, count: 156 },
  "Chai Masala": { stars: 4.9, count: 427 },
  "Cumin Powder": { stars: 4.4, count: 98 },
  "Amla Powder": { stars: 4.6, count: 173 },
  "Onion Powder": { stars: 4.5, count: 142 },
  "Garlic Powder": { stars: 4.7, count: 198 },
  "Banana Powder": { stars: 4.6, count: 165 },
  "Beetroot Powder": { stars: 4.8, count: 221 },
  "Spinach Powder": { stars: 4.5, count: 134 },
  "Black Pepper Powder": { stars: 4.7, count: 183 },
  "Cardamom Powder": { stars: 4.8, count: 241 },
  "Fenugreek Powder": { stars: 4.4, count: 97 },
  "Dry Ginger Powder": { stars: 4.6, count: 152 },
  "Mint Powder": { stars: 4.6, count: 112 },
  "Sambar Powder": { stars: 4.8, count: 312 },
  "Rasam Powder": { stars: 4.7, count: 267 },
  "Chole Masala": { stars: 4.8, count: 298 },
  "Pav Bhaji Masala": { stars: 4.9, count: 384 },
  "Kitchen King Masala": { stars: 4.7, count: 219 },
  "Haldi Doodh Mix": { stars: 4.9, count: 456 },
  "Moringa Latte Mix": { stars: 4.6, count: 178 },
  "Tulsi Green Tea Powder": { stars: 4.7, count: 203 },
  "Ashwagandha Milk Mix": { stars: 4.8, count: 334 },
  "Moringa Powder": { stars: 4.7, count: 245 },
  "Ashwagandha Powder": { stars: 4.8, count: 389 },
  "Neem Powder": { stars: 4.5, count: 127 },
  "Wheatgrass Powder": { stars: 4.6, count: 164 },
  "Triphala Powder": { stars: 4.7, count: 201 },
  "Tomato Powder": { stars: 4.7, count: 148 },
  "Dehydrated Tomato": { stars: 4.6, count: 119 },
};

function StarRating({ stars, count }: { stars: number; count: number }) {
  const fullStars = Math.floor(stars);
  const hasHalf = stars % 1 >= 0.5;
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {["1", "2", "3", "4", "5"].map((starKey, i) => (
          <span
            key={starKey}
            style={{
              color:
                i < fullStars
                  ? "oklch(0.83 0.17 85)"
                  : i === fullStars && hasHalf
                    ? "oklch(0.78 0.14 85)"
                    : "oklch(0.80 0.02 90)",
              fontSize: "1.1rem",
            }}
          >
            ★
          </span>
        ))}
      </div>
      <span
        className="font-semibold text-sm"
        style={{ color: "oklch(0.62 0.19 50)" }}
      >
        {stars}
      </span>
      <span className="text-sm" style={{ color: "oklch(0.55 0.06 155)" }}>
        ({count} reviews)
      </span>
    </div>
  );
}

function WeightSelector({
  category,
  selected,
  onSelect,
}: {
  category: string;
  selected: WeightOption;
  onSelect: (w: WeightOption) => void;
}) {
  const accentColor =
    category === "Spices"
      ? "oklch(0.62 0.19 50)"
      : category === "Masalas"
        ? "oklch(0.58 0.22 25)"
        : category === "Beverages"
          ? "oklch(0.55 0.15 195)"
          : category === "Wellness"
            ? "oklch(0.52 0.17 155)"
            : "oklch(0.55 0.20 310)";

  return (
    <div className="flex gap-2" data-ocid="product_detail.weight.toggle">
      {WEIGHT_OPTIONS.map((w) => (
        <button
          key={w.grams}
          type="button"
          onClick={() => onSelect(w)}
          className="flex-1 max-w-[100px] text-sm font-semibold py-2.5 rounded-xl border-2 transition-all duration-150 font-body"
          style={
            selected.grams === w.grams
              ? {
                  background: accentColor,
                  color: "white",
                  borderColor: accentColor,
                  boxShadow: `0 4px 16px ${accentColor}55`,
                }
              : {
                  background: "white",
                  borderColor: "oklch(0.88 0.04 155)",
                  color: "oklch(0.40 0.06 155)",
                }
          }
        >
          {w.label}
        </button>
      ))}
    </div>
  );
}

function MiniProductCard({
  product,
  onClick,
}: { product: Product; onClick: () => void }) {
  const imgSrc = PRODUCT_IMAGES[product.name];
  const basePrice = parsePrice(product.price);
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 w-44 rounded-xl overflow-hidden text-left transition-all duration-200 hover:-translate-y-1"
      style={{
        background: "white",
        border: "1.5px solid oklch(0.90 0.03 155)",
        boxShadow: "0 2px 12px rgba(15,76,53,0.07)",
      }}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-28 object-cover"
        />
      ) : (
        <div
          className="w-full h-28"
          style={{ background: "oklch(0.92 0.04 155)" }}
        />
      )}
      <div className="p-3">
        <p
          className="font-semibold text-sm leading-snug mb-1 line-clamp-2 font-display"
          style={{ color: "oklch(0.22 0.08 155)" }}
        >
          {product.name}
        </p>
        <p
          className="text-sm font-bold font-body"
          style={{ color: "oklch(0.30 0.10 155)" }}
        >
          &#8377;{basePrice}
        </p>
      </div>
    </button>
  );
}

function HowToUseSection({ productName }: { productName: string }) {
  const steps = HOW_TO_USE[productName] ?? [];
  if (steps.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 lg:p-8"
      style={{
        background: "white",
        border: "1.5px solid oklch(0.90 0.04 155)",
        boxShadow: "0 4px 24px rgba(15,76,53,0.08)",
      }}
    >
      <h2
        className="font-display text-2xl font-bold mb-6 flex items-center gap-2"
        style={{ color: "oklch(0.20 0.08 155)" }}
      >
        <span>📋</span> How to Use
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="flex gap-4 p-4 rounded-xl transition-shadow"
            style={{
              background: "rgba(15,76,53,0.04)",
              border: "1px solid rgba(15,76,53,0.12)",
            }}
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center font-display"
              style={{ background: "oklch(0.30 0.10 155)", color: "white" }}
            >
              {i + 1}
            </div>
            <div>
              <p
                className="font-semibold text-sm mb-1 font-display"
                style={{ color: "oklch(0.22 0.08 155)" }}
              >
                {s.step}
              </p>
              <p
                className="text-sm leading-relaxed font-body"
                style={{ color: "oklch(0.50 0.06 155)" }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BenefitsSection({ productName }: { productName: string }) {
  const benefits = PRODUCT_BENEFITS[productName] ?? [];
  if (benefits.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 lg:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(15,76,53,0.05) 0%, rgba(232,112,10,0.04) 100%)",
        border: "1.5px solid rgba(15,76,53,0.12)",
        boxShadow: "0 4px 24px rgba(15,76,53,0.07)",
      }}
    >
      <h2
        className="font-display text-2xl font-bold mb-6 flex items-center gap-2"
        style={{ color: "oklch(0.20 0.08 155)" }}
      >
        <span>🌿</span> Benefits of Using This Product
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-xl p-5 text-center transition-all duration-200 hover:-translate-y-1"
            style={{
              background: "white",
              border: "1.5px solid oklch(0.90 0.04 155)",
              boxShadow: "0 2px 12px rgba(15,76,53,0.06)",
            }}
          >
            <div className="text-3xl mb-3">{b.icon}</div>
            <h3
              className="font-display font-bold text-sm mb-2"
              style={{ color: "oklch(0.22 0.08 155)" }}
            >
              {b.title}
            </h3>
            <p
              className="text-xs leading-relaxed font-body"
              style={{ color: "oklch(0.50 0.06 155)" }}
            >
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function WhyChooseUsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 lg:p-8"
      style={{
        background: "white",
        border: "1.5px solid oklch(0.90 0.04 155)",
        boxShadow: "0 4px 24px rgba(15,76,53,0.08)",
      }}
    >
      <h2
        className="font-display text-2xl font-bold mb-2 flex items-center gap-2"
        style={{ color: "oklch(0.20 0.08 155)" }}
      >
        <span>🏆</span> Why Choose Ècoelen?
      </h2>
      <p
        className="text-sm mb-6 font-body"
        style={{ color: "oklch(0.50 0.06 155)" }}
      >
        We take pride in delivering the purest, most authentic spices from farm
        to your kitchen.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY_CHOOSE_US.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(232,112,10,0.05)",
              border: "1px solid rgba(232,112,10,0.15)",
            }}
          >
            <div className="text-3xl flex-shrink-0">{item.icon}</div>
            <div>
              <h3
                className="font-display font-bold text-sm mb-1"
                style={{ color: "oklch(0.22 0.08 155)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-xs leading-relaxed font-body"
                style={{ color: "oklch(0.50 0.06 155)" }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ProductDetailPage() {
  const { selectedProductId, setActivePage } = useNavigation();
  const { addToCart } = useCart();

  const products = STATIC_PRODUCTS;
  const product =
    products.find((p) => String(p.id) === selectedProductId) ?? products[0];

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    WEIGHT_OPTIONS[0],
  );
  const [addedToCart, setAddedToCart] = useState(false);

  const gallery = PRODUCT_GALLERY[product.name] ?? [
    { src: PRODUCT_IMAGES[product.name] ?? "", label: "Product" },
  ];
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const activeImg =
    gallery[activeImgIdx]?.src ?? PRODUCT_IMAGES[product.name] ?? "";

  const basePrice = parsePrice(product.price);
  const displayPrice = basePrice * selectedWeight.multiplier;
  const mrp = Math.round(displayPrice * 1.25);

  const accentColor =
    product.category === "Spices"
      ? "oklch(0.62 0.19 50)"
      : product.category === "Masalas"
        ? "oklch(0.58 0.22 25)"
        : product.category === "Beverages"
          ? "oklch(0.55 0.15 195)"
          : product.category === "Wellness"
            ? "oklch(0.52 0.17 155)"
            : "oklch(0.55 0.20 310)";

  const badgeClass =
    CATEGORY_BADGE_COLORS[product.category] ??
    "bg-stone-100 text-stone-800 border-stone-300";
  const rating = STAR_RATINGS[product.name] ?? { stars: 4.5, count: 128 };
  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 5);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight);
  };

  const goBack = () => {
    setActivePage("products", null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToProduct = (id: string) => {
    setActivePage("product-detail", id);
    setActiveImgIdx(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{ background: "oklch(0.97 0.018 90)" }}
      data-ocid="product_detail.page"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm font-body mb-8"
          style={{ color: "oklch(0.55 0.06 155)" }}
        >
          <button
            type="button"
            onClick={() => setActivePage("home")}
            className="transition-colors"
            style={{ color: "oklch(0.55 0.06 155)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "oklch(0.30 0.10 155)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "oklch(0.55 0.06 155)";
            }}
          >
            Home
          </button>
          <span>›</span>
          <button
            type="button"
            onClick={goBack}
            className="transition-colors"
            style={{ color: "oklch(0.55 0.06 155)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "oklch(0.30 0.10 155)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "oklch(0.55 0.06 155)";
            }}
          >
            Products
          </button>
          <span>›</span>
          <span
            style={{ color: "oklch(0.22 0.08 155)" }}
            className="font-medium"
          >
            {product.name}
          </span>
        </nav>

        {/* Main 2-col layout */}
        <div
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 rounded-3xl overflow-hidden p-6 lg:p-8 mb-8"
          style={{
            background: "white",
            boxShadow: "0 8px 40px rgba(15,76,53,0.10)",
            border: "1.5px solid oklch(0.90 0.04 155)",
          }}
        >
          {/* LEFT: Image gallery */}
          <div className="lg:w-2/5 flex flex-col gap-4">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 24px rgba(15,76,53,0.10)" }}
            >
              {activeImg ? (
                <img
                  src={activeImg}
                  alt={product.name}
                  className="w-full h-72 lg:h-96 object-cover transition-all duration-300"
                  onError={(e) => {
                    const fallback = PRODUCT_IMAGES[product.name];
                    if (fallback && e.currentTarget.src !== fallback)
                      e.currentTarget.src = fallback;
                  }}
                />
              ) : (
                <div
                  className="w-full h-72 lg:h-96 flex items-center justify-center"
                  style={{ background: "oklch(0.92 0.04 155)" }}
                >
                  <span className="text-5xl">🌿</span>
                </div>
              )}
              {gallery[activeImgIdx] && (
                <span
                  className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full font-body"
                  style={{
                    background: "rgba(15,76,53,0.75)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {gallery[activeImgIdx].label}
                </span>
              )}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: accentColor }}
              />
            </div>
            {/* Thumbnails */}
            <div className="flex flex-wrap gap-2">
              {gallery.map((img, idx) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setActiveImgIdx(idx)}
                  style={{
                    width: "80px",
                    border:
                      idx === activeImgIdx
                        ? `2px solid ${accentColor}`
                        : "2px solid oklch(0.88 0.04 155)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    opacity: idx === activeImgIdx ? 1 : 0.6,
                    boxShadow:
                      idx === activeImgIdx
                        ? `0 4px 16px ${accentColor}44`
                        : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {img.src ? (
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-16 object-cover"
                      onError={(e) => {
                        const fallback = PRODUCT_IMAGES[product.name];
                        if (fallback && e.currentTarget.src !== fallback)
                          e.currentTarget.src = fallback;
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-16"
                      style={{ background: "oklch(0.92 0.04 155)" }}
                    />
                  )}
                  <p
                    className="text-center text-xs font-semibold py-1 leading-tight px-1 truncate font-body"
                    style={{
                      color: "oklch(0.50 0.06 155)",
                      background: "white",
                      borderTop: "1px solid oklch(0.90 0.04 155)",
                    }}
                  >
                    {img.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info panel */}
          <div className="lg:w-3/5 flex flex-col gap-5">
            {/* Name & badge */}
            <div className="flex items-start justify-between gap-3">
              <h1
                className="font-display text-2xl lg:text-3xl font-bold leading-snug"
                style={{ color: "oklch(0.18 0.08 155)" }}
              >
                {product.name}
              </h1>
              <span
                className={`shrink-0 text-xs font-semibold border px-3 py-1 rounded-full font-body ${badgeClass}`}
              >
                {product.category}
              </span>
            </div>

            <StarRating stars={rating.stars} count={rating.count} />

            <div
              style={{ height: "1px", background: "oklch(0.90 0.04 155)" }}
            />

            {/* Price */}
            <div className="flex items-end gap-3">
              <span
                className="font-display text-3xl font-extrabold"
                style={{ color: "oklch(0.30 0.10 155)" }}
              >
                &#8377;{displayPrice}
              </span>
              <span
                className="line-through text-lg"
                style={{ color: "oklch(0.75 0.04 100)" }}
              >
                &#8377;{mrp}
              </span>
              <span
                className="font-bold text-sm px-2.5 py-0.5 rounded-full font-body"
                style={{
                  background: "rgba(15,76,53,0.10)",
                  color: "oklch(0.30 0.10 155)",
                }}
              >
                20% OFF
              </span>
            </div>
            <p
              className="text-xs font-body -mt-3"
              style={{ color: "oklch(0.60 0.05 100)" }}
            >
              Inclusive of all taxes
            </p>

            {/* Weight selector */}
            <div>
              <p
                className="text-sm font-semibold mb-2 font-body"
                style={{ color: "oklch(0.22 0.08 155)" }}
              >
                Select Weight
              </p>
              <WeightSelector
                category={product.category}
                selected={selectedWeight}
                onSelect={setSelectedWeight}
              />
            </div>

            {/* Stock status */}
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full font-body"
                style={
                  product.isAvailable
                    ? {
                        background: "rgba(15,76,53,0.08)",
                        color: "oklch(0.30 0.10 155)",
                        border: "1px solid rgba(15,76,53,0.2)",
                      }
                    : {
                        background: "rgba(239,68,68,0.08)",
                        color: "oklch(0.55 0.22 25)",
                        border: "1px solid rgba(239,68,68,0.2)",
                      }
                }
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: product.isAvailable
                      ? "oklch(0.52 0.17 155)"
                      : "oklch(0.55 0.22 25)",
                  }}
                />
                {product.isAvailable ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                disabled={!product.isAvailable || addedToCart}
                onClick={handleAddToCart}
                data-ocid="product_detail.secondary_button"
                className="flex-1 py-3 rounded-xl font-bold font-body transition-all duration-200 disabled:opacity-60"
                style={{
                  background: addedToCart
                    ? "rgba(15,76,53,0.08)"
                    : "transparent",
                  border: `2px solid ${accentColor}`,
                  color: addedToCart ? "oklch(0.30 0.10 155)" : accentColor,
                }}
              >
                {addedToCart ? "Added ✓" : "Add to Cart"}
              </button>
              <button
                type="button"
                disabled={!product.isAvailable}
                onClick={handleBuyNow}
                data-ocid="product_detail.primary_button"
                className="flex-1 py-3 rounded-xl font-bold font-body text-white cta-shimmer disabled:opacity-60"
              >
                Buy Now
              </button>
            </div>

            {/* Free delivery badge */}
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-3"
              style={{
                background: "rgba(15,76,53,0.06)",
                border: "1px solid rgba(15,76,53,0.15)",
              }}
            >
              <span className="text-xl">🚚</span>
              <div>
                <p
                  className="text-sm font-semibold font-body"
                  style={{ color: "oklch(0.30 0.10 155)" }}
                >
                  FREE Delivery
                </p>
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.50 0.06 155)" }}
                >
                  Usually ships in 2–3 business days
                </p>
              </div>
            </div>

            <div
              style={{ height: "1px", background: "oklch(0.90 0.04 155)" }}
            />

            {/* Highlights */}
            <div>
              <h3
                className="font-display text-base font-bold mb-3"
                style={{ color: "oklch(0.20 0.08 155)" }}
              >
                Product Highlights
              </h3>
              <ul className="space-y-2">
                {HIGHLIGHTS.map((h) => (
                  <li
                    key={h.text}
                    className="flex items-center gap-2.5 text-sm font-body"
                    style={{ color: "oklch(0.40 0.06 155)" }}
                  >
                    <span className="text-base">{h.icon}</span>
                    {h.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* About this product */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(15,76,53,0.04)",
                border: "1px solid rgba(15,76,53,0.10)",
              }}
            >
              <h3
                className="font-display text-base font-bold mb-2"
                style={{ color: "oklch(0.20 0.08 155)" }}
              >
                About this Product
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.50 0.06 155)" }}
              >
                {product.description}
              </p>
              <p
                className="font-body text-sm leading-relaxed mt-2"
                style={{ color: "oklch(0.50 0.06 155)" }}
              >
                Sourced directly from trusted farms across India and processed
                in hygienic, FSSAI-approved facilities. Each batch is
                stone-ground to preserve the natural oils and aroma.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="mb-8">
          <HowToUseSection productName={product.name} />
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <BenefitsSection productName={product.name} />
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <WhyChooseUsSection />
        </div>

        {/* You May Also Like */}
        {otherProducts.length > 0 && (
          <div>
            <h2
              className="font-display text-2xl font-bold mb-6"
              style={{ color: "oklch(0.20 0.08 155)" }}
            >
              You May Also Like
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {otherProducts.map((p) => (
                <MiniProductCard
                  key={String(p.id)}
                  product={p}
                  onClick={() => goToProduct(String(p.id))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
