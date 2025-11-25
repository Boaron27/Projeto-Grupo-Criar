<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampanhaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'ativa' => $this->ativa,
            'grupo_id' => $this->grupo_id,
            'grupo' => $this->whenLoaded('grupo', function () {
                return $this->grupo->nome ?? null;
            }),
        ];
    }
}
