<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $db->query("SELECT * FROM activity_log ORDER BY id DESC LIMIT 10");
        $rows = $stmt->fetchAll();
        echo json_encode($rows);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to fetch activities: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
}
