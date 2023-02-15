<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Iothistory;
use App\Entity\Iotmodule;




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
 * @Route("/api/simulateiot/{id}", name="simulate_iot")
 * @Method("POST")
 */
public function simulateIoT($id, Request $request)
{
    $entityManager = $this->getDoctrine()->getManager();
    $iotModule = $this->getDoctrine()->getRepository(Iotmodule::class)->find($id);
    
    if (!$iotModule) {
        return new JsonResponse(["error" => "Module not found"], Response::HTTP_NOT_FOUND);
    }

    // Génération des données aléatoires pour le module IOT
    $value = mt_rand(0, 100);
    $status = rand(0, 1) == 0 ? "off" : "on";
    $iotModule->setValue($value);
    $iotModule->setStatus($status);
    $iotModule->setType($iotModule->getType());

    // Stockage du module IOT mis à jour dans la base de données
    $entityManager->persist($iotModule);
    $entityManager->flush();

    // Création d'un nouvel enregistrement d'historique
    $iotHistory = new IoTHistory();
    $iotHistory->setValue($value);
    $iotHistory->setStatus($status);
    $iotHistory->setType($iotModule->getType());
    $iotHistory->setTimestamp(new \DateTime());
    $iotHistory->setModule($iotModule);

    // Stockage de l'historique dans la base de données
    $entityManager->persist($iotHistory);
    $entityManager->flush();

    return new JsonResponse(null, Response::HTTP_OK);
}

/**
 * @Route("/api/simulateall", name="simulate_all")
 * @Method("POST")
 */
public function simulateAll(Request $request)
{
    $entityManager = $this->getDoctrine()->getManager();
    $iotModules = $this->getDoctrine()->getRepository(Iotmodule::class)->findAll();
    
    if (!$iotModules) {
        return new JsonResponse(["error" => "Module not found"], Response::HTTP_NOT_FOUND);
    }
    foreach ($iotModules as $iotModule) {

    // Génération des données aléatoires pour le module IOT
    $value = mt_rand(0, 100);
    $status = rand(0, 1) == 0 ? "off" : "on";
    $iotModule->setValue($value);
    $iotModule->setStatus($status);
    $iotModule->setType($iotModule->getType());

    // Stockage du module IOT mis à jour dans la base de données
    $entityManager->persist($iotModule);
    $entityManager->flush();

    // Création d'un nouvel enregistrement d'historique
    $iotHistory = new IoTHistory();
    $iotHistory->setValue($value);
    $iotHistory->setStatus($status);
    $iotHistory->setType($iotModule->getType());
    $iotHistory->setTimestamp(new \DateTime());
    $iotHistory->setModule($iotModule);

    // Stockage de l'historique dans la base de données
    $entityManager->persist($iotHistory);
    $entityManager->flush();
    }
    return new JsonResponse(null, Response::HTTP_OK);
}



 /**
 * @Route("/api/historyofmodule/{id}", name="get_iothistory_module")
 * @Method("GET")
 */
public function getIothistoryData($id)
{
    $iothistory = $this->getDoctrine()->getRepository(Iothistory::class)->findBy(['module' => $id]);

    if (!$iothistory) {
        throw $this->createNotFoundException(
            'No iothistory found for id '.$id
        );
    }

    // Récupération des données du module
    $data = [];

foreach ($iothistory as $history) {
    $data[] = [
        'id' => $history->getId(),
        'status' => $history->getStatus(),
        'timestamp' => $history->getTimestamp(),
        'module' => $history->getModule(),
        'value' => $history->getValue(),
        'type' => $history->getType(),
    ];
}

    // Retourne les données en format JSON
    return new JsonResponse($data);
}

/**
 * @Route("/api/iothistory", name="store_iothistory_data")
 * @Method("POST")
 */
public function storeIothistoryData(Request $request)
{
$em = $this->getDoctrine()->getManager();

// Récupération des données envoyées avec la requête POST
$data = json_decode($request->getContent(), true);

// Création d'une nouvelle entrée dans la table iothistory
$iothistory = new Iothistory();
$iothistory->setStatus($data['status']);
$iothistory->setTimestamp(new \DateTime());
$module = $this->getDoctrine()->getRepository(Iotmodule::class)->findOneBy(['id' => $data['module']]);
$iothistory->setModule($module);
$iothistory->setValue($data['value']);
$iothistory->setType($data['type']);

// Stockage des données dans la base de données
$em->persist($iothistory);
$em->flush();

// Retourne un code HTTP 201 (Créé)
return new JsonResponse(null, Response::HTTP_CREATED);
}

/**
 * @Route("/api/modules/off", name="modules_off", methods={"GET"})
 */
public function getOffModules(): JsonResponse
{
    $modules = $this->getDoctrine()->getRepository(Iotmodule::class)->findBy(['status' => 'off']);

    $data = [];
    foreach ($modules as $module) {
        $data[] = [
            'id' => $module->getId(),
            'name' => $module->getName(),
            'status' => $module->getStatus(),
            'type' => $module->getType(),
            'value' => $module->getValue()
        ];
    }

    return new JsonResponse($data, JsonResponse::HTTP_OK);
}



 /**
 * @Route("/api/moduleshistories/{id}", name="get_iothistory_data")
 * @Method("GET")
 */
public function getModuleIothistory($id)
{
    $iothistory = $this->getDoctrine()->getRepository(Iotmodule::class)->find($id);

    if (!$iothistory) {
        throw $this->createNotFoundException(
            'No iothistory found for id '.$id
        );
    }

    // Récupération des données du module
    $data = array(
        'id' => $iothistory->getId(),
        'status' => $iothistory->getStatus(),
        'value' => $iothistory->getValue(),
        'type' => $iothistory->getType(),
        'historys' => $iothistory->getIothistories()
    );

    // Retourne les données en format JSON
    return new JsonResponse($data);
}
}


