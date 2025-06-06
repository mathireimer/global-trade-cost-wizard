
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateAdvancedCosts, calculateComponentCorrelations, getCorrelationInterpretation } from '@/utils/advancedCostCalculations';
import CostBreakdownChart from './CostBreakdownChart';

interface InterrelationAnalysisProps {
  costData: CostData;
}

const InterrelationAnalysis = ({ costData }: InterrelationAnalysisProps) => {
  const calculations = calculateAdvancedCosts(costData);
  const correlations = calculateComponentCorrelations(costData);
  
  const componentNames = [
    'FOB', 'Flete', 'Seguro', 'Aranceles', 'IVA', 'Gastos Aduaneros', 'Costos Operativos'
  ];

  const sensitivityAnalysis = [
    {
      variable: 'Precio FOB',
      impact: 'Alto',
      percentage: 85.2,
      description: 'Cambios en FOB afectan directamente CIF, aranceles e IVA'
    },
    {
      variable: 'Tipo de Cambio',
      impact: 'Alto', 
      percentage: 78.9,
      description: 'Variaciones cambiarias impactan todos los costos en guaraníes'
    },
    {
      variable: 'Tasa Arancelaria',
      impact: 'Medio',
      percentage: 45.3,
      description: 'Afecta aranceles y base para cálculo de IVA'
    },
    {
      variable: '% Flete',
      impact: 'Medio',
      percentage: 38.7,
      description: 'Impacta CIF y consecuentemente base gravable'
    },
    {
      variable: 'Tasa IVA',
      impact: 'Bajo',
      percentage: 22.1,
      description: 'Afecta solo el componente de impuestos generales'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-l-4 border-l-purple-500 shadow-lg">
      <CardHeader className="bg-purple-50">
        <CardTitle className="flex items-center gap-3 text-purple-800">
          <TrendingUp className="h-6 w-6" />
          Análisis de Interrelaciones entre Componentes
        </CardTitle>
        <p className="text-sm text-purple-600">
          Visualización y análisis de correlaciones, sensibilidad e impactos entre variables del modelo
        </p>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Gráficos
            </TabsTrigger>
            <TabsTrigger value="correlations" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Correlaciones
            </TabsTrigger>
            <TabsTrigger value="sensitivity" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Sensibilidad
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <CostBreakdownChart costData={costData} />
          </TabsContent>

          <TabsContent value="correlations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Matriz de Correlaciones</CardTitle>
                <p className="text-sm text-gray-600">
                  Correlaciones entre componentes del modelo (valores entre -1 y 1)
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left p-2"></th>
                        {componentNames.map((name, i) => (
                          <th key={i} className="text-center p-1 min-w-[60px]">
                            {name.slice(0, 4)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {componentNames.map((rowName, i) => (
                        <tr key={i}>
                          <td className="font-medium p-2 text-left">{rowName}</td>
                          {correlations[i]?.map((correlation, j) => {
                            const interpretation = getCorrelationInterpretation(correlation);
                            return (
                              <td key={j} className="text-center p-1">
                                <span 
                                  className={`px-1 py-0.5 rounded text-xs ${interpretation.color}`}
                                  title={interpretation.description}
                                >
                                  {correlation.toFixed(2)}
                                </span>
                              </td>
                            );
                          }) || Array(7).fill(0).map((_, j) => (
                            <td key={j} className="text-center p-1">0.00</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-200 rounded"></div>
                    <span>Muy Alta (≥0.8)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-200 rounded"></div>
                    <span>Alta (≥0.6)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                    <span>Moderada (≥0.4)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-200 rounded"></div>
                    <span>Baja (≥0.2)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 rounded"></div>
                    <span>Muy Baja (&lt;0.2)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensitivity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Análisis de Sensibilidad</CardTitle>
                <p className="text-sm text-gray-600">
                  Impacto relativo de las variables en el Costo Total de Importación
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sensitivityAnalysis.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{item.variable}</h4>
                        <Badge className={getImpactColor(item.impact)}>
                          {item.impact} Impacto
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sensibilidad:</span>
                          <span className="font-bold">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-900">Métricas de Riesgo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-yellow-700">Coeficiente de Variación</p>
                    <p className="text-xl font-bold text-yellow-900">
                      {calculations.coeficienteVariacion.toFixed(2)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-yellow-700">Volatilidad CTI</p>
                    <p className="text-xl font-bold text-yellow-900">
                      {(calculations.desviacionEstandar_CTI / 1000000).toFixed(1)}M Gs.
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-yellow-700">Precisión del Modelo</p>
                    <p className="text-xl font-bold text-yellow-900">
                      {calculations.indicePrecision.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InterrelationAnalysis;
