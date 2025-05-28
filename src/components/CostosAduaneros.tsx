
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Percent, Receipt } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateAdvancedCosts } from '@/utils/advancedCostCalculations';

interface CostosAduanerosProps {
  costData: CostData;
  updateBasicInputs: (field: string, value: number) => void;
  updateAdvancedFactors: (field: string, value: number) => void;
}

const CostosAduaneros = ({ costData, updateBasicInputs, updateAdvancedFactors }: CostosAduanerosProps) => {
  const calculations = calculateAdvancedCosts(costData);
  
  return (
    <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-purple-50">
        <CardTitle className="flex items-center gap-3 text-purple-800">
          <FileText className="h-6 w-6" />
          Costos Aduaneros y Tributarios (CAT)
        </CardTitle>
        <p className="text-sm text-purple-600">
          CAT = VCIF × [τa × (1 + ηp)] + [(VCIF + Aranceles) × τv] + ΣTf
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="valorCIF" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Valor CIF (USD)
          </Label>
          <Input
            id="valorCIF"
            type="number"
            step="0.01"
            min="0"
            value={calculations.CIF.toFixed(2)}
            className="text-right bg-gray-50"
            title="Se calcula automáticamente: FOB + Costos de Transporte + Seguros"
            readOnly
          />
          <p className="text-xs text-gray-500">Se calcula automáticamente</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tasaArancelaria" className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Tasa Arancelaria (%)
          </Label>
          <Input
            id="tasaArancelaria"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={costData.basicInputs.tasaArancelaria || ''}
            onChange={(e) => updateBasicInputs('tasaArancelaria', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tasaIVA">Tasa IVA (%)</Label>
          <Input
            id="tasaIVA"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={costData.basicInputs.tasaIVA || ''}
            onChange={(e) => updateBasicInputs('tasaIVA', parseFloat(e.target.value) || 0)}
            placeholder="19.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tasasAduanerasFijas">Tasas Aduaneras Fijas (USD)</Label>
          <Input
            id="tasasAduanerasFijas"
            type="number"
            step="0.01"
            min="0"
            value={costData.advancedFactors.tasasFijasAduaneras || ''}
            onChange={(e) => updateAdvancedFactors('tasasFijasAduaneras', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CostosAduaneros;
