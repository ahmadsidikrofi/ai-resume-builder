import { create } from "zustand"

const usePremiumModal = create((set) => ({
    open: false,
    setOpen: (value) => set({ open: value })
}))

export default usePremiumModal