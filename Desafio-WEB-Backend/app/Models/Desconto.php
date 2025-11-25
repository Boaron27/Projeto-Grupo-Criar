<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desconto extends Model
{
    protected $table = 'desconto';
    public $timestamps = false;
    protected $fillable = [
        'campanha_id',
        'valor_desconto',
        'percentual_desconto'
    ];

    public function campanha()
    {
        return $this->belongsTo(Campanha::class);
    }
}
