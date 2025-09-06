<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case PAID = 'paid';
    case UNCOLLECTIBLE = 'uncollectible';
    case VOID = 'void';
    case OPEN = 'open';
    case DRAFT = 'draft';
}
