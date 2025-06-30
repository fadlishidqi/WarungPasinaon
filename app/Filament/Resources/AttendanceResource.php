<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AttendanceResource\Pages;
use App\Filament\Resources\AttendanceResource\RelationManagers;
use App\Models\Attendance;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Filters\SelectFilter;


class AttendanceResource extends Resource
{
    protected static ?string $model = Attendance::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';
    
    // Kita buat grup navigasi baru bernama 'Riwayat'
    protected static ?string $navigationGroup = 'Riwayat';
    protected static ?string $navigationLabel = 'Riwayat Absensi';

    // Kita tidak akan membuat form, karena absensi dibuat dari halaman publik
    public static function form(Form $form): Form
    {
        return $form->schema([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // Menampilkan nama partisipan dari relasi
                Tables\Columns\TextColumn::make('participant.name')
                    ->label('Nama Pengunjung')
                    ->searchable()
                    ->sortable(),
                
                // Menampilkan tipe partisipan dengan badge agar menarik
                Tables\Columns\TextColumn::make('participant.type')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'child' => 'success',
                        'general' => 'gray',
                    }),
                
                // Menampilkan poin yang didapat
                Tables\Columns\TextColumn::make('points_earned')
                    ->label('Poin Didapat')
                    ->numeric()
                    ->sortable(),

                // Menampilkan institusi (hanya akan terisi untuk umum)
                Tables\Columns\TextColumn::make('participant.institution')
                    ->label('Institusi/Sekolah')
                    ->searchable(),

                // Menampilkan keperluan (hanya akan terisi untuk umum)
                Tables\Columns\TextColumn::make('participant.purpose')
                    ->label('Keperluan')
                    ->limit(40), // Batasi panjang teks agar tidak terlalu lebar
                
                // Menampilkan waktu absen
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Waktu Absen')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                // Tambahkan filter berdasarkan kategori
                SelectFilter::make('participant_id')
                    ->label('Kategori')
                    ->relationship('participant', 'type')
                    ->options([
                        'child' => 'Anak-anak',
                        'general' => 'Umum'
                    ])
            ])
            ->actions([
                // Kita tidak butuh aksi edit
                // Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc'); // Urutkan berdasarkan yang terbaru
    }
    
    // Kita hanya perlu halaman list, jadi kita bisa override ini
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAttendances::route('/'),
        ];
    }

    // Kita tidak ingin admin bisa membuat absensi manual dari sini
    public static function canCreate(): bool
    {
        return false;
    }
}
