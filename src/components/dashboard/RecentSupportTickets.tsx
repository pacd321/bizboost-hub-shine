
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SupportTicket } from '@/types';

interface RecentSupportTicketsProps {
  tickets: SupportTicket[];
}

export function RecentSupportTickets({ tickets }: RecentSupportTicketsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Support Tickets</CardTitle>
        <CardDescription>Latest customer support requests</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0 divide-y">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{ticket.subject}</span>
                <div className="flex space-x-2">
                  <Badge variant="outline" className={getStatusColor(ticket.status)}>
                    {formatStatus(ticket.status)}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Created {new Date(ticket.createdAt).toLocaleDateString('en-IN')}</span>
                {ticket.assignedTo && <span>Assigned to {ticket.assignedTo}</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-4 flex justify-center">
        <a href="/support" className="text-sm text-primary hover:underline">
          View all tickets
        </a>
      </CardFooter>
    </Card>
  );
}
