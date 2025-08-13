"use client"

import { createContext, useContext } from "react";

const SubscriptionLevelContext = createContext(undefined)

const SubscriptionLevelProvider = ({ children, userSubscriptionLevel}) => {
    return (
        <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
            {children}
        </SubscriptionLevelContext.Provider>
     );
}

export function useSubscriptionLevel () {
    const context = useContext(SubscriptionLevelContext)
    if (context === undefined) {
        throw new Error("useSubscriptionLevel must be used within SubscriptionLevelProvider")
    }
    return context
}
 
export default SubscriptionLevelProvider;