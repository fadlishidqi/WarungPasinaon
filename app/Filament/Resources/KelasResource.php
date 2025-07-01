<?php
// app/Filament/Resources/KelasResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\KelasResource\Pages;
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

class KelasResource extends Resource
{
    protected static ?string $model = Kelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Kelas';

    protected static ?string $pluralModelLabel = 'Kelas';

    protected static ?string $modelLabel = 'Kelas';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Kelas')
                    ->description('Detail informasi kelas yang akan ditampilkan')
                    ->schema([
                        Forms\Components\TextInput::make('nama')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('deskripsi')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),

                        Forms\Components\FileUpload::make('gambar')
                            ->image()
                            ->directory('kelas')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->columnSpanFull(),

                        Forms\Components\Select::make('kategori')
                            ->options([
                                'Tari' => 'Tari',
                                'Masak' => 'Masak', 
                                'Menulis' => 'Menulis',
                            ])
                            ->required()
                            ->searchable(),

                        Forms\Components\TextInput::make('grup_wa')
                            ->label('Link Grup WhatsApp')
                            ->url()
                            ->prefixIcon('heroicon-m-device-phone-mobile')
                            ->placeholder('https://chat.whatsapp.com/...')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Jadwal & Kapasitas')
                    ->description('Atur jadwal dan kapasitas peserta kelas')
                    ->schema([
                        Forms\Components\DatePicker::make('tanggal')
                            ->required()
                            ->native(false)
                            ->displayFormat('d/m/Y')
                            ->minDate(now()),

                        Forms\Components\Select::make('hari')
                            ->options([
                                'Senin' => 'Senin',
                                'Selasa' => 'Selasa',
                                'Rabu' => 'Rabu',
                                'Kamis' => 'Kamis',
                                'Jumat' => 'Jumat',
                                'Sabtu' => 'Sabtu',
                                'Minggu' => 'Minggu',
                            ])
                            ->required(),

                        Forms\Components\TextInput::make('kapasitas')
                            ->required()
                            ->numeric()
                            ->default(20)
                            ->minValue(1)
                            ->maxValue(100),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->default(true)
                            ->helperText('Kelas akan ditampilkan di website jika aktif'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('gambar')
                    ->size(60)
                    ->circular(),

                Tables\Columns\TextColumn::make('nama')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Tari' => 'success',
                        'Masak' => 'warning',
                        'Menulis' => 'info',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('tanggal')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('hari')
                    ->badge()
                    ->color('gray'),

                Tables\Columns\TextColumn::make('pendaftarans_count')
                    ->label('Terdaftar')
                    ->counts('pendaftarans')
                    ->badge()
                    ->color('success'),

                Tables\Columns\TextColumn::make('kapasitas')
                    ->badge()
                    ->color('info'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('kategori')
                    ->options([
                        'Tari' => 'Tari',
                        'Masak' => 'Masak', 
                        'Menulis' => 'Menulis',
                    ]),

                SelectFilter::make('is_active')
                    ->label('Status')
                    ->options([
                        1 => 'Aktif',
                        0 => 'Tidak Aktif',
                    ]),

                Filter::make('tanggal_akan_datang')
                    ->label('Kelas Akan Datang')
                    ->query(fn (Builder $query): Builder => $query->where('tanggal', '>=', now()))
                    ->default(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('tanggal', 'asc');
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
            'index' => Pages\ListKelas::route('/'),
            'create' => Pages\CreateKelas::route('/create'),
            'edit' => Pages\EditKelas::route('/{record}/edit'),
            'view' => Pages\ViewKelas::route('/{record}'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('is_active', true)->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'success';
    }
}