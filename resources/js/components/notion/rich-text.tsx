import { cn } from '@/lib/utils';

export type RichText = {
    annotations: {
        bold: boolean;
        code: boolean;
        color: string;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
    },
    plain_text: string;
    href?: string | null;
}

export default function RichTextRenderer({ richText }: { richText: RichText }) {
    const { annotations, href, plain_text } = richText;
    const { bold, code, color, italic, strikethrough, underline } = annotations;

    return <span
        className={cn(
            bold && 'font-semibold',
            code && 'font-mono bg-muted px-1 py-0.5 rounded text-sm',
            italic && 'italic',
            strikethrough && 'line-through',
            underline && 'underline',
        )}
        style={{ color: color ?? 'inherit' }}
    >
        {href ? <a href={href}>{plain_text}</a> : plain_text}
    </span>
}
