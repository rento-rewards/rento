<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interacs', function (Blueprint $table) {
            $table->foreignId('user_id')
                ->primary()
                ->unique()
                ->constrained()
                ->cascadeOnDelete();
            $table->string('interac_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interacs');
    }
};
