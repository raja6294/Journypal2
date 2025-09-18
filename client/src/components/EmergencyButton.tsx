import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface EmergencyButtonProps {
  onEmergency?: () => void;
}

const EmergencyButton = ({ onEmergency }: EmergencyButtonProps) => {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const handleEmergencyPress = () => {
    if (isActivated) return;

    setIsActivated(true);
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerEmergency();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerEmergency = () => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Simulate emergency alert
          toast({
            title: "🚨 EMERGENCY ALERT TRIGGERED",
            description: `Location: ${latitude.toFixed(
              4
            )}, ${longitude.toFixed(4)} - Authorities notified!`,
            variant: "destructive",
          });

          // Mock emergency services notification
          const emergencyData = {
            timestamp: new Date().toISOString(),
            location: { lat: latitude, lng: longitude },
            type: "panic_button",
            status: "active",
          };

          console.log("Emergency triggered:", emergencyData);
          onEmergency?.();

          // Reset after 5 seconds
          setTimeout(() => {
            setIsActivated(false);
          }, 5000);
        },
        () => {
          toast({
            title: "🚨 EMERGENCY ALERT TRIGGERED",
            description: "Location unavailable - Authorities notified!",
            variant: "destructive",
          });
          setIsActivated(false);
        }
      );
    }
  };

  const cancelEmergency = () => {
    setIsActivated(false);
    setCountdown(0);
    toast({
      title: "Emergency Cancelled",
      description: "Alert has been cancelled.",
    });
  };

  // ✅ Auto-call 911 using native dialer
  const handleAutoCall = () => {
    try {
      window.location.href = "tel:911"; // opens dialer
    } catch (err: any) {
      toast({
        title: "Call Error",
        description: err.message || "Could not open dialer.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className={`transition-all duration-500 hover:scale-105 ${
        isActivated
          ? "shadow-emergency border-emergency animate-glow-pulse bg-emergency/5 backdrop-blur-sm"
          : "shadow-soft hover:shadow-floating interactive-card"
      }`}
    >
      <CardContent className="p-6 text-center relative overflow-hidden">
        {/* Background Effects */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isActivated
              ? "bg-gradient-emergency opacity-10 animate-shimmer"
              : "opacity-0"
          }`}
        ></div>

        <div className="space-y-4 relative z-10">
          <div className="flex justify-center">
            <div
              className={`p-4 rounded-full transition-all duration-500 ${
                isActivated
                  ? "bg-emergency text-emergency-foreground animate-glow-pulse shadow-emergency"
                  : "bg-emergency/10 text-emergency hover:bg-emergency/20 hover:scale-110"
              }`}
            >
              <AlertTriangle
                className={`h-8 w-8 transition-all duration-300 ${
                  isActivated ? "animate-wiggle" : "group-hover:animate-bounce"
                }`}
              />
            </div>
          </div>

          <div className="animate-fade-in">
            <h3
              className={`font-semibold text-lg mb-2 transition-all duration-300 ${
                isActivated
                  ? "text-emergency animate-glow-pulse"
                  : "text-foreground"
              }`}
            >
              {isActivated ? "EMERGENCY ACTIVATED" : "Emergency Alert"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {isActivated
                ? `Alerting authorities in ${countdown} seconds...`
                : "Press and hold for 3 seconds in case of emergency"}
            </p>
          </div>

          {!isActivated ? (
            <Button
              variant="emergency"
              size="lg"
              onMouseDown={handleEmergencyPress}
              className="w-full bg-emergency hover:bg-emergency-glow shadow-emergency 
                        transition-all duration-300 hover:scale-105 hover:shadow-floating
                        animate-pulse group"
            >
              <AlertTriangle className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
              PANIC BUTTON
            </Button>
          ) : (
            <div className="space-y-3 animate-bounce-in">
              <div className="text-6xl font-bold text-emergency animate-glow-pulse">
                {countdown}
              </div>
              <Button
                variant="outline"
                onClick={cancelEmergency}
                className="w-full glass backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                Cancel Alert
              </Button>
            </div>
          )}

          <div className="flex justify-around text-xs text-muted-foreground animate-fade-in-up">
            <button
              className="flex items-center gap-1 group hover:scale-110 transition-transform duration-300 text-inherit bg-transparent border-none outline-none cursor-pointer"
              onClick={handleAutoCall}
              type="button"
            >
              <Phone className="h-3 w-3 group-hover:animate-wiggle" />
              <span>Auto-call 100</span>
            </button>
            <div className="flex items-center gap-1 group hover:scale-110 transition-transform duration-300">
              <MapPin className="h-3 w-3 group-hover:animate-wiggle" />
              <span>Share location</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyButton;
