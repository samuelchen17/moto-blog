declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      //   FIREBASE_SERVICE_ACCOUNT_KEY: JSON;
    }
  }
}

export {};
