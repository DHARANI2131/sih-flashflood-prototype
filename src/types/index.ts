export interface Sensor {
  id: string;
  name: string;
  location: string;
  rainfall: number;
  waterLevel: number;
  soilMoisture: number;
  battery: number;
  signal: 'strong' | 'moderate' | 'weak';
  status: 'online' | 'offline';
  lat: number;
  lng: number;
}

export interface Zone {
  id: string;
  name: string;
  risk: 'low' | 'moderate' | 'high' | 'critical';
  rainfall: number;
  waterLevel: number;
  soilMoisture: number;
  population: number;
  lat: number;
  lng: number;
}

export interface Alert {
  id: string;
  timestamp: Date;
  zone: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  type: 'flood' | 'landslide' | 'weather';
  message: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface RiskFactors {
  rainfall: number;
  waterLevel: number;
  soilMoisture: number;
  terrainChange: number;
  weatherTrend: number;
}

export interface SystemState {
  isOnline: boolean;
  lastUpdate: Date;
  demoMode: boolean;
  emergencyScenarioActive: boolean;
}
