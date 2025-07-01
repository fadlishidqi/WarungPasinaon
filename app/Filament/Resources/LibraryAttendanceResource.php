<?php
// app/Filament/Resources/LibraryAttendanceResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\LibraryAttendanceResource\Pages;
use App\Models\LibraryAttendance;
use App\Models\Participant;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class LibraryAttendanceResource extends Resource
{
    protected static ?string $model = LibraryAttendance::class;
    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationLabel = 'Daftar Hadir Perpustakaan';
    protected static ?string $modelLabel = 'Daftar Hadir';
    protected static ?string $pluralModelLabel = 'Daftar Hadir Perpustakaan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Kunjungan')
                    ->schema([
                        Forms\Components\Select::make('participant_type')
                            ->label('Tipe Pengunjung')
                            ->options([
                                'child' => 'Anak-anak',
                                'general' => 'Umum'
                            ])
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($state, Forms\Set $set) {
                                // Buat participant baru berdasarkan pilihan
                                if ($state) {
                                    $participant = Participant::create([
                                        'name' => 'Pengunjung ' . ucfirst($state) . ' - ' . now()->format('d/m/Y H:i'),
                                        'type' => $state
                                    ]);
                                    $set('participant_id', $participant->id);
                                }
                            })
                            ->dehydrated(false),

                        Forms\Components\Hidden::make('participant_id'),

                        Forms\Components\DatePicker::make('visit_date')
                            ->label('Tanggal Kunjungan')
                            ->required()
                            ->default(now())
                            ->native(false),

                        Forms\Components\TimePicker::make('visit_time')
                            ->label('Waktu Kunjungan')
                            ->required()
                            ->default(now())
                            ->seconds(false),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Data Anak-anak')
                    ->description('Khusus untuk pengunjung anak-anak')
                    ->schema([
                        Forms\Components\TextInput::make('child_name')
                            ->label('Nama Anak')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Masukkan nama lengkap anak'),
                        
                        Forms\Components\Textarea::make('child_address')
                            ->label('Alamat Anak')
                            ->required()
                            ->rows(3)
                            ->placeholder('Masukkan alamat lengkap'),
                    ])
                    ->visible(fn (Forms\Get $get): bool => $get('participant_type') === 'child'),

                Forms\Components\Section::make('Data Umum')
                    ->description('Khusus untuk pengunjung umum/dewasa')
                    ->schema([
                        Forms\Components\TextInput::make('general_name')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Masukkan nama lengkap'),
                        
                        Forms\Components\Textarea::make('general_address')
                            ->label('Alamat')
                            ->required()
                            ->rows(3)
                            ->placeholder('Masukkan alamat lengkap'),
                        
                        Forms\Components\TextInput::make('institution')
                            ->label('Institusi/Lembaga')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Sekolah, Universitas, Perusahaan, dll')
                            ->helperText('Masukkan nama sekolah, universitas, perusahaan, atau lembaga'),
                        
                        Forms\Components\Textarea::make('notes')
                            ->label('Keterangan')
                            ->rows(3)
                            ->placeholder('Keterangan tambahan (opsional)'),
                    ])
                    ->visible(fn (Forms\Get $get): bool => $get('participant_type') === 'general'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('visit_date', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('visit_date')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('visit_time')
                    ->label('Waktu')
                    ->time('H:i')
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('participant.type')
                    ->label('Kategori')
                    ->colors([
                        'primary' => 'child',
                        'success' => 'general',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'child' => 'Anak-anak',
                        'general' => 'Umum',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('visitor_name')
                    ->label('Nama Pengunjung')
                    ->searchable(['child_name', 'general_name'])
                    ->getStateUsing(function (LibraryAttendance $record): string {
                        return $record->visitor_name;
                    }),

                Tables\Columns\TextColumn::make('visitor_address')
                    ->label('Alamat')
                    ->limit(50)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    })
                    ->getStateUsing(function (LibraryAttendance $record): string {
                        return $record->visitor_address;
                    }),

                Tables\Columns\TextColumn::make('institution')
                    ->label('Institusi')
                    ->limit(30)
                    ->placeholder('-')
                    ->toggleable(),

                Tables\Columns\TextColumn::make('notes')
                    ->label('Keterangan')
                    ->limit(40)
                    ->placeholder('-')
                    ->toggleable()
                    ->toggledHiddenByDefault(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dicatat')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable()
                    ->toggledHiddenByDefault(),
            ])
            ->filters([
                SelectFilter::make('participant_type')
                    ->label('Kategori')
                    ->options([
                        'child' => 'Anak-anak',
                        'general' => 'Umum'
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['value'],
                            fn (Builder $query, $value): Builder => $query->whereHas('participant', 
                                fn (Builder $query) => $query->where('type', $value)
                            ),
                        );
                    }),

                Filter::make('hari_ini')
                    ->label('Hari Ini')
                    ->query(fn (Builder $query): Builder => $query->today())
                    ->default(),

                Filter::make('bulan_ini')
                    ->label('Bulan Ini')
                    ->query(fn (Builder $query): Builder => $query->thisMonth()),

                Filter::make('tanggal_range')
                    ->form([
                        Forms\Components\DatePicker::make('dari_tanggal')
                            ->label('Dari Tanggal'),
                        Forms\Components\DatePicker::make('sampai_tanggal')
                            ->label('Sampai Tanggal'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['dari_tanggal'],
                                fn (Builder $query, $date): Builder => $query->whereDate('visit_date', '>=', $date),
                            )
                            ->when(
                                $data['sampai_tanggal'],
                                fn (Builder $query, $date): Builder => $query->whereDate('visit_date', '<=', $date),
                            );
                    })
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
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLibraryAttendances::route('/'),
            'create' => Pages\CreateLibraryAttendance::route('/create'),
            'edit' => Pages\EditLibraryAttendance::route('/{record}/edit'),
            'view' => Pages\ViewLibraryAttendance::route('/{record}'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::today()->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'success';
    }
}