export function padZero(num: number): string {
    return num.toString().padStart(2, '0');
}

export const getLocationSuffix = (name: string) => {
    const vowels = "aeıioöuü";
    const deVowels = "eiöü";
    const lastVowel = [...name].reverse().find(char => vowels.includes(char.toLowerCase()));

    return lastVowel && deVowels.includes(lastVowel) ? "de" : "da";
};
