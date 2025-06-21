import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  instructions?: string;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  takenAt: string;
  scheduledTime: string;
  status: 'taken' | 'missed' | 'skipped';
  notes?: string;
}

interface MedicationContextType {
  medications: Medication[];
  logs: MedicationLog[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, medication: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  logMedication: (medicationId: string, status: 'taken' | 'missed' | 'skipped', notes?: string) => void;
  getAdherenceRate: () => number;
  getTodaysMedications: () => Array<Medication & { nextDose?: string }>;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [logs, setLogs] = useState<MedicationLog[]>([]);

  useEffect(() => {
    // Load from localStorage
    const storedMeds = localStorage.getItem('medBuddyMedications');
    const storedLogs = localStorage.getItem('medBuddyLogs');
    
    if (storedMeds) {
      setMedications(JSON.parse(storedMeds));
    } else {
      // Initialize with sample data
      const sampleMeds: Medication[] = [
        {
          id: '1',
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          times: ['09:00'],
          startDate: '2024-01-01',
          instructions: 'Take with food'
        },
        {
          id: '2',
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          times: ['08:00', '20:00'],
          startDate: '2024-01-01',
          instructions: 'Take with meals'
        }
      ];
      setMedications(sampleMeds);
    }
    
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medBuddyMedications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('medBuddyLogs', JSON.stringify(logs));
  }, [logs]);

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication: Medication = {
      ...medication,
      id: Math.random().toString(36).substr(2, 9)
    };
    setMedications(prev => [...prev, newMedication]);
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, ...updates } : med
    ));
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
    setLogs(prev => prev.filter(log => log.medicationId !== id));
  };

  const logMedication = (medicationId: string, status: 'taken' | 'missed' | 'skipped', notes?: string) => {
    const newLog: MedicationLog = {
      id: Math.random().toString(36).substr(2, 9),
      medicationId,
      takenAt: new Date().toISOString(),
      scheduledTime: new Date().toTimeString().slice(0, 5),
      status,
      notes
    };
    setLogs(prev => [...prev, newLog]);
  };

  const getAdherenceRate = (): number => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    });

    const totalExpected = medications.length * 7;
    const totalTaken = logs.filter(log => {
      const logDate = new Date(log.takenAt).toDateString();
      return last7Days.includes(logDate) && log.status === 'taken';
    }).length;

    return totalExpected > 0 ? Math.round((totalTaken / totalExpected) * 100) : 0;
  };

  const getTodaysMedications = () => {
    return medications.map(med => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const nextDose = med.times.find(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const doseTime = hours * 60 + minutes;
        return doseTime > currentTime;
      });

      return {
        ...med,
        nextDose: nextDose || med.times[0]
      };
    });
  };

  return (
    <MedicationContext.Provider value={{
      medications,
      logs,
      addMedication,
      updateMedication,
      deleteMedication,
      logMedication,
      getAdherenceRate,
      getTodaysMedications
    }}>
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};
