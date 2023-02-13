<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230213213316 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE iothistory CHANGE module_id module_id INT DEFAULT NULL, CHANGE status status VARCHAR(255) DEFAULT NULL, CHANGE timestamp timestamp DATETIME DEFAULT NULL, CHANGE value value VARCHAR(255) DEFAULT NULL, CHANGE type type VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE iothistory CHANGE module_id module_id INT NOT NULL, CHANGE status status VARCHAR(255) NOT NULL, CHANGE timestamp timestamp DATETIME NOT NULL, CHANGE value value VARCHAR(255) NOT NULL, CHANGE type type VARCHAR(255) NOT NULL');
    }
}
