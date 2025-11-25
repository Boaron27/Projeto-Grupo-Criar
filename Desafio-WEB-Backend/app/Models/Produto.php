<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $table = 'produto';
    public $timestamps = false;
    protected $fillable = ['nome', 'preco'];
}
