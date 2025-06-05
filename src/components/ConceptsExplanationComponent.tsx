
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Book, FileText, Calculator, TrendingUp, Shield, Ship, DollarSign, Target } from 'lucide-react';

const ConceptsExplanationComponent = () => {
  return (
    <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center gap-3 text-green-800">
          <Book className="h-6 w-6" />
          Glosario de Conceptos del Modelo
        </CardTitle>
        <p className="text-sm text-green-600">
          Definiciones y explicaciones de todos los términos utilizados en el modelo matemático
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <Accordion type="multiple" className="space-y-2">
          {/* Conceptos Básicos */}
          <AccordionItem value="basicos" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-blue-800 font-semibold">
                <FileText className="h-4 w-4" />
                Conceptos Básicos - Incoterms
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      FOB (Free on Board)
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Precio de la mercancía puesta en el puerto de embarque, incluyendo todos los costos hasta que la mercancía cruza la borda del buque.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 flex items-center gap-2">
                      <Ship className="h-4 w-4" />
                      CF (Cost and Freight)
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Costo del flete marítimo o aéreo para transportar la mercancía desde el puerto de origen hasta el puerto de destino.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      S (Insurance - Seguro)
                    </h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Prima del seguro que cubre la mercancía durante el transporte internacional, calculada sobre el valor CIF.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      CIF (Cost, Insurance and Freight)
                    </h4>
                    <p className="text-sm text-purple-700 mt-1">
                      <strong>CIF = FOB + CF + S</strong><br />
                      Valor total de la mercancía incluyendo costo, seguro y flete hasta el puerto de destino.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Conceptos Tributarios */}
          <AccordionItem value="tributarios" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-red-800 font-semibold">
                <Calculator className="h-4 w-4" />
                Conceptos Tributarios y Aduaneros
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900">TC (Tipo de Cambio)</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Tasa de conversión de dólares estadounidenses a guaraníes, utilizada para convertir el valor CIF a moneda local.
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900">BG (Base Gravable)</h4>
                  <p className="text-sm text-red-700 mt-1">
                    <strong>BG = CIF × TC</strong><br />
                    Valor en guaraníes sobre el cual se calculan los impuestos y aranceles.
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900">ta (Tasa Arancelaria)</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Porcentaje aplicado sobre la base gravable para calcular los aranceles de importación según la clasificación arancelaria del producto.
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900">AD (Aranceles y Derechos)</h4>
                  <p className="text-sm text-red-700 mt-1">
                    <strong>AD = BG × ta</strong><br />
                    Impuestos de importación calculados sobre la base gravable.
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900">ti (Tasa de IVA)</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Porcentaje del Impuesto al Valor Agregado aplicado sobre la base gravable más los aranceles.
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900">IG (Impuestos Generales)</h4>
                  <p className="text-sm text-red-700 mt-1">
                    <strong>IG = (BG + AD) × ti</strong><br />
                    IVA calculado sobre la base gravable incrementada por los aranceles.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Gastos Operativos */}
          <AccordionItem value="operativos" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-indigo-800 font-semibold">
                <TrendingUp className="h-4 w-4" />
                Gastos Operativos y Adicionales
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900">GA (Gastos Aduaneros)</h4>
                  <p className="text-sm text-indigo-700 mt-1">
                    Incluye agenciamiento aduanero, almacenaje portuario, manipulación de carga y documentación aduanera.
                  </p>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900">CO (Costos Operacionales)</h4>
                  <p className="text-sm text-indigo-700 mt-1">
                    Comprende transporte interno, seguros locales, gastos financieros y otros gastos operativos hasta la entrega final.
                  </p>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900">GT (Gravámenes Totales)</h4>
                  <p className="text-sm text-indigo-700 mt-1">
                    <strong>GT = AD + IG + Otros Impuestos</strong><br />
                    Suma de todos los impuestos y aranceles aplicables a la importación.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Modelo Principal */}
          <AccordionItem value="modelo" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-purple-800 font-semibold">
                <Calculator className="h-4 w-4" />
                Modelo Matemático Principal
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">CTI (Costo Total de Importación)</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    <strong>CTI = CIF × (1 + ta) × (1 + ti) + GA + CO</strong><br />
                    Fórmula principal que calcula el costo total de importar una mercancía, incluyendo todos los costos directos e indirectos.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Modelo Estocástico</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Considera la variabilidad de los parámetros mediante valores esperados (μ), varianzas (σ²) y covarianzas, 
                    permitiendo el análisis de riesgo en las importaciones.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Factor Temporal</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    <strong>CTI(t) = CTI × (1 + r)^t</strong><br />
                    Incorpora el valor del dinero en el tiempo mediante una tasa de descuento (r) y período de operación (t).
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Análisis Avanzado */}
          <AccordionItem value="avanzado" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-yellow-800 font-semibold">
                <TrendingUp className="h-4 w-4" />
                Análisis Avanzado
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Coeficiente de Variación</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    <strong>CV = (σ / μ) × 100</strong><br />
                    Mide la variabilidad relativa del CTI, indicando el nivel de riesgo en términos porcentuales.
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Análisis de Elasticidad</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Mide la sensibilidad de los componentes del costo ante cambios en las variables clave, 
                    identificando los factores de mayor impacto en el CTI.
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Economías de Escala</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Considera que ciertos costos fijos se distribuyen entre mayor cantidad de unidades, 
                    reduciendo el costo unitario en importaciones de mayor volumen.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Marco Normativo */}
          <AccordionItem value="normativo" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <FileText className="h-4 w-4" />
                Marco Normativo y Referencias
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Incoterms 2020</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Términos comerciales internacionales que definen las responsabilidades de compradores y vendedores 
                    en el comercio internacional, base del modelo CIF utilizado.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">OMC (Organización Mundial del Comercio)</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Metodologías de valoración aduanera establecidas por la OMC para determinar la base gravable 
                    de las mercancías importadas.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Teoría del Comercio Internacional</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Fundamentos económicos que sustentan el modelo, incluyendo ventajas comparativas, 
                    costos de transacción y análisis de riesgo cambiario.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ConceptsExplanationComponent;
