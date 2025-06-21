import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '../contexts/AuthContext';
import { useMedication } from '../contexts/MedicationContext';
import { Calendar, Check, Plus } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

const CaretakerDashboard = () => {
  const { user } = useAuth();
  const { medications, logs, getAdherenceRate } = useMedication();

  const adherenceRate = getAdherenceRate();
  const recentLogs = logs.slice(-5);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Caretaker Dashboard
          </h1>
          <p className="text-gray-600">Monitor patient medication adherence and progress.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Under care</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Medications</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{medications.length}</div>
              <p className="text-xs text-muted-foreground">Being monitored</p>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Logs</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.length}</div>
              <p className="text-xs text-muted-foreground">Total entries</p>
            </CardContent>
          </Card>
        </div>

        {/* Patient Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Medications</CardTitle>
              <CardDescription>Current active prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              {medications.length === 0 ? (
                <p className="text-gray-500">No medications found</p>
              ) : (
                <div className="space-y-3">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                      </div>
                      <Badge variant="outline">{med.times.length} doses/day</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest medication logs</CardDescription>
            </CardHeader>
            <CardContent>
              {recentLogs.length === 0 ? (
                <p className="text-gray-500">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {recentLogs.map((log) => {
                    const medication = medications.find(m => m.id === log.medicationId);
                    return (
                      <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{medication?.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(log.takenAt).toLocaleDateString()} at {log.scheduledTime}
                          </p>
                        </div>
                        <Badge 
                          variant={log.status === 'taken' ? 'default' : 'destructive'}
                        >
                          {log.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Adherence Chart */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Adherence Overview</CardTitle>
            <CardDescription>Patient medication adherence tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Adherence</span>
                  <span className="text-sm text-gray-600">{adherenceRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${adherenceRate}%` }}
                  />
                </div>
              </div>
              <Badge variant={adherenceRate >= 80 ? "default" : "destructive"} className="ml-4">
                {adherenceRate >= 80 ? "Good" : "Needs Attention"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaretakerDashboard;
