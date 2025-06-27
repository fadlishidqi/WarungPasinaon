<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookResource\Pages;
use App\Models\Book;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BookResource extends Resource
{
    protected static ?string $model = Book::class;
    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationLabel = 'Buku Digital';
    protected static ?string $pluralLabel = 'Buku Digital';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Buku')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Judul Buku')
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

                        Forms\Components\TextInput::make('author')
                            ->label('Penulis')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'fiksi' => 'Fiksi',
                                'non-fiksi' => 'Non-Fiksi',
                                'pendidikan' => 'Pendidikan',
                                'sejarah' => 'Sejarah',
                                'teknologi' => 'Teknologi',
                                'agama' => 'Agama',
                            ])
                            ->required()
                            ->default('pendidikan'),

                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Detail Buku')
                    ->schema([
                        Forms\Components\TextInput::make('isbn')
                            ->label('ISBN')
                            ->maxLength(20),

                        Forms\Components\TextInput::make('pages')
                            ->label('Jumlah Halaman')
                            ->numeric()
                            ->minValue(1),

                        Forms\Components\TextInput::make('published_year')
                            ->label('Tahun Terbit')
                            ->numeric()
                            ->minValue(1900)
                            ->maxValue(date('Y')),

                        Forms\Components\TextInput::make('publisher')
                            ->label('Penerbit')
                            ->maxLength(255),

                        Forms\Components\Select::make('status')
                            ->label('Status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                            ])
                            ->required()
                            ->default('draft'),

                        Forms\Components\TextInput::make('file_size')
                            ->label('Ukuran File')
                            ->placeholder('Contoh: 2.5 MB')
                            ->maxLength(20),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('File & Gambar')
                    ->schema([
                        Forms\Components\FileUpload::make('cover_image')
                            ->label('Cover Buku')
                            ->image()
                            ->directory('books/covers')
                            ->maxSize(2048)
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('3:4')
                            ->imageResizeTargetWidth('400')
                            ->imageResizeTargetHeight('533')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->uploadingMessage('Mengupload cover...')
                            ->deleteUploadedFileUsing(function ($file) {
                                if (Storage::disk('public')->exists($file)) {
                                    Storage::disk('public')->delete($file);
                                }
                            }),

                        Forms\Components\FileUpload::make('pdf_file')
                            ->label('File PDF')
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('books/pdfs')
                            ->maxSize(51200) // 50MB in KB
                            ->required()
                            ->uploadingMessage('Mengupload file PDF...')
                            ->uploadProgressIndicatorPosition('left')
                            ->removeUploadedFileButtonPosition('right')
                            ->uploadButtonPosition('left')
                            ->deleteUploadedFileUsing(function ($file) {
                                if (Storage::disk('public')->exists($file)) {
                                    Storage::disk('public')->delete($file);
                                }
                            })
                            ->helperText('Upload file PDF dengan ukuran maksimal 50MB'),
                    ])
                    ->columns(1),

                Forms\Components\Section::make('Tags')
                    ->schema([
                        Forms\Components\TagsInput::make('tags')
                            ->label('Tags')
                            ->placeholder('Tambahkan tag...')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    // ... bagian table dan lainnya tetap sama seperti sebelumnya
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('cover_image')
                    ->label('Cover')
                    ->size(60),
                
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable()
                    ->limit(30),

                Tables\Columns\TextColumn::make('author')
                    ->label('Penulis')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('category')
                    ->label('Kategori')
                    ->formatStateUsing(fn (string $state): string => Book::getCategoryLabel($state))
                    ->colors([
                        'primary' => 'fiksi',
                        'success' => 'non-fiksi',
                        'warning' => 'pendidikan',
                        'info' => 'sejarah',
                        'danger' => 'teknologi',
                        'secondary' => 'agama',
                    ]),

                Tables\Columns\TextColumn::make('published_year')
                    ->label('Tahun')
                    ->sortable(),

                Tables\Columns\TextColumn::make('download_count')
                    ->label('Download')
                    ->sortable()
                    ->badge()
                    ->color('success'),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'danger' => 'draft',
                        'success' => 'published',
                    ]),

                Tables\Columns\TextColumn::make('file_size')
                    ->label('Ukuran'),

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
                        'fiksi' => 'Fiksi',
                        'non-fiksi' => 'Non-Fiksi',
                        'pendidikan' => 'Pendidikan',
                        'sejarah' => 'Sejarah',
                        'teknologi' => 'Teknologi',
                        'agama' => 'Agama',
                    ]),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ]),

                Tables\Filters\Filter::make('published_year')
                    ->form([
                        Forms\Components\TextInput::make('year')
                            ->label('Tahun')
                            ->numeric(),
                    ])
                    ->query(function ($query, array $data) {
                        return $query->when(
                            $data['year'],
                            fn ($query) => $query->where('published_year', $data['year'])
                        );
                    }),
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
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBooks::route('/'),
            'create' => Pages\CreateBook::route('/create'),
            'view' => Pages\ViewBook::route('/{record}'),
            'edit' => Pages\EditBook::route('/{record}/edit'),
        ];
    }
}