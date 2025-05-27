
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, ShieldCheck, Percent } from 'lucide-react';
import { CostData } from '@/types/costTypes';

interface CostosSegurosProps {
  costData: CostData;
  updateAdvancedFactors: (field: string, value: number) => void;
}

const CostosSeguros = ({ costData, updateAdvancedFactors }: CostosSegurosProps) => {
  return (
    <Card className="border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-orange-50">
        <CardTitle className="flex items-center gap-3 text-orange-800">
          <Shield className="h-6 w-6" />
          Costos de Seguros y Garantías (CSG)
        </CardTitle>
        <p className="text-sm text-orange-600">
          CSG = VCIF × σ × (1 + α × κ) × Θ + Σsg
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="tasaSeguro" className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Tasa de Seguro Base (%)
          </Label>
          <Input
            id="tasaSeguro"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={costData.advancedFactors.tasaSeguroBase || ''}
            onChange={(e) => updateAdvancedFactors('tasaSeguroBase', parseFloat(e.target.value) || 0)}
            placeholder="0.50"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="segurosAdicionales" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguros Adicionales (USD)
          </Label>
          <Input
            id="segurosAdicionales"
            type="number"
            step="0.01"
            min="0"
            value={costData.advancedFactors.segurosAdicionales || ''}
            onChange={(e) => updateAdvancedFactors('segurosAdicionales', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="factorRiesgoRuta" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Factor Riesgo Ruta
          </Label>
          <Input
            id="factorRiesgoRuta"
            type="number"
            step="0.1"
            min="1"
            max="2.5"
            value={costData.advancedFactors.factorRiesgoRuta || ''}
            onChange={(e) => updateAdvancedFactors('factorRiesgoRuta', parseFloat(e.target.value) || 0)}
            placeholder="1.0"
            className="text-right"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CostosSeguros;
