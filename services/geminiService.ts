import { CalculatorState, CalculatedMetrics } from "../types";

// AI Service Stubbed out to remove dependency
export const initializeChat = () => {
  console.log("AI Service is currently disabled.");
};

export const sendMessageToMentor = async (
  userMessage: string, 
  state: CalculatorState, 
  metrics: CalculatedMetrics
): Promise<string> => {
  // Return a static message since the library is removed
  return "El Asistente Virtual está temporalmente desactivado por mantenimiento. Por favor, utiliza la calculadora manual.";
};