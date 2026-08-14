<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM careers WHERE id = ?");
                $stmt->execute([$id]);
                $career = $stmt->fetch();
                if ($career) {
                    $career['id'] = intval($career['id']);
                    $career['requirements'] = json_decode($career['requirements'], true);
                    echo json_encode($career);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Career position not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all careers
            try {
                $stmt = $db->query("SELECT * FROM careers ORDER BY id DESC");
                $rows = $stmt->fetchAll();
                foreach ($rows as &$row) {
                    $row['id'] = intval($row['id']);
                    $row['requirements'] = json_decode($row['requirements'], true);
                }
                echo json_encode($rows);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        }
        break;

    case 'POST':
        verifyAdminToken(); // Secure endpoint
        $input = json_decode(file_get_contents('php://input'), true);
        
        $title = isset($input['title']) ? trim($input['title']) : '';
        $department = isset($input['department']) ? trim($input['department']) : '';
        $location = isset($input['location']) ? trim($input['location']) : '';
        $type = isset($input['type']) ? trim($input['type']) : '';
        $experience = isset($input['experience']) ? trim($input['experience']) : '';
        $description = isset($input['description']) ? trim($input['description']) : '';
        $requirements = isset($input['requirements']) ? $input['requirements'] : [];
        $image = isset($input['image']) ? trim($input['image']) : null;
        
        if (empty($title) || empty($department) || empty($location)) {
            http_response_code(400);
            echo json_encode(["message" => "Title, Department, and Location are required."]);
            exit();
        }
        
        try {
            $requirementsJson = json_encode($requirements);
            $sql = "INSERT INTO careers (title, department, location, type, experience, description, requirements, image) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $department, $location, $type, $experience, $description, $requirementsJson, $image]);
            
            $newId = $db->lastInsertId();
            logActivity("Career vacancy added", "Added job: " . $title, "career");
            echo json_encode(["success" => true, "id" => intval($newId)]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add career: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Career ID is required for update."]);
            exit();
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $title = isset($input['title']) ? trim($input['title']) : '';
        $department = isset($input['department']) ? trim($input['department']) : '';
        $location = isset($input['location']) ? trim($input['location']) : '';
        $type = isset($input['type']) ? trim($input['type']) : '';
        $experience = isset($input['experience']) ? trim($input['experience']) : '';
        $description = isset($input['description']) ? trim($input['description']) : '';
        $requirements = isset($input['requirements']) ? $input['requirements'] : [];
        $image = isset($input['image']) ? trim($input['image']) : null;
        
        if (empty($title) || empty($department) || empty($location)) {
            http_response_code(400);
            echo json_encode(["message" => "Title, Department, and Location are required."]);
            exit();
        }
        
        try {
            $requirementsJson = json_encode($requirements);
            $sql = "UPDATE careers SET title = ?, department = ?, location = ?, type = ?, experience = ?, description = ?, requirements = ?, image = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $department, $location, $type, $experience, $description, $requirementsJson, $image, $id]);
            
            logActivity("Career vacancy updated", "Updated job details: " . $title, "career");
            echo json_encode(["success" => true, "message" => "Career updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update career: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Career ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            $cstmt = $db->prepare("SELECT title FROM careers WHERE id = ?");
            $cstmt->execute([$id]);
            $cTitle = $cstmt->fetchColumn() ?: "ID $id";

            $stmt = $db->prepare("DELETE FROM careers WHERE id = ?");
            $stmt->execute([$id]);
            
            logActivity("Career vacancy deleted", "Deleted job: " . $cTitle, "career");
            echo json_encode(["success" => true, "message" => "Career deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete career: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
