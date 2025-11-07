import React, { createContext, useEffect, useState } from "react";
import { Colaborador } from "@/core/model/Colaborador";
import { Premio } from "@/core/model/Premio";

interface RaffleContextData {
  winner: Colaborador | null;
  isLoading: boolean;
  award: Premio | null;
  onChangeLoading: (value: boolean) => void;
  onChangeWinner: (winner: Colaborador | null) => void;
  onChangeAward: (award: Premio | null) => void;
}

const EVENTS = {
  UPDATE_WINNER: "UPDATE_WINNER",
  UPDATE_LOADING: "UPDATE_LOADING",
  UPDATE_AWARD: "UPDATE_AWARD",
};

export const RaffleContext = createContext<RaffleContextData>(
  {} as RaffleContextData
);

export const RaffleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [winner, setWinner] = useState<Colaborador | null>(null);
  const [award, setAward] = useState<Premio | null>(null);
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
        case EVENTS.UPDATE_AWARD:
          setAward(data.value);
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

  const onChangeWinner = (newValue: Colaborador | null) => {
    setWinner(newValue);
    channel.postMessage({ type: EVENTS.UPDATE_WINNER, value: newValue });
  };

  const onChangeLoading = (newValue: boolean) => {
    setIsLoading(newValue);
    channel.postMessage({ type: EVENTS.UPDATE_LOADING, value: newValue });
  };

  const onChangeAward = (newValue: Premio | null) => {
    setAward(newValue);
    channel.postMessage({ type: EVENTS.UPDATE_AWARD, value: newValue });
  };

  return (
    <RaffleContext.Provider
      value={{
        winner,
        onChangeWinner,
        isLoading,
        onChangeLoading,
        award,
        onChangeAward,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};
