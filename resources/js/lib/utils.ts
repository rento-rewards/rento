import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | undefined) {
    if (!date) {
        return '';
    }
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

export function isValidDate(date: Date | undefined) {
    if (!date) {
        return false;
    }
    return !isNaN(date.getTime());
}

const plural = new Intl.PluralRules("en", { type: "ordinal" });

const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
]);

export const formatOrdinals = (n: number) => {
    const rule = plural.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};
