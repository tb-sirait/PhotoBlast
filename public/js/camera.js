const video = document.querySelector(".watch-video");
const cameraButton = document.querySelector(".camera-button");
const listPhoto = document.querySelector("section#Photos");
const countdowndisplay = document.getElementById("countdown-display");

let photoCount = 0;
let videoChunks = [];
let recordedVideoUrl;

// fitur rekam kamera
navigator.mediaDevices
    .getUserMedia({
        video: true,
    })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
        startRecording(stream);
    })
    .catch(function (err) {
        console.log("An error occurred: " + err);
    });

// Tombol kamera diklik
cameraButton.addEventListener("click", function () {
    if (photoCount < limit) {
        capturePhotoAndSave();
    } else {
        stopRecordingAndDownload();
    }
});

// Function to capture photo and save
function capturePhotoAndSave() {
    let time = document.querySelector('section#Camera .button select.timer-button').value;
    function countdown() {
        if (time >= 0) {
            setTimeout(() => {
                countdowndisplay.style.display = "flex";
                countdowndisplay.textContent = time;
                time--;
                countdown();
            }, 1000);
        } else {
            countdowndisplay.style.display = "none";
            countdowndisplay.textContent = "";
            afterCountDown();
        }
    }
    function afterCountDown() {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png"); // Capture image as PNG
        const base64Data = dataUrl.split(",")[1];
        // Save photo to local storage
        listPhoto.innerHTML =
            `<div class="photo"><img src="${dataUrl}"></div>` +
            listPhoto.innerHTML;
        localStorage.setItem(`photo_${photoCount}`, dataUrl);
        photoCount++;
    }
    countdown();
}

// Function to start recording video
function startRecording(stream) {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.ondataavailable = function (e) {
        videoChunks.push(e.data);
    };

    mediaRecorder.onstop = function () {
        const videoBlob = new Blob(videoChunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("video", videoBlob, "recorded_video.webm");
        formData.append("email", email);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            url: "/save-video",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
        URL.revokeObjectURL(recordedVideoUrl);
    };

    mediaRecorder.start();
}

// fitur download rekaman, foto
function stopRecordingAndDownload() {
    const videoStream = video.srcObject;
    const tracks = videoStream.getTracks();

    tracks.forEach((track) => track.stop());

    // Add photos to zip
    const zip = new JSZip();
    for (let i = 0; i < photoCount; i++) {
        const dataUrl = localStorage.getItem(`photo_${i}`);
        const base64Data = dataUrl.split(",")[1];
        if (photoName.length > 0) {
            zip.file(photoName[i], base64Data, { base64: true });
        } else {
            zip.file(`photo_${i}.png`, base64Data, { base64: true });
        }
    }

    // download zip file
    zip.generateAsync({ type: "blob" }).then(function (content) {
        // Buat FormData object
        const formData = new FormData();
        formData.append("photoZip", content, "captured_photos.zip");
        formData.append("email", email);

        // Kirim FormData ke URL API menggunakan jQuery AJAX
        $.ajax({
            url: "/save-photo",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Response dari server:", response);
                // pembersihan local storage
                localStorage.clear();
                window.location.href = "/listphoto";
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    });
}
