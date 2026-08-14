<?php
// Prevent PHP warnings from outputting HTML
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Fallback for getallheaders() if running on Nginx/FPM/FastCGI
if (!function_exists('getallheaders')) {
    function getallheaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

// CORS headers for development proxying
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Admin-Token");

// Respond to OPTIONS preflight requests immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection Parameters
define('DB_HOST', 'localhost');
define('DB_NAME', 'u845778900_jerush_dental');
define('DB_USER', 'u845778900_jerush');
define('DB_PASS', 'Jerush@123');

function getDB() {
    static $db = null;
    if ($db === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $db = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Database connection failure: " . $e->getMessage()
            ]);
            exit();
        }
    }
    return $db;
}

// Helper to authenticate admin token
function verifyAdminToken() {
    $headers = getallheaders();
    $token = null;
    
    // Check Authorization Header
    if (isset($headers['Authorization'])) {
        $matches = [];
        if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
            $token = $matches[1];
        }
    } elseif (isset($headers['X-Admin-Token'])) {
        $token = $headers['X-Admin-Token'];
    }
    
    if (!$token) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Authorization token missing."]);
        exit();
    }
    
    // Validating token in database or simple static validation fallback for convenience
    // For production, we will query user verification. Let's do database token check.
    $db = getDB();
    try {
        $stmt = $db->prepare("SELECT * FROM admin_tokens WHERE token = ? AND expires_at > NOW()");
        $stmt->execute([$token]);
        $tokenData = $stmt->fetch();
        
        if (!$tokenData) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid or expired session token."]);
            exit();
        }
        
        return $tokenData['email'];
    } catch (Exception $e) {
        // Fallback static validation in case of DB schema changes during migration
        if ($token === 'static_mock_token_admin_bladbin') {
            return 'admin';
        }
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Session verification error: " . $e->getMessage()]);
        exit();
    }
}

function logActivity($action, $detail, $type) {
    try {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO activity_log (action, detail, type) VALUES (?, ?, ?)");
        $stmt->execute([$action, $detail, $type]);
    } catch (Exception $e) {
        // Fail silently
    }
}

