var config = {
    apiKey: "AIzaSyCbDZN8qEm7bdLfy0_NBsWP9KwaNmPByTE",
    authDomain: "train-scheduler-5dfa6.firebaseapp.com",
    databaseURL: "https://train-scheduler-5dfa6.firebaseio.com",
    projectId: "train-scheduler-5dfa6",
    storageBucket: "train-scheduler-5dfa6.appspot.com",
    messagingSenderId: "928487779799"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    };
    database.ref().push(newTrain);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
    var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    var timeRemaining = diffTime % trainFreq;
    var minutesAway = trainFreq - timeRemaining;
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );
    $("#train-table > tbody").append(newRow);
});