<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            // Auto create table if it doesn't exist yet
            $db->exec("CREATE TABLE IF NOT EXISTS `career_applications` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `name` VARCHAR(255) NOT NULL,
              `email` VARCHAR(255) NOT NULL,
              `phone` VARCHAR(100) NOT NULL,
              `position` VARCHAR(255) DEFAULT NULL,
              `experience` VARCHAR(255) DEFAULT NULL,
              `resumeName` VARCHAR(255) DEFAULT NULL,
              `resumeData` LONGTEXT DEFAULT NULL,
              `notes` TEXT DEFAULT NULL,
              `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

            $stmt = $db->query("SELECT * FROM career_applications ORDER BY id DESC");
            $rows = $stmt->fetchAll();
            foreach ($rows as &$row) {
                $row['id'] = intval($row['id']);
            }
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => $e->getMessage()]);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);

        $name = isset($input['name']) ? trim($input['name']) : '';
        $email = isset($input['email']) ? trim($input['email']) : '';
        $phone = isset($input['phone']) ? trim($input['phone']) : '';
        $position = isset($input['position']) ? trim($input['position']) : '';
        $experience = isset($input['experience']) ? trim($input['experience']) : '';
        $resumeName = isset($input['resumeName']) ? trim($input['resumeName']) : '';
        $resumeData = isset($input['resumeData']) ? $input['resumeData'] : null;
        $notes = isset($input['notes']) ? trim($input['notes']) : '';

        if (empty($name) || empty($email) || empty($phone)) {
            http_response_code(400);
            echo json_encode(["message" => "Name, Email, and Phone number are required."]);
            exit();
        }

        try {
            // Auto create table if it doesn't exist yet
            $db->exec("CREATE TABLE IF NOT EXISTS `career_applications` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `name` VARCHAR(255) NOT NULL,
              `email` VARCHAR(255) NOT NULL,
              `phone` VARCHAR(100) NOT NULL,
              `position` VARCHAR(255) DEFAULT NULL,
              `experience` VARCHAR(255) DEFAULT NULL,
              `resumeName` VARCHAR(255) DEFAULT NULL,
              `resumeData` LONGTEXT DEFAULT NULL,
              `notes` TEXT DEFAULT NULL,
              `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

            $sql = "INSERT INTO career_applications (name, email, phone, position, experience, resumeName, resumeData, notes) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$name, $email, $phone, $position, $experience, $resumeName, $resumeData, $notes]);

            $newId = $db->lastInsertId();
            if (function_exists('logActivity')) {
                logActivity("Career Application Received", "Application from " . $name . " for " . ($position ?: 'General'), "career");
            }
            echo json_encode(["success" => true, "id" => intval($newId)]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to submit application: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint for deletion
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Application ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            $stmt = $db->prepare("DELETE FROM career_applications WHERE id = ?");
            $stmt->execute([$id]);

            if (function_exists('logActivity')) {
                logActivity("Career Application Deleted", "Deleted application ID: " . $id, "career");
            }
            echo json_encode(["success" => true, "message" => "Application deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete application: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
