<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MissionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MissionRepository::class)]
#[ApiResource]
class Mission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?\DateTime $launchDate = null;

    /**
     * @var Collection<int, Phase>
     */
    #[ORM\OneToMany(targetEntity: Phase::class, mappedBy: 'mission')]
    private Collection $phases;

    /**
     * @var Collection<int, Spaceship>
     */
    #[ORM\ManyToMany(targetEntity: Spaceship::class, inversedBy: 'missions')]
    private Collection $spaceships;

    /**
     * @var Collection<int, Astronaut>
     */
    #[ORM\ManyToMany(targetEntity: Astronaut::class, inversedBy: 'missions')]
    private Collection $astronauts;

    /**
     * @var Collection<int, Equipment>
     */
    #[ORM\ManyToMany(targetEntity: Equipment::class, inversedBy: 'missions')]
    private Collection $equipments;

    public function __construct()
    {
        $this->phases = new ArrayCollection();
        $this->spaceships = new ArrayCollection();
        $this->astronauts = new ArrayCollection();
        $this->equipments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getLaunchDate(): ?\DateTime
    {
        return $this->launchDate;
    }

    public function setLaunchDate(\DateTime $launchDate): static
    {
        $this->launchDate = $launchDate;

        return $this;
    }

    /**
     * @return Collection<int, Phase>
     */
    public function getPhases(): Collection
    {
        return $this->phases;
    }

    public function addPhase(Phase $phase): static
    {
        if (!$this->phases->contains($phase)) {
            $this->phases->add($phase);
            $phase->setMission($this);
        }

        return $this;
    }

    public function removePhase(Phase $phase): static
    {
        if ($this->phases->removeElement($phase)) {
            // set the owning side to null (unless already changed)
            if ($phase->getMission() === $this) {
                $phase->setMission(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Spaceship>
     */
    public function getSpaceships(): Collection
    {
        return $this->spaceships;
    }

    public function addSpaceship(Spaceship $spaceship): static
    {
        if (!$this->spaceships->contains($spaceship)) {
            $this->spaceships->add($spaceship);
        }

        return $this;
    }

    public function removeSpaceship(Spaceship $spaceship): static
    {
        $this->spaceships->removeElement($spaceship);

        return $this;
    }

    /**
     * @return Collection<int, Astronaut>
     */
    public function getAstronauts(): Collection
    {
        return $this->astronauts;
    }

    public function addAstronaut(Astronaut $astronaut): static
    {
        if (!$this->astronauts->contains($astronaut)) {
            $this->astronauts->add($astronaut);
        }

        return $this;
    }

    public function removeAstronaut(Astronaut $astronaut): static
    {
        $this->astronauts->removeElement($astronaut);

        return $this;
    }

    /**
     * @return Collection<int, Equipment>
     */
    public function getEquipments(): Collection
    {
        return $this->equipments;
    }

    public function addEquipment(Equipment $equipment): static
    {
        if (!$this->equipments->contains($equipment)) {
            $this->equipments->add($equipment);
        }

        return $this;
    }

    public function removeEquipment(Equipment $equipment): static
    {
        $this->equipments->removeElement($equipment);

        return $this;
    }
}
