<?php

namespace App\Tests;

use App\Entity\Mission;
use PHPUnit\Framework\TestCase;

class MissionTest extends TestCase
{
    public function testMission(): void
    {
        $mission = new Mission;

        $mission->setName("Test");
        $this->assertEquals("Test", $mission->getName());
    }
}
