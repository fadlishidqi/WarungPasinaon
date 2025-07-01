<?php

namespace App\Filament\Resources\ParticipantRankingResource\Pages;

use App\Filament\Resources\ParticipantRankingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditParticipantRanking extends EditRecord
{
    protected static string $resource = ParticipantRankingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
