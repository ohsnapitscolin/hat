import { useEffect } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useCollection, useQuery } from "@squidcloud/react";
import ColorPicker from "@/pages/components/ColorPicker";
import Button from "@/pages/components/Button";
import { getRandomColor } from "@/pages/utils";

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

  const collection = useCollection("hat");
  const { data } = useQuery(collection.query().eq("name", name));

  const onSubmit = async (data: FormData) => {
    const { location, text, bg1, bg2 } = data;
    if (!location) return;

    void collection.doc({ name, location }).insert({ text, bg1, bg2 });
    reset({
      location: "",
      text: "#ffffff",
      bg1: getRandomColor(),
      bg2: getRandomColor(),
    });
  };

  const remove = (id: string) => {
    void collection.doc(id).delete();
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
      <h1 className="mt-16 text-3xl" style={{ color: colors[0] }}>
        Welcome {name}
      </h1>
      <div className="flex flex-col grow-1 h-full justify-center items-center">
        {data.length < 2 ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-12 flex flex-col justify-center items-center"
          >
            <input
              className={
                "max-w-[80%] h-16 text-4xl text-center px-4 mb-1 border-b-2 bg-transparent outline-none"
              }
              style={{ color: colors[0], borderColor: colors[0] }}
              {...register("location")}
            />
            <label className="mb-6 text-sm" style={{ color: colors[0] }}>
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
                  className="flex items-center p-4 rounded-3xl"
                  style={{
                    background: `linear-gradient(to right, ${bg1}, ${bg2})`,
                  }}
                >
                  <span style={{ color: text }} className="font-semibold">
                    {location}
                  </span>
                  <button
                    className="ml-16 font-bold"
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
