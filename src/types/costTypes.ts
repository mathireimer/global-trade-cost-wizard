
export interface BasicInputs {
  // Datos básicos FOB
  precioFOB: number;
  
  // Datos de transporte y seguro
  porcentajeFlete: number; // % del FOB para calcular flete
  porcentajeSeguro: number; // % del CIF para calcular seguro
  
  // Tipos de cambio
  tipoCambioCompra: number;
  
  // Tasas tributarias
  tasaArancelaria: number; // ta (en porcentaje)
  tasaIVA: number; // ti (en porcentaje)
  otrosImpuestos: number; // otros impuestos específicos
  
  // Datos para modelo de optimización
  cantidadDemanda: number; // D - demanda mínima requerida
}

export interface CostosAdicionales {
  // Gastos Aduaneros (GA)
  agenciamientoAduanero: number;
  almacenajePortuario: number;
  manipulacionCarga: number;
  documentacionAduanera: number;
  
  // Costos Operacionales (CO)
  transporteInterno: number;
  segurosLocales: number;
  gastosFinancieros: number;
  otrosGastos: number;
}

export interface ModeloOptimizacion {
  // Parámetros para modelo de economías de escala
  costoFijoFlete: number; // α
  costoVariableUnidad: number; // β
  parametroEconomias: number; // γ (0 < γ < 1)
  
  // Parámetros de riesgo
  tasaDescuento: number; // r
  tiempoOperacion: number; // t (en años)
}

export interface ParametrosEstocasticos {
  // Valores esperados (μ)
  mu_CIF: number;
  mu_ta: number;
  mu_ti: number;
  mu_TC: number;
  mu_GA: number;
  mu_CO: number;
  
  // Varianzas (σ²)
  sigma2_CIF: number;
  sigma2_TC: number;
  sigma2_GA: number;
  
  // Covarianza
  cov_CIF_TC: number;
}

export interface AdvancedFactors {
  // Costos de Transporte - CTI
  fleteBase: number; // FB
  recargosCombustible: number; // βc
  factorModalidad: number; // ψm
  factorEstacional: number; // μs
  
  // Costos de Seguros - CSG
  tasaSeguroBase: number; // σ
  segurosAdicionales: number; // Σsg
  factorRiesgoRuta: number; // α
  coeficientePeligrosidad: number; // κ
  factorClimatico: number; // Θ
  
  // Costos Aduaneros - CAT
  tasasFijasAduaneras: number; // ΣTf
  factorPenalizacion: number; // ηp
  
  // Costos Operativos - COF
  intermediacionAduanera: number; // Cia
  almacenamientoPorDia: number; // Ca
  distribucionLocal: number; // Cd
  tasaInteresFinanciera: number; // if
  tiempoFinanciamiento: number; // tp
  factorEficiencia: number; // νe
  
  // Factores Directos - CD
  tasaEmbalajeEspecial: number; // τe
  factorCertificaciones: number; // δ
  factorCalidad: number; // γq
  
  // Factores de Optimización
  factorContingencia: number; // φ
  factorVolatilidad: number; // ρ
  coeficienteVariabilidad: number; // ωv
  factorOptimizacion: number; // Fo
  factorEconomiasEscala: number; // Fe
}

export interface ComponentWeights {
  // Pesos para cada componente (w1, w2, etc.)
  CD: number; // w1
  CTI: number; // w2
  CAT: number; // w3
  CSG: number; // w4
  COF: number; // w5
  CF: number; // w6
  
  // Legacy properties for backward compatibility
  w1: number;
  w2: number;
  w3: number;
  w4: number;
  w5: number;
  w6: number;
}

export interface RiskFactors {
  // Factores de riesgo (r1, r2, etc.)
  cambiario: number; // r1
  operacional: number; // r2
  regulatorio: number; // r3
  logistico: number; // r4
  financiero: number; // r5
  
  // Legacy properties for backward compatibility
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
  r6: number;
}

export interface CostData {
  basicInputs: BasicInputs;
  costosAdicionales: CostosAdicionales;
  modeloOptimizacion: ModeloOptimizacion;
  parametrosEstocasticos: ParametrosEstocasticos;
  advancedFactors: AdvancedFactors;
}

export interface ResultadosCalculo {
  // Modelo fundamental
  FOB: number;
  costoFlete: number; // CF
  costoSeguro: number; // S
  CIF: number;
  
  // Base gravable y gravámenes
  baseGravable: number; // BG
  aranceles: number; // AD
  impuestosGenerales: number; // IG
  otrosImpuestosTotal: number;
  gravamenesTotal: number; // GT
  
  // Gastos adicionales
  gastosAduaneros: number; // GA
  costosOperacionales: number; // CO
  
  // Resultado final
  costoTotalImportacion: number; // CTI/CAI
  
  // Modelo estocástico
  CTI_esperado: number;
  varianza_CTI: number;
  desviacionEstandar_CTI: number;
  coeficienteVariacion: number;
  
  // Modelo con factor tiempo
  CTI_conTiempo: number;
  
  // Índices de validación
  indicePrecision: number;
}

// Legacy interface for backward compatibility
export interface CostCalculations {
  CD: number;
  CTI: number;
  CAT: number;
  CSG: number;
  COF: number;
  CF: number;
  CAI: number;
}
