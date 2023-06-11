<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\TempatLapangan;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Http\Request;
// use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class TempatLapanganImage extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // echo public_path();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $rules = [
        //     'image' => 'nullable|image|mimes:jpg,bmp,png',
        // ];

        // // // Validation 
        // $validator = Validator::make($request->all(), $rules);

        // // // Return the message
        // if ($validator->fails()) {
        //     return response()->json([
        //         'error' => true,
        //         'message' => $validator->errors()
        //     ], 401);
        // }

        // if ($file_image = request()->file('image')) {
        //     $nama_image = $request->image . "." . $file_image->getClientOriginalExtension();
        //     $file_image->storePubliclyAs('tempat-lapangan', $nama_image, 'public');
        //     $url_image = '/api/tempat-lapangan/image/' . $nama_image;

        //     // Storage::delete(public_path('\storage\tempat-lapangan\\' . $request->image));
        // } 

        return response()->json([
            'image' => $request->file('image')
        ]);

        // $images = new Image();
        // $images->user_id = $request->id;
        // $images->image = $nama_image;
        // $images->url_image = $url_image;
        // $images->save();

        // return response()->json([
        //     'error' => false,
        //     'response' => $images,
        // ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($nama_file)
    {
        // $image =   public_path('\storage\tempat-lapangan\\' . $nama_file);
        $image =   public_path('/storage/tempat-lapangan/' . $nama_file);
        return Response::file($image);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($nama_file)
    {
        // Storage::delete(public_path('\storage\tempat-lapangan\\' . $nama_file));
        Storage::delete(public_path('/storage/tempat-lapangan/' . $nama_file));
    }
}
