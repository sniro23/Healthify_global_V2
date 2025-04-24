
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Calendar, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PrescriptionFiltersProps {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  authoredAfterDate: Date | undefined;
  patientFilter: string[];
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onAuthoredAfterDateChange: (date: Date | undefined) => void;
  onPatientFilterChange: (patients: string[]) => void;
  onResetFilters: () => void;
}

export const PrescriptionFilters: React.FC<PrescriptionFiltersProps> = ({
  searchQuery,
  statusFilter,
  typeFilter,
  authoredAfterDate,
  patientFilter,
  onSearchChange,
  onStatusFilterChange,
  onTypeFilterChange,
  onAuthoredAfterDateChange,
  onPatientFilterChange,
  onResetFilters
}) => {
  // Mock patient list for filtering - in real implementation, this would come from FHIR Patient resources
  const mockPatients = [
    { id: "PT-78542", name: "Sarah Miller" },
    { id: "PT-34567", name: "John Davis" },
    { id: "PT-56789", name: "Emma Wilson" },
    { id: "PT-45678", name: "Robert Thompson" }
  ];
  
  // Handle patient selection
  const handlePatientSelection = (patientId: string) => {
    const isSelected = patientFilter.includes(patientId);
    const newSelection = isSelected
      ? patientFilter.filter(id => id !== patientId)
      : [...patientFilter, patientId];
    
    onPatientFilterChange(newSelection);
  };

  // Count active filters (excluding 'all' which is the default option)
  const activeFilterCount = [
    statusFilter !== "all" ? 1 : 0,
    typeFilter !== "all" ? 1 : 0,
    authoredAfterDate ? 1 : 0,
    patientFilter.length > 0 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

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
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="entered-in-error">Entered in Error</SelectItem>
            <SelectItem value="stopped">Stopped</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
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
        
        {/* Advanced FHIR-based filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="relative"
            >
              <Filter className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Advanced Filters</h4>
              
              {/* Date filter (authoredOn in FHIR) */}
              <div className="space-y-2">
                <Label>Authored After</Label>
                <DatePicker
                  date={authoredAfterDate}
                  setDate={onAuthoredAfterDateChange}
                  className="w-full"
                />
              </div>
              
              {/* Patient filter */}
              <div className="space-y-2">
                <Label>Patients</Label>
                <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
                  {mockPatients.map(patient => (
                    <div className="flex items-center space-x-2" key={patient.id}>
                      <Checkbox
                        id={`patient-${patient.id}`}
                        checked={patientFilter.includes(patient.id)}
                        onCheckedChange={() => handlePatientSelection(patient.id)}
                      />
                      <Label htmlFor={`patient-${patient.id}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-health-primary" />
                          {patient.name}
                          <span className="text-xs text-gray-500 ml-1">({patient.id})</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={onResetFilters}>Reset All</Button>
                <Button size="sm" className="bg-health-primary hover:bg-health-primary/90">
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PrescriptionFilters;
