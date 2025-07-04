<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('kegiatan', function (Blueprint $table) {
            $table->enum('category', ['literasi', 'keagamaan', 'kesehatan', 'umkm'])->default('literasi')->after('status');
        });
    }

    public function down()
    {
        Schema::table('kegiatan', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};