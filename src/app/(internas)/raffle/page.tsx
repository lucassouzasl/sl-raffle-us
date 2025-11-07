"use client";

import { RaffleContext } from "@/contexts/raffleContext";
import { useContext, useEffect } from "react";
import Image from "next/image";
import RaffleLoading from "@/app/components/RaffleLoading";
import { getCompanyName } from "@/core/utils/getCompanyName";

export default function Page() {
  const { winner, isLoading, award } = useContext(RaffleContext);

  return (
    <div className="min-h-screen w-full relative">
      <Image
        src={
          award?.imagem
            ? `https://drive.google.com/thumbnail?id=${award.imagem}&sz=w1920-h1080`
            : "/tela.jpeg"
        }
        alt="Fundo do sorteio"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className=" absolute left-[22%] top-[40%] w-[500px] h-[300px] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
        {isLoading ? (
          <RaffleLoading />
        ) : (
          winner && (
            <div className="text-center">
              <span className="text-5xl font-black text-black">
                {/*@ts-ignore*/}
                {winner?.value?.nome}
              </span>
              <br />
              <span className="text-sm text-zinc-800">
                {/*@ts-ignore*/}
                {getCompanyName(winner?.value?.empresa)}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
