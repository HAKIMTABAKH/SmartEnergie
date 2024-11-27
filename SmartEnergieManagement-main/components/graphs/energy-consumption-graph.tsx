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
  ResponsiveContainer,
} from 'recharts';

export function EnergyConsumptionGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.35.222:5000/api/sensor-data');
        const sensorData = await response.json();

        const formattedData = sensorData.map((item) => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: item.voltage, // Adjust this key as needed
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch energy consumption data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">
        Voltage
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#888888" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
