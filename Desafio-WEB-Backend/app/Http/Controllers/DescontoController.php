<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDescontoRequest;
use App\Http\Requests\UpdateDescontoRequest;
use App\Models\Desconto;
use Illuminate\Http\Request;

class DescontoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('page') ?? 1;
        $regsPerPage = 5;

        $skip = ($currentPage - 1) * $regsPerPage;

        $desconto = Desconto::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        $totalRecords = Desconto::count();
        $totalPages = ceil($totalRecords / $regsPerPage);

        return response()->json([
            'descontos' => $desconto,
            'totalPages' => $totalPages,
            'currentPage' => $currentPage
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDescontoRequest $request)
    {


        try {
            $data = $request->validated();
            $desconto = new Desconto();
            $desconto->fill($data);
            $desconto->save();
            return response()->json($desconto,201);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao inserir Desconto!'
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
            $desconto = Desconto::findOrFail($id);
            return response()->json($desconto,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao buscar Desconto!'
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDescontoRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $desconto = Desconto::findOrFail($id);
            $desconto->update($data);
            return response()->json($desconto,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao alterar Desconto!'
            ],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = Desconto::destroy($id);
            if (!$removed) {
                throw new \Exception();
            }
            return response()->json(null,204);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao remover Desconto!'
            ],400);
        }
    }
}
