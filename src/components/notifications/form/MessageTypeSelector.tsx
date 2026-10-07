
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MessageTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MessageTypeSelector = ({ value, onChange }: MessageTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="type">Type Bericht</Label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id="type">
          <SelectValue placeholder="Selecteer type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="system">Systeem</SelectItem>
          <SelectItem value="taak">Taak</SelectItem>
          <SelectItem value="flowluta">Flowluta</SelectItem>
          <SelectItem value="lead">Lead</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
