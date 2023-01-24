<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TempatLapanganRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nama' => 'required|max:255',
            'alamat' => 'required',
            'telp' => 'required',
            'logo' => 'nullable|max:5000',
            'email' => 'required|email',
            'deskripsi' => 'required|min:10',
            'jam_buka' => 'required',
            'jam_tutup' => 'required',
            'harga_persewa' => 'required',
        ];
    }
}
