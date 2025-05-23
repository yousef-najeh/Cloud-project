import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";

const awsConfig = {
  region: "us-east-1", 
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
};

// Initialize the Lex client with the correct configuration
export const lexClient = new LexRuntimeV2Client(awsConfig);

// Bot configuration
export const botId = "P0CWNCGHKK";
export const botAliasId = "LBX0BAAYL3";
export const localeId = "en_US";

// Helper function to send messages to Lex
export const sendMessageToLex = async (text, sessionId) => {
  try {
    const command = new RecognizeTextCommand({
      botId,
      botAliasId,
      localeId,
      sessionId,
      text,
    });

    const response = await lexClient.send(command);
    return response;
  } catch (error) {
    console.error('Error in sendMessageToLex:', error);
    throw error;
  }
}; 
