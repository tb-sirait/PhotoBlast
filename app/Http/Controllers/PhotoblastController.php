<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Models\Tempcollage;
use App\Models\Transaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendPhotoAndVideo;
use ZipArchive;

class PhotoblastController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(){

        return redirect()->route('redeem.index');
    
    }

    public function camera(){
        $temp = Tempcollage::where('id', session('temp_id'))->first();
        $code = Code::where('code', session('code'))->first();
        return view('camera', [
            'template_src' => $temp->src,
            'template_width' => $temp->width,
            'template_height' => $temp->height,
            'template_x' => $temp->x,
            'template_y' => $temp->y,
            'email' => $code->transaction->email
        ]);
    }

    public function processpayment(Request $request){
        $validator = Validator::make($request->all(), [
            'amount' => 'required'
        ]);

        if($validator->failed()){
            return response()->json(data: $validator->errors(), status: 400);
        }
        $transaction = Transaction::create([
            'invoice_number' => 'adfdaf',
            'amount' => $request->amount,
            'status' => 'CREATED'
        ]);
        
        $resp = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',  
        ])->withBasicAuth(env('MIDTRANS_SERVER_KEY'),'')
          ->post('https://api.sandbox.midtrans.com/v2/charge', [
            'payment_type' => 'qris',
            'transaction_details' => [
                'order_id' => 'alig'.$transaction->id,
                'gross_amount' => $transaction->amount
            ]
        ]);
        if($resp->status() == 201 || $resp->status() == 200) {
            $order_id = $resp->json('order_id');
            $status_code = $resp->json('status_code');
            $gross_amount = $resp->json('gross_amount');

            $actions = $resp->json('actions')[0];
            if(empty($actions)) {
                return response()->json(['message' => $resp['status_message']], 500);
            }

            return view('image', [
                'qrcode'=>$actions['url'],
                'order_id' => $order_id,
                'status_code' => $status_code,
                'gross_amount' => $gross_amount,
            ]);
        }
        return response()->json(['message' => $resp->body()], 500);
    }

    public function verifyPayment(Request $request){
        $orderId = $request->order_id;
        $id = preg_replace('/[a-zA-Z]+/', '', $orderId);

        $resp = Http::withHeaders([
            'Accept' => 'application/json',  
        ])->withBasicAuth(env('MIDTRANS_SERVER_KEY'),'')
          ->get("https://api.sandbox.midtrans.com/v2/$orderId/status");
        $status = $resp->json('transaction_status');

        $transaction = Transaction::find($id);
        $transaction->status = $status;
        $transaction->save();

        if($transaction->status == 'settlement'){
            return redirect()->route('camera');
        } else{
            return redirect()->route('home');
        }
    }

    public function saveVideo(Request $request){
        if ($request->hasFile('video')) {
            $videoName = $request->file('video')->getClientOriginalName();
            $videoPath = $request->file('video')->storeAs('user/video', $videoName, 'public');
            return response()->json(['message' => 'Video berhasil diunggah'], 200);
        } else {
            return response()->json(['message' => 'Tidak ada video yang dikirimkan'], 400);
        }

        return response()->json([
            'error' => 'gagal'
        ], 419);
    }

    public function savePhoto(Request $request){
        // Ambil file ZIP dari request
        $zipFile = $request->file('photoZip');

        // Buat instance ZipArchive
        $zip = new ZipArchive;

        // Buka file ZIP
        if ($zip->open($zipFile) === TRUE) {
            // Ekstrak file ZIP ke dalam direktori tujuan
            $destinationPath = storage_path('app/public/aser/photo'); // Direktori tujuan ekstraksi
            $zip->extractTo($destinationPath);
            $zip->close();

            // Hapus file ZIP dari penyimpanan
            Storage::delete($zipFile->getPathname());

            // Response jika berhasil
            return response()->json(['message' => 'File ZIP berhasil diunggah, diekstrak, dan dihapus.']);
        } else {
            // Response jika gagal
            return response()->json(['error' => 'Gagal mengekstrak file ZIP.'], 500);
        }
    }

    public function sendPhoto(Request $request) {
        $filePath = storage_path('app/public/aser/photo/');
        $photoFiles = glob($filePath.'/*.png');

        Mail::to($request->email)->send(new SendPhotoAndVideo($photoFiles));
        return response()->json(['message' => $photoFiles], 201);
    }

}