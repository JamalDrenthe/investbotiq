
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Info, Clock, AlertCircle, CheckCircle2, Shield } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  messagePreview: string;
  sentTo: string;
  recipientCount: number;
  sentDate: string;
  type: string;
  status: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "task":
      return <Clock className="h-4 w-4 text-purple-500" />;
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "security":
      return <Shield className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "info":
      return "Informatie";
    case "task":
      return "Taak";
    case "success":
      return "Succes";
    case "warning":
      return "Waarschuwing";
    case "security":
      return "Beveiliging";
    default:
      return type;
  }
};

interface NotificationsListProps {
  notifications: Notification[];
}

export const NotificationsList = ({ notifications }: NotificationsListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Bericht</TableHead>
          <TableHead>Ontvanger(s)</TableHead>
          <TableHead>Verstuurd Op</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications.map((notification) => (
          <TableRow key={notification.id}>
            <TableCell>
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground truncate max-w-xs">
                  {notification.messagePreview}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p>{notification.sentTo}</p>
                  <p className="text-xs text-muted-foreground">
                    ({notification.recipientCount} ontvanger{notification.recipientCount > 1 ? "s" : ""})
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{notification.sentDate}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {getTypeIcon(notification.type)}
                <span className="capitalize">{getTypeLabel(notification.type)}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                variant={notification.status === "read" ? "outline" : "default"}
                className={notification.status === "read" ? "bg-green-100 text-green-800" : ""}
              >
                {notification.status === "read" ? "Gelezen" : "Afgeleverd"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
