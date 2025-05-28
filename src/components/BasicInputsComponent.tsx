
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, DollarSign, Ship, Shield, TrendingUp, Percent } from 'lucide-react';
import { BasicInputs } from '@/types/costTypes';

interface BasicInputsComponentProps {
  basicInputs: BasicInputs;
  updateBasicInputs: (field: string, value: number) => void;
}

const BasicInputsComponent = ({ basicInputs, updateBasicInputs }: BasicInputsComponentProps) => {
  return (
    <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center gap-3 text-blue-800">
          <Package className="h-6 w-6" />
          Modelo Fundamental CIF = FOB + CF + S
        </CardTitle>
        <p className="text-sm text-blue-600">
          Datos básicos para el cálculo del Costo Total de Importación basado en Incoterms
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
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
            value={basicInputs.precioFOB || ''}
            onChange={(e) => updateBasicInputs('precioFOB', parseFloat(e.target.value) || 0)}
            placeholder="50,000.00"
            className="text-right"
          />
          <p className="text-xs text-gray-500">Free on Board - valor en origen</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="porcentajeFlete" className="flex items-center gap-2">
            <Ship className="h-4 w-4" />
            Flete (% FOB)
          </Label>
          <Input
            id="porcentajeFlete"
            type="number"
            step="0.1"
            min="0"
            max="50"
            value={basicInputs.porcentajeFlete || ''}
            onChange={(e) => updateBasicInputs('porcentajeFlete', parseFloat(e.target.value) || 0)}
            placeholder="8.0"
            className="text-right"
          />
          <p className="text-xs text-gray-500">CF = FOB × %flete</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="porcentajeSeguro" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguro (% CIF)
          </Label>
          <Input
            id="porcentajeSeguro"
            type="number"
            step="0.01"
            min="0"
            max="2"
            value={basicInputs.porcentajeSeguro || ''}
            onChange={(e) => updateBasicInputs('porcentajeSeguro', parseFloat(e.target.value) || 0)}
            placeholder="0.5"
            className="text-right"
          />
          <p className="text-xs text-gray-500">S = CIF × %seguro</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tipoCambioCompra" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Tipo de Cambio
          </Label>
          <Input
            id="tipoCambioCompra"
            type="number"
            step="0.01"
            min="0"
            value={basicInputs.tipoCambioCompra || ''}
            onChange={(e) => updateBasicInputs('tipoCambioCompra', parseFloat(e.target.value) || 0)}
            placeholder="4,000.00"
            className="text-right"
          />
          <p className="text-xs text-gray-500">BG = CIF × TC</p>
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
            value={basicInputs.tasaArancelaria || ''}
            onChange={(e) => updateBasicInputs('tasaArancelaria', parseFloat(e.target.value) || 0)}
            placeholder="12.00"
            className="text-right"
          />
          <p className="text-xs text-gray-500">AD = BG × ta</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tasaIVA">Tasa IVA (%)</Label>
          <Input
            id="tasaIVA"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={basicInputs.tasaIVA || ''}
            onChange={(e) => updateBasicInputs('tasaIVA', parseFloat(e.target.value) || 0)}
            placeholder="19.00"
            className="text-right"
          />
          <p className="text-xs text-gray-500">IG = (BG + AD) × ti</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="otrosImpuestos">Otros Impuestos (%)</Label>
          <Input
            id="otrosImpuestos"
            type="number"
            step="0.01"
            min="0"
            max="50"
            value={basicInputs.otrosImpuestos || ''}
            onChange={(e) => updateBasicInputs('otrosImpuestos', parseFloat(e.target.value) || 0)}
            placeholder="2.00"
            className="text-right"
          />
          <p className="text-xs text-gray-500">Impuestos específicos</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cantidadDemanda">Cantidad Demanda</Label>
          <Input
            id="cantidadDemanda"
            type="number"
            min="1"
            value={basicInputs.cantidadDemanda || ''}
            onChange={(e) => updateBasicInputs('cantidadDemanda', parseFloat(e.target.value) || 0)}
            placeholder="100"
            className="text-right"
          />
          <p className="text-xs text-gray-500">Para modelo de optimización</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInputsComponent;
