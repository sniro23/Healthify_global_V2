import React, { useState, useEffect } from 'react';
import { Input, Label, Button } from '@healthify/ui-kit';
import { Upload } from 'lucide-react';

interface InsuranceData {
  provider?: string;
  policyNumber?: string;
  groupNumber?: string;
  primaryInsured?: string;
  relationshipToPrimary?: string;
  startDate?: string;
  coverageType?: string;
}

interface InsuranceFormProps {
  data: InsuranceData;
  updateData: (data: InsuranceData) => void;
}

export default function InsuranceForm({ data, updateData }: InsuranceFormProps) {
  const [formData, setFormData] = useState<InsuranceData>(data || {});
  const [insuranceCardFile, setInsuranceCardFile] = useState<File | null>(null);

  useEffect(() => {
    // Update parent component when form data changes
    updateData(formData);
  }, [formData, updateData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInsuranceCardFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="provider">Insurance Provider</Label>
          <Input
            id="provider"
            name="provider"
            value={formData.provider || ''}
            onChange={handleChange}
            placeholder="e.g. Blue Cross Blue Shield"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="coverageType">Coverage Type</Label>
          <select
            id="coverageType"
            name="coverageType"
            className="w-full p-2 border rounded-md"
            value={formData.coverageType || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select coverage type</option>
            <option value="ppo">PPO</option>
            <option value="hmo">HMO</option>
            <option value="epo">EPO</option>
            <option value="pos">POS</option>
            <option value="hdhp">HDHP</option>
            <option value="medicare">Medicare</option>
            <option value="medicaid">Medicaid</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="policyNumber">Policy Number</Label>
          <Input
            id="policyNumber"
            name="policyNumber"
            value={formData.policyNumber || ''}
            onChange={handleChange}
            placeholder="e.g. ABC123456789"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="groupNumber">Group Number</Label>
          <Input
            id="groupNumber"
            name="groupNumber"
            value={formData.groupNumber || ''}
            onChange={handleChange}
            placeholder="e.g. G12345"
          />
        </div>
        
        <div>
          <Label htmlFor="primaryInsured">Primary Insured Name</Label>
          <Input
            id="primaryInsured"
            name="primaryInsured"
            value={formData.primaryInsured || ''}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="relationshipToPrimary">Relationship to Primary</Label>
          <select
            id="relationshipToPrimary"
            name="relationshipToPrimary"
            className="w-full p-2 border rounded-md"
            value={formData.relationshipToPrimary || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select relationship</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="dependent">Dependent</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="startDate">Coverage Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate || ''}
            onChange={handleChange}
          />
        </div>
      </div>
      
      {/* Insurance Card Upload */}
      <div className="mt-6">
        <Label htmlFor="insuranceCard">Upload Insurance Card (optional)</Label>
        <div className="mt-2">
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 cursor-pointer">
            <input
              id="insuranceCard"
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="insuranceCard" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium">
                {insuranceCardFile ? insuranceCardFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, or PDF (max. 5MB)
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
} 