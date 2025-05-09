'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@healthify/ui-kit';

interface MedicalHistoryData {
  conditions?: string;
  allergies?: string;
  medications?: string;
  surgeries?: string;
  familyHistory?: string;
  lifestyleFactors?: {
    smoking?: string;
    alcohol?: string;
    exercise?: string;
    diet?: string;
  };
}

interface MedicalHistoryFormProps {
  data: MedicalHistoryData;
  updateData: (data: MedicalHistoryData) => void;
}

export default function MedicalHistoryForm({ data, updateData }: MedicalHistoryFormProps) {
  const [formData, setFormData] = useState<MedicalHistoryData>(data || {});

  useEffect(() => {
    // Update parent component when form data changes
    updateData(formData);
  }, [formData, updateData]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLifestyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      lifestyleFactors: {
        ...(prev.lifestyleFactors || {}),
        [name]: value
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medical Conditions
            </label>
            <textarea
              name="conditions"
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="List your medical conditions, separated by commas"
              value={formData.conditions || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allergies
            </label>
            <textarea
              name="allergies"
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="List your allergies, separated by commas"
              value={formData.allergies || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Medications
            </label>
            <textarea
              name="medications"
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="List your current medications, separated by commas"
              value={formData.medications || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Past Surgeries
            </label>
            <textarea
              name="surgeries"
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="List your past surgeries, separated by commas"
              value={formData.surgeries || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Family Medical History
            </label>
            <textarea
              name="familyHistory"
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="List significant family medical history, separated by commas"
              value={formData.familyHistory || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Lifestyle Factors</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Smoking Status
                </label>
                <select
                  name="smoking"
                  className="w-full p-2 border rounded-md"
                  value={formData.lifestyleFactors?.smoking || ''}
                  onChange={handleLifestyleChange}
                >
                  <option value="">Select status</option>
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alcohol Consumption
                </label>
                <select
                  name="alcohol"
                  className="w-full p-2 border rounded-md"
                  value={formData.lifestyleFactors?.alcohol || ''}
                  onChange={handleLifestyleChange}
                >
                  <option value="">Select frequency</option>
                  <option value="never">Never</option>
                  <option value="occasional">Occasional</option>
                  <option value="moderate">Moderate</option>
                  <option value="frequent">Frequent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Frequency
                </label>
                <select
                  name="exercise"
                  className="w-full p-2 border rounded-md"
                  value={formData.lifestyleFactors?.exercise || ''}
                  onChange={handleLifestyleChange}
                >
                  <option value="">Select frequency</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light (1-2 days/week)</option>
                  <option value="moderate">Moderate (3-4 days/week)</option>
                  <option value="active">Active (5+ days/week)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diet Type
                </label>
                <select
                  name="diet"
                  className="w-full p-2 border rounded-md"
                  value={formData.lifestyleFactors?.diet || ''}
                  onChange={handleLifestyleChange}
                >
                  <option value="">Select diet type</option>
                  <option value="regular">Regular/No restrictions</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-free</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 