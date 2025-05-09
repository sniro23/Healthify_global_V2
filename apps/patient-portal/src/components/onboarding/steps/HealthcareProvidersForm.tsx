import React, { useState, useEffect } from 'react';
import { Input, Label, Button } from '@healthify/ui-kit';
import { Plus, X } from 'lucide-react';

interface Provider {
  name: string;
  specialty: string;
  phone: string;
  address?: string;
}

interface HealthcareProvidersData {
  primaryCare?: Provider;
  specialists?: Provider[];
}

interface HealthcareProvidersFormProps {
  data: HealthcareProvidersData;
  updateData: (data: HealthcareProvidersData) => void;
}

export default function HealthcareProvidersForm({ data, updateData }: HealthcareProvidersFormProps) {
  const [formData, setFormData] = useState<HealthcareProvidersData>(data || {
    primaryCare: {
      name: '',
      specialty: 'Primary Care',
      phone: '',
      address: ''
    },
    specialists: []
  });

  const [newSpecialist, setNewSpecialist] = useState<Provider>({
    name: '',
    specialty: '',
    phone: ''
  });

  useEffect(() => {
    // Update parent component when form data changes
    updateData(formData);
  }, [formData, updateData]);

  const handlePrimaryCareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      primaryCare: {
        ...prev.primaryCare!,
        [name]: value
      }
    }));
  };

  const handleNewSpecialistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSpecialist(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSpecialist = () => {
    if (!newSpecialist.name || !newSpecialist.specialty || !newSpecialist.phone) return;
    
    setFormData(prev => ({
      ...prev,
      specialists: [...(prev.specialists || []), newSpecialist]
    }));
    
    setNewSpecialist({
      name: '',
      specialty: '',
      phone: ''
    });
  };

  const removeSpecialist = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialists: (prev.specialists || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Primary Care Provider */}
      <div>
        <h3 className="font-medium mb-4">Primary Care Provider</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primary-name">Provider Name</Label>
            <Input
              id="primary-name"
              name="name"
              value={formData.primaryCare?.name || ''}
              onChange={handlePrimaryCareChange}
              placeholder="Dr. Jane Smith"
            />
          </div>
          
          <div>
            <Label htmlFor="primary-phone">Phone</Label>
            <Input
              id="primary-phone"
              name="phone"
              value={formData.primaryCare?.phone || ''}
              onChange={handlePrimaryCareChange}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="primary-address">Address</Label>
            <Input
              id="primary-address"
              name="address"
              value={formData.primaryCare?.address || ''}
              onChange={handlePrimaryCareChange}
              placeholder="123 Medical Center Drive"
            />
          </div>
        </div>
      </div>
      
      {/* Specialists */}
      <div>
        <h3 className="font-medium mb-4">Specialists</h3>
        
        {/* Add new specialist form */}
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h4 className="text-sm font-medium mb-3">Add Specialist</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="specialist-name">Name</Label>
              <Input
                id="specialist-name"
                name="name"
                value={newSpecialist.name}
                onChange={handleNewSpecialistChange}
                placeholder="Dr. John Doe"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-specialty">Specialty</Label>
              <Input
                id="specialist-specialty"
                name="specialty"
                value={newSpecialist.specialty}
                onChange={handleNewSpecialistChange}
                placeholder="Cardiology"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-phone">Phone</Label>
              <Input
                id="specialist-phone"
                name="phone"
                value={newSpecialist.phone}
                onChange={handleNewSpecialistChange}
                placeholder="(555) 987-6543"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={addSpecialist}
              className="bg-health-primary hover:bg-health-primary/90"
              disabled={!newSpecialist.name || !newSpecialist.specialty || !newSpecialist.phone}
            >
              <Plus size={16} className="mr-2" /> Add Specialist
            </Button>
          </div>
        </div>
        
        {/* List of specialists */}
        {formData.specialists && formData.specialists.length > 0 ? (
          <div className="space-y-4">
            {formData.specialists.map((specialist, index) => (
              <div key={index} className="border p-4 rounded-md relative">
                <button 
                  onClick={() => removeSpecialist(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{specialist.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Specialty</p>
                    <p className="font-medium">{specialist.specialty}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{specialist.phone}</p>
                  </div>
                  
                  {specialist.address && (
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{specialist.address}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No specialists added</p>
        )}
      </div>
    </div>
  );
} 