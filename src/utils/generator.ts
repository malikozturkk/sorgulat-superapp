export function getRandomIndexes(length: number) {
    const count = Math.max(1, Math.floor(length / 10));
    const indexes = new Set<number>();
    while (indexes.size < count) {
        indexes.add(Math.floor(Math.random() * length));
    }
    return indexes;
}