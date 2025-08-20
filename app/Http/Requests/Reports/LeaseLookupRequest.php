<?php

namespace App\Http\Requests\Reports;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LeaseLookupRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'lease_id' => ['required', Rule::exists('leases', 'id')],
        ];
    }

    public function messages()
    {
        return [
            'lease_id.required' => 'The lease field is required.',
            'lease_id.exists' => 'The selected lease does not exist.',
        ];
    }
}
