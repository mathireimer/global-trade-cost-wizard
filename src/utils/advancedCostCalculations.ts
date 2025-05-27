
import { CostData, AdvancedCalculations } from '@/types/costTypes';

// Constantes del modelo
const DISTANCE_REFERENCE = 5000; // Dref en km
const DISTANCE_EXPONENT = 0.3;

export const calculateAdvancedCosts = (data: CostData): AdvancedCalculations => {
  const { basicInputs, advancedFactors, componentWeights, riskFactors } = data;
  
  // C1 - Costos Directos de Mercancía
  // CD = PFOB × (1 + τe) × (1 + δ) × γq
  const CD = basicInputs.precioFOB * 
    (1 + advancedFactors.tasaEmbalajeEspecial / 100) * 
    (1 + advancedFactors.factorCertificaciones / 100) * 
    advancedFactors.factorCalidad;

  // C2 - Costos de Transporte Internacional
  // λd = 1 + (D/Dref)^0.3
  const lambdaD = 1 + Math.pow(basicInputs.distancia / DISTANCE_REFERENCE, DISTANCE_EXPONENT);
  
  // CTI = [FB × (1 + βc) × λd × ψm] × (1 + μs)
  const CTI = advancedFactors.fleteBase * 
    (1 + advancedFactors.recargosCombustible / 100) * 
    lambdaD * 
    advancedFactors.factorModalidad * 
    (1 + advancedFactors.factorEstacional / 100);

  // Cálculo del seguro básico para VCIF
  const seguroBasico = (basicInputs.precioFOB + CTI) * 
    (advancedFactors.tasaSeguroBase / 100) * 
    advancedFactors.factorRiesgoRuta * 
    advancedFactors.coeficientePeligrosidad * 
    advancedFactors.factorClimatico;

  // VCIF = PFOB + CTI + Seguros
  const VCIF = basicInputs.precioFOB + CTI + seguroBasico;

  // C3 - Costos Aduaneros y Tributarios
  // CAT = VCIF × [τa × (1 + ηp)] + [(VCIF + Aranceles) × τv] + ΣTf
  const aranceles = VCIF * (basicInputs.tasaArancelaria / 100) * 
    (1 + advancedFactors.factorPenalizacion / 100);
  const iva = (VCIF + aranceles) * (basicInputs.tasaIVA / 100);
  const CAT = aranceles + iva + advancedFactors.tasasFijasAduaneras;

  // C4 - Costos de Seguros y Garantías
  // CSG = VCIF × σ × (1 + α × κ) × Θ + Σsg
  const CSG = VCIF * 
    (advancedFactors.tasaSeguroBase / 100) * 
    (1 + advancedFactors.factorRiesgoRuta * advancedFactors.coeficientePeligrosidad) * 
    advancedFactors.factorClimatico + 
    advancedFactors.segurosAdicionales;

  // C5 - Costos Operativos y Financieros
  // COF = [Cia + Ca × t + Cd] × (1 + if × tp) × νe
  const costosOperativosBase = advancedFactors.intermediacionAduanera + 
    (advancedFactors.almacenamientoPorDia * advancedFactors.tiempoFinanciamiento) + 
    advancedFactors.distribucionLocal;
  
  const COF = costosOperativosBase * 
    (1 + (advancedFactors.tasaInteresFinanciera / 100) * (advancedFactors.tiempoFinanciamiento / 365)) * 
    advancedFactors.factorEficiencia;

  // C6 - Costos de Contingencia
  // CF = (Σ C1-C5) × φ × ρ × ωv
  const sumaCostos = CD + CTI + CAT + CSG + COF;
  const CF = sumaCostos * 
    (advancedFactors.factorContingencia / 100) * 
    advancedFactors.factorVolatilidad * 
    advancedFactors.coeficienteVariabilidad;

  // Aplicación de pesos y factores de riesgo
  const costosConPesos = [
    CD * (1 + riskFactors.r1 / 100) * componentWeights.w1,
    CTI * (1 + riskFactors.r2 / 100) * componentWeights.w2,
    CAT * (1 + riskFactors.r3 / 100) * componentWeights.w3,
    CSG * (1 + riskFactors.r4 / 100) * componentWeights.w4,
    COF * (1 + riskFactors.r5 / 100) * componentWeights.w5,
    CF * (1 + riskFactors.r6 / 100) * componentWeights.w6
  ];

  // CAI con factores de optimización
  // CAI = Σ(i=1 to n) [Ci × (1 + Ri) × Wi] × Fo × Fe
  const sumaCostosConPesos = costosConPesos.reduce((sum, cost) => sum + cost, 0);
  const CAI = sumaCostosConPesos * 
    advancedFactors.factorOptimizacion * 
    advancedFactors.factorEconomiasEscala;

  // CAI sin optimización para calcular ahorros
  const CAISinOptimizacion = sumaCostosConPesos;
  const optimizationSavings = ((CAISinOptimizacion - CAI) / CAISinOptimizacion) * 100;

  // CAI ajustado por riesgo (para análisis)
  const factorRiesgoPromedio = (riskFactors.r1 + riskFactors.r2 + riskFactors.r3 + 
    riskFactors.r4 + riskFactors.r5 + riskFactors.r6) / 6;
  const riskAdjustedCAI = CAI * (1 + factorRiesgoPromedio / 100);

  return {
    CD,
    CTI,
    CAT,
    CSG,
    COF,
    CF,
    VCIF,
    CAI,
    optimizationSavings,
    riskAdjustedCAI
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Función para calcular elasticidades
export const calculateElasticities = (data: CostData): number[][] => {
  const baseCalculation = calculateAdvancedCosts(data);
  const elasticityMatrix: number[][] = [];
  
  // Perturbación del 1% para calcular elasticidades
  const perturbation = 0.01;
  
  const variables = [
    'precioFOB', 'tasaArancelaria', 'tasaIVA', 'fleteBase', 'factorOptimizacion'
  ];
  
  variables.forEach((variable, i) => {
    elasticityMatrix[i] = [];
    
    // Crear datos perturbados
    const perturbedData = JSON.parse(JSON.stringify(data));
    
    if (variable === 'precioFOB') {
      perturbedData.basicInputs.precioFOB *= (1 + perturbation);
    } else if (variable === 'tasaArancelaria') {
      perturbedData.basicInputs.tasaArancelaria *= (1 + perturbation);
    } else if (variable === 'tasaIVA') {
      perturbedData.basicInputs.tasaIVA *= (1 + perturbation);
    } else if (variable === 'fleteBase') {
      perturbedData.advancedFactors.fleteBase *= (1 + perturbation);
    } else if (variable === 'factorOptimizacion') {
      perturbedData.advancedFactors.factorOptimizacion *= (1 + perturbation);
    }
    
    const perturbedCalculation = calculateAdvancedCosts(perturbedData);
    
    // Calcular elasticidades para cada componente
    const components = ['CD', 'CTI', 'CAT', 'CSG', 'COF'];
    components.forEach((component, j) => {
      const baseValue = baseCalculation[component as keyof AdvancedCalculations] as number;
      const perturbedValue = perturbedCalculation[component as keyof AdvancedCalculations] as number;
      
      const elasticity = ((perturbedValue - baseValue) / baseValue) / perturbation;
      elasticityMatrix[i][j] = elasticity;
    });
  });
  
  return elasticityMatrix;
};
