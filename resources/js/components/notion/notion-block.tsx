import RichTextRenderer, { RichText } from '@/components/notion/rich-text';
import { ReactNode } from 'react';

export type NotionBlock = {
    id: string;
    type: string;
    rawContent: {
        text: RichText[]
    }
};

type Props = {
    block: NotionBlock;
}

export function renderBlocks(blocks: NotionBlock[]) {
    let nodes: ReactNode[] = [];
    let numberList: ReactNode[] = [];
    let bulletedList: ReactNode[] = [];

    blocks.forEach(block => {
        let content = renderContent(block);

        if (block.type !== 'bulleted_list_item' && bulletedList.length > 0) {
            nodes.push(<ul>{bulletedList}</ul>);
            bulletedList = [];
        }

        if (block.type !== 'numbered_list_item' && numberList.length > 0) {
            nodes.push(<ol>{numberList}</ol>);
            numberList = [];
        }

        switch (block.type) {
            case 'heading_1':
                nodes.push(<h1 key={block.id}>{content}</h1>)
                break;
            case 'heading_2':
                nodes.push(<h2 key={block.id}>{content}</h2>)
                break;
            case 'heading_3':
                nodes.push(<h3 key={block.id}>{content}</h3>)
                break;
            case 'paragraph':
                nodes.push(<p key={block.id}>{content}</p>)
                break;
            case 'numbered_list_item':
                numberList.push(<li key={block.id}>{content}</li>);
                break;
            case 'bulleted_list_item':
                bulletedList.push(<li key={block.id}>{content}</li>);
                break;
        }
    });

    return nodes;
}

function renderContent(block: NotionBlock) {
    const { rawContent, id } = block;
    return rawContent.text.map((t, index) => (
            <RichTextRenderer key={`${id}-${index}`} richText={t} />
        )
    );
}
