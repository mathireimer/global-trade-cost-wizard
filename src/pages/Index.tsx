
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, TrendingUp } from 'lucide-react';
import CostosDirectos from '@/components/CostosDirectos';
import CostosTransporte from '@/components/CostosTransporte';
import CostosAduaneros from '@/components/CostosAduaneros';
import CostosSeguros from '@/components/CostosSeguros';
import CostosOperativos from '@/components/CostosOperativos';
import CostosContingencia from '@/components/CostosContingencia';
import ResultadosCalculadora from '@/components/ResultadosCalculadora';
import { CostData } from '@/types/costTypes';

const Index = () => {
  const [costData, setCostData] = useState<CostData>({
    // Costos Directos de Mercancía (CD)
    precioFOB: 0,
    embalaje: 0,
    certificaciones: 0,
    
    // Costos de Transporte Internacional (CTI)
    fleteBase: 0,
    recargosCombustible: 0,
    tarifasPortuarias: 0,
    manipulacionTerminal: 0,
    
    // Costos Aduaneros y Tributarios (CAT)
    valorCIF: 0,
    tasaArancelaria: 0,
    tasaIVA: 0,
    tasasAduanerasFijas: 0,
    
    // Costos de Seguros y Garantías (CSG)
    tasaSeguro: 0,
    segurosAdicionales: 0,
    garantiasAduaneras: 0,
    
    // Costos Operativos y Financieros (COF)
    intermediacionAduanera: 0,
    almacenamiento: 0,
    distribucionLocal: 0,
    costosFinancieros: 0,
    
    // Costos de Contingencia y Factores de Riesgo (CF)
    contingencia: 0,
    factoresRiesgo: 0
  });

  const updateCostData = (field: keyof CostData, value: number) => {
    setCostData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate valorCIF when transport costs change
      if (['precioFOB', 'fleteBase', 'recargosCombustible', 'tasasPortuarias', 'manipulacionTerminal'].includes(field)) {
        const cti = newData.fleteBase + newData.recargosCombustible + newData.tasasPortuarias + newData.manipulacionTerminal;
        newData.valorCIF = newData.precioFOB + cti;
      }
      
      return newData;
    });
  };

  const resetForm = () => {
    setCostData({
      precioFOB: 0,
      embalaje: 0,
      certificaciones: 0,
      fleteBase: 0,
      recargosCombustible: 0,
      tarifasPortuarias: 0,
      manipulacionTerminal: 0,
      valorCIF: 0,
      tasaArancelaria: 0,
      tasaIVA: 0,
      tasasAduanerasFijas: 0,
      tasaSeguro: 0,
      segurosAdicionales: 0,
      garantiasAduaneras: 0,
      intermediacionAduanera: 0,
      almacenamiento: 0,
      distribucionLocal: 0,
      costosFinancieros: 0,
      contingencia: 0,
      factoresRiesgo: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Calculadora de Costos de Importación
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Herramienta profesional para calcular el Costo de Adquisición en Importación (CAI) 
            mediante metodología integral de componentes interrelacionados
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Costos Directos */}
            <CostosDirectos costData={costData} updateCostData={updateCostData} />
            
            {/* Costos de Transporte */}
            <CostosTransporte costData={costData} updateCostData={updateCostData} />
            
            {/* Costos Aduaneros */}
            <CostosAduaneros costData={costData} updateCostData={updateCostData} />
            
            {/* Costos de Seguros */}
            <CostosSeguros costData={costData} updateCostData={updateCostData} />
            
            {/* Costos Operativos */}
            <CostosOperativos costData={costData} updateCostData={updateCostData} />
            
            {/* Costos de Contingencia */}
            <CostosContingencia costData={costData} updateCostData={updateCostData} />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={resetForm}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Limpiar Formulario
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ResultadosCalculadora costData={costData} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">
              Modelo metodológico integral CAI = CD + CTI + CAT + CSG + COF + CF
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Basado en análisis de correlaciones y interrelaciones entre componentes de costo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
