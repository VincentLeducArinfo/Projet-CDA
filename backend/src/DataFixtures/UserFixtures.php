<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
        
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();

        $user->setEmail("test@mail.com");
        $user->setPassword($this->hasher->hashPassword($user, "1234"));
        $manager->persist($user);

        $admin = new User();

        $admin->setEmail("admin@mail.com");
        $admin->setPassword($this->hasher->hashPassword($user, "1234"));
        $admin->setRoles(["ROLE_ADMIN"]);
        $manager->persist($admin);

        $manager->flush();
    }
}
