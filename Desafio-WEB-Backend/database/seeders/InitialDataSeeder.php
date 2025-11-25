<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InitialDataSeeder extends Seeder
{
    public function run(): void
    {
        // Limpa as tabelas para evitar duplicação
        DB::table('estado')->truncate();
        DB::table('cidade')->truncate();
        DB::table('grupos_cidades')->truncate();
        DB::table('grupo_cidade')->truncate();
        DB::table('campanha')->truncate();
        DB::table('desconto')->truncate();
        DB::table('produto')->truncate();


        // ESTADOS
        DB::table('estado')->insert([
            ['nome' => 'São Paulo', 'sigla' => 'SP'],
            ['nome' => 'Rio de Janeiro', 'sigla' => 'RJ'],
            ['nome' => 'Minas Gerais', 'sigla' => 'MG'],
        ]);

        // CIDADES
        DB::table('cidade')->insert([
            ['nome' => 'São Paulo', 'estado_id' => 1],
            ['nome' => 'Campinas', 'estado_id' => 1],
            ['nome' => 'Santos', 'estado_id' => 1],
            ['nome' => 'Rio de Janeiro', 'estado_id' => 2],
            ['nome' => 'Niterói', 'estado_id' => 2],
            ['nome' => 'Petrópolis', 'estado_id' => 2],
            ['nome' => 'Belo Horizonte', 'estado_id' => 3],
            ['nome' => 'Uberlândia', 'estado_id' => 3],
            ['nome' => 'Juiz de Fora', 'estado_id' => 3],
        ]);

        // GRUPOS DE CIDADES
        DB::table('grupos_cidades')->insert([
            ['nome' => 'Cluster Litoral'],
            ['nome' => 'Cluster Capitais'],
            ['nome' => 'Cluster Interior'],
        ]);

        // RELAÇÃO GRUPO x CIDADE
        DB::table('grupo_cidade')->insert([
            ['grupo_id' => 1, 'cidade_id' => 3],
            ['grupo_id' => 1, 'cidade_id' => 5],
            ['grupo_id' => 2, 'cidade_id' => 1],
            ['grupo_id' => 2, 'cidade_id' => 4],
            ['grupo_id' => 2, 'cidade_id' => 7],
            ['grupo_id' => 3, 'cidade_id' => 2],
            ['grupo_id' => 3, 'cidade_id' => 6],
            ['grupo_id' => 3, 'cidade_id' => 8],
            ['grupo_id' => 3, 'cidade_id' => 9],
        ]);

        // CAMPANHAS
        DB::table('campanha')->insert([
            ['grupo_id' => 1, 'nome' => 'Campanha de Verão Litoral', 'ativa' => true],
            ['grupo_id' => 2, 'nome' => 'Campanha Grandes Capitais', 'ativa' => true],
            ['grupo_id' => 3, 'nome' => 'Campanha Interior 2025', 'ativa' => true],
        ]);

        // DESCONTOS
        DB::table('desconto')->insert([
            ['campanha_id' => 1, 'valor_desconto' => 10.00, 'percentual_desconto' => null],
            ['campanha_id' => 2, 'valor_desconto' => null, 'percentual_desconto' => 15.00],
            ['campanha_id' => 3, 'valor_desconto' => 5.00, 'percentual_desconto' => null],
        ]);

        // PRODUTOS
        DB::table('produto')->insert([
            ['nome' => 'Notebook Gamer X15', 'preco' => 6500.00],
            ['nome' => 'Smartphone Pro Max', 'preco' => 5200.00],
            ['nome' => 'Headset Surround', 'preco' => 350.00],
            ['nome' => 'Cadeira Ergonômica Ultra', 'preco' => 1200.00],
            ['nome' => 'Monitor 29 UltraWide', 'preco' => 1600.00],
        ]);
    }
}
