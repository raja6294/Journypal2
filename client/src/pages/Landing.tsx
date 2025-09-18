import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Smartphone,
  Lock,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-safety.jpg";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Digital ID",
      description: "Tamper-proof tourist identification with secure KYC verification",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Real-time Geo-fencing",
      description: "Smart location tracking with automated safety zone alerts",
      color: "text-success"
    },
    {
      icon: AlertTriangle,
      title: "AI Anomaly Detection",
      description: "Advanced AI monitors for distress patterns and missing behavior",
      color: "text-warning"
    },
    {
      icon: Smartphone,
      title: "Mobile Safety App",
      description: "Comprehensive tourist app with panic button and live tracking",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Police Dashboard",
      description: "Real-time monitoring with cluster maps and automated alerts",
      color: "text-emergency"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Accessible platform supporting multiple languages and cultures",
      color: "text-success"
    }
  ];

  const benefits = [
    "Real-time monitoring reduces tourist risks by 70%",
    "Blockchain ensures tamper-proof identity records",
    "Panic alerts enable 5x faster emergency response",
    "AI-powered insights improve prevention strategies",
    "End-to-end encryption protects user privacy"
  ];

  const stats = [
    { value: "24/7", label: "Monitoring" },
    { value: "99.9%", label: "Uptime" },
    { value: "<30s", label: "Alert Response" },
    { value: "256-bit", label: "Encryption" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Visual Effects */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-gradient-mesh opacity-60"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-16 w-32 h-32 bg-success-glow/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary-glow/20 text-primary-foreground border-primary-glow/30 animate-bounce-in backdrop-blur-sm">
            🔒 Blockchain-Powered Tourist Safety
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Smart Tourist Safety
            <br />
            <span className="bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent animate-shimmer bg-size-200 animate-glow-pulse">
              Monitoring System
            </span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in-1">
            Advanced AI-powered safety monitoring with blockchain-based digital IDs, 
            real-time geo-fencing, and emergency response system for comprehensive tourist protection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-2">
            <Link to="/tourist">
              <Button variant="hero" size="lg" className="w-full sm:w-auto group transition-all duration-300 hover:scale-105 hover:shadow-floating">
                <Smartphone className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                Tourist Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/police">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 group">
                <Shield className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                Police Portal
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group hover:scale-110 transition-all duration-300 animate-fade-in-${index + 3}`}>
                <div className="text-3xl font-bold text-white mb-1 group-hover:animate-glow-pulse">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 bg-background relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Advanced Safety Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-1">
              Comprehensive technology stack ensuring tourist safety through multiple layers of protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`shadow-soft hover:shadow-floating transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm 
                             hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-fade-in-${Math.min(index + 1, 6)}`}
                >
                  <CardHeader className="relative">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-t-lg"></div>
                    
                    <div className={`w-12 h-12 rounded-lg bg-gradient-glass border flex items-center justify-center mb-4 
                                   ${feature.color} relative z-10 group-hover:animate-bounce transition-all duration-300
                                   group-hover:shadow-glow`}>
                      <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-success/5 rounded-full animate-float blur-3xl" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Proven Safety Benefits
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our system has demonstrated significant improvements in tourist safety 
                and emergency response effectiveness.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className={`flex items-start gap-3 group animate-fade-in-${index + 1}`}>
                    <CheckCircle className="h-6 w-6 text-success mt-0.5 group-hover:animate-bounce group-hover:text-success-glow transition-colors duration-300" />
                    <span className="text-foreground group-hover:text-foreground/90 transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/analytics" className="inline-block mt-8">
                <Button variant="default" size="lg" className="group hover:shadow-floating transition-all duration-300 hover:scale-105">
                  View Analytics
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="absolute -inset-4 bg-gradient-hero/20 rounded-lg blur-2xl animate-glow-pulse"></div>
              <img 
                src={dashboardImage} 
                alt="Safety Dashboard" 
                className="rounded-lg shadow-floating w-full relative z-10 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-glass rounded-lg z-20 hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Technology Stack */}
      <section className="py-20 px-4 bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh"></div>
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-success rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-primary-glow rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Enterprise-Grade Technology
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-1">
            Built with cutting-edge technologies for reliability, security, and scalability
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: "React.js", delay: "0.1s" },
              { name: "Blockchain", delay: "0.2s" },
              { name: "AI/ML", delay: "0.3s" },
              { name: "IoT", delay: "0.4s" },
              { name: "Node.js", delay: "0.5s" },
              { name: "Firebase", delay: "0.6s" }
            ].map((tech, index) => (
              <Card 
                key={index} 
                className={`shadow-soft hover:shadow-glow transition-all duration-500 p-6 group cursor-pointer 
                           border-0 bg-card/80 backdrop-blur-sm hover:scale-110 hover:-translate-y-3
                           animate-bounce-in`}
                style={{ animationDelay: tech.delay }}
              >
                <div className="text-center relative">
                  {/* Rotating background */}
                  <div className="absolute inset-0 bg-gradient-aurora opacity-0 group-hover:opacity-20 rounded-lg animate-rotate-slow"></div>
                  
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 
                                 group-hover:bg-primary/20 transition-all duration-300 group-hover:animate-glow-pulse relative z-10">
                    <Zap className="h-6 w-6 text-primary group-hover:text-primary-glow group-hover:animate-wiggle transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 relative z-10">
                    {tech.name}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-aurora opacity-20 animate-shimmer"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-16 left-16 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary-glow/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate-bounce-in">
            <Lock className="h-16 w-16 text-primary-foreground mx-auto mb-6 animate-glow-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 animate-fade-in-up">
            Ready to Enhance Tourist Safety?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 animate-fade-in-1">
            Join the next generation of smart tourism safety management
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-2">
            <Link to="/tourist">
              <Button variant="hero" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 
                                                          group hover:scale-110 hover:shadow-floating transition-all duration-300">
                <Smartphone className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                Start as Tourist
              </Button>
            </Link>
            <Link to="/police">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white 
                                                             hover:bg-white/10 backdrop-blur-sm group hover:scale-110 
                                                             hover:shadow-glow transition-all duration-300">
                <Shield className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                Access Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;