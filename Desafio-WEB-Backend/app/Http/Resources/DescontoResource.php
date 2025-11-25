<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DescontoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'campanha_id' => $this->campanha_id,
            'valor_desconto' => $this->valor_desconto,
            'percentual_desconto' => $this->percentual_desconto,

            'campanha' => $this->whenLoaded('campanha', function () {
                return $this->campanha->nome ?? null;
            }),
        ];
    }
}
