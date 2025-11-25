<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGruposCidadesTable extends Migration
{
    public function up()
    {
        Schema::create('grupos_cidades', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 150)->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('grupos_cidades');
    }
}
