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
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->string('description')->comment('Description of the income');
            $table->decimal('amount', 12, 2)->comment('Income amount');
            $table->enum('type', ['venta', 'factura', 'otros'])->comment('Type of income');
            $table->string('invoice_number')->nullable()->comment('Invoice or reference number');
            $table->date('date')->comment('Income date');
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
        Schema::dropIfExists('incomes');
    }
};