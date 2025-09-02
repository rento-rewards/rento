import LandingLayout from '@/layouts/landing-layout';
import { dateFormatter } from '@/lib/formatters';
import { NotionBlock, renderBlocks } from '@/components/notion/notion-block';
import CallToActionSection from '@/components/pages/landing/sections/call-to-action';

type Props = {
    title: string;
    last_edited_time: string;
    blocks: NotionBlock[];
}

export default function Legal(props: Props) {
    return <LandingLayout>
        <article className="max-w-screen-lg prose py-24 place-self-center flex flex-col mx-8">
            <h1>{props.title}</h1>
            <p className="mt-8">
                Last updated: {dateFormatter.format(new Date(props.last_edited_time))}
            </p>
            {renderBlocks(props.blocks)}
        </article>
        <CallToActionSection />
    </LandingLayout>;
}
