<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    protected $fillable = [
        'user_id', 'category_id', 'title', 'description', 'status', 'priority'
    ];

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo( User::class );
    }

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo( TicketCategory::class );
    }

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @return HasMany
     */
    public function messages(): HasMany
    {
        return $this->hasMany( TicketMessage::class );
    }
}
