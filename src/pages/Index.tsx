
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, TrendingUp, Brain } from 'lucide-react';
import BasicInputsComponent from '@/components/BasicInputsComponent';
import AdvancedFactorsComponent from '@/components/AdvancedFactorsComponent';
import WeightsAndRisksComponent from '@/components/WeightsAndRisksComponent';
import AdvancedResultsComponent from '@/components/AdvancedResultsComponent';
import ElasticityAnalysis from '@/components/ElasticityAnalysis';
import { CostData } from '@/types/costTypes';

const Index = () => {
  const [costData, setCostData] = useState<CostData>({
    basicInputs: {
      precioFOB: 50000,
      distancia: 8000,
      peso: 15,
      tasaArancelaria: 12,
      tasaIVA: 19
    },
    advancedFactors: {
      tasaEmbalajeEspecial: 3,
      factorCertificaciones: 2,
      factorCalidad: 1.0,
      fleteBase: 2500,
      recargosCombustible: 15,
      factorModalidad: 1.0,
      factorEstacional: 5,
      factorPenalizacion: 0,
      tasasFijasAduaneras: 500,
      tasaSeguroBase: 0.5,
      factorRiesgoRuta: 1.2,
      coeficientePeligrosidad: 1.0,
      factorClimatico: 1.0,
      segurosAdicionales: 300,
      intermediacionAduanera: 800,
      almacenamientoPorDia: 50,
      distribucionLocal: 1200,
      tasaInteresFinanciera: 8,
      tiempoFinanciamiento: 30,
      factorEficiencia: 0.95,
      factorContingencia: 5,
      factorVolatilidad: 1.1,
      coeficienteVariabilidad: 1.05,
      factorOptimizacion: 0.95,
      factorEconomiasEscala: 0.98
    },
    componentWeights: {
      w1: 1.0,
      w2: 1.0,
      w3: 1.0,
      w4: 1.0,
      w5: 1.0,
      w6: 1.0
    },
    riskFactors: {
      r1: 2,
      r2: 5,
      r3: 3,
      r4: 4,
      r5: 3,
      r6: 8
    }
  });

  const updateBasicInputs = (field: string, value: number) => {
    setCostData(prev => ({
      ...prev,
      basicInputs: {
        ...prev.basicInputs,
        [field]: value
      }
    }));
  };

  const updateAdvancedFactors = (field: string, value: number) => {
    setCostData(prev => ({
      ...prev,
      advancedFactors: {
        ...prev.advancedFactors,
        [field]: value
      }
    }));
  };

  const updateWeights = (field: string, value: number) => {
    setCostData(prev => ({
      ...prev,
      componentWeights: {
        ...prev.componentWeights,
        [field]: value
      }
    }));
  };

  const updateRiskFactors = (field: string, value: number) => {
    setCostData(prev => ({
      ...prev,
      riskFactors: {
        ...prev.riskFactors,
        [field]: value
      }
    }));
  };

  const resetToDefaults = () => {
    setCostData({
      basicInputs: {
        precioFOB: 50000,
        distancia: 8000,
        peso: 15,
        tasaArancelaria: 12,
        tasaIVA: 19
      },
      advancedFactors: {
        tasaEmbalajeEspecial: 3,
        factorCertificaciones: 2,
        factorCalidad: 1.0,
        fleteBase: 2500,
        recargosCombustible: 15,
        factorModalidad: 1.0,
        factorEstacional: 5,
        factorPenalizacion: 0,
        tasasFijasAduaneras: 500,
        tasaSeguroBase: 0.5,
        factorRiesgoRuta: 1.2,
        coeficientePeligrosidad: 1.0,
        factorClimatico: 1.0,
        segurosAdicionales: 300,
        intermediacionAduanera: 800,
        almacenamientoPorDia: 50,
        distribucionLocal: 1200,
        tasaInteresFinanciera: 8,
        tiempoFinanciamiento: 30,
        factorEficiencia: 0.95,
        factorContingencia: 5,
        factorVolatilidad: 1.1,
        coeficienteVariabilidad: 1.05,
        factorOptimizacion: 0.95,
        factorEconomiasEscala: 0.98
      },
      componentWeights: {
        w1: 1.0,
        w2: 1.0,
        w3: 1.0,
        w4: 1.0,
        w5: 1.0,
        w6: 1.0
      },
      riskFactors: {
        r1: 2,
        r2: 5,
        r3: 3,
        r4: 4,
        r5: 3,
        r6: 8
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Modelo Matemático Avanzado CAI
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Sistema de ecuaciones interrelacionadas para la determinación óptima del Costo de Adquisición en Importaciones
          </p>
          <div className="mt-4 text-sm text-gray-500 font-mono">
            CAI = Σ(i=1 to n) [Ci × (1 + Ri) × Wi] × Fo × Fe
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inputs Básicos */}
            <BasicInputsComponent 
              basicInputs={costData.basicInputs} 
              updateBasicInputs={updateBasicInputs} 
            />
            
            {/* Factores Avanzados */}
            <AdvancedFactorsComponent 
              advancedFactors={costData.advancedFactors} 
              updateAdvancedFactors={updateAdvancedFactors} 
            />
            
            {/* Pesos y Factores de Riesgo */}
            <WeightsAndRisksComponent 
              componentWeights={costData.componentWeights}
              riskFactors={costData.riskFactors}
              updateWeights={updateWeights}
              updateRiskFactors={updateRiskFactors}
            />

            {/* Análisis de Elasticidad */}
            <ElasticityAnalysis costData={costData} />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={resetToDefaults}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Restaurar Valores por Defecto
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AdvancedResultsComponent costData={costData} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">
              Modelo con análisis de sensibilidad, optimización y gestión de riesgo integrada
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Incluye factores de economías de escala, volatilidad del mercado y análisis predictivo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
