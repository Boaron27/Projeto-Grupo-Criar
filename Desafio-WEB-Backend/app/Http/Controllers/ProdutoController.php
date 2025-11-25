<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProdutoRequest;
use App\Http\Requests\UpdateProdutoRequest;
use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('page') ?? 1;
        $regsPerPage = 5;

        $skip = ($currentPage - 1) * $regsPerPage;

        $produto = Produto::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        $totalRecords = Produto::count();
        $totalPages = ceil($totalRecords / $regsPerPage);

        return response()->json([
            'produtos' => $produto,
            'totalPages' => $totalPages,
            'currentPage' => $currentPage
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProdutoRequest $request)
    {


        try {
            $data = $request->validated();
            $produto = new Produto();
            $produto->fill($data);
            $produto->save();
            return response()->json($produto,201);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao inserir Produto!'
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
            $produto = Produto::findOrFail($id);
            return response()->json($produto,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao buscar Produto!'
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProdutoRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $produto = Produto::findOrFail($id);
            $produto->update($data);
            return response()->json($produto,200);
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
            $removed = Produto::destroy($id);
            if (!$removed) {
                throw new \Exception();
            }
            return response()->json(null,204);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao remover Produto!'
            ],400);
        }
    }
}
