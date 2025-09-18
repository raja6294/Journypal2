import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Radio,
  TrendingUp,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Incident {
  id: string;
  type: 'emergency' | 'missing' | 'medical' | 'suspicious';
  tourist: string;
  location: { lat: number; lng: number };
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  priority: 'high' | 'medium' | 'low';
  description: string;
}

interface TouristStatus {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  safetyScore: number;
  status: 'safe' | 'caution' | 'danger' | 'offline';
  lastUpdate: string;
  digitalId: string;
}

const PoliceDashboard = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [tourists, setTourists] = useState<TouristStatus[]>([]);
  const [stats, setStats] = useState({
    activeTourists: 42,
    activeIncidents: 3,
    resolvedToday: 8,
    averageResponse: '4.2 min'
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Mock incident data
    const mockIncidents: Incident[] = [
      {
        id: "INC-001",
        type: "emergency",
        tourist: "John Doe",
        location: { lat: 25.5941, lng: 85.1376 },
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        status: "active",
        priority: "high",
        description: "Panic button activated - Tourist in distress"
      },
      {
        id: "INC-002", 
        type: "missing",
        tourist: "Jane Smith",
        location: { lat: 26.1445, lng: 91.7362 },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "investigating",
        priority: "high",
        description: "Tourist hasn't checked in for 2 hours, last seen at market area"
      },
      {
        id: "INC-003",
        type: "medical",
        tourist: "Mike Johnson",
        location: { lat: 24.6333, lng: 93.9000 },
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        status: "resolved",
        priority: "medium",
        description: "Medical assistance requested - resolved by local clinic"
      }
    ];

    const mockTourists: TouristStatus[] = [
      {
        id: "TST-001",
        name: "John Doe",
        location: { lat: 25.5941, lng: 85.1376 },
        safetyScore: 35,
        status: "danger",
        lastUpdate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        digitalId: "0x7f9c...3a8b"
      },
      {
        id: "TST-002",
        name: "Jane Smith", 
        location: { lat: 26.1445, lng: 91.7362 },
        safetyScore: 65,
        status: "caution",
        lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        digitalId: "0x8a4d...7c9e"
      },
      {
        id: "TST-003",
        name: "Mike Johnson",
        location: { lat: 24.6333, lng: 93.9000 },
        safetyScore: 85,
        status: "safe",
        lastUpdate: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        digitalId: "0x9b5e...8d0f"
      },
      {
        id: "TST-004",
        name: "Sarah Wilson",
        location: { lat: 25.6093, lng: 85.1415 },
        safetyScore: 92,
        status: "safe",
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        digitalId: "0xa1b2...3c4d"
      }
    ];

    setIncidents(mockIncidents);
    setTourists(mockTourists);
  }, []);

  const handleDispatchUnit = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { ...inc, status: 'investigating' as const }
        : inc
    ));
    
    toast({
      title: "Unit Dispatched",
      description: `Emergency response unit dispatched to incident ${incidentId}`,
    });
  };

  const handleResolveIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { ...inc, status: 'resolved' as const }
        : inc
    ));
    
    toast({
      title: "Incident Resolved",
      description: `Incident ${incidentId} has been marked as resolved`,
    });
  };

  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'text-emergency';
      case 'missing': return 'text-warning';
      case 'medical': return 'text-primary';
      case 'suspicious': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-success text-success-foreground';
      case 'caution': return 'bg-warning text-warning-foreground'; 
      case 'danger': return 'bg-emergency text-emergency-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-emergency text-emergency-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Police Command Center</h1>
          <p className="text-muted-foreground">Real-time tourist safety monitoring and incident response</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-primary text-primary-foreground">
            <Activity className="mr-1 h-3 w-3" />
            System Online
          </Badge>
          <Badge className="bg-success text-success-foreground">
            <Radio className="mr-1 h-3 w-3" />
            All Units Ready
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Tourists</p>
                <p className="text-2xl font-bold text-primary">{stats.activeTourists}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-emergency">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Incidents</p>
                <p className="text-2xl font-bold text-emergency">{stats.activeIncidents}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-emergency" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-success">{stats.resolvedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-warning">{stats.averageResponse}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
          <TabsTrigger value="tourists">Tourist Status</TabsTrigger>
          <TabsTrigger value="map">Live Map</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-emergency" />
                Emergency Incidents
              </CardTitle>
              <CardDescription>Real-time incident monitoring and response coordination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className={`p-4 rounded-lg border-l-4 transition-all duration-200 ${
                      incident.priority === 'high' 
                        ? 'border-l-emergency bg-emergency/5' 
                        : incident.priority === 'medium'
                        ? 'border-l-warning bg-warning/5'
                        : 'border-l-success bg-success/5'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getPriorityColor(incident.priority)}>
                            {incident.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {incident.id}
                          </Badge>
                          <Badge className={
                            incident.status === 'active' ? 'bg-emergency text-emergency-foreground' :
                            incident.status === 'investigating' ? 'bg-warning text-warning-foreground' :
                            'bg-success text-success-foreground'
                          }>
                            {incident.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold text-foreground mb-1">
                          {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} - {incident.tourist}
                        </h4>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {incident.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(incident.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        {incident.status === 'active' && (
                          <Button
                            variant="emergency"
                            size="sm"
                            onClick={() => handleDispatchUnit(incident.id)}
                          >
                            <Radio className="mr-1 h-3 w-3" />
                            Dispatch Unit
                          </Button>
                        )}
                        
                        {incident.status === 'investigating' && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleResolveIncident(incident.id)}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Mark Resolved
                          </Button>
                        )}
                        
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tourists" className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Tourist Status Monitor
              </CardTitle>
              <CardDescription>Real-time tracking of all registered tourists</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {tourists.map((tourist) => (
                  <div
                    key={tourist.id}
                    className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{tourist.name}</h4>
                        <p className="text-sm text-muted-foreground font-mono">{tourist.digitalId}</p>
                      </div>
                      <Badge className={getStatusColor(tourist.status)}>
                        {tourist.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Safety Score</span>
                        <span className={`font-medium ${
                          tourist.safetyScore >= 80 ? 'text-success' :
                          tourist.safetyScore >= 60 ? 'text-warning' : 'text-emergency'
                        }`}>
                          {tourist.safetyScore}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Location</span>
                        <span className="text-foreground font-mono text-xs">
                          {tourist.location.lat.toFixed(4)}, {tourist.location.lng.toFixed(4)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Update</span>
                        <span className="text-foreground">
                          {new Date(tourist.lastUpdate).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="mr-1 h-3 w-3" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="mr-1 h-3 w-3" />
                        Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Command Center Map
              </CardTitle>
              <CardDescription>Real-time positioning and incident visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-12 grid-rows-8 h-full">
                    {Array.from({ length: 96 }).map((_, i) => (
                      <div key={i} className="border border-primary/20"></div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Shield className="h-8 w-8" />
                    <span className="text-lg font-semibold">Police Command Map</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Interactive command center map showing real-time tourist locations, 
                    incident markers, patrol units, and safety zones with heat mapping.
                  </p>

                  <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                      <span>Safe Zones</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-emergency animate-pulse"></div>
                      <span>Active Incidents</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      <span>Patrol Units</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Incident Reports
                </CardTitle>
                <CardDescription>Generate and manage incident documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="default" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Daily Report
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Safety Analytics
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Tourist Statistics
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-success" />
                  System Health
                </CardTitle>
                <CardDescription>Monitor system performance and connectivity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blockchain Network</span>
                  <Badge className="bg-success text-success-foreground">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Detection System</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency Response</span>
                  <Badge className="bg-success text-success-foreground">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Sync</span>
                  <Badge className="bg-primary text-primary-foreground">Syncing</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoliceDashboard;