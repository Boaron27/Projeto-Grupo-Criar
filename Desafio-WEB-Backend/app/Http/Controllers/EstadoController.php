<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEstadoRequest;
use App\Http\Requests\UpdateEstadoRequest;
use App\Models\Estado;
use Illuminate\Http\Request;

class EstadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('page') ?? 1;
        $regsPerPage = 5;

        $skip = ($currentPage - 1) * $regsPerPage;

        $estado = Estado::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        $totalRecords = Estado::count();
        $totalPages = ceil($totalRecords / $regsPerPage);

        return response()->json([
            'estados' => $estado,
            'totalPages' => $totalPages,
            'currentPage' => $currentPage
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEstadoRequest $request)
    {

        try {
            $data = $request->validated();
            $estado = new Estado();
            $estado->fill($data);
            $estado->save();
            return response()->json($estado,201);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao inserir Estado!'
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
            $estado = Estado::findOrFail($id);
            return response()->json($estado,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao buscar Estado!'
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEstadoRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            $estado = Estado::findOrFail($id);
            $estado->update($data);
            return response()->json($estado,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao alterar Estado!',
                'error' => $ex->getMessage(),
            ],400);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = Estado::destroy($id);
            if (!$removed) {
                throw new \Exception();
            }
            return response()->json(null,204);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao remover Estado!'
            ],400);
        }
    }
}
