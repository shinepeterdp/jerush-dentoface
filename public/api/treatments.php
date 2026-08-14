<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = trim($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM treatments WHERE id = ?");
                $stmt->execute([$id]);
                $item = $stmt->fetch();
                if ($item) {
                    $item['benefits'] = json_decode($item['benefits'], true);
                    echo json_encode($item);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Treatment not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all treatments
            try {
                $stmt = $db->query("SELECT * FROM treatments ORDER BY category ASC, title ASC");
                $rows = $stmt->fetchAll();
                foreach ($rows as &$row) {
                    $row['benefits'] = json_decode($row['benefits'], true);
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
        
        $id = isset($input['id']) ? trim($input['id']) : '';
        $title = isset($input['title']) ? trim($input['title']) : '';
        $category = isset($input['category']) ? trim($input['category']) : '';
        $desc = isset($input['desc']) ? trim($input['desc']) : '';
        $details = isset($input['details']) ? trim($input['details']) : '';
        $benefits = isset($input['benefits']) ? $input['benefits'] : [];
        $image = isset($input['image']) ? trim($input['image']) : '';
        $iconName = isset($input['iconName']) ? trim($input['iconName']) : '';
        $subtitle = isset($input['subtitle']) ? trim($input['subtitle']) : '';
        $backDesc = isset($input['backDesc']) ? trim($input['backDesc']) : '';
        
        if (empty($id) || empty($title) || empty($category)) {
            http_response_code(400);
            echo json_encode(["message" => "ID, Title, and Category are required."]);
            exit();
        }
        
        try {
            $benefitsJson = json_encode($benefits);
            $sql = "INSERT INTO treatments (id, title, category, `desc`, details, benefits, image, iconName, subtitle, backDesc) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$id, $title, $category, $desc, $details, $benefitsJson, $image, $iconName, $subtitle, $backDesc]);
            
            logActivity("Treatment added", "Added " . $title . " under " . $category, "treatment");
            echo json_encode(["success" => true, "id" => $id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add treatment: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Treatment ID is required for update."]);
            exit();
        }
        $targetId = trim($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $title = isset($input['title']) ? trim($input['title']) : '';
        $category = isset($input['category']) ? trim($input['category']) : '';
        $desc = isset($input['desc']) ? trim($input['desc']) : '';
        $details = isset($input['details']) ? trim($input['details']) : '';
        $benefits = isset($input['benefits']) ? $input['benefits'] : [];
        $image = isset($input['image']) ? trim($input['image']) : '';
        $iconName = isset($input['iconName']) ? trim($input['iconName']) : '';
        $subtitle = isset($input['subtitle']) ? trim($input['subtitle']) : '';
        $backDesc = isset($input['backDesc']) ? trim($input['backDesc']) : '';
        
        if (empty($title) || empty($category)) {
            http_response_code(400);
            echo json_encode(["message" => "Title and Category are required."]);
            exit();
        }
        
        try {
            $benefitsJson = json_encode($benefits);
            $sql = "UPDATE treatments SET title = ?, category = ?, `desc` = ?, details = ?, benefits = ?, image = ?, iconName = ?, subtitle = ?, backDesc = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $category, $desc, $details, $benefitsJson, $image, $iconName, $subtitle, $backDesc, $targetId]);
            
            logActivity("Treatment updated", "Updated " . $title . " details", "treatment");
            echo json_encode(["success" => true, "message" => "Treatment updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update treatment: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Treatment ID is required."]);
            exit();
        }
        $id = trim($_GET['id']);
        try {
            $tstmt = $db->prepare("SELECT title FROM treatments WHERE id = ?");
            $tstmt->execute([$id]);
            $tTitle = $tstmt->fetchColumn() ?: $id;

            $stmt = $db->prepare("DELETE FROM treatments WHERE id = ?");
            $stmt->execute([$id]);
            
            logActivity("Treatment deleted", "Deleted treatment " . $tTitle, "treatment");
            echo json_encode(["success" => true, "message" => "Treatment deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete treatment: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
