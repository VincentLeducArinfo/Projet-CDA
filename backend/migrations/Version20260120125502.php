<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260120125502 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE astronaut (id INT AUTO_INCREMENT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, age INT NOT NULL, nationality VARCHAR(255) NOT NULL, speciality VARCHAR(255) DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE equipment (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE mission (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, launch_date DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE mission_spaceship (mission_id INT NOT NULL, spaceship_id INT NOT NULL, INDEX IDX_18C57BA7BE6CAE90 (mission_id), INDEX IDX_18C57BA74AD9556B (spaceship_id), PRIMARY KEY (mission_id, spaceship_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE mission_astronaut (mission_id INT NOT NULL, astronaut_id INT NOT NULL, INDEX IDX_EF1841CCBE6CAE90 (mission_id), INDEX IDX_EF1841CCD390014D (astronaut_id), PRIMARY KEY (mission_id, astronaut_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE mission_equipment (mission_id INT NOT NULL, equipment_id INT NOT NULL, INDEX IDX_618D22AABE6CAE90 (mission_id), INDEX IDX_618D22AA517FE9FE (equipment_id), PRIMARY KEY (mission_id, equipment_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE phase (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, start_date DATETIME NOT NULL, end_date DATETIME NOT NULL, mission_id INT DEFAULT NULL, INDEX IDX_B1BDD6CBBE6CAE90 (mission_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE spaceship (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE mission_spaceship ADD CONSTRAINT FK_18C57BA7BE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mission_spaceship ADD CONSTRAINT FK_18C57BA74AD9556B FOREIGN KEY (spaceship_id) REFERENCES spaceship (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mission_astronaut ADD CONSTRAINT FK_EF1841CCBE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mission_astronaut ADD CONSTRAINT FK_EF1841CCD390014D FOREIGN KEY (astronaut_id) REFERENCES astronaut (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mission_equipment ADD CONSTRAINT FK_618D22AABE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mission_equipment ADD CONSTRAINT FK_618D22AA517FE9FE FOREIGN KEY (equipment_id) REFERENCES equipment (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE phase ADD CONSTRAINT FK_B1BDD6CBBE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mission_spaceship DROP FOREIGN KEY FK_18C57BA7BE6CAE90');
        $this->addSql('ALTER TABLE mission_spaceship DROP FOREIGN KEY FK_18C57BA74AD9556B');
        $this->addSql('ALTER TABLE mission_astronaut DROP FOREIGN KEY FK_EF1841CCBE6CAE90');
        $this->addSql('ALTER TABLE mission_astronaut DROP FOREIGN KEY FK_EF1841CCD390014D');
        $this->addSql('ALTER TABLE mission_equipment DROP FOREIGN KEY FK_618D22AABE6CAE90');
        $this->addSql('ALTER TABLE mission_equipment DROP FOREIGN KEY FK_618D22AA517FE9FE');
        $this->addSql('ALTER TABLE phase DROP FOREIGN KEY FK_B1BDD6CBBE6CAE90');
        $this->addSql('DROP TABLE astronaut');
        $this->addSql('DROP TABLE equipment');
        $this->addSql('DROP TABLE mission');
        $this->addSql('DROP TABLE mission_spaceship');
        $this->addSql('DROP TABLE mission_astronaut');
        $this->addSql('DROP TABLE mission_equipment');
        $this->addSql('DROP TABLE phase');
        $this->addSql('DROP TABLE spaceship');
    }
}
