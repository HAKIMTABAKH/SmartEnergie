'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function BatteryLevelGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.35.222:5000/api/sensor-data');
        const sensorData = await response.json();

        // Format the data for the graph
        const formattedData = sensorData.map((item: { timestamp: string | number | Date; light: any; }) => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: item.light, // Use the light value or adjust for relevant data
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch battery level data:', error);
      }
    };

    fetchData();

    // Optionally, refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">
        Lumière 
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
            />
            <Tooltip />
            <Bar 
              dataKey="value" 
              fill="#06B6D4"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
