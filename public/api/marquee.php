<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM marquee_items WHERE id = ?");
                $stmt->execute([$id]);
                $item = $stmt->fetch();
                if ($item) {
                    $item['id'] = intval($item['id']);
                    $item['isActive'] = (bool)$item['is_active'];
                    $item['badgeColor'] = $item['badge_color'];
                    $item['linkText'] = $item['link_text'];
                    echo json_encode($item);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Marquee item not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all marquee items
            try {
                $sql = "SELECT * FROM marquee_items ORDER BY priority ASC, id DESC";
                $stmt = $db->query($sql);
                $rows = $stmt->fetchAll();
                $items = [];
                foreach ($rows as $row) {
                    $items[] = [
                        'id' => intval($row['id']),
                        'title' => $row['title'],
                        'badge' => $row['badge'],
                        'badgeColor' => $row['badge_color'],
                        'link' => $row['link'],
                        'linkText' => $row['link_text'],
                        'isActive' => (bool)$row['is_active'],
                        'priority' => intval($row['priority'])
                    ];
                }
                echo json_encode($items);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        }
        break;

    case 'POST':
        verifyAdminToken();
        $input = json_decode(file_get_contents('php://input'), true);

        $title = isset($input['title']) ? trim($input['title']) : '';
        $badge = isset($input['badge']) ? trim($input['badge']) : '';
        $badgeColor = isset($input['badgeColor']) ? trim($input['badgeColor']) : 'bg-brandSky text-white';
        $link = isset($input['link']) ? trim($input['link']) : null;
        $linkText = isset($input['linkText']) ? trim($input['linkText']) : 'Learn More';
        $isActive = isset($input['isActive']) ? ($input['isActive'] ? 1 : 0) : 1;
        $priority = isset($input['priority']) ? intval($input['priority']) : 1;

        if (empty($title)) {
            http_response_code(400);
            echo json_encode(["message" => "Announcement title is required."]);
            exit();
        }

        try {
            $sql = "INSERT INTO marquee_items (title, badge, badge_color, link, link_text, is_active, priority) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $badge, $badgeColor, $link, $linkText, $isActive, $priority]);

            $newId = $db->lastInsertId();
            logActivity("Marquee item added", "Added announcement: " . $title, "system");
            echo json_encode(["success" => true, "id" => intval($newId)]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add marquee item: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken();
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Marquee item ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);

        // If simple toggle active status request
        if (count($input) === 1 && isset($input['isActive'])) {
            $isActive = $input['isActive'] ? 1 : 0;
            try {
                $stmt = $db->prepare("UPDATE marquee_items SET is_active = ? WHERE id = ?");
                $stmt->execute([$isActive, $id]);
                echo json_encode(["success" => true]);
                exit();
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
                exit();
            }
        }

        $title = isset($input['title']) ? trim($input['title']) : '';
        $badge = isset($input['badge']) ? trim($input['badge']) : '';
        $badgeColor = isset($input['badgeColor']) ? trim($input['badgeColor']) : 'bg-brandSky text-white';
        $link = isset($input['link']) ? trim($input['link']) : null;
        $linkText = isset($input['linkText']) ? trim($input['linkText']) : 'Learn More';
        $isActive = isset($input['isActive']) ? ($input['isActive'] ? 1 : 0) : 1;
        $priority = isset($input['priority']) ? intval($input['priority']) : 1;

        try {
            $sql = "UPDATE marquee_items SET title = ?, badge = ?, badge_color = ?, link = ?, link_text = ?, is_active = ?, priority = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $badge, $badgeColor, $link, $linkText, $isActive, $priority, $id]);

            logActivity("Marquee item updated", "Updated announcement: " . $title, "system");
            echo json_encode(["success" => true, "message" => "Marquee item updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update marquee item: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken();
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Marquee item ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            $stmt = $db->prepare("DELETE FROM marquee_items WHERE id = ?");
            $stmt->execute([$id]);

            logActivity("Marquee item deleted", "Deleted marquee item ID: " . $id, "system");
            echo json_encode(["success" => true, "message" => "Marquee item deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete marquee item: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
