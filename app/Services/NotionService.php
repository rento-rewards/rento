<?php

namespace App\Services;

use \Notion;

class NotionService
{
    public function getPageWithContent(string $pageId): array
    {
        $page = \Notion::pages()->find($pageId);
        $content = \Notion::block($pageId)->children()->asCollection();

        $blocks = collect($content)->map(function ($block) {
            return [
                'id' => $block->getId(),
                'type' => $block->getType(),
                'rawContent' => $block->getRawContent(),
            ];
        });

        return [
            'title' => $page->getTitle(),
            'last_edited_time' => $page->getLastEditedTime(),
            'blocks' => $blocks,
        ];
    }
}
