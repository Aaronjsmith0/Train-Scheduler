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
    var trainTime = moment($("#time-input").val().trim(), "HH:mm A").format("X");
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
    var trainStartPretty = moment.unix(trainTime).format("HH:mm");
    var trainMins = moment().diff(moment(trainTime, "X"), "minutes");
    console.log(trainMins);

    // Calculate the total billed rate
    var minsAway;
    console.log(minsAway);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(trainStartPretty),
        $("<td>").text(minsAway),
    );
    $("#train-table > tbody").append(newRow);
});