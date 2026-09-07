export interface RiskScore {
  overall: number;
  flood: number;
  landslide: number;
  level: 'low' | 'moderate' | 'high' | 'critical';
  confidence: number;
}

export const calculateRiskScore = (
  rainfall: number,
  waterLevel: number,
  soilMoisture: number,
  terrainChange: number,
  weatherTrend: number = 0
): RiskScore => {
  // Normalize inputs (0-100) to 0-1
  const rainNorm = Math.min(rainfall / 100, 1);
  const waterNorm = Math.min(waterLevel / 100, 1);
  const soilNorm = Math.min(soilMoisture / 100, 1);
  const terrainNorm = Math.min(terrainChange / 100, 1);
  const weatherNorm = Math.min(weatherTrend / 100, 1);

  // Calculate flood risk (rainfall + water level are primary)
  const floodRisk = (rainNorm * 0.4 + waterNorm * 0.35 + soilNorm * 0.15 + weatherNorm * 0.1) * 100;

  // Calculate landslide risk (soil moisture + terrain are primary)
  const landslideRisk = (soilNorm * 0.35 + terrainNorm * 0.4 + rainNorm * 0.15 + waterNorm * 0.1) * 100;

  // Overall risk
  const overall = (floodRisk * 0.55 + landslideRisk * 0.45);

  // Determine level
  let level: 'low' | 'moderate' | 'high' | 'critical';
  if (overall <= 30) level = 'low';
  else if (overall <= 55) level = 'moderate';
  else if (overall <= 75) level = 'high';
  else level = 'critical';

  // Confidence increases with extreme values
  const confidence = Math.min((Math.abs(rainNorm - 0.5) + Math.abs(waterNorm - 0.5)) * 100 + 50, 95);

  return {
    overall: Math.round(overall),
    flood: Math.round(floodRisk),
    landslide: Math.round(landslideRisk),
    level,
    confidence: Math.round(confidence),
  };
};

export const getRiskColor = (level: string): string => {
  switch (level) {
    case 'low':
      return '#10b981';
    case 'moderate':
      return '#f59e0b';
    case 'high':
      return '#f97316';
    case 'critical':
      return '#dc2626';
    default:
      return '#6b7280';
  }
};

export const getRiskBgClass = (level: string): string => {
  switch (level) {
    case 'low':
      return 'bg-green-900/20 border-green-500/50';
    case 'moderate':
      return 'bg-amber-900/20 border-amber-500/50';
    case 'high':
      return 'bg-orange-900/20 border-orange-500/50';
    case 'critical':
      return 'bg-red-900/20 border-red-500/50';
    default:
      return 'bg-gray-900/20 border-gray-500/50';
  }
};
