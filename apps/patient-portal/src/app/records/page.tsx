'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../lib/auth/AuthProvider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Enhanced types for medical records
interface MedicalRecord {
  id: string;
  type: 'condition' | 'medication' | 'allergy' | 'procedure' | 'observation' | 'report';
  date: string;
  title: string;
  details: string;
  status: string;
  dosage?: string; // For medications
  frequency?: string; // For medications
  severity?: string; // For allergies
  reaction?: string; // For allergies
  provider?: string; // For procedures
}

type RecordType = 'all' | 'conditions' | 'medications' | 'allergies' | 'procedures' | 'observations' | 'reports';

export default function MedicalRecordsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedType, setSelectedType] = useState<RecordType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<MedicalRecord>>({
    type: 'condition',
    date: new Date().toISOString().split('T')[0],
    title: '',
    details: '',
    status: 'active'
  });
  
  // Enhanced dummy data
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      type: 'condition',
      date: '2023-12-15',
      title: 'Hypertension',
      details: 'Managed with lifestyle changes and medication',
      status: 'active'
    },
    {
      id: '2',
      type: 'medication',
      date: '2024-01-10',
      title: 'Lisinopril',
      details: 'ACE inhibitor for blood pressure management',
      status: 'active',
      dosage: '10mg',
      frequency: 'Once daily'
    },
    {
      id: '3',
      type: 'observation',
      date: '2024-01-20',
      title: 'Blood Pressure',
      details: '125/82 mmHg',
      status: 'final'
    },
    {
      id: '4',
      type: 'allergy',
      date: '2023-11-05',
      title: 'Penicillin',
      details: 'Antibiotic allergy',
      status: 'active',
      severity: 'Moderate',
      reaction: 'Skin rash and hives'
    },
    {
      id: '5',
      type: 'report',
      date: '2024-02-10',
      title: 'Chest X-Ray',
      details: 'No significant findings. Lungs clear.',
      status: 'final'
    },
    {
      id: '6',
      type: 'procedure',
      date: '2024-01-15',
      title: 'Colonoscopy',
      details: 'Routine screening procedure',
      status: 'completed',
      provider: 'Dr. Johnson'
    },
    {
      id: '7',
      type: 'observation',
      date: '2024-03-05',
      title: 'Weight',
      details: '78 kg',
      status: 'final'
    }
  ]);

  // Simulating data loading
  useEffect(() => {
    // This simulates initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleEditRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedRecord) {
      setRecords(prev => 
        prev.map(record => 
          record.id === selectedRecord.id ? selectedRecord : record
        )
      );
      setIsEditing(false);
      setSelectedRecord(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedRecord(null);
  };

  const handleAddRecord = () => {
    setShowAddForm(true);
  };

  const handleSaveNewRecord = () => {
    const recordToAdd = {
      ...newRecord,
      id: Date.now().toString(), // Simple ID generation
      status: newRecord.status || 'active'
    } as MedicalRecord;
    
    setRecords(prev => [...prev, recordToAdd]);
    setShowAddForm(false);
    setNewRecord({
      type: 'condition',
      date: new Date().toISOString().split('T')[0],
      title: '',
      details: '',
      status: 'active'
    });
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const conditions = records.filter(r => r.type === 'condition');
  const medications = records.filter(r => r.type === 'medication');
  const allergies = records.filter(r => r.type === 'allergy');
  const procedures = records.filter(r => r.type === 'procedure');
  const observations = records.filter(r => r.type === 'observation');
  const diagnosticReports = records.filter(r => r.type === 'report');

  const filteredRecords = React.useMemo(() => {
    let filtered = [...records];
    
    // Filter by type
    if (selectedType !== 'all') {
      const typeMap: Record<RecordType, string> = {
        'all': 'all',
        'conditions': 'condition',
        'medications': 'medication',
        'allergies': 'allergy',
        'procedures': 'procedure',
        'observations': 'observation',
        'reports': 'report'
      };
      
      if (selectedType !== 'all') {
        filtered = filtered.filter(record => record.type === typeMap[selectedType]);
      }
    }

    // Sort by date, most recent first
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record => 
        record.title.toLowerCase().includes(query) ||
        record.details.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [records, selectedType, searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <div className="flex gap-2">
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-[#9D5A8F] text-white rounded-md hover:bg-[#8D4A7F]"
            >
              Refresh Data
            </button>
            <button
              onClick={handleAddRecord}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Record
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D5A8F]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'all'
                    ? 'bg-[#9D5A8F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('conditions')}
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'conditions'
                    ? 'bg-[#9D5A8F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Conditions
              </button>
              <button
                onClick={() => setSelectedType('medications')}
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'medications'
                    ? 'bg-[#9D5A8F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Medications
              </button>
              <button
                onClick={() => setSelectedType('allergies')}
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'allergies'
                    ? 'bg-[#9D5A8F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Allergies
              </button>
              <button
                onClick={() => setSelectedType('procedures')}
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'procedures'
                    ? 'bg-[#9D5A8F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Procedures
              </button>
              <button
                onClick={() => setSelectedType('observations')}
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'observations'
                    ? 'bg-[#9D5A8F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vitals
              </button>
              <button
                onClick={() => setSelectedType('reports')}
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'reports'
                    ? 'bg-[#9D5A8F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reports
              </button>
            </div>
          </div>
        </div>

        {/* Add Record Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Add New Medical Record</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
                  <select 
                    value={newRecord.type} 
                    onChange={(e) => setNewRecord({...newRecord, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="condition">Condition</option>
                    <option value="medication">Medication</option>
                    <option value="allergy">Allergy</option>
                    <option value="procedure">Procedure</option>
                    <option value="observation">Observation</option>
                    <option value="report">Report</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={newRecord.title} 
                    onChange={(e) => setNewRecord({...newRecord, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter record title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newRecord.date} 
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  <textarea 
                    value={newRecord.details} 
                    onChange={(e) => setNewRecord({...newRecord, details: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Enter details"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={newRecord.status} 
                    onChange={(e) => setNewRecord({...newRecord, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="resolved">Resolved</option>
                    <option value="inactive">Inactive</option>
                    <option value="final">Final</option>
                  </select>
                </div>
                
                {newRecord.type === 'medication' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                      <input 
                        type="text" 
                        value={newRecord.dosage || ''} 
                        onChange={(e) => setNewRecord({...newRecord, dosage: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g., 10mg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                      <input 
                        type="text" 
                        value={newRecord.frequency || ''} 
                        onChange={(e) => setNewRecord({...newRecord, frequency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g., Once daily"
                      />
                    </div>
                  </>
                )}
                
                {newRecord.type === 'allergy' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                      <select 
                        value={newRecord.severity || ''} 
                        onChange={(e) => setNewRecord({...newRecord, severity: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select severity</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reaction</label>
                      <input 
                        type="text" 
                        value={newRecord.reaction || ''} 
                        onChange={(e) => setNewRecord({...newRecord, reaction: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Describe allergic reaction"
                      />
                    </div>
                  </>
                )}
                
                {newRecord.type === 'procedure' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <input 
                      type="text" 
                      value={newRecord.provider || ''} 
                      onChange={(e) => setNewRecord({...newRecord, provider: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Healthcare provider name"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveNewRecord}
                  className="px-4 py-2 bg-[#9D5A8F] text-white rounded-md hover:bg-[#8D4A7F]"
                >
                  Save Record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Record Modal */}
        {isEditing && selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Edit Medical Record</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
                  <input 
                    type="text" 
                    value={selectedRecord.type.charAt(0).toUpperCase() + selectedRecord.type.slice(1)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={selectedRecord.title} 
                    onChange={(e) => setSelectedRecord({...selectedRecord, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={selectedRecord.date} 
                    onChange={(e) => setSelectedRecord({...selectedRecord, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  <textarea 
                    value={selectedRecord.details} 
                    onChange={(e) => setSelectedRecord({...selectedRecord, details: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={selectedRecord.status} 
                    onChange={(e) => setSelectedRecord({...selectedRecord, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="resolved">Resolved</option>
                    <option value="inactive">Inactive</option>
                    <option value="final">Final</option>
                  </select>
                </div>
                
                {selectedRecord.type === 'medication' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                      <input 
                        type="text" 
                        value={selectedRecord.dosage || ''} 
                        onChange={(e) => setSelectedRecord({...selectedRecord, dosage: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                      <input 
                        type="text" 
                        value={selectedRecord.frequency || ''} 
                        onChange={(e) => setSelectedRecord({...selectedRecord, frequency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </>
                )}
                
                {selectedRecord.type === 'allergy' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                      <select 
                        value={selectedRecord.severity || ''} 
                        onChange={(e) => setSelectedRecord({...selectedRecord, severity: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select severity</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reaction</label>
                      <input 
                        type="text" 
                        value={selectedRecord.reaction || ''} 
                        onChange={(e) => setSelectedRecord({...selectedRecord, reaction: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </>
                )}
                
                {selectedRecord.type === 'procedure' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <input 
                      type="text" 
                      value={selectedRecord.provider || ''} 
                      onChange={(e) => setSelectedRecord({...selectedRecord, provider: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <button 
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-[#9D5A8F] text-white rounded-md hover:bg-[#8D4A7F]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#9D5A8F]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">Error loading records: {error.message}</p>
            <button 
              onClick={refreshData}
              className="mt-2 px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Health Summary */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Health Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Active Conditions</h3>
                  <p className="text-2xl font-semibold mt-1">
                    {conditions.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Medications</h3>
                  <p className="text-2xl font-semibold mt-1">{medications.length}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Allergies</h3>
                  <p className="text-2xl font-semibold mt-1">{allergies.length}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Procedures</h3>
                  <p className="text-2xl font-semibold mt-1">{procedures.length}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Vitals</h3>
                  <p className="text-2xl font-semibold mt-1">{observations.length}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Reports</h3>
                  <p className="text-2xl font-semibold mt-1">{diagnosticReports.length}</p>
                </div>
              </div>
            </div>

            {/* Records Timeline */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Medical Timeline</h2>
              {filteredRecords.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No records found</p>
              ) : (
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex gap-4 p-4 border-l-4 border-[#9D5A8F] bg-gray-50 rounded-r-lg"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{record.title}</h3>
                          <span className="text-sm text-gray-500">
                            {formatDate(record.date)}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{record.details}</p>
                        
                        {/* Additional details based on record type */}
                        {record.type === 'medication' && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p><span className="font-medium">Dosage:</span> {record.dosage}</p>
                            <p><span className="font-medium">Frequency:</span> {record.frequency}</p>
                          </div>
                        )}
                        
                        {record.type === 'allergy' && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p><span className="font-medium">Severity:</span> {record.severity}</p>
                            <p><span className="font-medium">Reaction:</span> {record.reaction}</p>
                          </div>
                        )}
                        
                        {record.type === 'procedure' && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p><span className="font-medium">Provider:</span> {record.provider}</p>
                          </div>
                        )}
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              record.type === 'condition'
                                ? 'bg-blue-100 text-blue-800'
                                : record.type === 'medication'
                                ? 'bg-purple-100 text-purple-800'
                                : record.type === 'allergy'
                                ? 'bg-red-100 text-red-800'
                                : record.type === 'procedure'
                                ? 'bg-yellow-100 text-yellow-800'
                                : record.type === 'observation'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                            </span>
                            {record.status && (
                              <span className="ml-2 inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                {record.status}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditRecord(record)}
                              className="text-sm px-3 py-1 text-[#9D5A8F] hover:bg-[#9D5A8F] hover:bg-opacity-10 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteRecord(record.id)}
                              className="text-sm px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}