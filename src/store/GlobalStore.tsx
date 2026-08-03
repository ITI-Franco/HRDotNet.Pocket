
import { create } from "zustand";

interface GlobalInterface {
    employeeName: string;
    setEmployeeName: (employeeName: string) => void;
}

export const useGlobalStore = create<GlobalInterface>((set, get) => ({
    employeeName: "",
    setEmployeeName: (employeeName: string) => set({ employeeName })

}));
