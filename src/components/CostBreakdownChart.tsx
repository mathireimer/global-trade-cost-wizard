
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp, DollarSign } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateAdvancedCosts, formatCurrency } from '@/utils/advancedCostCalculations';

interface CostBreakdownChartProps {
  costData: CostData;
}

const CostBreakdownChart = ({ costData }: CostBreakdownChartProps) => {
  const calculations = calculateAdvancedCosts(costData);

  const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Datos para el gráfico de barras (componentes en USD)
  const usdData = [
    {
      name: 'FOB',
      value: calculations.FOB,
      description: 'Free on Board'
    },
    {
      name: 'Flete',
      value: calculations.costoFlete,
      description: 'Costo del Flete'
    },
    {
      name: 'Seguro',
      value: calculations.costoSeguro,
      description: 'Prima del Seguro'
    }
  ];

  // Datos para el gráfico circular (componentes en Guaraníes)
  const guaraniesData = [
    {
      name: 'Base Gravable',
      value: calculations.baseGravable,
      color: '#3B82F6'
    },
    {
      name: 'Aranceles',
      value: calculations.aranceles,
      color: '#8B5CF6'
    },
    {
      name: 'IVA',
      value: calculations.impuestosGenerales,
      color: '#EF4444'
    },
    {
      name: 'Gastos Aduaneros',
      value: calculations.gastosAduaneros,
      color: '#6366F1'
    },
    {
      name: 'Costos Operativos',
      value: calculations.costosOperacionales,
      color: '#10B981'
    }
  ];

  const chartConfig = {
    value: {
      label: "Monto",
      color: "#2563eb",
    },
  };

  return (
    <div className="space-y-6">
      {/* Gráfico de Barras - Componentes CIF en USD */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Componentes CIF en USD
          </CardTitle>
          <p className="text-sm text-gray-600">
            Descomposición del valor CIF: FOB + Flete + Seguro
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usdData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">{data.name}</p>
                          <p className="text-sm text-gray-600">{data.description}</p>
                          <p className="text-lg font-bold text-blue-600">
                            {formatUSD(data.value)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico Circular - Distribución de Costos en Guaraníes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Distribución del CTI en Guaraníes
          </CardTitle>
          <p className="text-sm text-gray-600">
            Composición del Costo Total de Importación (CTI)
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={guaraniesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {guaraniesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const percentage = ((data.value / calculations.costoTotalImportacion) * 100).toFixed(1);
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">{data.name}</p>
                          <p className="text-lg font-bold" style={{ color: data.color }}>
                            {formatCurrency(data.value)}
                          </p>
                          <p className="text-sm text-gray-600">{percentage}% del CTI total</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Resumen Numérico */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Resumen de Cálculos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">CIF Total</p>
              <p className="text-lg font-bold text-green-600">{formatUSD(calculations.CIF)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Base Gravable</p>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(calculations.baseGravable)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Impuestos</p>
              <p className="text-lg font-bold text-purple-600">
                {formatCurrency(calculations.aranceles + calculations.impuestosGenerales)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">CTI Final</p>
              <p className="text-lg font-bold text-red-600">{formatCurrency(calculations.costoTotalImportacion)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostBreakdownChart;
