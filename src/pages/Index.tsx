import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calendar, Check, Plus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            MedBuddy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your comprehensive medication management companion. Track, manage, and never miss a dose again.
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Get Started
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Easy Medication Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add, edit, and organize all your medications in one place with detailed dosage and timing information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Smart Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visual calendar tracking with adherence monitoring to help you stay on top of your medication routine.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Adherence Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your medication adherence with detailed analytics and progress tracking for better health outcomes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Choose your role to get started:</p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-blue-200 hover:bg-blue-50"
            >
              I'm a Patient
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-green-200 hover:bg-green-50"
            >
              I'm a Caretaker
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
