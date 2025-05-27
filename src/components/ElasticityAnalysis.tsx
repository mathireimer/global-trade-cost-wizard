
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateElasticities } from '@/utils/advancedCostCalculations';

interface ElasticityAnalysisProps {
  costData: CostData;
}

const ElasticityAnalysis = ({ costData }: ElasticityAnalysisProps) => {
  const elasticities = calculateElasticities(costData);
  
  const variables = [
    { name: 'Precio FOB', index: 0 },
    { name: 'Tasa Arancelaria', index: 1 },
    { name: 'Tasa IVA', index: 2 },
    { name: 'Flete Base', index: 3 },
    { name: 'Factor Optimización', index: 4 }
  ];
  
  const components = ['CD', 'CTI', 'CAT', 'CSG', 'COF'];

  return (
    <Card className="border-l-4 border-l-yellow-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="flex items-center gap-3 text-yellow-800">
          <BarChart3 className="h-6 w-6" />
          Análisis de Elasticidad
        </CardTitle>
        <p className="text-sm text-yellow-600">
          Sensibilidad de los componentes ante cambios en variables clave
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {variables.map((variable) => (
            <div key={variable.name} className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">{variable.name}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {components.map((component, j) => {
                  const elasticity = elasticities[variable.index]?.[j] || 0;
                  const absElasticity = Math.abs(elasticity);
                  const maxElasticity = 2; // For progress bar scaling
                  
                  return (
                    <div key={component} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">{component}</span>
                        <span className={`font-bold ${elasticity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {elasticity >= 0 ? '+' : ''}{elasticity.toFixed(2)}
                        </span>
                      </div>
                      <Progress 
                        value={(absElasticity / maxElasticity) * 100} 
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Interpretación:</h4>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• <strong>Elasticidad > 1:</strong> Alta sensibilidad</li>
            <li>• <strong>Elasticidad 0.5-1:</strong> Sensibilidad moderada</li>
            <li>• <strong>Elasticidad < 0.5:</strong> Baja sensibilidad</li>
            <li>• <strong>Signo positivo:</strong> Relación directa</li>
            <li>• <strong>Signo negativo:</strong> Relación inversa</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElasticityAnalysis;
