
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
}

export const UserFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  roleFilter,
  onRoleFilterChange,
}: UserFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="relative w-full md:w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek op naam of email"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
        <Select
          value={statusFilter}
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Filter op status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statussen</SelectItem>
            <SelectItem value="active">Actief</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={roleFilter}
          onValueChange={onRoleFilterChange}
        >
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Filter op rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle rollen</SelectItem>
            <SelectItem value="member">Members</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
            <SelectItem value="unknown">Onbekend</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
