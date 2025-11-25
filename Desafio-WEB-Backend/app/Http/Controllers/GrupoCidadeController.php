<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGrupoCidadeRequest;
use App\Http\Requests\UpdateCidadeRequest;
use App\Http\Requests\UpdateGrupoCidadeRequest;
use App\Models\GrupoCidade;
use Illuminate\Http\Request;

class GrupoCidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('page') ?? 1;
        $regsPerPage = 5;

        $skip = ($currentPage - 1) * $regsPerPage;

        $grupoCidade = GrupoCidade::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        $totalRecords = GrupoCidade::count();
        $totalPages = ceil($totalRecords / $regsPerPage);

        return response()->json([
            'grupo_cidade' => $grupoCidade,
            'totalPages' => $totalPages,
            'currentPage' => $currentPage
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGrupoCidadeRequest $request)
    {

        try {
            $data = $request->validated();
            $grupoCidade = new GrupoCidade();
            $grupoCidade->fill($data);
            $grupoCidade->save();
            return response()->json($grupoCidade,201);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao inserir Grupo de Cidades!'
                ,'error' => $ex->getMessage(),
            ],400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $grupoCidade = GrupoCidade::findOrFail($id);
            return response()->json($grupoCidade,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao buscar Grupo de Cidades!'
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateGrupoCidadeRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $grupoCidade = GrupoCidade::findOrFail($id);
            $grupoCidade->update($data);
            return response()->json($grupoCidade,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao alterar Grupo de Cidades!'
            ],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = GrupoCidade::destroy($id);
            if (!$removed) {
                throw new \Exception();
            }
            return response()->json(null,204);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao remover Grupo de Cidades!'
            ],400);
        }
    }
}
