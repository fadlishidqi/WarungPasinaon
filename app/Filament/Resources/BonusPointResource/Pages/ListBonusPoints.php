<?php

namespace App\Filament\Resources\BonusPointResource\Pages;

use App\Filament\Resources\BonusPointResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBonusPoints extends ListRecords
{
    protected static string $resource = BonusPointResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
