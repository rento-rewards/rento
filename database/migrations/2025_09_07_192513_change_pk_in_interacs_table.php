<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interacs_new', function (Blueprint $table) {
            $table->string('sub')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        // Migrate data from old table to new table
        DB::table('interacs')->orderBy('user_id')->chunk(100, function ($interacs) {
            foreach ($interacs as $interac) {
                DB::table('interacs_new')->insert([
                    'sub' => $interac->interac_id,
                    'user_id' => $interac->user_id,
                    'created_at' => $interac->created_at,
                    'updated_at' => $interac->updated_at,
                ]);
            }
        });
        Schema::dropIfExists('interacs');
        Schema::rename('interacs_new', 'interacs');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('interacs', function (Blueprint $table) {
            $table->renameColumn('sub', 'interac_id');
        });
    }
};
