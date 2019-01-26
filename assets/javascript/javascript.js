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
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
    var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(timeConverted);
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log(diffTime);
    var timeRemaining = diffTime % trainFreq;
    console.log(timeRemaining);
    var minutesAway = trainFreq - timeRemaining;
    console.log(minutesAway);
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
    console.log(nextArrival);
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );
    $("#train-table > tbody").append(newRow);
});