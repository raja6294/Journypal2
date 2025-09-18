// Safety Score Algorithm for Northeast India
// Based on location coordinates, time of day, and predefined safety data

export interface Location {
  latitude: number;
  longitude: number;
  placeName?: string;
}

export interface SafetyData {
  score: number;
  factors: string[];
  recommendations: string[];
  alertLevel: 'high' | 'medium' | 'low' | 'critical';
}

// Northeast India states with their approximate boundaries and base safety scores
const NORTHEAST_REGIONS = {
  // Assam
  assam: {
    bounds: { north: 27.8, south: 24.1, east: 96.1, west: 89.7 },
    baseScore: 75,
    urbanCenters: [
      { lat: 26.1445, lng: 91.7362, name: "Guwahati", bonus: 10 },
      { lat: 27.4728, lng: 95.0173, name: "Dibrugarh", bonus: 5 },
      { lat: 26.7509, lng: 94.2037, name: "Jorhat", bonus: 5 }
    ]
  },
  // Arunachal Pradesh
  arunachal: {
    bounds: { north: 29.3, south: 26.6, east: 97.4, west: 91.6 },
    baseScore: 65,
    urbanCenters: [
      { lat: 27.0844, lng: 93.6053, name: "Itanagar", bonus: 8 },
      { lat: 28.2180, lng: 94.3634, name: "Pasighat", bonus: 5 }
    ]
  },
  // Meghalaya
  meghalaya: {
    bounds: { north: 26.1, south: 25.0, east: 92.8, west: 89.9 },
    baseScore: 80,
    urbanCenters: [
      { lat: 25.5788, lng: 91.8933, name: "Shillong", bonus: 12 },
      { lat: 25.2993, lng: 90.2203, name: "Tura", bonus: 6 }
    ]
  },
  // Manipur
  manipur: {
    bounds: { north: 25.7, south: 23.8, east: 94.8, west: 93.0 },
    baseScore: 60,
    urbanCenters: [
      { lat: 24.8170, lng: 93.9368, name: "Imphal", bonus: 10 }
    ]
  },
  // Mizoram
  mizoram: {
    bounds: { north: 24.6, south: 21.9, east: 93.3, west: 92.2 },
    baseScore: 85,
    urbanCenters: [
      { lat: 23.7307, lng: 92.7173, name: "Aizawl", bonus: 15 }
    ]
  },
  // Nagaland
  nagaland: {
    bounds: { north: 27.0, south: 25.2, east: 95.2, west: 93.3 },
    baseScore: 70,
    urbanCenters: [
      { lat: 25.6751, lng: 94.1086, name: "Kohima", bonus: 8 },
      { lat: 26.1584, lng: 94.9615, name: "Dimapur", bonus: 10 }
    ]
  },
  // Tripura
  tripura: {
    bounds: { north: 24.5, south: 22.9, east: 92.3, west: 91.0 },
    baseScore: 78,
    urbanCenters: [
      { lat: 23.8315, lng: 91.2868, name: "Agartala", bonus: 12 }
    ]
  },
  // Sikkim
  sikkim: {
    bounds: { north: 28.1, south: 27.0, east: 88.9, west: 88.0 },
    baseScore: 90,
    urbanCenters: [
      { lat: 27.3314, lng: 88.6138, name: "Gangtok", bonus: 15 }
    ]
  }
};

// Tourist hotspots with safety bonuses
const TOURIST_HOTSPOTS = [
  { lat: 26.1445, lng: 91.7362, name: "Guwahati", bonus: 10 },
  { lat: 25.5788, lng: 91.8933, name: "Shillong", bonus: 15 },
  { lat: 27.3314, lng: 88.6138, name: "Gangtok", bonus: 15 },
  { lat: 23.7307, lng: 92.7173, name: "Aizawl", bonus: 12 },
  { lat: 25.6751, lng: 94.1086, name: "Kohima", bonus: 8 },
  { lat: 24.8170, lng: 93.9368, name: "Imphal", bonus: 5 },
  { lat: 26.6593, lng: 92.7885, name: "Kaziranga", bonus: 8 },
  { lat: 25.3176, lng: 91.7849, name: "Cherrapunji", bonus: 10 }
];

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function identifyRegion(lat: number, lng: number): string | null {
  for (const [regionName, region] of Object.entries(NORTHEAST_REGIONS)) {
    const { bounds } = region;
    if (lat >= bounds.south && lat <= bounds.north && 
        lng >= bounds.west && lng <= bounds.east) {
      return regionName;
    }
  }
  return null;
}

function getUrbanCenterBonus(lat: number, lng: number): number {
  let maxBonus = 0;
  
  for (const region of Object.values(NORTHEAST_REGIONS)) {
    for (const center of region.urbanCenters) {
      const distance = getDistanceFromLatLonInKm(lat, lng, center.lat, center.lng);
      if (distance < 20) { // Within 20km of urban center
        const bonus = center.bonus * Math.max(0, (20 - distance) / 20);
        maxBonus = Math.max(maxBonus, bonus);
      }
    }
  }
  
  return Math.round(maxBonus);
}

function getTouristHotspotBonus(lat: number, lng: number): number {
  let maxBonus = 0;
  
  for (const hotspot of TOURIST_HOTSPOTS) {
    const distance = getDistanceFromLatLonInKm(lat, lng, hotspot.lat, hotspot.lng);
    if (distance < 15) { // Within 15km of tourist hotspot
      const bonus = hotspot.bonus * Math.max(0, (15 - distance) / 15);
      maxBonus = Math.max(maxBonus, bonus);
    }
  }
  
  return Math.round(maxBonus);
}

function getTimeModifier(currentHour: number): { modifier: number; factors: string[] } {
  const factors: string[] = [];
  
  if (currentHour >= 6 && currentHour < 18) {
    // Daytime (6 AM - 6 PM)
    return { modifier: 1.0, factors: ["Daylight hours - optimal safety"] };
  } else if (currentHour >= 18 && currentHour < 20) {
    // Early evening (6 PM - 8 PM)
    factors.push("Early evening - slightly reduced visibility");
    return { modifier: 0.95, factors };
  } else if (currentHour >= 20 && currentHour < 22) {
    // Evening (8 PM - 10 PM)
    factors.push("Evening hours - reduced safety, stay in well-lit areas");
    return { modifier: 0.85, factors };
  } else if (currentHour >= 22 || currentHour < 2) {
    // Late night (10 PM - 2 AM)
    factors.push("Late night - significantly reduced safety", "Avoid isolated areas");
    return { modifier: 0.70, factors };
  } else {
    // Very late night/early morning (2 AM - 6 AM)
    factors.push("Very late night - critical safety risk", "Stay indoors or in secure accommodation");
    return { modifier: 0.55, factors };
  }
}

function getTerrainModifier(lat: number, lng: number): { modifier: number; factors: string[] } {
  const factors: string[] = [];
  
  // Mountain regions (higher altitude areas)
  if (lat > 27.5 || (lat > 26.5 && lng < 92.0)) {
    factors.push("Mountainous terrain - check weather conditions");
    return { modifier: 0.9, factors };
  }
  
  // Border areas
  if (lng > 96.5 || lng < 90.0 || lat < 23.0) {
    factors.push("Border region - additional security considerations");
    return { modifier: 0.85, factors };
  }
  
  return { modifier: 1.0, factors };
}

export function calculateSafetyScore(location: Location, currentTime?: Date): SafetyData {
  const { latitude, longitude } = location;
  const now = currentTime || new Date();
  const currentHour = now.getHours();
  
  // Identify region
  const region = identifyRegion(latitude, longitude);
  
  if (!region) {
    return {
      score: 30,
      factors: ["Location outside Northeast India coverage area"],
      recommendations: ["Limited safety data available for this location"],
      alertLevel: 'critical'
    };
  }
  
  // Get base score for region
  let score = NORTHEAST_REGIONS[region as keyof typeof NORTHEAST_REGIONS].baseScore;
  const factors: string[] = [];
  const recommendations: string[] = [];
  
  // Add region info
  factors.push(`Base safety for ${region}: ${score}/100`);
  
  // Apply urban center bonus
  const urbanBonus = getUrbanCenterBonus(latitude, longitude);
  if (urbanBonus > 0) {
    score += urbanBonus;
  factors.push(`Urban center proximity bonus: +${urbanBonus}`);
    recommendations.push("Stay in well-developed urban areas when possible");
  }
  
  // Apply tourist hotspot bonus
  const touristBonus = getTouristHotspotBonus(latitude, longitude);
  if (touristBonus > 0) {
    score += touristBonus;
  factors.push(`Tourist destination bonus: +${touristBonus}`);
    recommendations.push("Tourist areas typically have better security infrastructure");
  }
  
  // Apply time modifier
  const timeInfo = getTimeModifier(currentHour);
  score *= timeInfo.modifier;
  factors.push(...timeInfo.factors);
  
  // Apply terrain modifier
  const terrainInfo = getTerrainModifier(latitude, longitude);
  score *= terrainInfo.modifier;
  factors.push(...terrainInfo.factors);
  
  // Cap score at 100
  score = Math.min(100, Math.round(score));
  
  // Determine alert level
  let alertLevel: 'high' | 'medium' | 'low' | 'critical';
  if (score >= 80) {
    alertLevel = 'high';
    recommendations.push("Safe for tourism", "Follow standard travel precautions");
  } else if (score >= 65) {
    alertLevel = 'medium';
    recommendations.push("Generally safe with precautions", "Stay aware of surroundings", "Travel in groups when possible");
  } else if (score >= 45) {
    alertLevel = 'low';
    recommendations.push("Exercise increased caution", "Avoid isolated areas", "Inform others of your whereabouts");
  } else {
    alertLevel = 'critical';
    recommendations.push("High risk area", "Consider postponing travel", "If travel necessary, use local guides");
  }
  
  // Add time-specific recommendations
  if (currentHour >= 18) {
    recommendations.push("Ensure reliable transportation for evening hours");
  }
  if (currentHour >= 22 || currentHour < 6) {
    recommendations.push("Stay in secure accommodation", "Avoid unnecessary travel");
  }
  
  return {
    score,
    factors,
    recommendations,
    alertLevel
  };
}

export function getRegionName(lat: number, lng: number): string {
  const region = identifyRegion(lat, lng);
  return region ? region.charAt(0).toUpperCase() + region.slice(1) : "Unknown Region";
}