<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campanha extends Model
{
    protected $table = 'campanha';
    protected $fillable = ['grupo_id', 'nome', 'ativa'];
    public $timestamps = false;
    protected $casts = [
        'ativa' => 'boolean',
    ];

    public function grupo()
    {
        return $this->belongsTo(GrupoCidade::class, 'grupo_id');
    }

    public function desconto()
    {
        return $this->hasOne(Desconto::class);
    }
}
