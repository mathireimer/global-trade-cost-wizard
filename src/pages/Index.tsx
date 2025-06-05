
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calculator, FileText, TrendingUp, Brain } from 'lucide-react';
import BasicInputsComponent from '@/components/BasicInputsComponent';
import AdvancedResultsComponent from '@/components/AdvancedResultsComponent';
import InterrelationAnalysis from '@/components/InterrelationAnalysis';
import { CostData } from '@/types/costTypes';

const Index = () => {
  const [costData, setCostData] = useState<CostData>({
    basicInputs: {
      precioFOB: 10000, // Valor de la tabla
      porcentajeFlete: 8, // 8% según tabla
      porcentajeSeguro: 0.5, // 0.5% según tabla
      tipoCambioCompra: 8000,
      tasaArancelaria: 12, // 12% según tabla
      tasaIVA: 10, // 10% según tabla (cambiado de 19%)
      otrosImpuestos: 2, // 2% según tabla
      cantidadDemanda: 1 // Cambiado a 1 unidad como en la tabla
    },
    costosAdicionales: {
      agenciamientoAduanero: 200, // Gastos Aduaneros según tabla
      almacenajePortuario: 0,
      manipulacionCarga: 0,
      documentacionAduanera: 0,
      transporteInterno: 100, // Costos Operativos según tabla
      segurosLocales: 0,
      gastosFinancieros: 0,
      otrosGastos: 0
    },
    modeloOptimizacion: {
      costoFijoFlete: 2000,
      costoVariableUnidad: 50,
      parametroEconomias: 0.8,
      tasaDescuento: 8,
      tiempoOperacion: 0.25
    },
    parametrosEstocasticos: {
      mu_CIF: 10854, // CIF según tabla
      mu_ta: 12,
      mu_ti: 10, // Actualizado para coincidir con IVA
      mu_TC: 8000,
      mu_GA: 200, // Gastos Aduaneros según tabla
      mu_CO: 100, // Costos Operativos según tabla
      sigma2_CIF: 100000, // Reducido proporcionalmente
      sigma2_TC: 10000,
      sigma2_GA: 1000, // Reducido proporcionalmente
      cov_CIF_TC: 1500 // Reducido proporcionalmente
    },
    advancedFactors: {
      // Costos de Transporte
      fleteBase: 800, // Flete según tabla
      recargosCombustible: 0,
      factorModalidad: 1.0,
      factorEstacional: 0,
      
      // Costos de Seguros
      tasaSeguroBase: 0.5,
      segurosAdicionales: 0,
      factorRiesgoRuta: 1.0,
      coeficientePeligrosidad: 1.0,
      factorClimatico: 1.0,
      
      // Costos Aduaneros
      tasasFijasAduaneras: 0,
      factorPenalizacion: 0,
      
      // Costos Operativos
      intermediacionAduanera: 200, // Gastos Aduaneros según tabla
      almacenamientoPorDia: 0,
      distribucionLocal: 100, // Costos Operativos según tabla
      tasaInteresFinanciera: 12,
      tiempoFinanciamiento: 30,
      factorEficiencia: 1.0,
      
      // Factores Directos
      tasaEmbalajeEspecial: 0,
      factorCertificaciones: 0,
      factorCalidad: 1.0,
      
      // Factores de Optimización
      factorContingencia: 5,
      factorVolatilidad: 1.0,
      coeficienteVariabilidad: 1.0,
      factorOptimizacion: 1.0,
      factorEconomiasEscala: 1.0
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

  const updateCostosAdicionales = (field: string, value: number) => {
    setCostData(prev => ({
      ...prev,
      costosAdicionales: {
        ...prev.costosAdicionales,
        [field]: value
      }
    }));
  };

  const updateModeloOptimizacion = (field: string, value: number) => {
    setCostData(prev => ({
      ...prev,
      modeloOptimizacion: {
        ...prev.modeloOptimizacion,
        [field]: value
      }
    }));
  };

  const updateParametrosEstocasticos = (field: string, value: number) => {
    setCostData(prev => ({
      ...prev,
      parametrosEstocasticos: {
        ...prev.parametrosEstocasticos,
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

  const resetToDefaults = () => {
    setCostData({
      basicInputs: {
        precioFOB: 10000, // Valor de la tabla
        porcentajeFlete: 8, // 8% según tabla
        porcentajeSeguro: 0.5, // 0.5% según tabla
        tipoCambioCompra: 8000,
        tasaArancelaria: 12, // 12% según tabla
        tasaIVA: 10, // 10% según tabla
        otrosImpuestos: 2, // 2% según tabla
        cantidadDemanda: 1 // 1 unidad como en la tabla
      },
      costosAdicionales: {
        agenciamientoAduanero: 200, // Gastos Aduaneros según tabla
        almacenajePortuario: 0,
        manipulacionCarga: 0,
        documentacionAduanera: 0,
        transporteInterno: 100, // Costos Operativos según tabla
        segurosLocales: 0,
        gastosFinancieros: 0,
        otrosGastos: 0
      },
      modeloOptimizacion: {
        costoFijoFlete: 2000,
        costoVariableUnidad: 50,
        parametroEconomias: 0.8,
        tasaDescuento: 8,
        tiempoOperacion: 0.25
      },
      parametrosEstocasticos: {
        mu_CIF: 10854, // CIF según tabla
        mu_ta: 12,
        mu_ti: 10, // Actualizado para coincidir con IVA
        mu_TC: 8000,
        mu_GA: 200, // Gastos Aduaneros según tabla
        mu_CO: 100, // Costos Operativos según tabla
        sigma2_CIF: 100000,
        sigma2_TC: 10000,
        sigma2_GA: 1000,
        cov_CIF_TC: 1500
      },
      advancedFactors: {
        // Costos de Transporte
        fleteBase: 800, // Flete según tabla
        recargosCombustible: 0,
        factorModalidad: 1.0,
        factorEstacional: 0,
        
        // Costos de Seguros
        tasaSeguroBase: 0.5,
        segurosAdicionales: 0,
        factorRiesgoRuta: 1.0,
        coeficientePeligrosidad: 1.0,
        factorClimatico: 1.0,
        
        // Costos Aduaneros
        tasasFijasAduaneras: 0,
        factorPenalizacion: 0,
        
        // Costos Operativos
        intermediacionAduanera: 200, // Gastos Aduaneros según tabla
        almacenamientoPorDia: 0,
        distribucionLocal: 100, // Costos Operativos según tabla
        tasaInteresFinanciera: 12,
        tiempoFinanciamiento: 30,
        factorEficiencia: 1.0,
        
        // Factores Directos
        tasaEmbalajeEspecial: 0,
        factorCertificaciones: 0,
        factorCalidad: 1.0,
        
        // Factores de Optimización
        factorContingencia: 5,
        factorVolatilidad: 1.0,
        coeficienteVariabilidad: 1.0,
        factorOptimizacion: 1.0,
        factorEconomiasEscala: 1.0
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
              Modelo Matemático de Importaciones
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Sistema basado en Incoterms para determinación del Costo Total de Importación (CTI)
          </p>
          <div className="mt-4 text-sm text-gray-500 font-mono">
            CTI = CIF × (1 + ta) × (1 + ti) + GA + CO
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form with Collapsible Sections */}
          <div className="lg:col-span-2 space-y-6">
            <Accordion type="multiple" defaultValue={["inputs", "analysis"]} className="space-y-4">
              {/* Inputs Básicos */}
              <AccordionItem value="inputs" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-lg font-semibold text-blue-800">
                    <Calculator className="h-5 w-5" />
                    Inputs Básicos del Modelo
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <BasicInputsComponent 
                    basicInputs={costData.basicInputs} 
                    updateBasicInputs={updateBasicInputs} 
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Análisis de Interrelaciones */}
              <AccordionItem value="analysis" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-lg font-semibold text-purple-800">
                    <TrendingUp className="h-5 w-5" />
                    Análisis de Interrelaciones
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <InterrelationAnalysis costData={costData} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
              Modelo basado en teoría del comercio internacional y metodología OMC
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Incluye análisis estocástico, optimización y gestión de riesgo cambiario
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
