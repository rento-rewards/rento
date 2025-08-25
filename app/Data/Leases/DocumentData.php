<?php

namespace App\Data\Leases;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\MimeTypes;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;

class DocumentData extends Data
{
    public function __construct(
        #[Required, MimeTypes(['image/*', 'application/pdf']), Max(2048)]
        public UploadedFile $document,
    ) {
    }

    public static function rulesMetadata(): array
    {
        return [
            'mime_types' => ['image/*', 'application/pdf'],
            'max_size' => 2048,
        ];
    }
}
