
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TicketList } from '../components/support/TicketList';
import { TicketForm } from '../components/support/TicketForm';
import { mockSupportTickets, mockCustomers } from '../data/mockData';
import { SupportTicket } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SupportPage = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockSupportTickets);
  const [activeTab, setActiveTab] = useState('all');
  const [viewTicket, setViewTicket] = useState<SupportTicket | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  const handleSelectTicket = (ticket: SupportTicket) => {
    setViewTicket(ticket);
    setDialogOpen(true);
  };

  const getCustomerDetails = (customerId: string) => {
    return mockCustomers.find(c => c.id === customerId) || null;
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty Reply",
        description: "Please enter a reply message.",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending reply
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent to the customer."
    });

    // Update ticket status if it was open
    if (viewTicket && viewTicket.status === 'open') {
      const updatedTickets = tickets.map(t => 
        t.id === viewTicket.id ? { ...t, status: 'in_progress' } : t
      );
      setTickets(updatedTickets);
      setViewTicket({ ...viewTicket, status: 'in_progress' });
    }

    setReplyText('');
  };

  const handleUpdateStatus = (status: string) => {
    if (!viewTicket) return;

    const updatedTickets = tickets.map(t => 
      t.id === viewTicket.id ? { ...t, status: status as any } : t
    );
    setTickets(updatedTickets);
    setViewTicket({ ...viewTicket, status: status as any });

    toast({
      title: "Status Updated",
      description: `Ticket status changed to ${status}.`
    });
  };

  const filteredTickets = activeTab === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Open</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Closed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-3xl font-bold">Support Tickets</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>

            <TabsList>
              <TabsTrigger value="new">Create New Ticket</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            <TicketList tickets={filteredTickets} onSelectTicket={handleSelectTicket} />
          </TabsContent>

          <TabsContent value="open" className="space-y-4">
            <TicketList tickets={filteredTickets} onSelectTicket={handleSelectTicket} />
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            <TicketList tickets={filteredTickets} onSelectTicket={handleSelectTicket} />
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            <TicketList tickets={filteredTickets} onSelectTicket={handleSelectTicket} />
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            <TicketList tickets={filteredTickets} onSelectTicket={handleSelectTicket} />
          </TabsContent>

          <TabsContent value="new" className="max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Create New Support Ticket</CardTitle>
                <CardDescription>Fill out the form to create a new support ticket</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketForm 
                  onSubmitSuccess={() => {
                    setActiveTab('all');
                    toast({
                      title: "Ticket Created",
                      description: "Your support ticket has been created successfully."
                    });
                  }} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {viewTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>{viewTicket.subject}</span>
                  {getStatusBadge(viewTicket.status)}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="mb-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            From: {getCustomerDetails(viewTicket.customerId)?.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(viewTicket.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap">{viewTicket.description}</p>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <label htmlFor="reply" className="text-sm font-medium">
                      Your Reply
                    </label>
                    <Textarea
                      id="reply"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      {viewTicket.status !== 'resolved' && (
                        <Button
                          variant="outline"
                          onClick={() => handleUpdateStatus('resolved')}
                        >
                          Mark Resolved
                        </Button>
                      )}
                      {viewTicket.status !== 'closed' && (
                        <Button
                          variant="outline"
                          onClick={() => handleUpdateStatus('closed')}
                        >
                          Close Ticket
                        </Button>
                      )}
                    </div>
                    <Button onClick={handleSendReply}>
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SupportPage;
