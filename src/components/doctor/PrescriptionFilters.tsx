
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface PrescriptionFiltersProps {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
}

export const PrescriptionFilters: React.FC<PrescriptionFiltersProps> = ({
  searchQuery,
  statusFilter,
  typeFilter,
  onSearchChange,
  onStatusFilterChange,
  onTypeFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="w-full md:w-72">
        <Input 
          placeholder="Search prescriptions..." 
          className="w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Select 
          value={statusFilter} 
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="refill">Needs Refill</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          value={typeFilter} 
          onValueChange={onTypeFilterChange}
        >
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="medication">Medication</SelectItem>
            <SelectItem value="controlled">Controlled</SelectItem>
            <SelectItem value="otc">OTC</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="hidden sm:flex">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionFilters;
