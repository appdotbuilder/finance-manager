<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Income
 *
 * @property int $id
 * @property string $description
 * @property float $amount
 * @property string $type
 * @property string|null $invoice_number
 * @property \Illuminate\Support\Carbon $date
 * @property string|null $notes
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Database\Factories\IncomeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Income newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Income newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Income query()
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereInvoiceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Income thisMonth()
 * @method static \Illuminate\Database\Eloquent\Builder|Income thisYear()
 * 
 * @mixin \Eloquent
 */
class Income extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'description',
        'amount',
        'type',
        'invoice_number',
        'date',
        'notes',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'incomes';

    /**
     * Get the user that owns the income.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include incomes from this month.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeThisMonth($query)
    {
        return $query->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year);
    }

    /**
     * Scope a query to only include incomes from this year.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeThisYear($query)
    {
        return $query->whereYear('date', now()->year);
    }

    /**
     * Get the type display name.
     *
     * @return string
     */
    public function getTypeDisplayNameAttribute(): string
    {
        return match($this->type) {
            'venta' => 'Venta',
            'factura' => 'Factura',
            'otros' => 'Otros',
            default => ucfirst($this->type),
        };
    }
}