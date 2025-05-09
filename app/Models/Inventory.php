<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{
    use softDeletes;

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
