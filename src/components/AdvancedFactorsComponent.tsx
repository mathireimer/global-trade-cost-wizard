
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Truck, FileText, Shield, Building, AlertTriangle } from 'lucide-react';
import { AdvancedFactors } from '@/types/costTypes';

interface AdvancedFactorsComponentProps {
  advancedFactors: AdvancedFactors;
  updateAdvancedFactors: (field: string, value: number) => void;
}

const AdvancedFactorsComponent = ({ advancedFactors, updateAdvancedFactors }: AdvancedFactorsComponentProps) => {
  return (
    <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-purple-50">
        <CardTitle className="flex items-center gap-3 text-purple-800">
          <Settings className="h-6 w-6" />
          Factores Avanzados del Modelo Matemático
        </CardTitle>
        <p className="text-sm text-purple-600">
          Parámetros específicos para cada ecuación del modelo integrado
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="directos" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="directos">CD</TabsTrigger>
            <TabsTrigger value="transporte">CTI</TabsTrigger>
            <TabsTrigger value="aduaneros">CAT</TabsTrigger>
            <TabsTrigger value="seguros">CSG</TabsTrigger>
            <TabsTrigger value="operativos">COF</TabsTrigger>
            <TabsTrigger value="optimizacion">Opt</TabsTrigger>
          </TabsList>
          
          <TabsContent value="directos" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Factores para CD = PFOB × (1 + τe) × (1 + δ) × γq</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tasaEmbalajeEspecial">Tasa Embalaje Especial τe (%)</Label>
                <Input
                  id="tasaEmbalajeEspecial"
                  type="number"
                  step="0.01"
                  min="0"
                  max="8"
                  value={advancedFactors.tasaEmbalajeEspecial || ''}
                  onChange={(e) => updateAdvancedFactors('tasaEmbalajeEspecial', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Rango: 0.02 - 0.08 (2% - 8%)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorCertificaciones">Factor Certificaciones δ (%)</Label>
                <Input
                  id="factorCertificaciones"
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  value={advancedFactors.factorCertificaciones || ''}
                  onChange={(e) => updateAdvancedFactors('factorCertificaciones', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Rango: 0.01 - 0.05 (1% - 5%)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorCalidad">Factor Calidad γq</Label>
                <Input
                  id="factorCalidad"
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="2"
                  value={advancedFactors.factorCalidad || ''}
                  onChange={(e) => updateAdvancedFactors('factorCalidad', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Factor de calidad y especificaciones</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transporte" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Factores para CTI = [FB × (1 + βc) × λd × ψm] × (1 + μs)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fleteBase">Flete Base FB (USD)</Label>
                <Input
                  id="fleteBase"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.fleteBase || ''}
                  onChange={(e) => updateAdvancedFactors('fleteBase', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recargosCombustible">Recargo Combustible βc (%)</Label>
                <Input
                  id="recargosCombustible"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.recargosCombustible || ''}
                  onChange={(e) => updateAdvancedFactors('recargosCombustible', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Variable mensual</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorModalidad">Factor Modalidad ψm</Label>
                <Input
                  id="factorModalidad"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={advancedFactors.factorModalidad || ''}
                  onChange={(e) => updateAdvancedFactors('factorModalidad', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Marítimo: 1.0, Aéreo: 3.2-4.8</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorEstacional">Factor Estacional μs (%)</Label>
                <Input
                  id="factorEstacional"
                  type="number"
                  step="0.01"
                  min="-5"
                  max="25"
                  value={advancedFactors.factorEstacional || ''}
                  onChange={(e) => updateAdvancedFactors('factorEstacional', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Rango: -5% a +25%</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="aduaneros" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">Factores para CAT</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="factorPenalizacion">Factor Penalización ηp (%)</Label>
                <Input
                  id="factorPenalizacion"
                  type="number"
                  step="0.01"
                  min="0"
                  max="50"
                  value={advancedFactors.factorPenalizacion || ''}
                  onChange={(e) => updateAdvancedFactors('factorPenalizacion', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Por clasificación incorrecta</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tasasFijasAduaneras">Tasas Fijas Aduaneras ΣTf (USD)</Label>
                <Input
                  id="tasasFijasAduaneras"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.tasasFijasAduaneras || ''}
                  onChange={(e) => updateAdvancedFactors('tasasFijasAduaneras', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seguros" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold">Factores para CSG = VCIF × σ × (1 + α × κ) × Θ + Σsg</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tasaSeguroBase">Tasa Seguro Base σ (%)</Label>
                <Input
                  id="tasaSeguroBase"
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="0.5"
                  value={advancedFactors.tasaSeguroBase || ''}
                  onChange={(e) => updateAdvancedFactors('tasaSeguroBase', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">0.1% - 0.5% del CIF</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorRiesgoRuta">Factor Riesgo Ruta α</Label>
                <Input
                  id="factorRiesgoRuta"
                  type="number"
                  step="0.1"
                  min="1"
                  max="2.5"
                  value={advancedFactors.factorRiesgoRuta || ''}
                  onChange={(e) => updateAdvancedFactors('factorRiesgoRuta', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">1.0 - 2.5</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coeficientePeligrosidad">Coef. Peligrosidad κ</Label>
                <Input
                  id="coeficientePeligrosidad"
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="3"
                  value={advancedFactors.coeficientePeligrosidad || ''}
                  onChange={(e) => updateAdvancedFactors('coeficientePeligrosidad', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorClimatico">Factor Climático Θ</Label>
                <Input
                  id="factorClimatico"
                  type="number"
                  step="0.01"
                  min="0.8"
                  max="1.3"
                  value={advancedFactors.factorClimatico || ''}
                  onChange={(e) => updateAdvancedFactors('factorClimatico', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="segurosAdicionales">Seguros Adicionales Σsg (USD)</Label>
                <Input
                  id="segurosAdicionales"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.segurosAdicionales || ''}
                  onChange={(e) => updateAdvancedFactors('segurosAdicionales', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="operativos" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold">Factores para COF = [Cia + Ca × t + Cd] × (1 + if × tp) × νe</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="intermediacionAduanera">Intermediación Cia (USD)</Label>
                <Input
                  id="intermediacionAduanera"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.intermediacionAduanera || ''}
                  onChange={(e) => updateAdvancedFactors('intermediacionAduanera', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="almacenamientoPorDia">Almacenamiento/día Ca (USD)</Label>
                <Input
                  id="almacenamientoPorDia"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.almacenamientoPorDia || ''}
                  onChange={(e) => updateAdvancedFactors('almacenamientoPorDia', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="distribucionLocal">Distribución Local Cd (USD)</Label>
                <Input
                  id="distribucionLocal"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.distribucionLocal || ''}
                  onChange={(e) => updateAdvancedFactors('distribucionLocal', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tasaInteresFinanciera">Tasa Interés if (%)</Label>
                <Input
                  id="tasaInteresFinanciera"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advancedFactors.tasaInteresFinanciera || ''}
                  onChange={(e) => updateAdvancedFactors('tasaInteresFinanciera', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tiempoFinanciamiento">Tiempo Financ. tp (días)</Label>
                <Input
                  id="tiempoFinanciamiento"
                  type="number"
                  min="0"
                  value={advancedFactors.tiempoFinanciamiento || ''}
                  onChange={(e) => updateAdvancedFactors('tiempoFinanciamiento', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorEficiencia">Factor Eficiencia νe</Label>
                <Input
                  id="factorEficiencia"
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="1.2"
                  value={advancedFactors.factorEficiencia || ''}
                  onChange={(e) => updateAdvancedFactors('factorEficiencia', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="optimizacion" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold">Factores de Contingencia y Optimización Global</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="factorContingencia">Factor Contingencia φ (%)</Label>
                <Input
                  id="factorContingencia"
                  type="number"
                  step="0.01"
                  min="3"
                  max="12"
                  value={advancedFactors.factorContingencia || ''}
                  onChange={(e) => updateAdvancedFactors('factorContingencia', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">Rango: 3% - 12%</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorVolatilidad">Factor Volatilidad ρ</Label>
                <Input
                  id="factorVolatilidad"
                  type="number"
                  step="0.01"
                  min="0.8"
                  max="1.5"
                  value={advancedFactors.factorVolatilidad || ''}
                  onChange={(e) => updateAdvancedFactors('factorVolatilidad', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coeficienteVariabilidad">Coef. Variabilidad ωv</Label>
                <Input
                  id="coeficienteVariabilidad"
                  type="number"
                  step="0.01"
                  min="0.9"
                  max="1.3"
                  value={advancedFactors.coeficienteVariabilidad || ''}
                  onChange={(e) => updateAdvancedFactors('coeficienteVariabilidad', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorOptimizacion">Factor Optimización Fo</Label>
                <Input
                  id="factorOptimizacion"
                  type="number"
                  step="0.01"
                  min="0.85"
                  max="1.15"
                  value={advancedFactors.factorOptimizacion || ''}
                  onChange={(e) => updateAdvancedFactors('factorOptimizacion', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
                <p className="text-xs text-gray-500">0.85 ≤ Fo ≤ 1.15</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="factorEconomiasEscala">Factor Economías Fe</Label>
                <Input
                  id="factorEconomiasEscala"
                  type="number"
                  step="0.01"
                  min="0.8"
                  max="1.1"
                  value={advancedFactors.factorEconomiasEscala || ''}
                  onChange={(e) => updateAdvancedFactors('factorEconomiasEscala', parseFloat(e.target.value) || 0)}
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

export default AdvancedFactorsComponent;
