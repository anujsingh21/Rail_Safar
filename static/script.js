document.getElementById("railwayForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the user input (PNR number) from the form
    const pnrNumber = document.getElementById("pnr").value;

    // Construct the API URL with the PNR number
    const url = `https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${pnrNumber}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c3149c2770msh2be22d78b5094a1p166e5cjsnb6f0b486defc',
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const result = await response.json();

        const div1 = document.getElementById("pnrenquiry");
    
        if (result.status === true) {
            // Access the specific data values from the JSON object
            const bookingDate = result.data.BookingDate;
            const quota = result.data.Quota;
            const trainClass = result.data.Class;
            const pnrnum= result.data.Pnr;
            const trainnum= result.data.TrainNo;
            const trainname= result.data.TrainName;
            const fp= result.data.SourceDoj;
            const tp= result.data.DestinationDoj;
            const fd= result.data.From;
            const td= result.data.To;
            const dt= result.data.DepartureTime;
            const at= result.data.ArrivalTime;
            const pasdetail= result.data.PassengerStatus;
            // Update the content of the divs with the obtained data
            const bkdateDiv = document.getElementById("bkdate");
            const qtaDiv = document.getElementById("qta");
            const clsDiv = document.getElementById("cls");
            const pttDiv = document.getElementById("ptt");
            const ddtfDiv = document.getElementById("ddtf");
            const ddttDiv = document.getElementById("ddtt");
            const pasdDiv = document.getElementById("pasd");
            const div3 = document.getElementById("d3");
            const pnrenq= document.getElementById("pnrenquiry");
    
            bkdateDiv.textContent = `Booking date: ${bookingDate}`;
            qtaDiv.textContent = `Quota: ${quota}`;
            clsDiv.textContent = `Class: ${trainClass}`;
            pttDiv.innerHTML= `PNR: ${pnrnum}
                               <br>
                               Train Number: ${trainnum}
                               <br>
                               Train Name: ${trainname}`;
            ddtfDiv.innerHTML= `Departure date & time: ${fp} at ${dt}
                               <br>
                               From: ${fd}`;
            ddttDiv.innerHTML=`Arrival date & time: ${tp} at ${at}
                               <br>
                               To: ${td}`;
            const pasbody = pasdDiv.querySelector("tbody");
            pasbody.innerHTML="";
    
            pasdetail.forEach(passangerdata =>{
                const row = pasbody.insertRow();
                row.insertCell(0).textContent=`Passenger ${passangerdata.Number}`;
                row.insertCell(1).textContent=`${passangerdata.BookingStatus}`;
                row.insertCell(2).textContent=`${passangerdata.Coach}/${passangerdata.Berth}`;
            });
            pnrenq.style.display="";
            pasdDiv.style.display = "table";
            div3.innerHTML="";
            div3.appendChild(pasdDiv);
        }
        } 
        catch (error) {
            console.error(error);
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Error fetching data from the API.";
        }
});
//train schedule
document.getElementById("trainSchedule").addEventListener("submit", async function (e) {
    e.preventDefault();
    // Construct the API URL for train schedule
    const trainNo=document.getElementById("train_number").value;
    console.log(trainNo);
    const url = `https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule?trainNo=${trainNo}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c3149c2770msh2be22d78b5094a1p166e5cjsnb6f0b486defc',
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
    
        const result = await response.json(); // Parse JSON response
    
        const resultDiv = document.getElementById("result");

        const trainNameRow = document.getElementById("train");
        
        if (result.status === true) {
            const scheduleData = result.data.route;
            const scheduleTable = document.getElementById("scheduleTable");

            const trainNameCell = trainNameRow.insertCell(0);
            trainNameCell.colSpan = 5; // Span across all columns
            trainNameCell.textContent = result.data.trainName;
    
            // Clear existing table rows
            const tbody = scheduleTable.querySelector("tbody");
            tbody.innerHTML = "";
            let p=0;      
            // Iterate through the schedule data and populate the table
            scheduleData.forEach(stationData => {
                if(stationData.stop === true){
                const row = tbody.insertRow();
                const arrivalt=stationData.sta_min;
                const departuret=stationData.std_min;
                const dist=stationData.distance_from_source;
                let a1=arrivalt%1440;
                let hr1=Math.floor(a1/60);
                let mn1=a1%60;
                let a2=departuret%1440;
                let hr2=Math.floor(a2/60);
                let mn2=a2%60;
                let t = dist-p;
                const formathr1=hr1<10?`0${hr1}`:hr1;
                const formatmn1=mn1<10?`0${mn1}`:mn1;
                const formathr2=hr2<10?`0${hr2}`:hr2;
                const formatmn2=mn2<10?`0${mn2}`:mn2;
                row.insertCell(0).textContent = stationData.station_name;
                row.insertCell(1).textContent = stationData.station_code;
                row.insertCell(2).textContent = `${formathr1}:${formatmn1}`;
                row.insertCell(3).textContent = `${formathr2}:${formatmn2}`;
                row.insertCell(4).textContent = `${t}`;
                p=t;
                }
            });
            // Display the table
            scheduleTable.style.display = "table";
            resultDiv.innerHTML = "";
            resultDiv.appendChild(scheduleTable);
        } else {
            resultDiv.innerHTML = "No schedule data available.";
        }
    } catch (error) {
        console.error(error);
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "Error fetching or parsing data from the API.";
    }          
});  
//chatbot   
const chatButton = document.getElementById("chat-button");
const chatColumn = document.getElementById("chat-column");
chatButton.addEventListener("click", () => {
    chatColumn.style.display = chatColumn.style.display === "block" ? "none" : "block";
}); 
const closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", () => {
    chatColumn.style.display = "none"; // Hide the chat column when the close button is clicked
  });
document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const textInput = document.getElementById('text-input');
    const textSendBtn = document.getElementById('text-send-btn');
    const voiceInputBtn = document.getElementById('voice-input-btn');

    // Initialize SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    function displayMessage(sender, message, customClass) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-box chat-${sender.toLowerCase()} ${customClass}`;
        messageDiv.innerHTML = `${sender}: ${message}`;
        chatBox.appendChild(messageDiv);
    }
    // Event listener for the "Voice Input" button
    voiceInputBtn.addEventListener('click', () => {
        voiceInputBtn.textContent = 'Listening...';

        recognition.start();
    });

    // Event listener for when speech is recognized
    recognition.onresult = function(event) {
        const userSpokenMessage = event.results[0][0].transcript;

        // Display user spoken message in the text input
        textInput.value = userSpokenMessage;

        // Reset the "Voice Input" button
        voiceInputBtn.textContent = 'Voice Input';
    };

    // Event listener for the "Send Text" button
    textSendBtn.addEventListener('click', async () => {
        const userMessage = textInput.value;
        if (!userMessage) return;

        // Display user message
        displayMessage('You', userMessage);

        // Send user message to ChatGPT
        try {
            const chatGPTResponse = await getChatGPTResponse(userMessage);

            // Extract and display ChatGPT's response
            const assistantResponse = chatGPTResponse.data.choices[0].message.content;
            displayMessage('RailSafar Bot', assistantResponse);
        } catch (error) {
            console.error('Error fetching RailSafar response:', error);
        }

        // Clear the text input
        textInput.value = '';
    });

    // Function to send user's message to ChatGPT
    async function getChatGPTResponse(userMessage) {
        const apiKey = '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'; // Replace with your actual API key
        const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        };

        const data = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            temperature: 0.7
        };

        const response = await axios.post(apiEndpoint, data, { headers });
        return response;
    }
});
