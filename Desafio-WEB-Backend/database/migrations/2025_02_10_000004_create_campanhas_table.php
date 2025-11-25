<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampanhasTable extends Migration
{
    public function up()
    {
        Schema::create('campanha', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('grupo_id');
            $table->string('nome', 150);
            $table->boolean('ativa')->default(true);

            $table->foreign('grupo_id')
                ->references('id')->on('grupos_cidades')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        // Regra: só 1 campanha ativa por grupo
        Schema::table('campanha', function (Blueprint $table) {
            $table->unique(['grupo_id'], 'ux_campanha_ativa_por_grupo')
                  ->where('ativa', true);
        });
    }

    public function down()
    {
        Schema::dropIfExists('campanha');
    }
}
