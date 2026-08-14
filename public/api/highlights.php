<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM clinic_highlights WHERE id = ?");
                $stmt->execute([$id]);
                $item = $stmt->fetch();
                if ($item) {
                    $item['id'] = intval($item['id']);
                    echo json_encode($item);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Highlight not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all highlights
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;
            try {
                $sql = "SELECT * FROM clinic_highlights ORDER BY id DESC";
                if ($limit > 0) {
                    $sql .= " LIMIT " . $limit;
                }
                $stmt = $db->query($sql);
                $rows = $stmt->fetchAll();
                foreach ($rows as &$row) {
                    $row['id'] = intval($row['id']);
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
        $description = isset($input['description']) ? trim($input['description']) : '';
        $date = isset($input['date']) ? trim($input['date']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $category = isset($input['category']) ? trim($input['category']) : 'General';
        $link = isset($input['link']) ? trim($input['link']) : null;
        $status = isset($input['status']) ? trim($input['status']) : 'published';
        
        if (empty($title) || empty($description) || empty($date)) {
            http_response_code(400);
            echo json_encode(["message" => "Title, Description, and Date are required."]);
            exit();
        }
        
        try {
            $sql = "INSERT INTO clinic_highlights (title, description, date, image, category, link, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $description, $date, $image, $category, $link, $status]);
            
            $newId = $db->lastInsertId();
            logActivity("New highlight added", "Added event highlight: " . $title, "system");
            echo json_encode(["success" => true, "id" => intval($newId)]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add highlight: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Highlight ID is required for update."]);
            exit();
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $title = isset($input['title']) ? trim($input['title']) : '';
        $description = isset($input['description']) ? trim($input['description']) : '';
        $date = isset($input['date']) ? trim($input['date']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $category = isset($input['category']) ? trim($input['category']) : 'General';
        $link = isset($input['link']) ? trim($input['link']) : null;
        $status = isset($input['status']) ? trim($input['status']) : 'published';
        
        if (empty($title) || empty($description) || empty($date)) {
            http_response_code(400);
            echo json_encode(["message" => "Title, Description, and Date are required."]);
            exit();
        }
        
        try {
            $sql = "UPDATE clinic_highlights SET title = ?, description = ?, date = ?, image = ?, category = ?, link = ?, status = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $description, $date, $image, $category, $link, $status, $id]);
            
            logActivity("Highlight updated", "Updated event highlight: " . $title, "system");
            echo json_encode(["success" => true, "message" => "Highlight updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update highlight: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Highlight ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            $rstmt = $db->prepare("SELECT title FROM clinic_highlights WHERE id = ?");
            $rstmt->execute([$id]);
            $title = $rstmt->fetchColumn() ?: "ID $id";

            $stmt = $db->prepare("DELETE FROM clinic_highlights WHERE id = ?");
            $stmt->execute([$id]);
            
            logActivity("Highlight deleted", "Deleted event highlight: " . $title, "system");
            echo json_encode(["success" => true, "message" => "Highlight deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete highlight: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
