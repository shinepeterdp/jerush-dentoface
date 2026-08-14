<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM reviews WHERE id = ?");
                $stmt->execute([$id]);
                $review = $stmt->fetch();
                if ($review) {
                    $review['id'] = intval($review['id']);
                    $review['rating'] = intval($review['rating']);
                    echo json_encode($review);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Review not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all reviews
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;
            try {
                $sql = "SELECT * FROM reviews ORDER BY id DESC";
                if ($limit > 0) {
                    $sql .= " LIMIT " . $limit;
                }
                $stmt = $db->query($sql);
                $rows = $stmt->fetchAll();
                foreach ($rows as &$row) {
                    $row['id'] = intval($row['id']);
                    $row['rating'] = intval($row['rating']);
                }
                echo json_encode($rows);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        }
        break;

    case 'POST':
        verifyAdminToken(); // Secure endpoint for admin manual entries
        $input = json_decode(file_get_contents('php://input'), true);
        
        $name = isset($input['name']) ? trim($input['name']) : '';
        $location = isset($input['location']) ? trim($input['location']) : '';
        $rating = isset($input['rating']) ? intval($input['rating']) : 5;
        $type = isset($input['type']) ? trim($input['type']) : 'text';
        $video_url = isset($input['video_url']) ? trim($input['video_url']) : null;
        $video_thumbnail = isset($input['video_thumbnail']) ? trim($input['video_thumbnail']) : null;
        $treatment = isset($input['treatment']) ? trim($input['treatment']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $text = isset($input['text']) ? trim($input['text']) : '';
        
        if (empty($name) || empty($text)) {
            http_response_code(400);
            echo json_encode(["message" => "Patient Name and Review Text are required."]);
            exit();
        }
        
        try {
            $sql = "INSERT INTO reviews (name, location, rating, type, video_url, video_thumbnail, treatment, image, text) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$name, $location, $rating, $type, $video_url, $video_thumbnail, $treatment, $image, $text]);
            
            $newId = $db->lastInsertId();
            logActivity("New review added", "Added a " . $rating . "-star review from " . $name, "review");
            echo json_encode(["success" => true, "id" => intval($newId)]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add review: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Review ID is required for update."]);
            exit();
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $name = isset($input['name']) ? trim($input['name']) : '';
        $location = isset($input['location']) ? trim($input['location']) : '';
        $rating = isset($input['rating']) ? intval($input['rating']) : 5;
        $type = isset($input['type']) ? trim($input['type']) : 'text';
        $video_url = isset($input['video_url']) ? trim($input['video_url']) : null;
        $video_thumbnail = isset($input['video_thumbnail']) ? trim($input['video_thumbnail']) : null;
        $treatment = isset($input['treatment']) ? trim($input['treatment']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $text = isset($input['text']) ? trim($input['text']) : '';
        
        if (empty($name) || empty($text)) {
            http_response_code(400);
            echo json_encode(["message" => "Patient Name and Review Text are required."]);
            exit();
        }
        
        try {
            $sql = "UPDATE reviews SET name = ?, location = ?, rating = ?, type = ?, video_url = ?, video_thumbnail = ?, treatment = ?, image = ?, text = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$name, $location, $rating, $type, $video_url, $video_thumbnail, $treatment, $image, $text, $id]);
            
            logActivity("Review updated", "Updated review from " . $name, "review");
            echo json_encode(["success" => true, "message" => "Review updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update review: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Review ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            $rstmt = $db->prepare("SELECT name FROM reviews WHERE id = ?");
            $rstmt->execute([$id]);
            $rName = $rstmt->fetchColumn() ?: "ID $id";

            $stmt = $db->prepare("DELETE FROM reviews WHERE id = ?");
            $stmt->execute([$id]);
            
            logActivity("Review deleted", "Deleted review from " . $rName, "review");
            echo json_encode(["success" => true, "message" => "Review deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete review: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
