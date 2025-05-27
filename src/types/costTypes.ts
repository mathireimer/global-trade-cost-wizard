
export interface CostData {
  // Costos Directos de Mercancía (CD)
  precioFOB: number;
  embalaje: number;
  certificaciones: number;
  
  // Costos de Transporte Internacional (CTI)
  fleteBase: number;
  recargosCombustible: number;
  tarifasPortuarias: number;
  manipulacionTerminal: number;
  
  // Costos Aduaneros y Tributarios (CAT)
  valorCIF: number;
  tasaArancelaria: number; // en porcentaje
  tasaIVA: number; // en porcentaje
  tasasAduanerasFijas: number;
  
  // Costos de Seguros y Garantías (CSG)
  tasaSeguro: number; // en porcentaje
  segurosAdicionales: number;
  garantiasAduaneras: number;
  
  // Costos Operativos y Financieros (COF)
  intermediacionAduanera: number;
  almacenamiento: number;
  distribucionLocal: number;
  costosFinancieros: number;
  
  // Costos de Contingencia y Factores de Riesgo (CF)
  contingencia: number;
  factoresRiesgo: number;
}

export interface CostCalculations {
  CD: number; // Costos Directos
  CTI: number; // Costos Transporte Internacional
  CAT: number; // Costos Aduaneros y Tributarios
  CSG: number; // Costos Seguros y Garantías
  COF: number; // Costos Operativos y Financieros
  CF: number; // Costos Contingencia
  CAI: number; // Costo Total de Adquisición en Importación
}
