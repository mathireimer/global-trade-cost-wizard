
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, DollarSign, MapPin, Weight, Percent } from 'lucide-react';
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
          Datos Básicos de la Importación
        </CardTitle>
        <p className="text-sm text-blue-600">
          Información fundamental para el cálculo del modelo matemático avanzado
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
          <p className="text-xs text-gray-500">PFOB en la ecuación CD</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="distancia" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Distancia (km)
          </Label>
          <Input
            id="distancia"
            type="number"
            min="0"
            value={basicInputs.distancia || ''}
            onChange={(e) => updateBasicInputs('distancia', parseFloat(e.target.value) || 0)}
            placeholder="8,000"
            className="text-right"
          />
          <p className="text-xs text-gray-500">D para calcular λd</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="peso" className="flex items-center gap-2">
            <Weight className="h-4 w-4" />
            Peso (toneladas)
          </Label>
          <Input
            id="peso"
            type="number"
            step="0.1"
            min="0"
            value={basicInputs.peso || ''}
            onChange={(e) => updateBasicInputs('peso', parseFloat(e.target.value) || 0)}
            placeholder="15.0"
            className="text-right"
          />
          <p className="text-xs text-gray-500">Peso total de la carga</p>
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
          <p className="text-xs text-gray-500">τa en la ecuación CAT</p>
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
          <p className="text-xs text-gray-500">τv en la ecuación CAT</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInputsComponent;
