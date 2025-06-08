
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Clock, CheckCircle, AlertTriangle, Package, MapPin, Trophy, Star } from 'lucide-react';
import DashboardStats from '@/components/DashboardStats';
import OrderManagement from '@/components/OrderManagement';
import InventoryPanel from '@/components/InventoryPanel';
import StrikeTracker from '@/components/StrikeTracker';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  // Mock agent data
  const agentData = {
    name: "Emeka Johnson",
    state: "Lagos",
    lga: "Ikeja",
    deliveryRate: 82,
    strikes: 1,
    totalOrders: 47,
    completedToday: 12,
    weeklyEarnings: 18500,
    customerSatisfaction: 4.7,
    nextPayoutDays: 2
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate new order notification
    const alertTimer = setTimeout(() => {
      setNewOrderAlert(true);
      // Play subtle notification sound would go here
    }, 3000);
    return () => clearTimeout(alertTimer);
  }, []);

  const getPerformanceColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getMotivationalMessage = (rate: number) => {
    if (rate >= 80) return "🔥 You're on fire! Keep going to earn max ₦300 bonus per order.";
    if (rate >= 70) return "🏃 Hurry my guy! Just a few more successful deliveries to unlock ₦300 per order!";
    return "⛔ Bonus locked. Improve delivery success to start earning.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">VitalVida Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className={`h-6 w-6 ${newOrderAlert ? 'text-red-500 animate-bounce' : 'text-gray-400'}`} />
                {newOrderAlert && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">1</span>
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{agentData.name}</p>
                <p className="text-xs text-gray-500">{agentData.state}, {agentData.lga}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert for new order */}
      {newOrderAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              New order assigned! Please verify assignment within 10 minutes.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Performance Card */}
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Weekly Delivery Rate</h2>
                <p className={`text-3xl font-bold ${agentData.deliveryRate >= 80 ? 'text-yellow-300' : 'text-white'}`}>
                  {agentData.deliveryRate}%
                </p>
                <p className="text-sm opacity-90 mt-2">
                  {getMotivationalMessage(agentData.deliveryRate)}
                </p>
              </div>
              <div className="text-right">
                <Trophy className="h-12 w-12 mb-2 mx-auto text-yellow-300" />
                <p className="text-sm">Bonus Eligible</p>
                <p className="text-xl font-bold">₦{agentData.deliveryRate >= 80 ? '300' : '0'}</p>
              </div>
            </div>
            <Progress value={agentData.deliveryRate} className="mt-4 bg-white/20" />
          </CardContent>
        </Card>

        {/* Dashboard Stats */}
        <DashboardStats agentData={agentData} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="strikes">Compliance</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <InventoryPanel />
          </TabsContent>

          <TabsContent value="strikes" className="mt-6">
            <StrikeTracker strikes={agentData.strikes} />
          </TabsContent>

          <TabsContent value="earnings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>💰 Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-green-600">₦{agentData.weeklyEarnings.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Next Payout</p>
                    <p className="text-2xl font-bold text-blue-600">{agentData.nextPayoutDays} Days</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Customer Rating</p>
                    <p className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
                      <Star className="h-6 w-6 mr-1" />
                      {agentData.customerSatisfaction}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
