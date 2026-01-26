<?php

namespace App\DataFixtures;

use App\Entity\Mission;
use App\Entity\Spaceship;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class MissionFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create("fr_FR");

        $ships = [];

        for ($i = 0; $i < 4; $i++) {
            $spaceship = new Spaceship;
            $spaceship->setName($faker->word());
            $spaceship->setType($faker->word());
            $spaceship->setStatus($faker->word());

            $ships[] = $spaceship;
            $manager->persist($spaceship);
        }

        for ($i = 0; $i < 10; $i++) {
            $mission = new Mission;
            $mission->setName($faker->word());
            $mission->setDescription($faker->paragraph());
            $mission->setLaunchDate($faker->dateTime());

            $rand = rand(0, count($ships) - 1);
            $mission->addSpaceship($ships[$rand]);

            $manager->persist($mission);
        }

        $manager->flush();
    }
}
