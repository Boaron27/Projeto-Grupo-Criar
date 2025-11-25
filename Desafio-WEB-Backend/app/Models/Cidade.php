<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cidade extends Model
{
    protected $table = 'cidade';
    protected $fillable = ['nome', 'estado_id'];
    public $timestamps = false;

    public function estado()
    {
        return $this->belongsTo(Estado::class);
    }

    public function grupos()
    {
        return $this->belongsToMany(GrupoCidade::class, 'grupo_cidade', 'cidade_id', 'grupo_id');
    }
}
