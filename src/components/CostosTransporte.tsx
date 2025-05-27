
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Truck, Fuel, Anchor, Crane } from 'lucide-react';
import { CostData } from '@/types/costTypes';

interface CostosTransporteProps {
  costData: CostData;
  updateCostData: (field: keyof CostData, value: number) => void;
}

const CostosTransporte = ({ costData, updateCostData }: CostosTransporteProps) => {
  return (
    <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center gap-3 text-green-800">
          <Truck className="h-6 w-6" />
          Costos de Transporte Internacional (CTI)
        </CardTitle>
        <p className="text-sm text-green-600">
          CTI = Flete Base + Recargos por Combustible + Tarifas Portuarias + Manipulación Terminal
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="fleteBase" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Flete Base (USD)
          </Label>
          <Input
            id="fleteBase"
            type="number"
            step="0.01"
            min="0"
            value={costData.fleteBase || ''}
            onChange={(e) => updateCostData('fleteBase', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="recargosCombustible" className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            Recargos Combustible (USD)
          </Label>
          <Input
            id="recargosCombustible"
            type="number"
            step="0.01"
            min="0"
            value={costData.recargosCombustible || ''}
            onChange={(e) => updateCostData('recargosCombustible', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tarifasPortuarias" className="flex items-center gap-2">
            <Anchor className="h-4 w-4" />
            Tarifas Portuarias (USD)
          </Label>
          <Input
            id="tarifasPortuarias"
            type="number"
            step="0.01"
            min="0"
            value={costData.tarifasPortuarias || ''}
            onChange={(e) => updateCostData('tarifasPortuarias', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="manipulacionTerminal" className="flex items-center gap-2">
            <Crane className="h-4 w-4" />
            Manipulación Terminal (USD)
          </Label>
          <Input
            id="manipulacionTerminal"
            type="number"
            step="0.01"
            min="0"
            value={costData.manipulacionTerminal || ''}
            onChange={(e) => updateCostData('manipulacionTerminal', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CostosTransporte;
