<?php

namespace App\Entity;

use App\Repository\IotmoduleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;


/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\IotmoduleRepository")
 */
class Iotmodule
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $value;

    /**
     * @ORM\OneToMany(targetEntity=Iothistory::class, mappedBy="module", orphanRemoval=true)
     */
    private $iothistories;

    public function __construct()
    {
        $this->iothistories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }

    /**
     * @return Collection<int, Iothistory>
     */
    public function getIothistories(): Collection
    {
        return $this->iothistories;
    }

    public function addIothistory(Iothistory $iothistory): self
    {
        if (!$this->iothistories->contains($iothistory)) {
            $this->iothistories[] = $iothistory;
            $iothistory->setModule($this);
        }

        return $this;
    }

    public function removeIothistory(Iothistory $iothistory): self
    {
        if ($this->iothistories->removeElement($iothistory)) {
            // set the owning side to null (unless already changed)
            if ($iothistory->getModule() === $this) {
                $iothistory->setModule(null);
            }
        }

        return $this;
    }
}
