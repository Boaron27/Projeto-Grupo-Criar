<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDescontosTable extends Migration
{
    public function up()
    {
        Schema::create('desconto', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campanha_id');

            $table->decimal('valor_desconto', 10, 2)->nullable();
            $table->decimal('percentual_desconto', 5, 2)->nullable();

            $table->foreign('campanha_id')
                ->references('id')->on('campanha')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        // Apenas valor OU percentual
        DB::statement('
            ALTER TABLE desconto
            ADD CONSTRAINT chk_valor_ou_percentual
            CHECK (
                (valor_desconto IS NOT NULL AND percentual_desconto IS NULL) OR
                (valor_desconto IS NULL AND percentual_desconto IS NOT NULL)
            )
        ');
    }

    public function down()
    {
        Schema::dropIfExists('desconto');
    }
}
