import { Product } from '../types';

export const BRANDS = [
  "Hugo Boss", "Armani", "Gucci", "Prada", "Burberry", 
  "Louis Vuitton", "Versace", "Dior", "Chanel", "Hermès", 
  "Ralph Lauren", "Tommy Hilfiger", "Calvin Klein", "Fendi", 
  "Balenciaga", "Saint Laurent", "Valentino", "Givenchy", 
  "Dolce & Gabbana", "Bottega Veneta", "Alexander McQueen", 
  "Tom Ford", "Zegna", "Moncler", "Canada Goose", 
  "Off-White", "Loewe", "Celine", "Berluti", "Brioni"
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['Black', 'Navy', 'White', 'Grey', 'Beige', 'Burgundy', 'Olive'];

const PRODUCT_TYPES = [
  { name: 'Wool Coat', basePrice: 250 },
  { name: 'Slim Fit Suit', basePrice: 350 },
  { name: 'Cashmere Sweater', basePrice: 120 },
  { name: 'Silk Scarf', basePrice: 80 },
  { name: 'Leather Bag', basePrice: 450 },
  { name: 'Winter Jacket', basePrice: 180 },
  { name: 'Designer T-Shirt', basePrice: 60 },
  { name: 'Formal Trousers', basePrice: 110 }
];

const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }).map((_, i) => {
    const isMan = i % 2 === 0;
    const category = i % 5 === 0 ? 'accessories' : (isMan ? 'men' : 'women');
    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    
    const typeObj = PRODUCT_TYPES[i % PRODUCT_TYPES.length];
    
    // Lowered price logic: Base price + random variation
    const price = typeObj.basePrice + Math.floor(Math.random() * 100);

    const baseName = `${brand} ${typeObj.name}`;
    const baseDescription = `Discover the authentic ${brand} ${typeObj.name}. Selected by EZCENTIALS for its superior quality and timeless design. This piece represents the finest in ${isMan ? 'menswear' : 'womenswear'}.`;

    return {
      id: `prod-${i}`,
      sku: `EZ-${1000 + i}`,
      name: baseName,
      description: baseDescription,
      price: price,
      category: category as any,
      images: [
        `https://picsum.photos/seed/${i}-1/800/1000`,
        `https://picsum.photos/seed/${i}-2/800/1000`,
        `https://picsum.photos/seed/${i}-3/800/1000`,
        `https://picsum.photos/seed/${i}-4/800/1000`,
      ],
      sizes: SIZES,
      colors: COLORS.slice(i % 3, (i % 3) + 4), // Random subset of colors
      brand: brand,
      rating: 4 + (Math.random() * 1),
      reviews: Math.floor(Math.random() * 50),
      isNew: i < 20,
      tags: ['luxury', 'boutique', 'authentic'],
      translations: {
        de: {
          name: `[DE] ${baseName}`,
          description: `[DE] Entdecken Sie den authentischen ${brand} ${typeObj.name}. Ausgewählt von EZCENTIALS wegen seiner überragenden Qualität und zeitlosen Designs.`
        },
        fr: {
          name: `[FR] ${baseName}`,
          description: `[FR] Découvrez l'authentique ${brand} ${typeObj.name}. Sélectionné par EZCENTIALS pour sa qualité supérieure et son design intemporel.`
        },
        es: {
          name: `[ES] ${baseName}`,
          description: `[ES] Descubre el auténtico ${brand} ${typeObj.name}. Seleccionado por EZCENTIALS por su calidad superior y diseño atemporal.`
        },
        pt: {
          name: `[PT] ${baseName}`,
          description: `[PT] Descubra o autêntico ${brand} ${typeObj.name}. Selecionado pela EZCENTIALS pela sua qualidade superior e design intemporal.`
        }
      }
    };
  });
};

export const PRODUCTS = generateProducts(150);

export const getProductsByCategory = (category: string) => PRODUCTS.filter(p => p.category === category);
export const getFeaturedProducts = () => PRODUCTS.filter(p => p.isNew).slice(0, 8);
export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
