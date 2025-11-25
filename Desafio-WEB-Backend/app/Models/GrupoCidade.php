<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GrupoCidade extends Model
{
    public $timestamps = false;
    protected $table = 'grupos_cidades';

    protected $fillable = ['nome'];

    public function cidades()
    {
        return $this->belongsToMany(Cidade::class, 'grupo_cidade', 'grupo_id', 'cidade_id');
    }

    public function campanhas()
    {
        return $this->hasMany(Campanha::class, 'grupo_id');
    }
}
