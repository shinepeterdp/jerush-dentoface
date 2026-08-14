<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $db->query("SELECT * FROM marquee_settings LIMIT 1");
            $row = $stmt->fetch();
            if ($row) {
                echo json_encode([
                    'enabled' => (bool)$row['enabled'],
                    'speed' => $row['speed'],
                    'pauseOnHover' => (bool)$row['pause_on_hover'],
                    'theme' => $row['theme'],
                    'showLiveBadge' => (bool)$row['show_live_badge'],
                    'liveBadgeText' => $row['live_badge_text']
                ]);
            } else {
                echo json_encode([
                    'enabled' => true,
                    'speed' => 'normal',
                    'pauseOnHover' => true,
                    'theme' => 'dark-gradient',
                    'showLiveBadge' => true,
                    'liveBadgeText' => 'LIVE UPDATES'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => $e->getMessage()]);
        }
        break;

    case 'PUT':
    case 'POST':
        verifyAdminToken();
        $input = json_decode(file_get_contents('php://input'), true);

        $enabled = isset($input['enabled']) ? ($input['enabled'] ? 1 : 0) : 1;
        $speed = isset($input['speed']) ? trim($input['speed']) : 'normal';
        $pauseOnHover = isset($input['pauseOnHover']) ? ($input['pauseOnHover'] ? 1 : 0) : 1;
        $theme = isset($input['theme']) ? trim($input['theme']) : 'dark-gradient';
        $showLiveBadge = isset($input['showLiveBadge']) ? ($input['showLiveBadge'] ? 1 : 0) : 1;
        $liveBadgeText = isset($input['liveBadgeText']) ? trim($input['liveBadgeText']) : 'LIVE UPDATES';

        try {
            // Check if record exists
            $count = $db->query("SELECT COUNT(*) FROM marquee_settings")->fetchColumn();
            if ($count > 0) {
                $sql = "UPDATE marquee_settings SET enabled = ?, speed = ?, pause_on_hover = ?, theme = ?, show_live_badge = ?, live_badge_text = ? WHERE id = 1";
                $stmt = $db->prepare($sql);
                $stmt->execute([$enabled, $speed, $pauseOnHover, $theme, $showLiveBadge, $liveBadgeText]);
            } else {
                $sql = "INSERT INTO marquee_settings (id, enabled, speed, pause_on_hover, theme, show_live_badge, live_badge_text) VALUES (1, ?, ?, ?, ?, ?, ?)";
                $stmt = $db->prepare($sql);
                $stmt->execute([$enabled, $speed, $pauseOnHover, $theme, $showLiveBadge, $liveBadgeText]);
            }

            logActivity("Marquee settings updated", "Updated global marquee bar controls", "system");
            echo json_encode(["success" => true, "message" => "Settings updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update marquee settings: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
