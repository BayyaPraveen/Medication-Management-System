import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '../contexts/AuthContext';
import { useMedication } from '../contexts/MedicationContext';
import { Calendar, Plus, Check } from 'lucide-react';
import AddMedicationModal from '@/components/AddMedicationModal';
import MedicationCard from '@/components/MedicationCard';
import DashboardHeader from '@/components/DashboardHeader';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { medications, getTodaysMedications, getAdherenceRate } = useMedication();
  const [showAddModal, setShowAddModal] = useState(false);

  const todaysMeds = getTodaysMedications();
  const adherenceRate = getAdherenceRate();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your medication overview for today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Medications</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{medications.length}</div>
              <p className="text-xs text-muted-foreground">Active prescriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Doses</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todaysMeds.reduce((total, med) => total + med.times.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Adherence Rate</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adherenceRate}%</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Medications */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Today's Medications</h2>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>

          {todaysMeds.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500 mb-4">No medications scheduled for today</p>
                <Button onClick={() => setShowAddModal(true)} variant="outline">
                  Add Your First Medication
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {todaysMeds.map((medication) => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </div>
          )}
        </div>

        {/* Adherence Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Adherence</CardTitle>
            <CardDescription>Your medication adherence over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${adherenceRate}%` }}
                />
              </div>
              <Badge variant={adherenceRate >= 80 ? "default" : "destructive"}>
                {adherenceRate}%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {adherenceRate >= 80 ? "Great job! Keep up the good work." : "Try to improve your adherence rate."}
            </p>
          </CardContent>
        </Card>
      </div>

      <AddMedicationModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
};

export default PatientDashboard;
