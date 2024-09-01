import Image from "next/image";
import { Inter } from "next/font/google";
import { useCollection, useQuery } from "@squidcloud/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { NextPageContext } from "next";
import Button from "@/pages/components/Button";

const inter = Inter({ subsets: ["latin"] });

type FormData = {
  name: string;
};

const Home = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const name = window.sessionStorage.getItem("name");
    if (name) {
      void router.replace("/hat");
    } else {
      setMounted(true);
    }
  }, []);

  const onSubmit = (data: FormData) => {
    const { name } = data;
    window.sessionStorage.setItem("name", name);
    void router.replace("hat");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <input
          className={
            "h-16 text-4xl text-center px-4 mb-1 border-b-2 bg-transparent outline-none border-black"
          }
          {...register("name")}
        />
        <label className="mb-10 text-sm">Your Name</label>
        <Button type="submit">Enter</Button>
      </form>
    </div>
  );
};

export default Home;
