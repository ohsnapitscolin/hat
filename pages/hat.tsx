import { useEffect } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useCollection, useQuery } from "@squidcloud/react";
import ColorPicker from "@/pages/components/ColorPicker";
import Button from "@/pages/components/Button";
import { getRandomColor } from "@/utils";

type PropTypes = {
  name: string;
};

type FormData = {
  text: string;
  bg1: string;
  bg2: string;
  location: string;
};

const Hat = ({ name }: PropTypes) => {
  const router = useRouter();

  const { register, reset, control, handleSubmit, watch } = useForm<FormData>();

  const colors = watch(["text", "bg1", "bg2"]);

  const hatCollection = useCollection("hat");
  const pickCollection = useCollection("picks");
  const { data } = useQuery(hatCollection.query().eq("name", name));

  const onSubmit = async (data: FormData) => {
    const { location, text, bg1, bg2 } = data;
    if (!location) return;

    void hatCollection.doc({ name, location }).insert({ text, bg1, bg2 });
    void pickCollection.doc("pick").delete();
    reset({
      location: "",
      text: "#ffffff",
      bg1: getRandomColor(),
      bg2: getRandomColor(),
    });
  };

  const remove = (id: string) => {
    void hatCollection.doc(id).delete();
  };

  useEffect(() => {
    if (!name) {
      void router.replace("/");
    }
  }, [name, router]);

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(to bottom, ${colors[1]}, ${colors[2]})`,
      }}
    >
      <h1 className="mt-16" style={{ color: colors[0] }}>
        Hi {name}
      </h1>
      <div className="w-full flex flex-col grow-1 h-full justify-center items-center">
        {data.length < 2 ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-12 w-full flex flex-col justify-center items-center"
          >
            <input
              className={
                "w-[320px] text-center px-4 py-1 mb-1 border-b bg-transparent outline-none"
              }
              style={{ color: colors[0], borderColor: colors[0] }}
              {...register("location")}
            />
            <label className="mb-6 text" style={{ color: colors[0] }}>
              Vacation Location
            </label>

            <div className="flex justify-center gap-2 mb-2">
              <Controller
                control={control}
                name="text"
                render={({ field: { onChange, value } }) => (
                  <ColorPicker color={value} onChange={onChange} />
                )}
                defaultValue={"#ffffff"}
              />
              <Controller
                control={control}
                name="bg1"
                render={({ field: { onChange, value } }) => (
                  <ColorPicker color={value} onChange={onChange} />
                )}
                defaultValue={getRandomColor()}
              />
              <Controller
                control={control}
                name="bg2"
                render={({ field: { onChange, value } }) => (
                  <ColorPicker color={value} onChange={onChange} />
                )}
                defaultValue={getRandomColor()}
              />
            </div>
            <Button
              className="mt-8"
              type="submit"
              color={colors[0]}
              backgroundColor={colors[1]}
            >
              Add to Hat
            </Button>
          </form>
        ) : (
          <Button onClick={() => router.push("/draw")}>Ready</Button>
        )}
        {!!data.length && (
          <div className="flex flex-col gap-4 items-center mt-12">
            {data.map((d) => {
              const { __id, location, text, bg1, bg2 } = d.data;
              return (
                <div
                  key={d.refId}
                  className="w-[320px] relative overflow-hidden flex items-center px-5 p-3 rounded"
                  style={{
                    background: `linear-gradient(to right, ${bg1}, ${bg2})`,
                  }}
                >
                  <span style={{ color: text }}>{location}</span>
                  <button
                    className="absolute right-4 ml-16"
                    onClick={() => remove(__id)}
                    style={{ color: text }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hat;

Hat.getInitialProps = async () => {
  const name =
    typeof window !== "undefined" ? window.sessionStorage.getItem("name") : "";
  return { name };
};
