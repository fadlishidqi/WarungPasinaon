<?php
// database/migrations/xxxx_fix_participant_rankings_type_field.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('participant_rankings', function (Blueprint $table) {
            // Pastikan field type tidak null dan punya default
            $table->string('type')->default('general')->change();
        });
    }

    public function down(): void
    {
        Schema::table('participant_rankings', function (Blueprint $table) {
            $table->string('type')->nullable()->change();
        });
    }
};