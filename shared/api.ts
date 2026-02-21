/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface GroeiScanAnswer {
  questionId: string;
  questionLabel: string;
  answerLabel: string;
  answerValue: string;
}

export interface GroeiScanLeadRequest {
  name: string;
  email: string;
  answers: GroeiScanAnswer[];
  recommendation: {
    primaryTrack: string;
    bridgeTrack: string;
    summary: string;
    weekendScore: number;
    workshopScore: number;
  };
  consent: {
    marketingEmail: boolean;
    doubleOptIn: boolean;
  };
}

export interface VraagbaakLeadRequest {
  name: string;
  email: string;
  chatMessages: Array<{
    id: string;
    role: "assistant" | "user";
    text: string;
  }>;
  intakeAnswers: Array<{
    question: string;
    answer: string;
  }>;
  contactPreference: string;
}
