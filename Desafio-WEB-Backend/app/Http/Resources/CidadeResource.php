<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CidadeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'estado_id' => $this->estado_id,

            'estado' => $this->whenLoaded('estado', function () {
                return $this->estado->nome ?? null;
            }),
        ];
    }
}
