
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, TrendingUp, Info } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateComponentCorrelations, getCorrelationInterpretation } from '@/utils/advancedCostCalculations';

interface InterrelationAnalysisProps {
  costData: CostData;
}

const InterrelationAnalysis = ({ costData }: InterrelationAnalysisProps) => {
  const correlationMatrix = calculateComponentCorrelations(costData);
  
  const componentLabels = [
    { name: 'FOB', fullName: 'Free on Board' },
    { name: 'CF', fullName: 'Costo del Flete' },
    { name: 'S', fullName: 'Prima del Seguro' },
    { name: 'AD', fullName: 'Aranceles y Derechos' },
    { name: 'IG', fullName: 'Impuestos Generales' },
    { name: 'GA', fullName: 'Gastos Aduaneros' },
    { name: 'CO', fullName: 'Costos Operacionales' }
  ];

  const getCorrelationColor = (correlation: number): string => {
    const abs = Math.abs(correlation);
    if (abs >= 0.8) return 'bg-red-500';
    if (abs >= 0.6) return 'bg-orange-500';
    if (abs >= 0.4) return 'bg-yellow-500';
    if (abs >= 0.2) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  const getTextColor = (correlation: number): string => {
    const abs = Math.abs(correlation);
    return abs >= 0.4 ? 'text-white' : 'text-gray-800';
  };

  // Encontrar las correlaciones más significativas
  const significantCorrelations = [];
  for (let i = 0; i < correlationMatrix.length; i++) {
    for (let j = i + 1; j < correlationMatrix[i].length; j++) {
      const correlation = correlationMatrix[i][j];
      if (Math.abs(correlation) >= 0.5) {
        significantCorrelations.push({
          component1: componentLabels[i],
          component2: componentLabels[j],
          correlation: correlation,
          interpretation: getCorrelationInterpretation(correlation)
        });
      }
    }
  }

  // Ordenar por correlación absoluta descendente
  significantCorrelations.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

  return (
    <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-purple-50">
        <CardTitle className="flex items-center gap-3 text-purple-800">
          <Network className="h-6 w-6" />
          Análisis de Interrelaciones entre Componentes
        </CardTitle>
        <p className="text-sm text-purple-600">
          Matriz de correlaciones y análisis de dependencias entre componentes del CTI
        </p>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Matriz de Correlaciones */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Matriz de Correlaciones
            </h3>
            
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-1 min-w-max">
                {/* Header row */}
                <div className="text-xs font-medium text-gray-600 p-2"></div>
                {componentLabels.map((comp) => (
                  <div key={comp.name} className="text-xs font-medium text-gray-600 p-2 text-center min-w-[60px]">
                    {comp.name}
                  </div>
                ))}
                
                {/* Data rows */}
                {correlationMatrix.map((row, i) => (
                  <>
                    <div key={`label-${i}`} className="text-xs font-medium text-gray-600 p-2 min-w-[60px]">
                      {componentLabels[i].name}
                    </div>
                    {row.map((correlation, j) => (
                      <div
                        key={`${i}-${j}`}
                        className={`
                          text-xs font-bold p-2 text-center rounded transition-all duration-200 hover:scale-105
                          ${getCorrelationColor(correlation)} ${getTextColor(correlation)}
                        `}
                        title={`${componentLabels[i].name} - ${componentLabels[j].name}: ${correlation.toFixed(3)}`}
                      >
                        {correlation.toFixed(2)}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* Correlaciones Significativas */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Correlaciones Significativas (≥ 0.5)
            </h3>
            
            <div className="space-y-3">
              {significantCorrelations.length > 0 ? (
                significantCorrelations.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.component1.name}
                        </Badge>
                        <span className="text-gray-400">↔</span>
                        <Badge variant="outline" className="text-xs">
                          {item.component2.name}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.interpretation.color}`}>
                          {item.correlation.toFixed(3)}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {item.interpretation.level}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      <strong>{item.component1.fullName}</strong> ↔ <strong>{item.component2.fullName}</strong>
                    </p>
                    <p className="text-xs text-gray-700">
                      {item.interpretation.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 italic">
                  No se encontraron correlaciones significativas (≥ 0.5) en el modelo actual.
                </p>
              )}
            </div>
          </div>

          {/* Leyenda */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Interpretación de Correlaciones:</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <span>Muy Alta (≥0.8)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-500"></div>
                <span>Alta (0.6-0.8)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span>Moderada (0.4-0.6)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span>Baja (0.2-0.4)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-400"></div>
                <span>Muy Baja (&lt;0.2)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterrelationAnalysis;
