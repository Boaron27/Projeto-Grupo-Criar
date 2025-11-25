<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCampanhaRequest;
use App\Http\Requests\UpdateCampanhaRequest;
use App\Models\Campanha;
use Illuminate\Http\Request;
use Illuminate\Support\Traits\TransformsToResourceCollection;

class CampanhaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('page') ?? 1;
        $regsPerPage = 5;

        $skip = ($currentPage - 1) * $regsPerPage;

        $campanha = Campanha::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        $totalRecords = Campanha::count();
        $totalPages = ceil($totalRecords / $regsPerPage);

        return response()->json([
            'campanhas' => $campanha,
            'totalPages' => $totalPages,
            'currentPage' => $currentPage
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCampanhaRequest $request)
    {
        try {
            $data = $request->validated();
            $campanha = new Campanha();
            $campanha->fill($data);
            $campanha->save();
            return response()->json($campanha,201);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao inserir Campanha!',
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
            $campanha = Campanha::findOrFail($id);
            return response()->json($campanha,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao buscar Campanha!'
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCampanhaRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            $campanha = Campanha::findOrFail($id);
            $campanha->update($data);
            return response()->json($campanha,200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao alterar Campanha!'
            ],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $removed = Campanha::destroy($id);
            if (!$removed) {
                throw new \Exception();
            }

            return response()->json(null,204);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao remover Campanha!'
            ],400);
        }
    }
}
