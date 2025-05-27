
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, DollarSign } from 'lucide-react';
import { CostData } from '@/types/costTypes';

interface CostosDirectosProps {
  costData: CostData;
  updateCostData: (field: keyof CostData, value: number) => void;
}

const CostosDirectos = ({ costData, updateCostData }: CostosDirectosProps) => {
  return (
    <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center gap-3 text-blue-800">
          <Package className="h-6 w-6" />
          Costos Directos de Mercancía (CD)
        </CardTitle>
        <p className="text-sm text-blue-600">
          CD = Precio FOB + Costos de Embalaje Especial + Certificaciones de Origen
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="precioFOB" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Precio FOB (USD)
          </Label>
          <Input
            id="precioFOB"
            type="number"
            step="0.01"
            min="0"
            value={costData.precioFOB || ''}
            onChange={(e) => updateCostData('precioFOB', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="embalaje">Costos Embalaje Especial (USD)</Label>
          <Input
            id="embalaje"
            type="number"
            step="0.01"
            min="0"
            value={costData.embalaje || ''}
            onChange={(e) => updateCostData('embalaje', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="certificaciones">Certificaciones de Origen (USD)</Label>
          <Input
            id="certificaciones"
            type="number"
            step="0.01"
            min="0"
            value={costData.certificaciones || ''}
            onChange={(e) => updateCostData('certificaciones', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CostosDirectos;
