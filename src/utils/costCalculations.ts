
import { CostData, CostCalculations } from '@/types/costTypes';

export const calculateCosts = (data: CostData): CostCalculations => {
  // CD = Precio FOB + Costos de Embalaje Especial + Certificaciones de Origen
  const CD = data.precioFOB + data.embalaje + data.certificaciones;
  
  // CTI = Flete Base + Recargos por Combustible + Tarifas Portuarias + Manipulación Terminal
  const CTI = data.fleteBase + data.recargosCombustible + data.tarifasPortuarias + data.manipulacionTerminal;
  
  // CAT = (Valor CIF × Tasa Arancelaria) + (Valor CIF + Aranceles) × Tasa IVA + Tasas Aduaneras Fijas
  const aranceles = data.valorCIF * (data.tasaArancelaria / 100);
  const iva = (data.valorCIF + aranceles) * (data.tasaIVA / 100);
  const CAT = aranceles + iva + data.tasasAduanerasFijas;
  
  // CSG = (Valor CIF × Tasa de Seguro) + Seguros Adicionales + Garantías Aduaneras
  const seguroBasico = data.valorCIF * (data.tasaSeguro / 100);
  const CSG = seguroBasico + data.segurosAdicionales + data.garantiasAduaneras;
  
  // COF = Intermediación Aduanera + Almacenamiento + Distribución Local + Costos Financieros
  const COF = data.intermediacionAduanera + data.almacenamiento + data.distribucionLocal + data.costosFinancieros;
  
  // CF = Costos de Contingencia + Factores de Riesgo
  const CF = data.contingencia + data.factoresRiesgo;
  
  // CAI = CD + CTI + CAT + CSG + COF + CF
  const CAI = CD + CTI + CAT + CSG + COF + CF;
  
  return { CD, CTI, CAT, CSG, COF, CF, CAI };
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
