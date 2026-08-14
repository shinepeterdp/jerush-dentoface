<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// Auto-migrate: check if focus_keywords and secondary_keywords columns exist, if not add them
try {
    $db->query("SELECT focus_keywords FROM blogs LIMIT 1");
} catch (Exception $e) {
    try {
        $db->exec("ALTER TABLE blogs ADD COLUMN focus_keywords TEXT DEFAULT NULL");
    } catch (Exception $ex) {}
}
try {
    $db->query("SELECT secondary_keywords FROM blogs LIMIT 1");
} catch (Exception $e) {
    try {
        $db->exec("ALTER TABLE blogs ADD COLUMN secondary_keywords TEXT DEFAULT NULL");
    } catch (Exception $ex) {}
}

function formatBlogRow($row) {
    return [
        "id" => intval($row['id']),
        "title" => $row['title'],
        "slug" => $row['slug'],
        "excerpt" => $row['excerpt'],
        "content" => $row['content'],
        "category" => $row['category'],
        "featuredImage" => $row['featured_image'],
        "publishedDate" => $row['published_date'],
        "readingTime" => $row['reading_time'],
        "status" => $row['status'],
        "seoTitle" => $row['seo_title'],
        "seoDescription" => $row['seo_description'],
        "focusKeywords" => $row['focus_keywords'] ?? '',
        "secondaryKeywords" => $row['secondary_keywords'] ?? '',
        "author" => [
            "name" => $row['author_name'],
            "qualification" => $row['doc_qualification'] ?? '',
            "specialization" => $row['doc_role'] ?? '',
            "bio" => $row['doc_bio'] ?? '',
            "image" => $row['doc_image'] ?? ''
        ]
    ];
}

switch ($method) {
    case 'GET':
        if (isset($_GET['slug'])) {
            $slug = trim($_GET['slug']);
            try {
                $sql = "SELECT b.*, d.qualification as doc_qualification, d.role as doc_role, d.bio as doc_bio, d.image as doc_image 
                        FROM blogs b 
                        LEFT JOIN doctors d ON b.author_name = d.name 
                        WHERE b.slug = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$slug]);
                $row = $stmt->fetch();
                if ($row) {
                    echo json_encode(formatBlogRow($row));
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Blog article not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all blogs (optionally filter by status/limit)
            $statusFilter = isset($_GET['status']) ? trim($_GET['status']) : '';
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;
            
            try {
                $sql = "SELECT b.*, d.qualification as doc_qualification, d.role as doc_role, d.bio as doc_bio, d.image as doc_image 
                        FROM blogs b 
                        LEFT JOIN doctors d ON b.author_name = d.name";
                
                $params = [];
                if (!empty($statusFilter)) {
                    $sql .= " WHERE b.status = ?";
                    $params[] = $statusFilter;
                }
                
                $sql .= " ORDER BY b.id DESC";
                
                if ($limit > 0) {
                    $sql .= " LIMIT " . $limit;
                }
                
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                $rows = $stmt->fetchAll();
                
                $formatted = [];
                foreach ($rows as $row) {
                    $formatted[] = formatBlogRow($row);
                }
                echo json_encode($formatted);
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
        $slug = isset($input['slug']) ? trim($input['slug']) : '';
        $excerpt = isset($input['excerpt']) ? trim($input['excerpt']) : '';
        $content = isset($input['content']) ? trim($input['content']) : '';
        $category = isset($input['category']) ? trim($input['category']) : '';
        $featured_image = isset($input['featuredImage']) ? trim($input['featuredImage']) : '';
        $author_name = isset($input['author']['name']) ? trim($input['author']['name']) : '';
        $published_date = isset($input['publishedDate']) ? trim($input['publishedDate']) : '';
        $reading_time = isset($input['readingTime']) ? trim($input['readingTime']) : '5 min read';
        $status = isset($input['status']) ? trim($input['status']) : 'draft';
        $seo_title = isset($input['seoTitle']) ? trim($input['seoTitle']) : '';
        $seo_description = isset($input['seoDescription']) ? trim($input['seoDescription']) : '';
        $focus_keywords = isset($input['focusKeywords']) ? trim($input['focusKeywords']) : '';
        $secondary_keywords = isset($input['secondaryKeywords']) ? trim($input['secondaryKeywords']) : '';
        
        if (empty($title) || empty($slug)) {
            http_response_code(400);
            echo json_encode(["message" => "Title and Slug are required."]);
            exit();
        }
        
        try {
            // Auto generate date if empty
            if (empty($published_date)) {
                $published_date = date('F d, Y');
            }
            
            $sql = "INSERT INTO blogs (title, slug, excerpt, content, category, featured_image, author_name, published_date, reading_time, status, seo_title, seo_description, focus_keywords, secondary_keywords) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $slug, $excerpt, $content, $category, $featured_image, $author_name, $published_date, $reading_time, $status, $seo_title, $seo_description, $focus_keywords, $secondary_keywords]);
            
            $newId = $db->lastInsertId();
            logActivity("Blog article published", "Published \"" . $title . "\"", "blog");
            echo json_encode(["success" => true, "id" => intval($newId), "slug" => $slug]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add blog article: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['slug'])) {
            http_response_code(400);
            echo json_encode(["message" => "Blog Slug is required for update."]);
            exit();
        }
        $targetSlug = trim($_GET['slug']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $title = isset($input['title']) ? trim($input['title']) : '';
        $slug = isset($input['slug']) ? trim($input['slug']) : '';
        $excerpt = isset($input['excerpt']) ? trim($input['excerpt']) : '';
        $content = isset($input['content']) ? trim($input['content']) : '';
        $category = isset($input['category']) ? trim($input['category']) : '';
        $featured_image = isset($input['featuredImage']) ? trim($input['featuredImage']) : '';
        $author_name = isset($input['author']['name']) ? trim($input['author']['name']) : '';
        $published_date = isset($input['publishedDate']) ? trim($input['publishedDate']) : '';
        $reading_time = isset($input['readingTime']) ? trim($input['readingTime']) : '';
        $status = isset($input['status']) ? trim($input['status']) : '';
        $seo_title = isset($input['seoTitle']) ? trim($input['seoTitle']) : '';
        $seo_description = isset($input['seoDescription']) ? trim($input['seoDescription']) : '';
        $focus_keywords = isset($input['focusKeywords']) ? trim($input['focusKeywords']) : '';
        $secondary_keywords = isset($input['secondaryKeywords']) ? trim($input['secondaryKeywords']) : '';
        
        if (empty($title) || empty($slug)) {
            http_response_code(400);
            echo json_encode(["message" => "Title and Slug are required."]);
            exit();
        }
        
        try {
            $sql = "UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, featured_image = ?, author_name = ?, published_date = ?, reading_time = ?, status = ?, seo_title = ?, seo_description = ?, focus_keywords = ?, secondary_keywords = ? WHERE slug = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $slug, $excerpt, $content, $category, $featured_image, $author_name, $published_date, $reading_time, $status, $seo_title, $seo_description, $focus_keywords, $secondary_keywords, $targetSlug]);
            
            logActivity("Blog article updated", "Updated article \"" . $title . "\"", "blog");
            echo json_encode(["success" => true, "message" => "Blog article updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update blog article: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['slug'])) {
            http_response_code(400);
            echo json_encode(["message" => "Blog Slug is required."]);
            exit();
        }
        $slug = trim($_GET['slug']);
        try {
            $bstmt = $db->prepare("SELECT title FROM blogs WHERE slug = ?");
            $bstmt->execute([$slug]);
            $bTitle = $bstmt->fetchColumn() ?: $slug;

            $stmt = $db->prepare("DELETE FROM blogs WHERE slug = ?");
            $stmt->execute([$slug]);
            
            logActivity("Blog article deleted", "Deleted article \"" . $bTitle . "\"", "blog");
            echo json_encode(["success" => true, "message" => "Blog article deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete blog article: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
