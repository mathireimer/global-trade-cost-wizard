import { CostData, ResultadosCalculo } from '@/types/costTypes';

export const calculateAdvancedCosts = (data: CostData): ResultadosCalculo => {
  const { basicInputs, costosAdicionales, modeloOptimizacion, parametrosEstocasticos } = data;
  
  // 1. Cálculo del modelo fundamental CIF = FOB + CF + S
  const FOB = basicInputs.precioFOB;
  
  // CF = FOB × %flete
  const costoFlete = FOB * (basicInputs.porcentajeFlete / 100);
  
  // Para calcular el seguro necesitamos el CIF, así que usamos iteración
  // CIF = FOB + CF + S, donde S = CIF × %seguro
  // CIF = FOB + CF + (CIF × %seguro)
  // CIF × (1 - %seguro) = FOB + CF
  // CIF = (FOB + CF) / (1 - %seguro)
  const CIF = (FOB + costoFlete) / (1 - basicInputs.porcentajeSeguro / 100);
  const costoSeguro = CIF - FOB - costoFlete;
  
  // 2. Base gravable: BG = CIF × TC_compra
  const baseGravable = CIF * basicInputs.tipoCambioCompra;
  
  // 3. Cálculo de aranceles: AD = CIF × ta
  const aranceles = baseGravable * (basicInputs.tasaArancelaria / 100);
  
  // 4. Cálculo de impuestos generales: IG = (CIF + AD) × ti
  const impuestosGenerales = (baseGravable + aranceles) * (basicInputs.tasaIVA / 100);
  
  // 5. Otros impuestos
  const otrosImpuestosTotal = (baseGravable + aranceles) * (basicInputs.otrosImpuestos / 100);
  
  // 6. Total de gravámenes: GT = AD + IG + otros
  const gravamenesTotal = aranceles + impuestosGenerales + otrosImpuestosTotal;
  
  // 7. Gastos Aduaneros (GA)
  const gastosAduaneros = costosAdicionales.agenciamientoAduanero + 
                         costosAdicionales.almacenajePortuario + 
                         costosAdicionales.manipulacionCarga + 
                         costosAdicionales.documentacionAduanera;
  
  // 8. Costos Operacionales (CO)
  const costosOperacionales = costosAdicionales.transporteInterno + 
                             costosAdicionales.segurosLocales + 
                             costosAdicionales.gastosFinancieros + 
                             costosAdicionales.otrosGastos;
  
  // 9. Costo Total de Importación: CTI = BG + GT + GA + CO
  const costoTotalImportacion = baseGravable + gravamenesTotal + gastosAduaneros + costosOperacionales;
  
  // 10. Modelo con factor tiempo: CTI(t) = CTI × (1 + r)^t
  const CTI_conTiempo = costoTotalImportacion * Math.pow(1 + modeloOptimizacion.tasaDescuento / 100, modeloOptimizacion.tiempoOperacion);
  
  // 11. Modelo estocástico
  // E[CTI] = μ_CIF × (1 + μ_ta) × (1 + μ_ti) × μ_TC + μ_GA + μ_CO
  const CTI_esperado = parametrosEstocasticos.mu_CIF * 
                      (1 + parametrosEstocasticos.mu_ta / 100) * 
                      (1 + parametrosEstocasticos.mu_ti / 100) * 
                      parametrosEstocasticos.mu_TC + 
                      parametrosEstocasticos.mu_GA + 
                      parametrosEstocasticos.mu_CO;
  
  // Var[CTI] = σ²_CIF + σ²_TC + σ²_GA + 2×Cov(CIF,TC)
  const varianza_CTI = parametrosEstocasticos.sigma2_CIF + 
                      parametrosEstocasticos.sigma2_TC + 
                      parametrosEstocasticos.sigma2_GA + 
                      2 * parametrosEstocasticos.cov_CIF_TC;
  
  const desviacionEstandar_CTI = Math.sqrt(varianza_CTI);
  
  // Coeficiente de Variación = σ_CTI / μ_CTI
  const coeficienteVariacion = CTI_esperado > 0 ? (desviacionEstandar_CTI / CTI_esperado) * 100 : 0;
  
  // Índice de precisión (simulado - en implementación real se compararía con datos históricos)
  const indicePrecision = Math.max(0, 100 - Math.abs(coeficienteVariacion));
  
  return {
    FOB,
    costoFlete,
    costoSeguro,
    CIF,
    baseGravable,
    aranceles,
    impuestosGenerales,
    otrosImpuestosTotal,
    gravamenesTotal,
    gastosAduaneros,
    costosOperacionales,
    costoTotalImportacion,
    CTI_esperado,
    varianza_CTI,
    desviacionEstandar_CTI,
    coeficienteVariacion,
    CTI_conTiempo,
    indicePrecision
  };
};

export const calculateElasticities = (data: CostData): number[][] => {
  // Matriz de elasticidades simplificada para demostración
  // Variables: [FOB, Arancel, IVA, Flete, Optimización]
  // Componentes: [CD, CTI, CAT, CSG, COF]
  const baseValues = calculateAdvancedCosts(data);
  const elasticities: number[][] = [];
  
  const variables = [
    'precioFOB',
    'tasaArancelaria', 
    'tasaIVA',
    'porcentajeFlete',
    'costoFijoFlete'
  ];
  
  variables.forEach((variable, i) => {
    elasticities[i] = [];
    
    // Simular elasticidades basadas en el tipo de variable
    switch (variable) {
      case 'precioFOB':
        elasticities[i] = [1.0, 0.8, 0.9, 0.2, 0.1]; // Alta elasticidad en costos directos
        break;
      case 'tasaArancelaria':
        elasticities[i] = [0.0, 0.1, 1.2, 0.0, 0.0]; // Alta elasticidad en CAT
        break;
      case 'tasaIVA':
        elasticities[i] = [0.0, 0.1, 1.1, 0.0, 0.0]; // Alta elasticidad en CAT
        break;
      case 'porcentajeFlete':
        elasticities[i] = [0.0, 1.0, 0.3, 0.1, 0.0]; // Alta elasticidad en CTI
        break;
      case 'costoFijoFlete':
        elasticities[i] = [0.0, 0.8, 0.1, 0.0, 1.2]; // Alta elasticidad en COF
        break;
      default:
        elasticities[i] = [0.0, 0.0, 0.0, 0.0, 0.0];
    }
  });
  
  return elasticities;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('PYG', 'Gs.');
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Función para calcular economías de escala
export const calcularEconomiasEscala = (cantidad: number, parametros: { alfa: number, beta: number, gamma: number }): number => {
  // CF_j = α_j + β_j × Q_j^γ_j
  return parametros.alfa + parametros.beta * Math.pow(cantidad, parametros.gamma);
};

// Función para optimización de costos (modelo simplificado)
export const optimizarCostos = (data: CostData, opciones: number[]): { cantidadOptima: number, costoMinimo: number } => {
  let costoMinimo = Infinity;
  let cantidadOptima = 0;
  
  opciones.forEach(cantidad => {
    if (cantidad >= data.basicInputs.cantidadDemanda) {
      const costoEscala = calcularEconomiasEscala(cantidad, {
        alfa: data.modeloOptimizacion.costoFijoFlete,
        beta: data.modeloOptimizacion.costoVariableUnidad,
        gamma: data.modeloOptimizacion.parametroEconomias
      });
      
      const costoTotal = costoEscala * cantidad;
      
      if (costoTotal < costoMinimo) {
        costoMinimo = costoTotal;
        cantidadOptima = cantidad;
      }
    }
  });
  
  return { cantidadOptima, costoMinimo };
};

// Nueva función para calcular correlaciones entre componentes
export const calculateComponentCorrelations = (data: CostData): number[][] => {
  const calculations = calculateAdvancedCosts(data);
  
  // Valores de los componentes principales
  const components = [
    calculations.FOB,
    calculations.costoFlete,
    calculations.costoSeguro,
    calculations.aranceles,
    calculations.impuestosGenerales,
    calculations.gastosAduaneros,
    calculations.costosOperacionales
  ];
  
  const n = components.length;
  const correlationMatrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
  
  // Simular correlaciones basadas en la lógica del modelo
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        correlationMatrix[i][j] = 1.0; // Correlación perfecta consigo mismo
      } else {
        // Calcular correlaciones basadas en las relaciones del modelo
        correlationMatrix[i][j] = calculatePairwiseCorrelation(i, j, data);
      }
    }
  }
  
  return correlationMatrix;
};

const calculatePairwiseCorrelation = (i: number, j: number, data: CostData): number => {
  // Definir correlaciones basadas en el modelo matemático
  const componentNames = ['FOB', 'Flete', 'Seguro', 'Aranceles', 'IVA', 'GA', 'CO'];
  
  // Correlaciones altas entre componentes relacionados
  const highCorrelations = [
    [0, 1], [0, 2], // FOB con Flete y Seguro
    [1, 2], // Flete con Seguro
    [3, 4], // Aranceles con IVA
  ];
  
  // Correlaciones moderadas
  const moderateCorrelations = [
    [0, 3], [0, 4], // FOB con impuestos
    [1, 5], [2, 5], // Transporte/Seguro con GA
    [5, 6], // GA con CO
  ];
  
  // Verificar correlaciones altas
  for (const [a, b] of highCorrelations) {
    if ((i === a && j === b) || (i === b && j === a)) {
      return 0.75 + Math.random() * 0.2; // 0.75-0.95
    }
  }
  
  // Verificar correlaciones moderadas
  for (const [a, b] of moderateCorrelations) {
    if ((i === a && j === b) || (i === b && j === a)) {
      return 0.45 + Math.random() * 0.3; // 0.45-0.75
    }
  }
  
  // Correlaciones bajas para componentes no relacionados
  return 0.1 + Math.random() * 0.3; // 0.1-0.4
};

export const getCorrelationInterpretation = (correlation: number): { level: string, color: string, description: string } => {
  const abs = Math.abs(correlation);
  
  if (abs >= 0.8) {
    return {
      level: 'Muy Alta',
      color: 'text-red-600',
      description: 'Correlación muy fuerte - cambios en un componente afectan significativamente al otro'
    };
  } else if (abs >= 0.6) {
    return {
      level: 'Alta',
      color: 'text-orange-600',
      description: 'Correlación fuerte - existe una relación importante entre componentes'
    };
  } else if (abs >= 0.4) {
    return {
      level: 'Moderada',
      color: 'text-yellow-600',
      description: 'Correlación moderada - existe cierta relación entre componentes'
    };
  } else if (abs >= 0.2) {
    return {
      level: 'Baja',
      color: 'text-blue-600',
      description: 'Correlación débil - relación limitada entre componentes'
    };
  } else {
    return {
      level: 'Muy Baja',
      color: 'text-gray-600',
      description: 'Correlación muy débil - componentes prácticamente independientes'
    };
  }
};
