<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCampanhaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $campanhaId = $this->route() ->parameter('campanha'); //Validação por ID
        return [
            'grupo_id' => ['required', 'integer', 'exists:grupos_cidades,id'],
            // regra da PK ativa por grupo (ativa = TRUE)
            'ativa' => ['boolean'],
            'nome' => "required|string|unique:campanha,nome,{$campanhaId}"
        ];
    }
}
