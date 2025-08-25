<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interac extends Model
{
    protected $fillable = [
        'interac_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
