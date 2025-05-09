<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TicketCategory extends Model
{
    protected $fillable = ['name'];

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @return HasMany
     */
    public function tickets(): HasMany
    {
        return $this->hasMany( Ticket::class, 'category_id' );
    }
}
