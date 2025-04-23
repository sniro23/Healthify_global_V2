
export interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "pending";
  type: "medication" | "controlled" | "otc";
  refills: number;
  refillsRemaining: number;
}

export const activePrescriptions: Prescription[] = [
  {
    id: "1",
    patientName: "Sarah Miller",
    patientId: "PT-78542",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet",
    frequency: "once daily",
    issueDate: "Apr 10, 2025",
    expiryDate: "Jul 10, 2025",
    status: "active",
    type: "medication",
    refills: 3,
    refillsRemaining: 2
  },
  {
    id: "2",
    patientName: "John Davis",
    patientId: "PT-34567",
    medication: "Metformin 500mg",
    dosage: "1 tablet",
    frequency: "twice daily",
    issueDate: "Apr 15, 2025",
    expiryDate: "Jul 15, 2025",
    status: "active",
    type: "medication",
    refills: 2,
    refillsRemaining: 2
  }
];

export const pendingPrescriptions: Prescription[] = [
  {
    id: "3",
    patientName: "Emma Wilson",
    patientId: "PT-56789",
    medication: "Atorvastatin 20mg",
    dosage: "1 tablet",
    frequency: "once daily at bedtime",
    issueDate: "Mar 15, 2025",
    expiryDate: "Jun 15, 2025",
    status: "pending",
    type: "medication",
    refills: 3,
    refillsRemaining: 0
  }
];

export const expiredPrescriptions: Prescription[] = [
  {
    id: "4",
    patientName: "Robert Thompson",
    patientId: "PT-45678",
    medication: "Amoxicillin 500mg",
    dosage: "1 capsule",
    frequency: "three times daily",
    issueDate: "Jan 10, 2025",
    expiryDate: "Feb 10, 2025",
    status: "expired",
    type: "medication",
    refills: 0,
    refillsRemaining: 0
  }
];
