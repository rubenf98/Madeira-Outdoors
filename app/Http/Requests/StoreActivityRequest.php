<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name_pt' => 'required|string',
            'name_en' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'price' => 'required|integer',
            'limit' => 'required|integer',
            'duration' => 'required|string',
            'description1_pt' => 'required|string',
            'description1_en' => 'required|string',
            'description2_pt' => 'required|string',
            'description2_en' => 'required|string',
            'included_pt' => 'required|string',
            'included_en' => 'required|string',
            'material_pt' => 'required|string',
            'material_en' => 'required|string',
            'hours' => 'required|array',
            'days' => 'required|array',
            'banner' => 'required|image|mimes:jpg',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpg',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422));
    }
}
