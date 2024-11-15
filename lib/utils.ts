type ClassArray = Array<ClassValue>;
type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null;

interface ClassDictionary {
    [id: string]: boolean | undefined | null;
}

export const classNames = (...classes: ClassValue[]): string => {
    const result = new Set<string>();
    const addClass = (item: ClassValue): void => {
        if (!item) return;
        if (typeof item === 'string' || typeof item === 'number') {
            result.add(String(item));
            return;
        }
        if (Array.isArray(item)) {
            item.forEach(addClass);
            return;
        }
        if (item?.constructor === Object) {
            Object.entries(item)
                .filter(([, value]) => value)
                .forEach(([key]) => result.add(key));
        }
    };
    classes.forEach(addClass);
    return Array.from(result).join(' ');
};
