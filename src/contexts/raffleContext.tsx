import React, { createContext, useEffect, useState } from "react";
import { Colaborador } from "@/core/model/Colaborador";

interface RaffleContextData {
  winner: Colaborador | null;
  isLoading: boolean;
  onChangeLoading: (value: boolean) => void;
  onChangeWinner: (winner: Colaborador) => void;
}

const EVENTS = {
  UPDATE_WINNER: "UPDATE_WINNER",
  UPDATE_LOADING: "UPDATE_LOADING",
};

export const RaffleContext = createContext<RaffleContextData>(
  {} as RaffleContextData
);

export const RaffleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [winner, setWinner] = useState<Colaborador | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const channel = new BroadcastChannel("raffle");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { data } = event;
      switch (data.type) {
        case EVENTS.UPDATE_WINNER:
          setWinner(data);
          break;
        case EVENTS.UPDATE_LOADING:
          setIsLoading(data.value);
          break;
      }

      channel.addEventListener("message", handleMessage);

      return () => {
        channel.removeEventListener("message", handleMessage);
      };
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, []);

  const onChangeWinner = (newValue: Colaborador) => {
    setWinner(newValue);
    channel.postMessage({ type: EVENTS.UPDATE_WINNER, value: newValue });
  };

  const onChangeLoading = (newValue: boolean) => {
    setIsLoading(newValue);
    channel.postMessage({ type: EVENTS.UPDATE_LOADING, value: newValue });
  };

  return (
    <RaffleContext.Provider
      value={{ winner, onChangeWinner, isLoading, onChangeLoading }}
    >
      {children}
    </RaffleContext.Provider>
  );
};
