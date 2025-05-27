
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { CostData } from '@/types/costTypes';

interface CostosContingenciaProps {
  costData: CostData;
  updateCostData: (field: keyof CostData, value: number) => void;
}

const CostosContingencia = ({ costData, updateCostData }: CostosContingenciaProps) => {
  return (
    <Card className="border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-red-50">
        <CardTitle className="flex items-center gap-3 text-red-800">
          <AlertTriangle className="h-6 w-6" />
          Costos de Contingencia y Factores de Riesgo (CF)
        </CardTitle>
        <p className="text-sm text-red-600">
          CF = Costos de Contingencia + Factores de Riesgo
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="contingencia" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Costos de Contingencia (USD)
          </Label>
          <Input
            id="contingencia"
            type="number"
            step="0.01"
            min="0"
            value={costData.contingencia || ''}
            onChange={(e) => updateCostData('contingencia', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
          <p className="text-xs text-gray-500">Gastos imprevistos y emergencias</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="factoresRiesgo" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Factores de Riesgo (USD)
          </Label>
          <Input
            id="factoresRiesgo"
            type="number"
            step="0.01"
            min="0"
            value={costData.factoresRiesgo || ''}
            onChange={(e) => updateCostData('factoresRiesgo', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
          <p className="text-xs text-gray-500">Volatilidad de mercado y riesgos operacionales</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostosContingencia;
