
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Truck, Fuel, Anchor, Container } from 'lucide-react';
import { CostData } from '@/types/costTypes';

interface CostosTransporteProps {
  costData: CostData;
  updateAdvancedFactors: (field: string, value: number) => void;
}

const CostosTransporte = ({ costData, updateAdvancedFactors }: CostosTransporteProps) => {
  return (
    <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center gap-3 text-green-800">
          <Truck className="h-6 w-6" />
          Costos de Transporte Internacional (CTI)
        </CardTitle>
        <p className="text-sm text-green-600">
          CTI = [FB × (1 + βc) × λd × ψm] × (1 + μs)
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
            value={costData.advancedFactors.fleteBase || ''}
            onChange={(e) => updateAdvancedFactors('fleteBase', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="recargosCombustible" className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            Recargos Combustible (%)</Label>
          <Input
            id="recargosCombustible"
            type="number"
            step="0.01"
            min="0"
            value={costData.advancedFactors.recargosCombustible || ''}
            onChange={(e) => updateAdvancedFactors('recargosCombustible', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="factorModalidad" className="flex items-center gap-2">
            <Anchor className="h-4 w-4" />
            Factor Modalidad
          </Label>
          <Input
            id="factorModalidad"
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={costData.advancedFactors.factorModalidad || ''}
            onChange={(e) => updateAdvancedFactors('factorModalidad', parseFloat(e.target.value) || 0)}
            placeholder="1.0"
            className="text-right"
          />
          <p className="text-xs text-gray-500">Marítimo: 1.0, Aéreo: 3.2-4.8</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="factorEstacional" className="flex items-center gap-2">
            <Container className="h-4 w-4" />
            Factor Estacional (%)
          </Label>
          <Input
            id="factorEstacional"
            type="number"
            step="0.01"
            min="-5"
            max="25"
            value={costData.advancedFactors.factorEstacional || ''}
            onChange={(e) => updateAdvancedFactors('factorEstacional', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CostosTransporte;
