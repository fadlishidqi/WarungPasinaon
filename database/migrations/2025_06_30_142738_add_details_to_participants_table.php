<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('participants', function (Blueprint $table) {
            $table->string('institution')->nullable()->after('type');
            $table->text('purpose')->nullable()->after('institution');
        });
    }
    public function down(): void {
        Schema::table('participants', function (Blueprint $table) {
            $table->dropColumn(['institution', 'purpose']);
        });
    }
};
