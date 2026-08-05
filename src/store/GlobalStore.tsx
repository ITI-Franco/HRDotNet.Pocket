
import { create } from "zustand";

interface GlobalInterface {
    employeeName: string;
    setEmployeeName: (employeeName: string) => void;

    cutOffPeriod: [string | null, string | null];
    setCutoffPeriod: (cutoffPeriod: [string | null, string | null]) => void
}

export const useGlobalStore = create<GlobalInterface>((set, get) => ({
    employeeName: "",
    setEmployeeName: (employeeName: string) => set({ employeeName }),

    cutOffPeriod: [null, null] as [string | null, string | null],
    setCutoffPeriod: (cutOffPeriod: [string | null, string | null]) => set({ cutOffPeriod })

}));
