
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateCosts, formatCurrency } from '@/utils/costCalculations';

interface ResultadosCalculadoraProps {
  costData: CostData;
}

const ResultadosCalculadora = ({ costData }: ResultadosCalculadoraProps) => {
  const calculations = calculateCosts(costData);
  
  const components = [
    { name: 'CD', label: 'Costos Directos', value: calculations.CD, color: 'bg-blue-500' },
    { name: 'CTI', label: 'Transporte Internacional', value: calculations.CTI, color: 'bg-green-500' },
    { name: 'CAT', label: 'Aduaneros y Tributarios', value: calculations.CAT, color: 'bg-purple-500' },
    { name: 'CSG', label: 'Seguros y Garantías', value: calculations.CSG, color: 'bg-orange-500' },
    { name: 'COF', label: 'Operativos y Financieros', value: calculations.COF, color: 'bg-indigo-500' },
    { name: 'CF', label: 'Contingencia y Riesgo', value: calculations.CF, color: 'bg-red-500' },
  ];

  const getPercentage = (value: number): number => {
    return calculations.CAI > 0 ? (value / calculations.CAI) * 100 : 0;
  };

  return (
    <Card className="border-2 border-gray-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <Calculator className="h-6 w-6" />
          Resultados del Cálculo
        </CardTitle>
        <p className="text-blue-100 text-sm">
          Costo de Adquisición en Importación (CAI)
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* Total CAI */}
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">CAI Total</span>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatCurrency(calculations.CAI)}
          </div>
          <Badge variant="secondary" className="text-xs">
            Costo Total de Adquisición
          </Badge>
        </div>

        {/* Components Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Desglose por Componentes</h3>
          </div>
          
          {components.map((component) => (
            <div key={component.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${component.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {component.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(component.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getPercentage(component.value).toFixed(1)}%
                  </div>
                </div>
              </div>
              <Progress 
                value={getPercentage(component.value)} 
                className="h-2"
              />
              <div className="text-xs text-gray-600 mb-3">
                {component.label}
              </div>
            </div>
          ))}
        </div>

        {/* Formula Reference */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-900 mb-2">Fórmula Aplicada:</h4>
          <p className="text-sm text-gray-700 font-mono">
            CAI = CD + CTI + CAT + CSG + COF + CF
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Modelo metodológico integral para determinación sistemática del costo de adquisición en importaciones
          </p>
        </div>

        {/* Key Metrics */}
        {calculations.CAI > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {((calculations.CD / calculations.CAI) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-green-700">Costos Directos</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                {((calculations.CAT / calculations.CAI) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-purple-700">Impuestos y Aranceles</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultadosCalculadora;
