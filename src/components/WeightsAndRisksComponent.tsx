
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, AlertTriangle } from 'lucide-react';
import { ComponentWeights, RiskFactors } from '@/types/costTypes';

interface WeightsAndRisksComponentProps {
  componentWeights: ComponentWeights;
  riskFactors: RiskFactors;
  updateWeights: (field: string, value: number) => void;
  updateRiskFactors: (field: string, value: number) => void;
}

const WeightsAndRisksComponent = ({ 
  componentWeights, 
  riskFactors, 
  updateWeights, 
  updateRiskFactors 
}: WeightsAndRisksComponentProps) => {
  return (
    <Card className="border-l-4 border-l-indigo-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-indigo-50">
        <CardTitle className="flex items-center gap-3 text-indigo-800">
          <Scale className="h-6 w-6" />
          Pesos de Componentes y Factores de Riesgo
        </CardTitle>
        <p className="text-sm text-indigo-600">
          Configuración de pesos Wi y factores de riesgo Ri para la ecuación final
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="pesos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pesos">Pesos de Componentes</TabsTrigger>
            <TabsTrigger value="riesgos">Factores de Riesgo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pesos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="w1">Peso W1 (CD)</Label>
                <Input
                  id="w1"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={componentWeights.w1 || ''}
                  onChange={(e) => updateWeights('w1', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="w2">Peso W2 (CTI)</Label>
                <Input
                  id="w2"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={componentWeights.w2 || ''}
                  onChange={(e) => updateWeights('w2', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="w3">Peso W3 (CAT)</Label>
                <Input
                  id="w3"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={componentWeights.w3 || ''}
                  onChange={(e) => updateWeights('w3', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="w4">Peso W4 (CSG)</Label>
                <Input
                  id="w4"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={componentWeights.w4 || ''}
                  onChange={(e) => updateWeights('w4', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="w5">Peso W5 (COF)</Label>
                <Input
                  id="w5"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={componentWeights.w5 || ''}
                  onChange={(e) => updateWeights('w5', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="w6">Peso W6 (CF)</Label>
                <Input
                  id="w6"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={componentWeights.w6 || ''}
                  onChange={(e) => updateWeights('w6', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="riesgos" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold">Factores de Riesgo (%) por Componente</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="r1">Riesgo R1 (CD) (%)</Label>
                <Input
                  id="r1"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={riskFactors.r1 || ''}
                  onChange={(e) => updateRiskFactors('r1', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="r2">Riesgo R2 (CTI) (%)</Label>
                <Input
                  id="r2"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={riskFactors.r2 || ''}
                  onChange={(e) => updateRiskFactors('r2', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="r3">Riesgo R3 (CAT) (%)</Label>
                <Input
                  id="r3"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={riskFactors.r3 || ''}
                  onChange={(e) => updateRiskFactors('r3', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="r4">Riesgo R4 (CSG) (%)</Label>
                <Input
                  id="r4"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={riskFactors.r4 || ''}
                  onChange={(e) => updateRiskFactors('r4', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="r5">Riesgo R5 (COF) (%)</Label>
                <Input
                  id="r5"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={riskFactors.r5 || ''}
                  onChange={(e) => updateRiskFactors('r5', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="r6">Riesgo R6 (CF) (%)</Label>
                <Input
                  id="r6"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={riskFactors.r6 || ''}
                  onChange={(e) => updateRiskFactors('r6', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeightsAndRisksComponent;
