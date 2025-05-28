
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
