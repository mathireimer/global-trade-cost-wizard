
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

export interface CostData {
  basicInputs: BasicInputs;
  costosAdicionales: CostosAdicionales;
  modeloOptimizacion: ModeloOptimizacion;
  parametrosEstocasticos: ParametrosEstocasticos;
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
  costoTotalImportacion: number; // CTI
  
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
