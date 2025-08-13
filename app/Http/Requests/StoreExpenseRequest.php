<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest extends FormRequest
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
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:costos_operativos,compras,nominas,otros',
            'reference_number' => 'nullable|string|max:100',
            'date' => 'required|date|before_or_equal:today',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'description.required' => 'La descripción es requerida.',
            'amount.required' => 'El monto es requerido.',
            'amount.numeric' => 'El monto debe ser un número válido.',
            'amount.min' => 'El monto debe ser mayor o igual a 0.',
            'type.required' => 'El tipo de gasto es requerido.',
            'type.in' => 'El tipo de gasto debe ser: costos operativos, compras, nóminas u otros.',
            'date.required' => 'La fecha es requerida.',
            'date.date' => 'La fecha debe ser una fecha válida.',
            'date.before_or_equal' => 'La fecha no puede ser futura.',
        ];
    }
}