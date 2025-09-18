import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, User, Mail, Lock, ArrowLeft } from "lucide-react";

type Role = "tourist" | "police" | "";

const roleCards: Array<{ key: Role; name: string; emoji: string; description: string }> = [
  {
    key: "tourist",
    name: "Tourist",
    emoji: "🏛️",
    description:
      "Explore historical sites, monuments, and cultural attractions in your area",
  },
  {
    key: "police",
    name: "Rescue Authority",
    emoji: "👮",
    description:
      "Access law enforcement tools and manage security operations",
  },
];

export default function Login() {
  const [role, setRole] = useState<Role>("");
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const { toast } = useToast();
  const { login, signup, loading } = useAuth();

  const canProceed = role !== "";

  function handleSelectRole(next: Role) {
    setRole(next);
    setTimeout(() => setShowAuth(true), 200);
  }

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({ description: "Enter email and password", variant: "destructive" });
      return;
    }
    try {
      await login(loginEmail, loginPassword);
      toast({ description: "Login successful!" });
      // Navigation will be handled by the auth context and protected routes
    } catch (err: any) {
      toast({ description: err?.message || "Login failed", variant: "destructive" });
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canProceed) {
      toast({ description: "Please select a role first", variant: "destructive" });
      return;
    }
    if (!regName || !regEmail || !regPassword) {
      toast({ description: "Fill all fields", variant: "destructive" });
      return;
    }
    try {
      await signup(regName, regEmail, regPassword, role as 'tourist' | 'police');
      toast({ description: `Account created successfully!` });
      // Navigation will be handled by the auth context and protected routes
    } catch (err: any) {
      toast({ description: err?.message || "Registration failed", variant: "destructive" });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Role Selection */}
        {!showAuth && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-primary mr-3" />
              <h1 className="text-3xl font-bold text-foreground">JourneyPal</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Welcome to Safe Travel</h2>
            <p className="text-muted-foreground mb-8">Please select your role to continue</p>
            
            <div className="space-y-4">
              {roleCards.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleSelectRole(r.key)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg ${
                    role === r.key
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{r.emoji}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{r.name}</h3>
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Auth Forms */}
        {showAuth && (
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAuth(false);
                    setTimeout(() => setRole(""), 300);
                    setActiveTab("login");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{roleCards.find(r => r.key === role)?.emoji}</div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {roleCards.find(r => r.key === role)?.name}
                  </span>
                </div>
                <div></div>
              </div>
              <CardTitle className="text-2xl">Welcome to JourneyPal</CardTitle>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reg-name"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Enter your full name"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reg-email"
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reg-password"
                          type="password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Create a password"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Role:</strong> {roleCards.find(r => r.key === role)?.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {roleCards.find(r => r.key === role)?.description}
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={!canProceed || loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


