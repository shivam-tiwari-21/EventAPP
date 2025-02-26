<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Create 
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->title) && isset($data->description) && isset($data->date) && isset($data->venue) && isset($data->available_seats)) {
        $query = "INSERT INTO events (title, description, date, venue, available_seats) VALUES (:title, :description, :date, :venue, :available_seats)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":title", $data->title);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":venue", $data->venue);
        $stmt->bindParam(":available_seats", $data->available_seats);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Event created successfully"]);
        } else {
            echo json_encode(["message" => "Event creation failed"]);
        }
    } else {
        echo json_encode(["message" => "Invalid input"]);
    }
} elseif ($method === 'GET') {
    // Fetch 
    $query = "SELECT * FROM events";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($events);
} elseif ($method === 'PUT') {
    // Edit Event
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id) && isset($data->title) && isset($data->description) && isset($data->date) && isset($data->venue) && isset($data->available_seats)) {
        $query = "UPDATE events SET title=:title, description=:description, date=:date, venue=:venue, available_seats=:available_seats WHERE id=:id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $data->id);
        $stmt->bindParam(":title", $data->title);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":venue", $data->venue);
        $stmt->bindParam(":available_seats", $data->available_seats);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Event updated successfully"]);
        } else {
            echo json_encode(["message" => "Event update failed"]);
        }
    } else {
        echo json_encode(["message" => "Invalid input"]);
    }
} elseif ($method === 'DELETE') {
    // Delete 
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id)) {
        $query = "DELETE FROM events WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $data->id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Event deleted successfully"]);
        } else {
            echo json_encode(["message" => "Event deletion failed"]);
        }
    } else {
        echo json_encode(["message" => "Event ID required"]);
    }
}
?>
