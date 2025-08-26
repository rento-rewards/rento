<?php

namespace App\Enums;

enum ReportStatus: string
{
    case CREATED = 'created';
    case VERIFIED = 'verified';
    case REPORTED = 'reported';
}
