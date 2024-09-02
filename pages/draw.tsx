import {
  useCollection,
  useDoc,
  useQuery,
  useSquid,
} from "@squidcloud/react";
import Button from "@/pages/components/Button";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const Draw = () => {
  const squid = useSquid();
  const hatCollection = useCollection("hat");
  const pickCollection = useCollection("picks");
  const { data, loading } = useQuery(hatCollection.query());
  const { data: pick } = useDoc(pickCollection.doc("pick"));

  const { width, height } = useWindowSize();

  const draw = async () => {
    void squid.executeFunction("drawFromHat");
  };

  const text = pick?.text || "#000000";
  const bg1 = pick?.bg1 || "#ffffff";
  const bg2 = pick?.bg2 || "#ffffff";

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(to bottom, ${bg1}, ${bg2})`,
      }}
    >
      {!!pick && (
        <span className={"text-6xl"} style={{ color: text }}>
          {pick?.location}
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
      {!data.length && pick && <Confetti width={width} height={height} />}
    </div>
  );
};

export default Draw;
