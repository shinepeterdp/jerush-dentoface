<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// Ensure camps table exists
try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `camps` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `title` VARCHAR(255) NOT NULL,
          `tagline` VARCHAR(255) DEFAULT '',
          `category` VARCHAR(50) NOT NULL DEFAULT 'dental',
          `camp_type` VARCHAR(100) NOT NULL DEFAULT 'Dental Camp',
          `status` VARCHAR(50) NOT NULL DEFAULT 'upcoming',
          `date` VARCHAR(100) NOT NULL,
          `time` VARCHAR(100) NOT NULL,
          `location` VARCHAR(255) NOT NULL,
          `lead_doctors` VARCHAR(255) DEFAULT '',
          `target_beneficiaries` VARCHAR(255) DEFAULT '',
          `cover_image` VARCHAR(500) DEFAULT '',
          `gallery_images` TEXT DEFAULT NULL,
          `services_provided` TEXT DEFAULT NULL,
          `description` TEXT DEFAULT NULL,
          `organizer` VARCHAR(255) DEFAULT 'Jerush Medical Foundation',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Exception $e) {
    // Continue
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM camps WHERE id = ?");
                $stmt->execute([$id]);
                $camp = $stmt->fetch();
                if ($camp) {
                    $camp['id'] = intval($camp['id']);
                    $camp['campType'] = $camp['camp_type'];
                    $camp['leadDoctors'] = $camp['lead_doctors'];
                    $camp['targetBeneficiaries'] = $camp['target_beneficiaries'];
                    $camp['coverImage'] = $camp['cover_image'];
                    $camp['galleryImages'] = json_decode($camp['gallery_images'] ?: '[]', true) ?: [];
                    $camp['servicesProvided'] = json_decode($camp['services_provided'] ?: '[]', true) ?: [];
                    echo json_encode($camp);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Camp not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            try {
                $stmt = $db->query("SELECT * FROM camps ORDER BY id DESC");
                $rows = $stmt->fetchAll();
                $camps = [];
                foreach ($rows as $row) {
                    $camps[] = [
                        'id' => intval($row['id']),
                        'title' => $row['title'],
                        'tagline' => $row['tagline'] ?: '',
                        'category' => $row['category'] ?: 'dental',
                        'campType' => $row['camp_type'] ?: 'Dental Camp',
                        'status' => $row['status'] ?: 'upcoming',
                        'date' => $row['date'] ?: '',
                        'time' => $row['time'] ?: '',
                        'location' => $row['location'] ?: '',
                        'leadDoctors' => $row['lead_doctors'] ?: '',
                        'targetBeneficiaries' => $row['target_beneficiaries'] ?: '',
                        'coverImage' => $row['cover_image'] ?: '',
                        'galleryImages' => json_decode($row['gallery_images'] ?: '[]', true) ?: [],
                        'servicesProvided' => json_decode($row['services_provided'] ?: '[]', true) ?: [],
                        'description' => $row['description'] ?: '',
                        'organizer' => $row['organizer'] ?: 'Jerush Medical Foundation'
                    ];
                }
                echo json_encode($camps);
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
        $tagline = isset($input['tagline']) ? trim($input['tagline']) : '';
        $category = isset($input['category']) ? trim($input['category']) : 'dental';
        $campType = isset($input['campType']) ? trim($input['campType']) : 'Dental Camp';
        $status = isset($input['status']) ? trim($input['status']) : 'upcoming';
        $date = isset($input['date']) ? trim($input['date']) : '';
        $time = isset($input['time']) ? trim($input['time']) : '';
        $location = isset($input['location']) ? trim($input['location']) : '';
        $leadDoctors = isset($input['leadDoctors']) ? trim($input['leadDoctors']) : '';
        $targetBeneficiaries = isset($input['targetBeneficiaries']) ? trim($input['targetBeneficiaries']) : '';
        $coverImage = isset($input['coverImage']) ? trim($input['coverImage']) : '';
        $galleryImages = isset($input['galleryImages']) ? json_encode($input['galleryImages']) : '[]';
        $servicesProvided = isset($input['servicesProvided']) ? json_encode($input['servicesProvided']) : '[]';
        $description = isset($input['description']) ? trim($input['description']) : '';
        $organizer = isset($input['organizer']) ? trim($input['organizer']) : 'Jerush Medical Foundation';

        if (empty($title) || empty($date) || empty($location)) {
            http_response_code(400);
            echo json_encode(["message" => "Title, Date, and Location are required."]);
            exit();
        }

        try {
            $sql = "INSERT INTO camps (title, tagline, category, camp_type, status, date, time, location, lead_doctors, target_beneficiaries, cover_image, gallery_images, services_provided, description, organizer) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $tagline, $category, $campType, $status, $date, $time, $location, $leadDoctors, $targetBeneficiaries, $coverImage, $galleryImages, $servicesProvided, $description, $organizer]);

            $newId = $db->lastInsertId();
            logActivity("Camp added", "Added new camp: " . $title, "camp");
            echo json_encode(["success" => true, "id" => intval($newId)]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to create camp: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken();
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Camp ID is required for update."]);
            exit();
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);

        $title = isset($input['title']) ? trim($input['title']) : '';
        $tagline = isset($input['tagline']) ? trim($input['tagline']) : '';
        $category = isset($input['category']) ? trim($input['category']) : 'dental';
        $campType = isset($input['campType']) ? trim($input['campType']) : 'Dental Camp';
        $status = isset($input['status']) ? trim($input['status']) : 'upcoming';
        $date = isset($input['date']) ? trim($input['date']) : '';
        $time = isset($input['time']) ? trim($input['time']) : '';
        $location = isset($input['location']) ? trim($input['location']) : '';
        $leadDoctors = isset($input['leadDoctors']) ? trim($input['leadDoctors']) : '';
        $targetBeneficiaries = isset($input['targetBeneficiaries']) ? trim($input['targetBeneficiaries']) : '';
        $coverImage = isset($input['coverImage']) ? trim($input['coverImage']) : '';
        $galleryImages = isset($input['galleryImages']) ? json_encode($input['galleryImages']) : '[]';
        $servicesProvided = isset($input['servicesProvided']) ? json_encode($input['servicesProvided']) : '[]';
        $description = isset($input['description']) ? trim($input['description']) : '';
        $organizer = isset($input['organizer']) ? trim($input['organizer']) : 'Jerush Medical Foundation';

        if (empty($title) || empty($date) || empty($location)) {
            http_response_code(400);
            echo json_encode(["message" => "Title, Date, and Location are required."]);
            exit();
        }

        try {
            $sql = "UPDATE camps SET title = ?, tagline = ?, category = ?, camp_type = ?, status = ?, date = ?, time = ?, location = ?, lead_doctors = ?, target_beneficiaries = ?, cover_image = ?, gallery_images = ?, services_provided = ?, description = ?, organizer = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $tagline, $category, $campType, $status, $date, $time, $location, $leadDoctors, $targetBeneficiaries, $coverImage, $galleryImages, $servicesProvided, $description, $organizer, $id]);

            logActivity("Camp updated", "Updated camp: " . $title, "camp");
            echo json_encode(["success" => true, "message" => "Camp updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update camp: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken();
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Camp ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            $nstmt = $db->prepare("SELECT title FROM camps WHERE id = ?");
            $nstmt->execute([$id]);
            $campTitle = $nstmt->fetchColumn() ?: "ID $id";

            $stmt = $db->prepare("DELETE FROM camps WHERE id = ?");
            $stmt->execute([$id]);

            logActivity("Camp deleted", "Deleted camp " . $campTitle, "camp");
            echo json_encode(["success" => true, "message" => "Camp deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete camp: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
