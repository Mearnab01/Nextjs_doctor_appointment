import VideoCall from "./video-call-ui";

type VideoCallPageProps = {
  searchParams: {
    sessionId?: string;
    token?: string;
  };
};

export default function VideoCallPage({ searchParams }: VideoCallPageProps) {
  const { sessionId, token } = searchParams;

  if (!sessionId || !token) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        Invalid or missing video call parameters
      </div>
    );
  }

  return <VideoCall sessionId={sessionId} token={token} />;
}
