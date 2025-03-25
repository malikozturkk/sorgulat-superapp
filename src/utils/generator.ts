export function getRandomIndexes(length: number) {
    const count = Math.max(2, Math.floor(length / 1));
    const indexes = new Set<number>();
    while (indexes.size < count) {
        indexes.add(Math.floor(Math.random() * length));
    }
    return indexes;
}


export function getRandomType() {
    const weightedTypes = [
        "5xl", "5xl", "5xl", ,
        "3xl", "3xl", "3xl", "3xl", "3xl", "3xl",
        "xl", "xl", "xl", "xl",
        "base",
    ];
    return weightedTypes[Math.floor(Math.random() * weightedTypes.length)];
}


export function sliceData<T>(data: T[], count: number): T[] {
    return data.slice(0, count);
}