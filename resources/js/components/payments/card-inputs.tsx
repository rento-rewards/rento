import { Label } from '@/components/ui/label';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { useEffect, useMemo, useState } from 'react';
import getCardBrandSVG from '@/components/payments/card-brands';

export default function CardInputs() {
    const [theme, setTheme] = useState<Record<string, string>>({});
    const [brand, setBrand] = useState<string>('');

    const CardBrand = useMemo(() => getCardBrandSVG(brand), [brand]);

    useEffect(() => {
        const styles = getComputedStyle(document.documentElement);
        setTheme({
            color: styles.getPropertyValue('--foreground'),
            placeholder: styles.getPropertyValue('--muted-foreground'),
            invalid: styles.getPropertyValue('--destructive'),
            fontFamily: styles.getPropertyValue('--font-sans') || 'system-ui, sans-serif'
        });
    }, []);

    const cardStyle = useMemo(
        () => ({
            base: {
                fontSize: '16px',
                color: theme.color,
                fontFamily: theme.fontFamily,
                '::placeholder': {
                    color: theme.placeholder
                }
            },
            invalid: {
                color: theme.invalid
            }
        }),
        [theme]
    );

    return <>
        <div className="grid gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
                <CardNumberElement options={{ style: cardStyle }}
                                   className="border border-input peer pe-11 p-2 rounded"
                                   onChange={(event) => setBrand(event.brand)}
                                   id="card-number" />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                    <CardBrand className="size-6 text-inherit" />
                </div>
            </div>
        </div>
        <div className="grid @md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry</Label>
                <CardExpiryElement options={{ style: cardStyle }}
                                   className="border border-input p-2 rounded"
                                   id="expiry"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <CardCvcElement options={{ style: cardStyle }}
                                className="border border-input p-2 rounded"
                                id="cvc"
                />
            </div>
        </div>
    </>;
}
