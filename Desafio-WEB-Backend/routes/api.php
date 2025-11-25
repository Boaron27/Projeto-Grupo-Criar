<?php

use App\Http\Controllers\CampanhaController;
use App\Http\Controllers\CidadeController;
use App\Http\Controllers\DescontoController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\GrupoCidadeController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;



Route::apiResource('/campanha',CampanhaController::class);
Route::apiResource('/cidade',CidadeController::class);
Route::apiResource('/desconto',DescontoController::class);
Route::apiResource('/estado',EstadoController::class);
Route::apiResource('/grupo_cidade',GrupoCidadeController::class);
Route::apiResource('/produto',ProdutoController::class);
