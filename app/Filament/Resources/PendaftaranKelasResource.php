<?php
// app/Filament/Resources/PendaftaranKelasResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\PendaftaranKelasResource\Pages;
use App\Models\PendaftaranKelas;
use App\Models\Kelas;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Section;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PendaftaranKelasResource extends Resource
{
    protected static ?string $model = PendaftaranKelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationLabel = 'Pendaftaran Kelas';

    protected static ?string $pluralModelLabel = 'Pendaftaran Kelas';

    protected static ?string $modelLabel = 'Pendaftaran Kelas';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Kelas')
                    ->schema([
                        Forms\Components\Select::make('kelas_id')
                            ->label('Kelas')
                            ->relationship('kelas', 'nama')
                            ->options(Kelas::where('is_active', true)->pluck('nama', 'id'))
                            ->required()
                            ->searchable()
                            ->preload()
                            ->columnSpanFull(),
                    ]),

                Section::make('Data Peserta')
                    ->schema([
                        Forms\Components\TextInput::make('nama')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('no_telp')
                            ->label('No. Telepon')
                            ->required()
                            ->tel()
                            ->maxLength(20),

                        Forms\Components\Textarea::make('alamat')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('kelas.nama')
                    ->label('Kelas')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('nama')
                    ->label('Nama Peserta')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('no_telp')
                    ->label('No. Telepon')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Nomor telepon disalin!')
                    ->icon('heroicon-m-phone'),

                Tables\Columns\TextColumn::make('alamat')
                    ->limit(50)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    }),

                Tables\Columns\TextColumn::make('kelas.tanggal')
                    ->label('Tanggal Kelas')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('kelas.kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Tari' => 'success',
                        'Masak' => 'warning',
                        'Menulis' => 'info',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Daftar')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('kelas')
                    ->relationship('kelas', 'nama')
                    ->searchable()
                    ->preload(),

                SelectFilter::make('kategori')
                    ->options([
                        'Tari' => 'Tari',
                        'Masak' => 'Masak', 
                        'Menulis' => 'Menulis',
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['value'],
                            fn (Builder $query, $value): Builder => $query->whereHas('kelas', fn (Builder $query) => $query->where('kategori', $value)),
                        );
                    }),

                Filter::make('bulan_ini')
                    ->label('Daftar Bulan Ini')
                    ->query(fn (Builder $query): Builder => $query->whereMonth('created_at', now()->month))
                    ->default(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),

                Tables\Actions\Action::make('whatsapp')
                    ->label('WhatsApp')
                    ->icon('heroicon-m-chat-bubble-left-right')
                    ->color('success')
                    ->url(fn (PendaftaranKelas $record): string => 
                        "https://wa.me/" . preg_replace('/[^0-9]/', '', $record->no_telp)
                    )
                    ->openUrlInNewTab(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPendaftaranKelas::route('/'),
            'create' => Pages\CreatePendaftaranKelas::route('/create'),
            'edit' => Pages\EditPendaftaranKelas::route('/{record}/edit'),
            'view' => Pages\ViewPendaftaranKelas::route('/{record}'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::whereMonth('created_at', now()->month)->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'primary';
    }
}