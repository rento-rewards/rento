import { usePage } from '@inertiajs/react';
import { Auth } from '@/types';

export default function Greeting() {
    const { auth } = usePage<{ auth: Auth }>().props;

    return (
        <div>
            <h1 className="text-2xl font-bold">Welcome, {auth.user.first_name}</h1>
            <p className="mt-2 text-muted-foreground">Here you can find an overview of your reports and upcoming
                tasks.</p>
        </div>
    );
}
