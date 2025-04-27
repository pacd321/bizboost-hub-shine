
import React from 'react';
import { SupportTicket } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare } from 'lucide-react';

interface TicketListProps {
  tickets: SupportTicket[];
  onSelectTicket?: (ticket: SupportTicket) => void;
}

export function TicketList({ tickets, onSelectTicket }: TicketListProps) {
  const { toast } = useToast();

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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <Card key={ticket.id} className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <div>
                <CardTitle>{ticket.subject}</CardTitle>
                <CardDescription>Created {new Date(ticket.createdAt).toLocaleDateString('en-IN')}</CardDescription>
              </div>
              <div className="flex space-x-2">
                {getStatusBadge(ticket.status)}
                {getPriorityBadge(ticket.priority)}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
            </CardContent>
            <CardFooter className="pt-2 justify-between">
              <div className="text-xs text-muted-foreground">
                {ticket.assignedTo ? `Assigned to ${ticket.assignedTo}` : 'Unassigned'}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  if (onSelectTicket) {
                    onSelectTicket(ticket);
                  } else {
                    toast({
                      title: "Viewing Ticket",
                      description: `Viewing details for ticket: ${ticket.subject}`
                    });
                  }
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> View Conversation
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No support tickets found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
