
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mail, Eye, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EmailCustomerForm } from '../components/customers/EmailCustomerForm';

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<any | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUsers = async () => {
      setLoading(true);
      // This requires admin privileges; do NOT use service role key on client in production!
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) {
        console.error('Error fetching users:', error.message);
        setCustomers([]);
      } else {
        setCustomers(data?.users || []);
      }
      setLoading(false);
    };
    fetchAuthUsers();
  }, []);

  const filteredCustomers = customers.filter(
    (user) =>
      user.user_metadata?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmailCustomer = (user: any) => {
    setCurrentCustomer({
      id: user.id,
      name: user.user_metadata?.name || user.email,
      email: user.email,
      phone: user.user_metadata?.phone || '',
      city: user.user_metadata?.city || '',
      state: user.user_metadata?.state || '',
    });
    setEmailDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-3xl font-bold">Customers</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>View and manage your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              {loading ? (
                <div className="p-6 text-center text-muted-foreground">Loading customers...</div>
              ) : (
                <table className="w-full divide-y">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">{user.user_metadata?.name || user.email}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{user.user_metadata?.phone || ''}</td>
                          <td className="px-4 py-3 text-sm">{user.user_metadata?.city || ''}, {user.user_metadata?.state || ''}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEmailCustomer(user)}>
                                <Mail className="h-4 w-4 mr-1" />
                                Email
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                          No customers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Customer Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Email Customer</DialogTitle>
          </DialogHeader>
          {currentCustomer && (
            <EmailCustomerForm 
              customer={currentCustomer} 
              onClose={() => setEmailDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CustomersPage;
