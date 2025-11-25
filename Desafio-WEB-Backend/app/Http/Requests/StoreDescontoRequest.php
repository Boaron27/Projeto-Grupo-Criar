<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDescontoRequest extends FormRequest
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
        return [
            'campanha_id' => ['required', 'integer', 'exists:campanha,id'],
            'valor_desconto' => ['nullable', 'numeric', 'min:0.01', 'required_without:percentual_desconto'],
            'percentual_desconto' => ['nullable', 'numeric', 'min:0.01', 'max:100', 'required_without:valor_desconto'],
        ];
    }
}
