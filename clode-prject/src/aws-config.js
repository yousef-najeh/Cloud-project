import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";

const awsConfig = {
  region: "us-east-1", 
  credentials: {
    accessKeyId: "AKIAUULKJGIMAFUGDIWR",
    secretAccessKey: "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"
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