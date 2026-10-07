
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecipientSelectorProps {
  value: string;
  onChange: (value: string) => void;
  recipients: Array<{ id: string; label: string }>;
}

export const RecipientSelector = ({ value, onChange, recipients }: RecipientSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="recipients">Ontvangers</Label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id="recipients">
          <SelectValue placeholder="Selecteer ontvangers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Gebruikers</SelectItem>
          {recipients.map((recipient) => (
            <SelectItem key={recipient.id} value={recipient.id}>{recipient.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
