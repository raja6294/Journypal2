import express from "express";

const router = express.Router();

const regionData = {
  Guwahati: { crimeRate: 0.4, policeStations: 12, hospitals: 15, touristPopularity: 8 },
  Shillong: { crimeRate: 0.3, policeStations: 8, hospitals: 10, touristPopularity: 9 },
  Gangtok: { crimeRate: 0.25, policeStations: 6, hospitals: 8, touristPopularity: 10 },
  Aizawl: { crimeRate: 0.2, policeStations: 5, hospitals: 6, touristPopularity: 6 },
  Kohima: { crimeRate: 0.35, policeStations: 4, hospitals: 5, touristPopularity: 5 }
};

function findNearestCity(lat, lon) {
  if (lat > 25.5 && lat < 27 && lon > 91.5 && lon < 92) return "Shillong";
  if (lat > 26 && lat < 27 && lon > 91 && lon < 92) return "Guwahati";
  if (lat > 27 && lat < 28 && lon > 88 && lon < 89) return "Gangtok";
  if (lat > 23 && lat < 24 && lon > 92 && lon < 93) return "Aizawl";
  if (lat > 25.5 && lat < 26.5 && lon > 93 && lon < 94) return "Kohima";
  return null;
}

function getTimeFactor(date) {
  const hour = date.getHours();
  if (hour >= 6 && hour <= 18) return 0;
  const nightHours = (hour >= 18 ? hour - 18 : hour + 6);
  return nightHours / 12;
}

function calculateSafetyScore(city, currentTime) {
  const cityData = regionData[city];
  if (!cityData) return { score: 50, reasons: ["Unknown region data"] };

  let score = 100;
  const reasons = [];

  const crimePenalty = cityData.crimeRate * 30;
  score -= crimePenalty;
  if (crimePenalty > 15) reasons.push("Moderate crime risk");

  score += cityData.policeStations * 1.5;
  score += cityData.hospitals * 1;
  score += cityData.touristPopularity;

  if (city === "Kohima" || city === "Aizawl") {
    score -= 8;
    reasons.push("Challenging road conditions");
  }

  const timeFactor = getTimeFactor(currentTime);
  const nightPenalty = timeFactor * 30;
  score -= nightPenalty;
  if (nightPenalty > 15) reasons.push("Night time risk is higher");

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    reasons
  };
}

router.get("/safety-score", (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  const timeParam = req.query.time;

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: "lat and lon are required numbers" });
  }

  const city = findNearestCity(lat, lon);
  const currentTime = timeParam ? new Date(timeParam) : new Date();
  const result = calculateSafetyScore(city, currentTime);

  res.json({
    city: city || "Unknown",
    coordinates: { lat, lon },
    time: currentTime.toISOString(),
    score: result.score,
    riskFactors: result.reasons
  });
});

export default router;
