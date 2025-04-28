
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '../../supabaseClient'; // Adjust path as needed
import { useToast } from '@/hooks/use-toast'; // Optional: for user feedback

interface WebsiteAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
}

export function WebsiteAuth({ isOpen, onClose, onLogin, onRegister }: WebsiteAuthProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.user) {
      onLogin(loginEmail, loginPassword);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${loginEmail}`,
      });
      onClose();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: { name: registerName },
      },
    });
    setLoading(false);
    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.user) {
      // Insert into customers table
      try {
        const { error: insertError } = await supabase
          .from('customers')
          .insert([
            {
              name: registerName,
              email: registerEmail,
              // Add more fields if needed
            }
          ]);
        if (insertError) {
          toast({
            title: "Customer Not Saved",
            description: insertError.message,
            variant: "destructive",
          });
        }
      } catch (err) {
        toast({
          title: "Unexpected Error",
          description: "Could not save customer to database.",
          variant: "destructive",
        });
      }
      onRegister(registerName, registerEmail, registerPassword);
      toast({
        title: "Registration Successful",
        description: `Welcome, ${registerName}! Please check your email to verify your account.`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login or Create Account</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input 
                  id="register-name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
