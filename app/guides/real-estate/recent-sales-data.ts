export interface RecentSale {
  id: string;
  address: string;
  salePrice: number;
  listPrice: number;
  saleDate: string;       // YYYY-MM-DD
  listedDate: string;     // YYYY-MM-DD
  beds: number;
  baths: number;
  sqft?: number;
  description: string;
  propertyType: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family';
  offers?: number;
  neighborhood?: string;
  overAsking?: boolean;
}

// Add new sales at the top. Data from public NJ property records / MLS.
export const recentSales: RecentSale[] = [
  {
    id: 'sample-1',
    address: '34 Ridgewood Rd, South Orange, NJ 07079',
    salePrice: 1050000,
    listPrice: 975000,
    saleDate: '2026-10-10',
    listedDate: '2026-09-22',
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    description: 'Classic center-hall Colonial on a tree-lined block. Original hardwood floors, updated kitchen, full basement.',
    propertyType: 'Single Family',
    offers: 7,
    neighborhood: 'Upper South Orange Ave',
    overAsking: true,
  },
  {
    id: 'sample-2',
    address: '12 Turrell Ave, South Orange, NJ 07079',
    salePrice: 820000,
    listPrice: 849000,
    saleDate: '2026-09-28',
    listedDate: '2026-09-05',
    beds: 3,
    baths: 2,
    sqft: 1850,
    description: 'Tudor-style home with original character. Arched doorways, exposed beams, landscaped corner lot.',
    propertyType: 'Single Family',
    offers: 3,
    neighborhood: 'Near SOPAC',
    overAsking: false,
  },
  {
    id: 'sample-3',
    address: '45 Valley St Unit 3B, South Orange, NJ 07079',
    salePrice: 595000,
    listPrice: 579000,
    saleDate: '2026-09-15',
    listedDate: '2026-09-02',
    beds: 2,
    baths: 2,
    sqft: 1050,
    description: 'Downtown condo steps from South Orange Station. Open floor plan, updated baths, in-unit laundry.',
    propertyType: 'Condo',
    offers: 5,
    neighborhood: 'Downtown',
    overAsking: true,
  },
];
