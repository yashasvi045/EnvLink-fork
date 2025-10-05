import { Card } from "./ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FlaskConical, Download } from "lucide-react";
import { Button } from "./ui/button";

export function AQILab() {
  const weeklyData = [
    { day: "Mon", pm25: 35, pm10: 48, o3: 42, no2: 28 },
    { day: "Tue", pm25: 32, pm10: 45, o3: 38, no2: 25 },
    { day: "Wed", pm25: 38, pm10: 52, o3: 45, no2: 30 },
    { day: "Thu", pm25: 45, pm10: 58, o3: 52, no2: 35 },
    { day: "Fri", pm25: 40, pm10: 55, o3: 48, no2: 32 },
    { day: "Sat", pm25: 28, pm10: 40, o3: 35, no2: 22 },
    { day: "Sun", pm25: 30, pm10: 42, o3: 38, no2: 24 },
  ];

  const monthlyTrends = [
    { month: "Apr", aqi: 52, pm25: 38, pm10: 48 },
    { month: "May", aqi: 48, pm25: 35, pm10: 45 },
    { month: "Jun", aqi: 45, pm25: 32, pm10: 42 },
    { month: "Jul", aqi: 42, pm25: 30, pm10: 40 },
    { month: "Aug", aqi: 38, pm25: 28, pm10: 38 },
    { month: "Sep", aqi: 40, pm25: 30, pm10: 40 },
  ];

  const pollutantData = [
    { pollutant: "PM2.5", current: "32 μg/m³", avg24h: "35 μg/m³", limit: "35 μg/m³", status: "Good" },
    { pollutant: "PM10", current: "45 μg/m³", avg24h: "48 μg/m³", limit: "150 μg/m³", status: "Good" },
    { pollutant: "O₃", current: "42 ppb", avg24h: "45 ppb", limit: "70 ppb", status: "Good" },
    { pollutant: "NO₂", current: "28 ppb", avg24h: "30 ppb", limit: "100 ppb", status: "Good" },
    { pollutant: "SO₂", current: "12 ppb", avg24h: "15 ppb", limit: "75 ppb", status: "Good" },
    { pollutant: "CO", current: "0.5 ppm", avg24h: "0.6 ppm", limit: "9 ppm", status: "Good" },
  ];

  // Snapshot data (could be backend-driven)
  const snapshot = {
    aqi: 42,
    mainPollutant: "PM2.5",
    insight: "Air quality is good today. Outdoor activities are safe.",
    updated: "Oct 5, 2025 09:00 UTC"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20 md:pb-8 px-4" style={{ paddingTop: '140px' }}>
      <div className="max-w-7xl mx-auto">
        {/* AQI Snapshot */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-[#10B981] to-[#3B82F6] text-white shadow-lg border-0 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AQI Snapshot</h2>
              <p className="text-lg">AQI: <span className="font-extrabold">{snapshot.aqi}</span> ({snapshot.mainPollutant})</p>
              <p className="opacity-90">{snapshot.insight}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-sm opacity-80">Last updated</p>
            <p className="text-md">{snapshot.updated}</p>
          </div>
        </Card>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3B82F6] bg-opacity-10 rounded-xl flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h1 className="text-3xl md:text-4xl text-[#1F2937]">AQI Lab</h1>
            </div>
            <p className="text-[#6B7280]">Advanced air quality analytics and historical data</p>
          </div>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="pollutants">Pollutants</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Weekly Pollutant Breakdown */}
            <Card className="p-6 bg-white shadow-lg border-0">
              <h3 className="text-[#1F2937] mb-6">Weekly Pollutant Levels</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="pm25" stroke="#10B981" strokeWidth={2} name="PM2.5" />
                  <Line type="monotone" dataKey="pm10" stroke="#3B82F6" strokeWidth={2} name="PM10" />
                  <Line type="monotone" dataKey="o3" stroke="#F59E0B" strokeWidth={2} name="O₃" />
                  <Line type="monotone" dataKey="no2" stroke="#8B5CF6" strokeWidth={2} name="NO₂" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Monthly Trends */}
            <Card className="p-6 bg-white shadow-lg border-0">
              <h3 className="text-[#1F2937] mb-6">6-Month AQI Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="aqi" fill="#10B981" name="AQI" />
                  <Bar dataKey="pm25" fill="#3B82F6" name="PM2.5" />
                  <Bar dataKey="pm10" fill="#F59E0B" name="PM10" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="pollutants">
            <Card className="p-6 bg-white shadow-lg border-0">
              <h3 className="text-[#1F2937] mb-6">Real-time Pollutant Measurements</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pollutant</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>24h Average</TableHead>
                    <TableHead>EPA Limit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pollutantData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.pollutant}</TableCell>
                      <TableCell>{row.current}</TableCell>
                      <TableCell>{row.avg24h}</TableCell>
                      <TableCell>{row.limit}</TableCell>
                      <TableCell>
                        <span className="px-3 py-1 bg-[#10B981] bg-opacity-10 text-[#10B981] rounded-full text-sm">
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white shadow-lg border-0">
                <h3 className="text-[#1F2937] mb-4">City Comparison</h3>
                <div className="space-y-4">
                  {[
                    { city: "San Francisco", aqi: 42, color: "bg-[#10B981]" },
                    { city: "Los Angeles", aqi: 68, color: "bg-[#F59E0B]" },
                    { city: "New York", aqi: 55, color: "bg-[#3B82F6]" },
                    { city: "Seattle", aqi: 38, color: "bg-[#10B981]" },
                    { city: "Denver", aqi: 45, color: "bg-[#10B981]" },
                  ].map((city, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#1F2937]">{city.city}</span>
                        <span className="text-[#6B7280]">{city.aqi}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${city.color} h-2 rounded-full`}
                          style={{ width: `${(city.aqi / 150) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-lg border-0">
                <h3 className="text-[#1F2937] mb-4">Historical Analysis</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm text-[#6B7280] mb-1">Best Day (Last 30 days)</p>
                    <p className="text-2xl text-[#10B981]">28 AQI</p>
                    <p className="text-sm text-[#6B7280]">September 24, 2025</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-sm text-[#6B7280] mb-1">Worst Day (Last 30 days)</p>
                    <p className="text-2xl text-[#F59E0B]">78 AQI</p>
                    <p className="text-sm text-[#6B7280]">September 10, 2025</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-[#6B7280] mb-1">Average (Last 30 days)</p>
                    <p className="text-2xl text-[#3B82F6]">45 AQI</p>
                    <p className="text-sm text-[#6B7280]">15% better than last year</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
