<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGrupoCidadeTable extends Migration
{
    public function up()
    {
        Schema::create('grupo_cidade', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('grupo_id');
            $table->unsignedBigInteger('cidade_id');

            $table->foreign('grupo_id')
                ->references('id')->on('grupos_cidades')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('cidade_id')
                ->references('id')->on('cidade')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unique(['grupo_id', 'cidade_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('grupo_cidade');
    }
}
