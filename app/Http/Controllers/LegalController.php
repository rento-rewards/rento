<?php

namespace App\Http\Controllers;

use App\Services\NotionService;
use \Notion;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function __construct(private NotionService $notion)
    {
    }

    public function privacyPolicy(): Response
    {
        $data = $this->notion->getPageWithContent(env('NOTION_PRIVACY_POLICY_PAGE_ID'));

        return Inertia::render('legal', $data);
    }

    public function termsOfService(): Response
    {
        $data = $this->notion->getPageWithContent(env('NOTION_TERMS_OF_SERVICE_PAGE_ID'));
        return Inertia::render('legal', $data);
    }
}
