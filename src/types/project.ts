export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  status: 'active' | 'draft' | 'archived';
  imageUrl: string;
  riskLevel: string;
  teamSize: number;
  lastUpdated: string;
}

export interface MapFeature {
  id: string;
  name: string;
  type: string;
  category: 'infrastructure' | 'disaster' | 'eco';
  status: string;
  resilienceScore: number;
  lastUpdated: string;
  createdBy: string;
  imageUrl?: string;
  lat?: number;
  lng?: number;
}