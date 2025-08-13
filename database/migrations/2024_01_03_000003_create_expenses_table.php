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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('description')->comment('Description of the expense');
            $table->decimal('amount', 12, 2)->comment('Expense amount');
            $table->enum('type', ['costos_operativos', 'compras', 'nominas', 'otros'])->comment('Type of expense');
            $table->string('reference_number')->nullable()->comment('Receipt or reference number');
            $table->date('date')->comment('Expense date');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
            
            $table->index(['date', 'type']);
            $table->index('user_id');
            $table->index('amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};