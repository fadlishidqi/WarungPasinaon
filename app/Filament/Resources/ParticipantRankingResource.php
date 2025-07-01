<?php
// app/Filament/Resources/ParticipantRankingResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\ParticipantRankingResource\Pages;
use App\Models\ParticipantRanking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;

class ParticipantRankingResource extends Resource
{
    protected static ?string $model = ParticipantRanking::class;
    protected static ?string $navigationIcon = 'heroicon-o-trophy';
    protected static ?string $navigationLabel = 'Ranking Participant';
    protected static ?string $modelLabel = 'Ranking';
    protected static ?string $pluralModelLabel = 'Ranking Participants';
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Participant')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\Select::make('type')
                            ->label('Tipe')
                            ->options([
                                'child' => 'Anak-anak',
                                'general' => 'Umum',
                            ])
                            ->required(),

                        Forms\Components\TextInput::make('total_points')
                            ->label('Total Poin')
                            ->numeric()
                            ->default(0)
                            ->helperText('Admin bisa mengubah total poin secara manual'),

                        Forms\Components\TextInput::make('total_visits')
                            ->label('Total Kunjungan')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'child' => 'success',
                        'general' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'child' => 'Anak-anak',
                        'general' => 'Umum',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('total_points')
                    ->label('Total Poin')
                    ->sortable()
                    ->badge()
                    ->color('success'),

                Tables\Columns\TextColumn::make('total_visits')
                    ->label('Total Kunjungan')
                    ->sortable()
                    ->badge()
                    ->color('info'),

                Tables\Columns\TextColumn::make('last_visit')
                    ->label('Kunjungan Terakhir')
                    ->dateTime('d M Y H:i')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Terdaftar')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->label('Tipe')
                    ->options([
                        'child' => 'Anak-anak',
                        'general' => 'Umum',
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
            ->defaultSort('total_points', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListParticipantRankings::route('/'),
            'create' => Pages\CreateParticipantRanking::route('/create'),
            'edit' => Pages\EditParticipantRanking::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('type', 'child')->where('total_points', '>', 0)->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'warning';
    }
}