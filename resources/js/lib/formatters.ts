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

const plural = new Intl.PluralRules('en', { type: 'ordinal' });
const suffixes = new Map([
    ['one', 'st'],
    ['two', 'nd'],
    ['few', 'rd'],
    ['other', 'th']
]);
export const formatOrdinals = (n: number) => {
    const rule = plural.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};
export const currencyFormatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'narrowSymbol'
});

export const dateFormatter = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
});

const monthFormatter = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
});

export const formatMonth = (month: number, year: number) =>
    monthFormatter.format(new Date(year, month - 1));
