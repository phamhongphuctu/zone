export {};

declare global {
  interface Window {
    Pi: {
      authenticate: (
        scopes: string[],
        onSuccess: (res: any) => void,
        onFailure: (error: any) => void
      ) => void;
    };
  }
}
