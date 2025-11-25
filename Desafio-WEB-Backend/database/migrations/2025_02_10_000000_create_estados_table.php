<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstadosTable extends Migration
{
    public function up()
    {
        Schema::create('estado', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->char('sigla', 2)->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('estado');
    }
}
