<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db = getDB();

try {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $db->prepare("SELECT * FROM `team_members` WHERE id = ?");
            $stmt->execute([$id]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$member) {
                http_response_code(404);
                echo json_encode(['error' => 'Team member not found']);
            } else {
                echo json_encode($member);
            }
        } else {
            $dept = $_GET['department'] ?? null;
            if ($dept) {
                $stmt = $db->prepare("SELECT * FROM `team_members` WHERE department = ? ORDER BY sort_order ASC, name ASC");
                $stmt->execute([$dept]);
            } else {
                $stmt = $db->query("SELECT * FROM `team_members` ORDER BY department ASC, sort_order ASC, name ASC");
            }
            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($members);
        }
    } elseif ($method === 'POST') {
        verifyAdminToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("INSERT INTO `team_members` (name, role, department, branch, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name']       ?? '',
            $data['role']       ?? '',
            $data['department'] ?? '',
            $data['branch']     ?? '',
            $data['image']      ?? '',
            $data['sort_order'] ?? 0,
        ]);
        $newId = $db->lastInsertId();
        $stmt2 = $db->prepare("SELECT * FROM `team_members` WHERE id = ?");
        $stmt2->execute([$newId]);
        echo json_encode($stmt2->fetch(PDO::FETCH_ASSOC));
    } elseif ($method === 'PUT') {
        verifyAdminToken();
        $id   = $_GET['id'] ?? null;
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$id) { http_response_code(400); echo json_encode(['error' => 'Missing id']); exit; }
        $stmt = $db->prepare("UPDATE `team_members` SET name=?, role=?, department=?, branch=?, image=?, sort_order=? WHERE id=?");
        $stmt->execute([
            $data['name']       ?? '',
            $data['role']       ?? '',
            $data['department'] ?? '',
            $data['branch']     ?? '',
            $data['image']      ?? '',
            $data['sort_order'] ?? 0,
            $id
        ]);
        $stmt2 = $db->prepare("SELECT * FROM `team_members` WHERE id = ?");
        $stmt2->execute([$id]);
        echo json_encode($stmt2->fetch(PDO::FETCH_ASSOC));
    } elseif ($method === 'DELETE') {
        verifyAdminToken();
        $id = $_GET['id'] ?? null;
        if (!$id) { http_response_code(400); echo json_encode(['error' => 'Missing id']); exit; }
        $stmt = $db->prepare("DELETE FROM `team_members` WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
