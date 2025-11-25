<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEstadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Permite qualquer usuário fazer a requisição, pode ser alterado conforme necessário
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $estadoId = $this->route()->parameter('estado'); // Captura o id do estado via parâmetro da rota
        return [
            'nome' => "required|string|max:100|unique:estado,nome,{$estadoId}",
            'sigla' => "required|string|size:2|unique:estado,sigla,{$estadoId}", // Corrigido
        ];
    }
}

