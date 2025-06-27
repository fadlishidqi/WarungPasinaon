<?php
// app/Filament/Resources/KegiatanResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\KegiatanResource\Pages;
use App\Models\Kegiatan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class KegiatanResource extends Resource
{
    protected static ?string $model = Kegiatan::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationLabel = 'Kegiatan';
    protected static ?string $pluralLabel = 'Kegiatan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Kegiatan')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                                $operation === 'create' ? $set('slug', Str::slug($state)) : null
                            ),

                        Forms\Components\TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Forms\Components\Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'literasi' => 'Literasi',
                                'keagamaan' => 'Keagamaan',
                                'kesehatan' => 'Kesehatan',
                                'umkm' => 'UMKM',
                            ])
                            ->required()
                            ->default('literasi'),

                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi Singkat')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),

                        Forms\Components\DatePicker::make('date')
                            ->label('Tanggal Kegiatan')
                            ->required()
                            ->default(now()),

                        Forms\Components\Select::make('status')
                            ->label('Status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                            ])
                            ->required()
                            ->default('draft'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Konten')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Gambar Utama')
                            ->image()
                            ->directory('kegiatan')
                            ->maxSize(2048)
                            ->columnSpanFull(),

                        Forms\Components\MarkdownEditor::make('content')
                            ->label('Konten')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('SEO & Tags')
                    ->schema([
                        Forms\Components\TextInput::make('meta_description')
                            ->label('Meta Description')
                            ->maxLength(160)
                            ->columnSpanFull(),

                        Forms\Components\TagsInput::make('tags')
                            ->label('Tags')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Gambar'),
                
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('category')
                    ->label('Kategori')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'literasi' => 'Literasi',
                        'keagamaan' => 'Keagamaan',
                        'kesehatan' => 'Kesehatan',
                        'umkm' => 'UMKM',
                        default => $state,
                    })
                    ->colors([
                        'primary' => 'literasi',
                        'success' => 'keagamaan',
                        'warning' => 'kesehatan',
                        'info' => 'umkm',
                    ]),

                Tables\Columns\TextColumn::make('date')
                    ->label('Tanggal')
                    ->date()
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'danger' => 'draft',
                        'success' => 'published',
                    ]),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'literasi' => 'Literasi',
                        'keagamaan' => 'Keagamaan',
                        'kesehatan' => 'Kesehatan',
                        'umkm' => 'UMKM',
                    ]),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ]),
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
            ->defaultSort('date', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListKegiatan::route('/'),
            'create' => Pages\CreateKegiatan::route('/create'),
            'view' => Pages\ViewKegiatan::route('/{record}'),
            'edit' => Pages\EditKegiatan::route('/{record}/edit'),
        ];
    }
}