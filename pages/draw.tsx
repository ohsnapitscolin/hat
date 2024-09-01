import { useCollection, useQuery, useQueue, useSquid } from "@squidcloud/react";
import Button from "@/pages/components/Button";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

type PropTypes = {
  name: string;
};

const Draw = ({ name }: PropTypes) => {
  const squid = useSquid();
  const { data: message } = useQueue<{
    text: string;
    bg1: string;
    bg2: string;
    name: string;
    location: string;
  }>(squid.queue("messages"));
  const collection = useCollection("hat");
  const { data, loading } = useQuery(collection.query());

  const { width, height } = useWindowSize();

  const draw = async () => {
    void squid.executeFunction("drawFromHat");
  };

  const text = message?.text || "#000000";
  const bg1 = message?.bg1 || "#ffffff";
  const bg2 = message?.bg2 || "#ffffff";

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(to bottom, ${bg1}, ${bg2})`,
      }}
    >
      {!!message && (
        <span className={"text-3xl"} style={{ color: text }}>
          {message.name}
        </span>
      )}
      {!!message && (
        <span className={"text-8xl"} style={{ color: text }}>
          {message?.location}
        </span>
      )}
      {!!data.length && !loading && (
        <>
          <Button
            className="mt-10 mb-4"
            color={text}
            backgroundColor={bg1}
            onClick={draw}
          >
            Draw
          </Button>
          <span style={{ color: text }}>Remaining: {data.length}</span>
        </>
      )}
      {!data.length && message && <Confetti width={width} height={height} />}
    </div>
  );
};

export default Draw;

Draw.getInitialProps = async () => {
  const name =
    typeof window !== "undefined" ? window.sessionStorage.getItem("name") : "";
  return { name };
};
