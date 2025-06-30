<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BonusPointResource\Pages;
use App\Models\BonusPoint;
use App\Models\Participant;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class BonusPointResource extends Resource
{
    protected static ?string $model = BonusPoint::class;
    protected static ?string $navigationIcon = 'heroicon-o-gift';
    protected static ?string $navigationGroup = 'Manajemen Poin';
    protected static ?string $navigationLabel = 'Poin Bonus';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('participant_id')
                    ->label('Anak')
                    // Mengambil data dari model Participant yang tipenya 'child'
                    ->options(Participant::where('type', 'child')->pluck('name', 'id'))
                    ->searchable()
                    ->required(),
                Forms\Components\TextInput::make('points')
                    ->label('Jumlah Poin')
                    ->required()
                    ->numeric(),
                Forms\Components\Textarea::make('reason')
                    ->label('Alasan Pemberian Poin (Contoh: Rajin membantu)')
                    ->columnSpanFull(),
                // Mengisi ID admin secara otomatis
                Forms\Components\Hidden::make('admin_id')
                    ->default(fn () => Auth::id()),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('participant.name')
                    ->label('Nama Anak')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('admin.name')
                    ->label('Diberikan Oleh Admin')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('points')
                    ->label('Jumlah Poin')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Diberikan')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBonusPoints::route('/'),
            'create' => Pages\CreateBonusPoint::route('/create'),
            'edit' => Pages\EditBonusPoint::route('/{record}/edit'),
        ];
    }
}
