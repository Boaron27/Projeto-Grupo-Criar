<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCidadeRequest;
use App\Http\Requests\UpdateCidadeRequest;
use App\Models\Cidade;
use Illuminate\Http\Request;

class CidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $currentPage = $request->get('page') ?? 1;
        $regsPerPage = 5;

        $skip = ($currentPage - 1) * $regsPerPage;

        $cidades = Cidade::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        $totalRecords = Cidade::count();
        $totalPages = ceil($totalRecords / $regsPerPage);

        return response()->json([
            'cidades' => $cidades,
            'totalPages' => $totalPages,
            'currentPage' => $currentPage
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCidadeRequest $request)
    {
        $data = $request->validated();

        try {
            $cidade = new Cidade();
            $cidade->fill($data);
            $cidade->save();
            return response()->json($cidade,201);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao inserir cidade!',
                'error' => $ex->getMessage(),
            ],400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $cidade = Cidade::findOrFail($id);
            return response()->json($cidade,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao buscar Cidade!'
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCidadeRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            $cidade = Cidade::findOrFail($id);
            $cidade->update($data);
            return response()->json($cidade,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao alterar Cidade!'
            ],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $removed = Cidade::destroy($id);
            if (!$removed) {
                throw new \Exception();
            }

            return response()->json(null,204);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao remover Cidade!'
            ],400);
        }
    }
}
