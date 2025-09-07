<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interac extends Model
{
    protected $fillable = [
        'sub',
        'payload',
        'document_type',
        'expiry_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
