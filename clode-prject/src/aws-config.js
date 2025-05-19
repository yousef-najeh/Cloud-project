import { LexRuntimeV2Client } from "@aws-sdk/client-lex-runtime-v2";

const awsConfig = {
  region: "us-east-1", 
  credentials: {
    accessKeyId: "AKIAUULKJGIMAFUGDIWR",
    secretAccessKey: "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"
  }
};

export const lexClient = new LexRuntimeV2Client(awsConfig);
export const botId = "P0CWNCGHKK";

export const botAliasId = "LBX0BAAYL3";
export const localeId = "en_US"; 