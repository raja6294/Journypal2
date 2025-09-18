import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Shield, 
  Menu, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Settings,
  Home,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tourist", label: "Tourist Dashboard", icon: MapPin },
    { href: "/police", label: "Police Dashboard", icon: Shield },
    { href: "/incidents", label: "Incidents", icon: AlertTriangle },
    { href: "/analytics", label: "Analytics", icon: Users },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="border-b bg-card shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl bg-gradient-hero bg-clip-text text-transparent">
                SafeTour
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            
            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={isActive(item.href) ? "default" : "ghost"}
                          className="w-full justify-start flex items-center space-x-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                  
                  {/* Mobile User Menu */}
                  {isAuthenticated && user ? (
                    <div className="pt-4 border-t">
                      <div className="flex items-center space-x-2 mb-4">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {user.role}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start flex items-center space-x-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="default" className="w-full">
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;