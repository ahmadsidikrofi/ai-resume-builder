export function canCreateResume(subscriptionLevel, currentResumeCount) {
    const maxResumeMap = {
        free: 1,
        pro: 3,
        pro_plus: Infinity
    }
    const maxResume = maxResumeMap[subscriptionLevel]
    return currentResumeCount < maxResume
}

export function canUseAITools(subscriptionLevel) {
    return subscriptionLevel !== "free"
}

export function casUseCustomizationTools(subscriptionLevel) {
    return subscriptionLevel === "pro_plus"
}