export {};

declare global {
  interface Window {
    OT: {
      initSession: (apiKey: string, sessionId: string) => OTSession;
      initPublisher: (
        targetElement: string,
        properties?: OTPublisherProperties,
        callback?: (error?: Error) => void
      ) => OTPublisher;
    };
  }

  interface OTSession {
    connect: (token: string, callback?: (error?: Error) => void) => void;
    disconnect: () => void;
    publish: (publisher: OTPublisher, callback?: (error?: Error) => void) => void;
    subscribe: (
      stream: unknown,
      targetElement: string,
      properties?: unknown,
      callback?: (error?: Error) => void
    ) => void;
    on: (event: string, callback: (...args: any[]) => void) => void;
  }

  interface OTPublisher {
    publishVideo: (enabled: boolean) => void;
    publishAudio: (enabled: boolean) => void;
    destroy: () => void;
  }

  interface OTPublisherProperties {
    insertMode?: "append" | "replace";
    width?: string;
    height?: string;
    publishAudio?: boolean;
    publishVideo?: boolean;
  }
}
