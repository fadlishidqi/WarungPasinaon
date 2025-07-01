<?php
// database/migrations/xxxx_add_points_to_library_attendances_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('library_attendances', function (Blueprint $table) {
            $table->integer('points')->default(0)->after('notes');
        });
    }

    public function down(): void
    {
        Schema::table('library_attendances', function (Blueprint $table) {
            $table->dropColumn('points');
        });
    }
};