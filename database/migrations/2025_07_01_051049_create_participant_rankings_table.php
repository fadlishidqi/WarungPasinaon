<?php
// database/migrations/xxxx_create_participant_rankings_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('participant_rankings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->integer('total_points')->default(0);
            $table->integer('total_visits')->default(0);
            $table->timestamp('last_visit')->nullable();
            $table->timestamps();
            
            $table->unique(['name', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('participant_rankings');
    }
};