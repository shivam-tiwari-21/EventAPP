<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($data->user_id) && isset($data->event_id)) {
        // Check if already booked
        $checkQuery = "SELECT * FROM bookings WHERE user_id = :user_id AND event_id = :event_id";
        $checkStmt = $conn->prepare($checkQuery);
        $checkStmt->bindParam(":user_id", $data->user_id);
        $checkStmt->bindParam(":event_id", $data->event_id);
        $checkStmt->execute();

        if ($checkStmt->rowCount() > 0) {
            echo json_encode(["message" => "You have already booked this event"]);
            exit;
        }

        $seatQuery = "SELECT available_seats FROM events WHERE id = :event_id";
        $seatStmt = $conn->prepare($seatQuery);
        $seatStmt->bindParam(":event_id", $data->event_id);
        $seatStmt->execute();
        $event = $seatStmt->fetch(PDO::FETCH_ASSOC);

        if ($event['available_seats'] > 0) {
            $query = "INSERT INTO bookings (user_id, event_id) VALUES (:user_id, :event_id)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(":user_id", $data->user_id);
            $stmt->bindParam(":event_id", $data->event_id);

            if ($stmt->execute()) {
                // Reduce available seats
                $updateQuery = "UPDATE events SET available_seats = available_seats - 1 WHERE id = :event_id";
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bindParam(":event_id", $data->event_id);
                $updateStmt->execute();

                echo json_encode(["message" => "Booking successful"]);
            } else {
                echo json_encode(["message" => "Booking failed"]);
            }
        } else {
            echo json_encode(["message" => "No seats available"]);
        }
    } else {
        echo json_encode(["message" => "Invalid data"]);
    }
}
?>
