
export interface BasicInputs {
  // Datos básicos de la importación
  precioFOB: number;
  distancia: number; // en km
  peso: number; // en toneladas
  tasaArancelaria: number; // en porcentaje
  tasaIVA: number; // en porcentaje
}

export interface AdvancedFactors {
  // Factores de la ecuación CD
  tasaEmbalajeEspecial: number; // τe (0.02 - 0.08)
  factorCertificaciones: number; // δ (0.01 - 0.05)
  factorCalidad: number; // γq
  
  // Factores de la ecuación CTI
  fleteBase: number; // FB
  recargosCombustible: number; // βc (variable mensual)
  factorModalidad: number; // ψm (marítimo = 1.0, aéreo = 3.2-4.8)
  factorEstacional: number; // μs (0.95 - 1.25)
  
  // Factores de la ecuación CAT
  factorPenalizacion: number; // ηp
  tasasFijasAduaneras: number; // ΣTf
  
  // Factores de la ecuación CSG
  tasaSeguroBase: number; // σ (0.1% - 0.5%)
  factorRiesgoRuta: number; // α (1.0 - 2.5)
  coeficientePeligrosidad: number; // κ
  factorClimatico: number; // Θ
  segurosAdicionales: number; // Σsg
  
  // Factores de la ecuación COF
  intermediacionAduanera: number; // Cia
  almacenamientoPorDia: number; // Ca
  distribucionLocal: number; // Cd
  tasaInteresFinanciera: number; // if
  tiempoFinanciamiento: number; // tp (días)
  factorEficiencia: number; // νe
  
  // Factores de la ecuación CF
  factorContingencia: number; // φ (0.03 - 0.12)
  factorVolatilidad: number; // ρ
  coeficienteVariabilidad: number; // ωv
  
  // Factores de optimización global
  factorOptimizacion: number; // Fo (0.85 ≤ Fo ≤ 1.15)
  factorEconomiasEscala: number; // Fe
}

export interface ComponentWeights {
  w1: number; // Peso para CD
  w2: number; // Peso para CTI
  w3: number; // Peso para CAT
  w4: number; // Peso para CSG
  w5: number; // Peso para COF
  w6: number; // Peso para CF
}

export interface RiskFactors {
  r1: number; // Factor de riesgo para CD
  r2: number; // Factor de riesgo para CTI
  r3: number; // Factor de riesgo para CAT
  r4: number; // Factor de riesgo para CSG
  r5: number; // Factor de riesgo para COF
  r6: number; // Factor de riesgo para CF
}

export interface CostData {
  basicInputs: BasicInputs;
  advancedFactors: AdvancedFactors;
  componentWeights: ComponentWeights;
  riskFactors: RiskFactors;
}

export interface AdvancedCalculations {
  CD: number; // C1 - Costos Directos de Mercancía
  CTI: number; // C2 - Costos de Transporte Internacional
  CAT: number; // C3 - Costos Aduaneros y Tributarios
  CSG: number; // C4 - Costos de Seguros y Garantías
  COF: number; // C5 - Costos Operativos y Financieros
  CF: number; // C6 - Costos de Contingencia
  VCIF: number; // Valor CIF calculado
  CAI: number; // Costo Total de Adquisición en Importación
  optimizationSavings: number; // Ahorro por optimización
  riskAdjustedCAI: number; // CAI ajustado por riesgo
}
