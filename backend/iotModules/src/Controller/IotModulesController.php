<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IotModulesController extends AbstractController
{
    /**
     * @Route("/iot/modules", name="app_iot_modules")
     */
    public function index(): Response
    {
        return $this->render('iot_modules/index.html.twig', [
            'controller_name' => 'IotModulesController',
        ]);
    }
    
    /**
     * @Route("/simulate/iot", name="simulate_iot")
     */
    public function simulateIoT(EntityManagerInterface $entityManager)
    {
        // Génération des données aléatoires pour le module IOT
        $value = mt_rand(0, 100);
        $status = mt_rand(0, 1);

        // Création d'un nouveau module IOT
        $iotModule = new IoTModule();
        $iotModule->setName('Module IOT');

        // Stockage du module IOT dans la base de données
        $entityManager->persist($iotModule);
        $entityManager->flush();

        // Création d'un nouvel enregistrement d'historique
        $iotHistory = new IoTHistory();
        $iotHistory->setValue($value);
        $iotHistory->setStatus($status);
        $iotHistory->setTimestamp(new \DateTime());
        $iotHistory->setModule($iotModule);

        // Stockage de l'historique dans la base de données
        $entityManager->persist($iotHistory);
        $entityManager->flush();

        // Affichage du message de confirmation
        return $this->render('iot/simulate.html.twig', [
            'message' => 'Données du module IOT simulées et enregistrées avec succès !',
        ]);
    }
}


