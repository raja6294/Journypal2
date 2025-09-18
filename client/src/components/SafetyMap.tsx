import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, AlertTriangle, Users, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tourist {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  safetyScore: number;
  status: 'safe' | 'caution' | 'danger';
  lastUpdate: string;
}

interface SafeZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
  type: 'safe' | 'caution' | 'danger';
}

const SafetyMap = () => {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockTourists: Tourist[] = [
      {
        id: "1",
        name: "John Doe",
        location: { lat: 25.5941, lng: 85.1376 }, // Patna
        safetyScore: 85,
        status: 'safe',
        lastUpdate: new Date().toISOString()
      },
      {
        id: "2", 
        name: "Jane Smith",
        location: { lat: 26.1445, lng: 91.7362 }, // Guwahati
        safetyScore: 65,
        status: 'caution',
        lastUpdate: new Date().toISOString()
      },
      {
        id: "3",
        name: "Mike Johnson", 
        location: { lat: 24.6333, lng: 93.9000 }, // Imphal
        safetyScore: 35,
        status: 'danger',
        lastUpdate: new Date().toISOString()
      }
    ];

    const mockSafeZones: SafeZone[] = [
      {
        id: "1",
        name: "Tourist Info Center",
        center: { lat: 25.5941, lng: 85.1376 },
        radius: 500,
        type: 'safe'
      },
      {
        id: "2",
        name: "Market Area",
        center: { lat: 26.1445, lng: 91.7362 },
        radius: 300,
        type: 'caution'
      },
      {
        id: "3",
        name: "Remote Hill Station",
        center: { lat: 24.6333, lng: 93.9000 },
        radius: 1000,
        type: 'danger'
      }
    ];

    setTourists(mockTourists);
    setSafeZones(mockSafeZones);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation && isTracking) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Location error:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
        },
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isTracking, toast]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      toast({
        title: "Location Tracking Enabled",
        description: "Your location is now being tracked for safety.",
      });
    } else {
      toast({
        title: "Location Tracking Disabled",
        description: "Location tracking has been turned off.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-success text-success-foreground';
      case 'caution': return 'bg-warning text-warning-foreground';
      case 'danger': return 'bg-emergency text-emergency-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getZoneColor = (type: string) => {
    switch (type) {
      case 'safe': return 'text-success';
      case 'caution': return 'text-warning';
      case 'danger': return 'text-emergency';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="shadow-medium">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Live Safety Map
          </CardTitle>
          <Button
            variant={isTracking ? "destructive" : "default"}
            onClick={toggleTracking}
            className="flex items-center gap-2"
          >
            {isTracking ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isTracking ? "Stop Tracking" : "Start Tracking"}
          </Button>
        </CardHeader>
        <CardContent>
          {/* Simulated Map Interface */}
          <div 
            ref={mapRef}
            className="w-full h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center relative overflow-hidden"
          >
            {/* Background pattern to simulate map */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-8 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-primary/20"></div>
                ))}
              </div>
            </div>

            {/* Map overlay content */}
            <div className="relative z-10 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary">
                <MapPin className="h-8 w-8" />
                <span className="text-lg font-semibold">Interactive Safety Map</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                This would show a real interactive map with tourist locations, safe zones, 
                and real-time safety alerts. Integration with Google Maps or OpenStreetMap.
              </p>

              {/* Location indicators */}
              <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                  <span>Safe Tourists ({tourists.filter(t => t.status === 'safe').length})</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-warning animate-pulse"></div>
                  <span>Caution ({tourists.filter(t => t.status === 'caution').length})</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-emergency animate-pulse"></div>
                  <span>Danger ({tourists.filter(t => t.status === 'danger').length})</span>
                </div>
              </div>
            </div>
          </div>

          {userLocation && (
            <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
              <p className="text-sm text-success flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tourist Status List */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Active Tourists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tourists.map((tourist) => (
                <div
                  key={tourist.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-soft transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      tourist.status === 'safe' ? 'bg-success' :
                      tourist.status === 'caution' ? 'bg-warning' : 'bg-emergency'
                    }`} />
                    <div>
                      <p className="font-medium">{tourist.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tourist.location.lat.toFixed(4)}, {tourist.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(tourist.status)}>
                      {tourist.status.toUpperCase()}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Score: {tourist.safetyScore}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Safety Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {safeZones.map((zone) => (
                <div
                  key={zone.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-soft transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Shield className={`h-4 w-4 ${getZoneColor(zone.type)}`} />
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Radius: {zone.radius}m
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(zone.type)}>
                    {zone.type.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};





export default SafetyMap;