
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
    sku: 'HW-HDPH-001',
    name: 'Premium Wireless Headphones',
    description: 'Premium wireless noise-cancelling headphones with Bluetooth 5.0 and 30-hour battery life.',
    category: 'Electronics',
    stock: 120,
    cost: 150.00,
    originalPrice: 329.99,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'wireless headphones',
    location: {
      type: 'store',
      id: 'store-2021',
      name: 'Store #2021 (LA)',
      zipCode: '90210'
    },
    marketData: {
      historicalSalesData: "Averaging 30 units per week. Spike in sales during holiday seasons and back-to-school periods.",
      socialMediaTrends: "High engagement on tech influencer channels. Often compared with competitors in reviews.",
      localEventData: "Upcoming tech conference in the area may boost sales of accessories.",
      competitorPrices: "Similar models from Sony and Bose are priced between $299 and $349.",
      marketTrends: "Increased demand for high-fidelity audio equipment and work-from-home accessories.",
      localDemand: "Steady demand from young professionals and students in the area.",
      costEffectivenessFactors: "Low shipping costs from the main warehouse. High-value item with good resale potential if returned."
    }
  },
  {
    id: 'item-2',
    sku: 'KT-AFRY-002',
    name: 'Air Fryer XL',
    description: 'A 5.8-quart extra-large air fryer, perfect for family meals. Features a digital touchscreen with 11 presets.',
    category: 'Home Goods',
    stock: 75,
    cost: 65.00,
    originalPrice: 119.99,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'air fryer',
    location: {
      type: 'store',
      id: 'store-1080',
      name: 'Store #1080 (SF)',
      zipCode: '94102'
    },
    marketData: {
      historicalSalesData: "Sales have been increasing steadily over the past 6 months.",
      socialMediaTrends: "Trending in healthy eating and quick meal prep communities on social media.",
      localEventData: "Local food festival next month could increase interest in cooking appliances.",
      competitorPrices: "Competitor models from Ninja and Cosori range from $99 to $139.",
      marketTrends: "Growing market for convenient kitchen appliances.",
      localDemand: "Popular among families and health-conscious consumers in San Francisco.",
      costEffectivenessFactors: "Medium-sized item, efficient to ship. Returns are often in good condition."
    }
  },
  {
    id: 'item-3',
    sku: 'TV-SMRT-003',
    name: '55-inch 4K Smart TV',
    description: 'A 55-inch 4K Smart TV, model XYZ. Minor cosmetic scratches on the bezel. Powers on and functions correctly.',
    category: 'Electronics',
    stock: 1,
    cost: 350.00,
    originalPrice: 799.99,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'smart tv',
    location: {
      type: 'warehouse',
      id: 'wh-returns-ca',
      name: 'CA Returns Center',
      zipCode: '90001'
    },
    marketData: {
      historicalSalesData: "High sales volume, especially during major sports events and holidays.",
      socialMediaTrends: "Frequently discussed during new movie releases and gaming events.",
      localEventData: "N/A",
      competitorPrices: "LG and Samsung models with similar specs are priced around $750-$850.",
      marketTrends: "Constant demand for larger screen sizes and smart features.",
      localDemand: "High demand for used electronics in good condition in this area.",
      costEffectivenessFactors: "Low logistics cost to a nearby resale partner. Warehousing space is available."
    },
    returnInfo: {
      returnReason: "Customer purchased a larger model and returned this one within the return period.",
      condition: "Used - Like New"
    }
  },
  {
    id: 'item-4',
    sku: 'PT-DGFD-004',
    name: 'Organic Dog Food',
    description: 'Grain-free organic dog food, 25lb bag. Made with free-range chicken and wholesome vegetables.',
    category: 'Pet Supplies',
    stock: 400,
    cost: 40.00,
    originalPrice: 75.99,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'dog food',
    location: {
      type: 'warehouse',
      id: 'wh-az-02',
      name: 'Warehouse-AZ-02',
      zipCode: '85001'
    },
     marketData: {
      historicalSalesData: "Consistent repeat purchases. Sales increased by 15% after a recent packaging redesign.",
      socialMediaTrends: "Popular with pet owner influencers focusing on animal wellness.",
      localEventData: "A 'Dog Day in the Park' event is happening in San Diego next month.",
      competitorPrices: "Brands like Blue Buffalo and Merrick are priced similarly per pound.",
      marketTrends: "Strong consumer shift towards premium, organic pet food.",
      localDemand: "High concentration of dog owners in the target zip code.",
      costEffectivenessFactors: "Good shelf life, but heavy to ship. Pallet-level shipping is cost-effective."
    }
  },
  {
    id: 'item-5',
    sku: 'GM-LPTP-005',
    name: 'Gaming Laptop 17"',
    description: 'High-performance gaming laptop with 17" 144Hz display, RTX 4070 GPU, and 32GB RAM.',
    category: 'Electronics',
    stock: 30,
    cost: 1200.00,
    originalPrice: 1999.99,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'gaming laptop',
    location: {
        type: 'warehouse',
        id: 'wh-nv-01',
        name: 'Warehouse-NV-01',
        zipCode: '89101'
    },
     marketData: {
      historicalSalesData: "High sales during new game releases and holiday season.",
      socialMediaTrends: "Often featured in 'Top Gaming Laptops of the Year' lists.",
      localEventData: "Major e-sports tournament in Las Vegas could drive sales.",
      competitorPrices: "Alienware and Razer models offer similar performance at a 10-15% higher price point.",
      marketTrends: "The market for high-end gaming hardware is expanding.",
      localDemand: "Popular with a younger demographic and e-sports enthusiasts in LA.",
      costEffectivenessFactors: "High-value item, requires secure shipping. Returns are infrequent but costly."
    }
  }
];
