import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMedication, Medication } from '@/contexts/MedicationContext';
import { useToast } from '@/hooks/use-toast';
import { Check, Calendar } from 'lucide-react';

interface MedicationCardProps {
  medication: Medication & { nextDose?: string };
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication }) => {
  const { logMedication } = useMedication();
  const { toast } = useToast();

  const handleTakeMedication = () => {
    logMedication(medication.id, 'taken');
    toast({
      title: "Medication logged",
      description: `${medication.name} marked as taken.`,
    });
  };

  const handleSkipMedication = () => {
    logMedication(medication.id, 'skipped');
    toast({
      title: "Medication skipped",
      description: `${medication.name} marked as skipped.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{medication.name}</CardTitle>
          <Badge variant="outline">{medication.frequency}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Dosage:</span>
            <span className="font-medium">{medication.dosage}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Next dose:</span>
            <span className="font-medium">{medication.nextDose}</span>
          </div>

          {medication.instructions && (
            <div className="text-sm">
              <span className="text-gray-600">Instructions:</span>
              <p className="text-gray-800 mt-1">{medication.instructions}</p>
            </div>
          )}

          <div className="flex space-x-2 pt-3">
            <Button 
              onClick={handleTakeMedication}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark as Taken
            </Button>
            <Button 
              onClick={handleSkipMedication}
              variant="outline"
              className="flex-1"
            >
              Skip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationCard;
