<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCidadeRequest extends FormRequest
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
        $cidadeId = $this->route() ->parameter('cidade'); //Validação por ID
        return [
            'nome' => "required|string|max:150|unique:cidade,nome,{$cidadeId}",
            'estado_id' => ['required', 'integer', 'exists:estado,id'],
        ];
    }
}
