<?php

namespace App\Console\Commands;

use App\Services\RezervacijaManager;
use Illuminate\Console\Command;

class ZakljuciRezervacije extends Command
{
    protected $signature = 'rezervacije:zakljuci';

    protected $description = 'Zaključuje prošle rezervacije: potvrđene postaju odigrane, a nepotvrđene se otkazuju uz obaveštenje igraču';

    public function handle(RezervacijaManager $rezervacijaManager): int
    {
        $rezultat = $rezervacijaManager->zakljuciProsle();

        $this->info("Odigranih: {$rezultat['odigrane']}");
        $this->info("Otkazanih jer nisu potvrđene: {$rezultat['otkazane']}");

        return self::SUCCESS;
    }
}
