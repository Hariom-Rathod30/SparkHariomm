
export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  cost: number;
  originalPrice: number;
  currentPrice?: number;
  imageUrl: string;
  dataAiHint: string;
  location: {
    type: 'store' | 'warehouse';
    id: string;
    name: string;
    zipCode: string;
  };
  marketData: {
    historicalSalesData: string;
    socialMediaTrends: string;
    localEventData: string;
    competitorPrices: string;
    marketTrends: string;
    localDemand: string;
    costEffectivenessFactors: string;
  };
  returnInfo?: {
    returnReason: string;
    condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Damaged';
  };
};

export const inventoryData: InventoryItem[] = [
  {
    id: 'item-1',
    sku: 'CK-CBT-001',
    name: 'Premium Cricket Bat',
    description: 'English Willow Grade 1 cricket bat, perfect for professional players and enthusiasts.',
    category: 'Sports',
    stock: 120,
    cost: 8000.00,
    originalPrice: 14999.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'cricket bat',
    location: {
      type: 'store',
      id: 'store-2021',
      name: 'Store #2021 (Mumbai)',
      zipCode: '400050'
    },
    marketData: {
      historicalSalesData: "Averaging 20 units per week. Spike in sales during IPL and World Cup seasons.",
      socialMediaTrends: "High engagement on cricket fan pages and mentions by local sports influencers.",
      localEventData: "Upcoming local cricket tournament in the area is expected to boost sales.",
      competitorPrices: "Similar models from SG and SS are priced between ₹12,000 and ₹16,000.",
      marketTrends: "Increased demand for high-quality sports equipment post-pandemic.",
      localDemand: "Steady demand from cricket academies and young professionals in Mumbai.",
      costEffectivenessFactors: "Low shipping costs from the main warehouse. High-value item with good resale potential."
    }
  },
  {
    id: 'item-2',
    sku: 'KT-AFRY-002',
    name: 'Air Fryer XL',
    description: 'A 5.5-litre extra-large air fryer, perfect for family meals. Features a digital touchscreen with 11 presets.',
    category: 'Home Goods',
    stock: 75,
    cost: 4500.00,
    originalPrice: 8999.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'air fryer',
    location: {
      type: 'store',
      id: 'store-1080',
      name: 'Store #1080 (Bangalore)',
      zipCode: '560001'
    },
    marketData: {
      historicalSalesData: "Sales have been increasing steadily over the past 6 months, popular in metro cities.",
      socialMediaTrends: "Trending in healthy eating and quick meal prep communities on Instagram and YouTube India.",
      localEventData: "Local food and wellness festivals could increase interest in cooking appliances.",
      competitorPrices: "Competitor models from Philips and Havells range from ₹8,000 to ₹10,000.",
      marketTrends: "Growing market for convenient kitchen appliances in urban India.",
      localDemand: "Popular among working professionals and health-conscious consumers in Bangalore.",
      costEffectivenessFactors: "Medium-sized item, efficient to ship. Returns are often in good condition."
    }
  },
  {
    id: 'item-3',
    sku: 'TV-SMRT-003',
    name: '43-inch 4K Smart TV',
    description: 'A 43-inch 4K Smart TV, model XYZ. Minor cosmetic scratches on the bezel. Powers on and functions correctly.',
    category: 'Electronics',
    stock: 1,
    cost: 18000.00,
    originalPrice: 35999.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'smart tv',
    location: {
      type: 'warehouse',
      id: 'wh-returns-del',
      name: 'Delhi Returns Center',
      zipCode: '110001'
    },
    marketData: {
      historicalSalesData: "High sales volume, especially during Diwali and major online sale events.",
      socialMediaTrends: "Frequently discussed during new movie releases on OTT platforms and major cricket matches.",
      localEventData: "N/A",
      competitorPrices: "OnePlus and Xiaomi models with similar specs are priced around ₹32,000-₹38,000.",
      marketTrends: "Constant demand for larger screen sizes and smart features in the Indian market.",
      localDemand: "High demand for used electronics in good condition in this area.",
      costEffectivenessFactors: "Low logistics cost to a nearby resale partner. Warehousing space is available."
    },
    returnInfo: {
      returnReason: "Customer upgraded to a larger model during the return period.",
      condition: "Used - Like New"
    }
  },
  {
    id: 'item-4',
    sku: 'FD-BRIC-004',
    name: 'Basmati Rice (5kg)',
    description: 'Premium quality long-grain Basmati rice, 5kg pack. Ideal for biryani and pulao.',
    category: 'Groceries',
    stock: 800,
    cost: 450.00,
    originalPrice: 699.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'rice bag',
    location: {
      type: 'warehouse',
      id: 'wh-pun-02',
      name: 'Warehouse-Punjab-02',
      zipCode: '141001'
    },
     marketData: {
      historicalSalesData: "Consistent repeat purchases. Sales spike during festival seasons like Diwali and Eid.",
      socialMediaTrends: "Popular in food blogger channels and regional cuisine recipe groups.",
      localEventData: "Increased demand expected around the wedding season in Hyderabad.",
      competitorPrices: "Brands like India Gate and Daawat are priced similarly per kg.",
      marketTrends: "Strong consumer preference for branded and high-quality staple foods.",
      localDemand: "High consumption of Basmati rice in the target Hyderabad region.",
      costEffectivenessFactors: "Good shelf life, efficient to ship in bulk. Low return rate."
    }
  },
  {
    id: 'item-5',
    sku: 'GM-LPTP-005',
    name: 'Gaming Laptop 15"',
    description: 'High-performance gaming laptop with 15" 144Hz display, RTX 3060 GPU, and 16GB RAM.',
    category: 'Electronics',
    stock: 30,
    cost: 75000.00,
    originalPrice: 110000.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'gaming laptop',
    location: {
        type: 'warehouse',
        id: 'wh-del-01',
        name: 'Warehouse-Delhi-01',
        zipCode: '110001'
    },
     marketData: {
      historicalSalesData: "High sales during new game releases and festive sales like the Big Billion Days.",
      socialMediaTrends: "Often featured in 'Top Gaming Laptops' lists by Indian tech YouTubers.",
      localEventData: "Major gaming expos in Delhi and Mumbai could drive sales.",
      competitorPrices: "ASUS and HP models offer similar performance at a 5-10% higher price point.",
      marketTrends: "The market for e-sports and high-end gaming hardware is expanding rapidly in India.",
      localDemand: "Popular with a younger demographic and e-sports enthusiasts in Mumbai and Bangalore.",
      costEffectivenessFactors: "High-value item, requires secure shipping. Returns are infrequent but costly."
    }
  }
];
