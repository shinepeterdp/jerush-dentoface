<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single doctor
            $id = intval($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM doctors WHERE id = ?");
                $stmt->execute([$id]);
                $doc = $stmt->fetch();
                if ($doc) {
                    $doc['id'] = intval($doc['id']);
                    $doc['specialties'] = json_decode($doc['specialties'], true);
                    echo json_encode($doc);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Doctor not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all doctors
            try {
                $stmt = $db->query("SELECT * FROM doctors ORDER BY id ASC");
                $rows = $stmt->fetchAll();
                foreach ($rows as &$row) {
                    $row['id'] = intval($row['id']);
                    $row['specialties'] = json_decode($row['specialties'], true);
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
        
        $name = isset($input['name']) ? trim($input['name']) : '';
        $role = isset($input['role']) ? trim($input['role']) : '';
        $qualification = isset($input['qualification']) ? trim($input['qualification']) : '';
        $experience = isset($input['experience']) ? trim($input['experience']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $fallback_img = isset($input['fallbackImg']) ? trim($input['fallbackImg']) : '';
        $specialties = isset($input['specialties']) ? $input['specialties'] : [];
        $bio = isset($input['bio']) ? trim($input['bio']) : '';
        $schedule = isset($input['schedule']) ? trim($input['schedule']) : 'Mon - Sat (10:00 AM - 6:00 PM)';
        $facebook = isset($input['facebook']) ? trim($input['facebook']) : '';
        $instagram = isset($input['instagram']) ? trim($input['instagram']) : '';
        $linkedin = isset($input['linkedin']) ? trim($input['linkedin']) : '';
        $twitter = isset($input['twitter']) ? trim($input['twitter']) : '';
        
        if (empty($name) || empty($role)) {
            http_response_code(400);
            echo json_encode(["message" => "Name and Role are required."]);
            exit();
        }
        
        try {
            $specialtiesJson = json_encode($specialties);
            $sql = "INSERT INTO doctors (name, role, qualification, experience, image, fallback_img, specialties, bio, schedule, facebook, instagram, linkedin, twitter) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$name, $role, $qualification, $experience, $image, $fallback_img, $specialtiesJson, $bio, $schedule, $facebook, $instagram, $linkedin, $twitter]);
            
            $newId = $db->lastInsertId();
            logActivity("Doctor profile added", "Added " . $name . " as " . $role, "doctor");
            echo json_encode(["success" => true, "id" => intval($newId)]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add doctor: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Doctor ID is required for update."]);
            exit();
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $name = isset($input['name']) ? trim($input['name']) : '';
        $role = isset($input['role']) ? trim($input['role']) : '';
        $qualification = isset($input['qualification']) ? trim($input['qualification']) : '';
        $experience = isset($input['experience']) ? trim($input['experience']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $fallback_img = isset($input['fallbackImg']) ? trim($input['fallbackImg']) : '';
        $specialties = isset($input['specialties']) ? $input['specialties'] : [];
        $bio = isset($input['bio']) ? trim($input['bio']) : '';
        $schedule = isset($input['schedule']) ? trim($input['schedule']) : '';
        $facebook = isset($input['facebook']) ? trim($input['facebook']) : '';
        $instagram = isset($input['instagram']) ? trim($input['instagram']) : '';
        $linkedin = isset($input['linkedin']) ? trim($input['linkedin']) : '';
        $twitter = isset($input['twitter']) ? trim($input['twitter']) : '';
        
        if (empty($name) || empty($role)) {
            http_response_code(400);
            echo json_encode(["message" => "Name and Role are required."]);
            exit();
        }
        
        try {
            $specialtiesJson = json_encode($specialties);
            $sql = "UPDATE doctors SET name = ?, role = ?, qualification = ?, experience = ?, image = ?, fallback_img = ?, specialties = ?, bio = ?, schedule = ?, facebook = ?, instagram = ?, linkedin = ?, twitter = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$name, $role, $qualification, $experience, $image, $fallback_img, $specialtiesJson, $bio, $schedule, $facebook, $instagram, $linkedin, $twitter, $id]);
            
            logActivity("Doctor profile updated", "Updated " . $name . " details", "doctor");
            echo json_encode(["success" => true, "message" => "Doctor updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update doctor: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Doctor ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            // Fetch doctor name for logging
            $nstmt = $db->prepare("SELECT name FROM doctors WHERE id = ?");
            $nstmt->execute([$id]);
            $docName = $nstmt->fetchColumn() ?: "ID $id";

            $stmt = $db->prepare("DELETE FROM doctors WHERE id = ?");
            $stmt->execute([$id]);
            
            logActivity("Doctor profile deleted", "Deleted doctor " . $docName, "doctor");
            echo json_encode(["success" => true, "message" => "Doctor deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete doctor: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
