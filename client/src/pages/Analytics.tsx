import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  AlertTriangle,
  Clock,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";

const Analytics = () => {
  const safetyMetrics = {
    overallSafety: 87,
    incidentReduction: 34,
    responseTime: 4.2,
    touristSatisfaction: 94
  };

  const monthlyStats = [
    { month: 'Jan', tourists: 1250, incidents: 23, resolved: 22 },
    { month: 'Feb', tourists: 1380, incidents: 18, resolved: 18 },
    { month: 'Mar', tourists: 1520, incidents: 15, resolved: 15 },
    { month: 'Apr', tourists: 1680, incidents: 12, resolved: 12 },
    { month: 'May', tourists: 1890, incidents: 8, resolved: 8 },
    { month: 'Jun', tourists: 2100, incidents: 6, resolved: 6 }
  ];

  const incidentTypes = [
    { type: 'Medical Emergency', count: 45, percentage: 35, trend: '+12%' },
    { type: 'Lost Tourist', count: 32, percentage: 25, trend: '-18%' },
    { type: 'Safety Alert', count: 28, percentage: 22, trend: '-25%' },
    { type: 'Suspicious Activity', count: 15, percentage: 12, trend: '+5%' },
    { type: 'Equipment Issue', count: 8, percentage: 6, trend: '-8%' }
  ];

  const regionData = [
    { region: 'Guwahati', tourists: 850, safetyScore: 92, incidents: 3 },
    { region: 'Shillong', tourists: 620, safetyScore: 88, incidents: 5 },
    { region: 'Imphal', tourists: 480, safetyScore: 85, incidents: 7 },
    { region: 'Agartala', tourists: 320, safetyScore: 90, incidents: 2 },
    { region: 'Aizawl', tourists: 280, safetyScore: 87, incidents: 4 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Safety Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into tourist safety performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-success text-success-foreground">
            <TrendingUp className="mr-1 h-3 w-3" />
            +34% Safety Improvement
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-soft border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Safety</p>
                <p className="text-2xl font-bold text-success">{safetyMetrics.overallSafety}%</p>
                <p className="text-xs text-success">+5% from last month</p>
              </div>
              <Shield className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incident Reduction</p>
                <p className="text-2xl font-bold text-primary">{safetyMetrics.incidentReduction}%</p>
                <p className="text-xs text-primary">vs last quarter</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-warning">{safetyMetrics.responseTime}m</p>
                <p className="text-xs text-warning">-1.3m improvement</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold text-success">{safetyMetrics.touristSatisfaction}%</p>
                <p className="text-xs text-success">+8% increase</p>
              </div>
              <Target className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Performance */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Monthly Performance
                </CardTitle>
                <CardDescription>Tourist volumes and incident rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((stat) => (
                    <div key={stat.month} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{stat.month}</span>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>{stat.tourists} tourists</span>
                          <span>{stat.incidents} incidents</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Progress 
                          value={(stat.tourists / 2500) * 100} 
                          className="h-2"
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-success">Tourist Volume</span>
                          <span className="text-xs text-muted-foreground">
                            {((stat.tourists / 2500) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-success" />
                  System Performance
                </CardTitle>
                <CardDescription>Real-time system health and performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium text-success">Excellent</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">System Uptime</span>
                      <span className="text-sm font-medium text-success">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">AI Detection Accuracy</span>
                      <span className="text-sm font-medium text-primary">96.8%</span>
                    </div>
                    <Progress value={96.8} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Data Sync Rate</span>
                      <span className="text-sm font-medium text-success">98.5%</span>
                    </div>
                    <Progress value={98.5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Key Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-success">Positive Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">34% reduction in incidents</p>
                        <p className="text-xs text-muted-foreground">AI anomaly detection improving safety</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Faster emergency response</p>
                        <p className="text-xs text-muted-foreground">Average response time down to 4.2 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Higher tourist satisfaction</p>
                        <p className="text-xs text-muted-foreground">94% satisfaction rate with safety measures</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Recommendations</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Expand coverage areas</p>
                        <p className="text-xs text-muted-foreground">Add monitoring to remote hill stations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Enhance multilingual support</p>
                        <p className="text-xs text-muted-foreground">Add more local language options</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">IoT integration</p>
                        <p className="text-xs text-muted-foreground">Deploy smart wearables in high-risk zones</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-warning" />
                Incident Analysis
              </CardTitle>
              <CardDescription>Breakdown of incident types and resolution trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidentTypes.map((incident) => (
                  <div key={incident.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{incident.type}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{incident.count} cases</span>
                        <Badge className={
                          incident.trend.startsWith('+') 
                            ? 'bg-warning text-warning-foreground' 
                            : 'bg-success text-success-foreground'
                        }>
                          {incident.trend}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={incident.percentage} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">{incident.percentage}% of total</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Regional Performance
              </CardTitle>
              <CardDescription>Safety metrics by geographical region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionData.map((region) => (
                  <div
                    key={region.region}
                    className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{region.region}</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Tourists</p>
                            <p className="font-medium text-primary">{region.tourists}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Safety Score</p>
                            <p className={`font-medium ${
                              region.safetyScore >= 90 ? 'text-success' :
                              region.safetyScore >= 80 ? 'text-warning' : 'text-emergency'
                            }`}>
                              {region.safetyScore}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Incidents</p>
                            <p className="font-medium text-foreground">{region.incidents}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Progress value={region.safetyScore} className="h-2 w-24" />
                        <Badge className={
                          region.safetyScore >= 90 ? 'bg-success text-success-foreground' :
                          region.safetyScore >= 80 ? 'bg-warning text-warning-foreground' :
                          'bg-emergency text-emergency-foreground'
                        }>
                          {region.safetyScore >= 90 ? 'Excellent' :
                           region.safetyScore >= 80 ? 'Good' : 'Needs Attention'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Safety Trends & Forecasting
              </CardTitle>
              <CardDescription>Predictive analysis and future safety projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-success">Improving Metrics</h4>
                  <div className="space-y-3">
                    {[
                      { metric: 'Response Time', improvement: '28%', trend: 'Decreasing' },
                      { metric: 'Tourist Satisfaction', improvement: '15%', trend: 'Increasing' },
                      { metric: 'System Reliability', improvement: '12%', trend: 'Stable' }
                    ].map((item) => (
                      <div key={item.metric} className="flex justify-between items-center p-3 bg-success/5 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{item.metric}</p>
                          <p className="text-sm text-success">{item.trend}</p>
                        </div>
                        <Badge className="bg-success text-success-foreground">+{item.improvement}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Future Projections</h4>
                  <div className="space-y-3">
                    {[
                      { projection: 'Expected Tourist Growth', value: '25%', period: 'Next Quarter' },
                      { projection: 'Incident Reduction Goal', value: '40%', period: 'By Year End' },
                      { projection: 'Coverage Expansion', value: '3 Regions', period: 'Next 6 Months' }
                    ].map((item) => (
                      <div key={item.projection} className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{item.projection}</p>
                          <p className="text-sm text-primary">{item.period}</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground">{item.value}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;