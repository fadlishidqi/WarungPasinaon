<?php

namespace App\Filament\Resources\ParticipantRankingResource\Pages;

use App\Filament\Resources\ParticipantRankingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListParticipantRankings extends ListRecords
{
    protected static string $resource = ParticipantRankingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
