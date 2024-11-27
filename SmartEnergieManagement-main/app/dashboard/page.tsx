'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Battery, Cpu, Thermometer, Zap } from 'lucide-react';
import { EnergyConsumptionGraph } from '@/components/graphs/energy-consumption-graph';
import { TemperatureGraph } from '@/components/graphs/temperature-graph';
import { BatteryLevelGraph } from '@/components/graphs/battery-level-graph';
import { SystemLoadGraph } from '@/components/graphs/system-load-graph';

// Define the SensorData interface
interface SensorData {
  timestamp: string;
  voltage: number;
  light: number;
  temperature: number;
  humidity: number;
}

export default function Dashboard() {
  const [data, setData] = useState<{ time: string; value: number }[]>([]);
  const [metrics, setMetrics] = useState([
    {
      icon: Zap,
      title: 'Power Usage',
      value: 0,
      unit: 'V',
      progress: 0,
    },
    {
      icon: Battery,
      title: 'Battery Level',
      value: 0,
      unit: '%',
      progress: 0,
    },
    {
      icon: Thermometer,
      title: 'Temperature',
      value: 0,
      unit: '°C',
      progress: 0,
    },
    {
      icon: Cpu,
      title: 'System Load',
      value: 0,
      unit: '%',
      progress: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://192.168.35.222:5000/api/sensor-data');
        if (!response.ok) throw new Error('Failed to fetch sensor data');
        const sensorData: SensorData[] = await response.json();

        if (sensorData.length > 0) {
          const latestData = sensorData[0];
          setData(
            sensorData.map((item) => ({
              time: new Date(item.timestamp).toLocaleTimeString(),
              value: item.voltage, // Adjust to the appropriate key for the graph
            }))
          );

          setMetrics([
            {
              icon: Zap,
              title: 'Voltage',
              value: latestData.voltage.toFixed(2),
              unit: 'V',
              progress: Math.min((latestData.voltage / 5) * 100, 100),
            },
            {
              icon: Battery,
              title: 'Lumière',
              value: latestData.light.toFixed(2),
              unit: '%',
              progress: latestData.light,
            },
            {
              icon: Thermometer,
              title: 'Temperature',
              value: latestData.temperature.toFixed(1),
              unit: '°C',
              progress: Math.min((latestData.temperature / 50) * 100, 100),
            },
            {
              icon: Cpu,
              title: 'Humidity',
              value: latestData.humidity.toFixed(1),
              unit: '%',
              progress: latestData.humidity,
            },
          ]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Smart Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg">
                <div className="flex items-center gap-4">
                  <Icon className="h-10 w-10 text-gray-500 dark:text-gray-300" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.title}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {metric.value} {metric.unit}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 dark:bg-blue-400"
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {metric.progress.toFixed(0)}% of max
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EnergyConsumptionGraph data={data} />
          <TemperatureGraph data={data} />
          <BatteryLevelGraph data={data} />
          <SystemLoadGraph data={data} />
        </div>
      </div>
    </div>
  );
}
