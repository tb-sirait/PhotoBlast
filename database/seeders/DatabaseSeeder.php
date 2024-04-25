<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Tempcollage::create([
            'src' => 'storage/template/1.jpg',
            'x' => 17,
            'y' => 20,
            'width' => 280,
            'height' => 190.6
        ]);
        \App\Models\Tempcollage::create([
            'src' => 'storage/template/2.jpg',
            'x' => 17,
            'y' => 20,
            'width' => 280,
            'height' => 190.6
        ]);
        \App\Models\Tempcollage::create([
            'src' => 'storage/template/3.jpg',
            'x' => 17,
            'y' => 20,
            'width' => 280,
            'height' => 190.6
        ]);
        \App\Models\Tempcollage::create([
            'src' => 'storage/template/4.jpg',
            'x' => 17,
            'y' => 20,
            'width' => 280,
            'height' => 190.6
        ]);
        \App\Models\Code::create([
            'code' => 'dfafsda',
            'status' => 'ready',
            'transaction_id' => 1
        ]);
        \App\Models\Code::create([
            'code' => 'dfafsad',
            'status' => 'ready',
            'transaction_id' => 2
        ]);
        \App\Models\Code::create([
            'code' => 'dffasaa',
            'status' => 'ready',
            'transaction_id' => 3
        ]);
        \App\Models\Transaction::create([
            'invoice_number' => 432423423,
            'amount' => 100000,
            'status' => 'settlement',
            'method' => 'qris',
            'email' => 'abdamadhafiz13@gmail.com'
        ]);
        \App\Models\Transaction::create([
            'invoice_number' => 432422423,
            'amount' => 100000,
            'status' => 'settlement',
            'method' => 'qris',
            'email' => 'abdamadhafiz13@gmail.com'
        ]);
        \App\Models\Transaction::create([
            'invoice_number' => 432422323,
            'amount' => 100000,
            'status' => 'settlement',
            'method' => 'qris',
            'email' => 'abdamadhafiz13@gmail.com'
        ]);
    }
}
