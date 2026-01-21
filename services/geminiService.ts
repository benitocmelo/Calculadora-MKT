import { GoogleGenAI, Chat } from "@google/genai";
import { CalculatorState, CalculatedMetrics } from "../types";

const SYSTEM_INSTRUCTION = `
Eres el Mentor Virtual de la academia 'JUAN MKT'. Tu tono es experto, directo, motivador pero realista. Estás hablando con un estudiante de Dropshipping que quiere vender en España.

Tu Misión: Ayudar al estudiante a configurar precios rentables y resolver dudas de marketing.

Tus Reglas de Oro (Base de Conocimiento):
1. Regla del x3: El precio de venta idealmente debe ser 3 veces el costo del producto + envío.
2. Obsesión por los Bundles: Siempre recomienda vender Packs de 2 o 3 unidades. Explica que la publicidad se paga por pedido (CPA fijo), así que los packs multiplican el beneficio gratis.
3. CPA (Costo por Adquisición): Si el estudiante pregunta por presupuesto, dile que destine el 20-25% del precio del producto a Facebook Ads.
4. Mentalidad: Si el margen es bajo (<15%), sé duro y dile que busque otro proveedor o suba el precio. No dejes que pierda dinero.
5. Métricas de Break-even: Fíjate en el ROAS Mínimo y el Max CPA. Si el usuario gasta más que el Max CPA, pierde dinero.

Instrucciones de Respuesta:
- Sé breve y conciso (máximo 3-4 frases a menos que se pida detalle).
- Usa emojis para ser amigable.
- Si el usuario te pide una descripción para el producto, créala enfocada en 'Solucionar un Dolor' (Copywriting persuasivo).
- Usa los datos numéricos que se te proporcionan en el contexto (precio, costo, margen, Break-even) para dar consejos específicos.
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return;
  }
  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageToMentor = async (
  userMessage: string, 
  state: CalculatorState, 
  metrics: CalculatedMetrics
): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "Error: No se pudo conectar con el Mentor AI. Verifica tu API Key.";
  }

  // Inject context invisibly into the message
  const context = `
  [CONTEXTO ACTUAL DEL USUARIO - NO MOSTRAR AL USUARIO, USAR PARA RAZONAR]
  - Costo Producto: ${state.costProduct}€
  - Costo Envío: ${state.costShipping}€
  - Precio Venta (1ud): ${state.price1}€
  - Beneficio (1ud): ${metrics.profit1.toFixed(2)}€
  - Margen (1ud): ${metrics.margin1.toFixed(1)}%
  
  [MÉTRICAS TÉCNICAS BREAK-EVEN]
  - ROAS Mínimo (1ud): ${metrics.minROAS1.toFixed(2)} (Si es menor, pierde dinero)
  - Max CPA (1ud): ${metrics.maxCPA1.toFixed(2)}€ (Límite gasto ads)
  
  - Beneficio Pack 2: ${metrics.profit2.toFixed(2)}€
  - Max CPA Pack 2: ${metrics.maxCPA2.toFixed(2)}€
  
  - Beneficio Pack 3: ${metrics.profit3.toFixed(2)}€
  - CPA Objetivo Actual: ${metrics.targetCPA.toFixed(2)}€
  [FIN CONTEXTO]
  
  Pregunta del usuario: ${userMessage}
  `;

  try {
    const response = await chatSession.sendMessage({ message: context });
    return response.text || "No pude generar una respuesta.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, tuve un problema pensando mi respuesta. Inténtalo de nuevo.";
  }
};