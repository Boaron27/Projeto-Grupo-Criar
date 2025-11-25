<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutosTable extends Migration
{
    public function up()
    {
        Schema::create('produto', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 200);
            $table->decimal('preco', 10, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('produto');
    }
}
