<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketMessage extends Model
{
    protected $fillable = ['ticket_id', 'user_id', 'message'];

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @return BelongsTo
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo( Ticket::class );
    }

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo( User::class );
    }
}
