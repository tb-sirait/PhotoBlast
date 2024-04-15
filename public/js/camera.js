const video = document.querySelector(".watch-video");
const cameraButton = document.querySelector(".camera-button");
const photoContainer = document.getElementById("photoContainer");

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
    if (photoCount < 10) {
        capturePhotoAndSave();
    } else {
        stopRecordingAndDownload();
    }
});

// Function to capture photo and save
function capturePhotoAndSave() {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png"); // Capture image as PNG
    const base64Data = dataUrl.split(",")[1];
    // Save photo to local storage
    localStorage.setItem(`photo_${photoCount}`, dataUrl);
    photoCount++;
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

// Fungsi untuk membuat collage foto
function createPhotoCollage() {
    const templateImage = new Image();
    templateImage.src = templatefotosrc;
    templateImage.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = templateImage.width;
        canvas.height = templateImage.height;

        // ukuran foto
        const photoWidth = width;
        const photoHeight = height;

        // Menggambar template foto ke canvas
        context.drawImage(templateImage, 0, 0);

        // Menggambar foto-foto dari local storage ke dalam template foto
        for (let i = 1; i <= 4; i++) {
            const localStorageKey = "photo_" + (i - 1);
            const fotoData = localStorage.getItem(localStorageKey);
            if (fotoData) {
                const foto = new Image();
                foto.src = fotoData;
                foto.onload = function () {
                    // Menggambar foto ke canvas
                    context.drawImage(foto, x, y, photoWidth, photoHeight);
                    // Perbarui posisi untuk foto berikutnya (kordinat x 0 agar posisi x nya tetap, tapi hanya vertikal yang berubah)
                    x += 0;
                    y += photoHeight + 10;
                    // simpan file collage
                    if (i === 4) {
                        const dataUrl = canvas.toDataURL("image/jpeg");
                        const a = document.createElement("a");
                        a.href = dataUrl;
                        a.download = "kolase_foto.jpg";
                        a.click();
                    }
                };
            }
        }
    };
}

// fitur download rekaman, foto, dan collase
function stopRecordingAndDownload() {
    const videoStream = video.srcObject;
    const tracks = videoStream.getTracks();

    tracks.forEach((track) => track.stop());

    // Menambahkan foto ke dalam template
    createPhotoCollage();

    // Add photos to zip
    const zip = new JSZip();
    for (let i = 0; i < photoCount; i++) {
        const dataUrl = localStorage.getItem(`photo_${i}`);
        const base64Data = dataUrl.split(",")[1];
        zip.file(`photo_${i}.png`, base64Data, { base64: true });
    }

    // download zip file
    zip.generateAsync({ type: "blob" }).then(function (content) {
        // Buat FormData object
        const formData = new FormData();
        formData.append("photoZip", content, "captured_photos.zip");

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
                const data = new FormData();
                data.append("email", email);
                $.ajax({
                    url: "/send-mail",
                    type: "POST",
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        console.log("Response dari server : ", response);
                    },
                    error: function (xhr, status, error) {
                        console.error("Error : ", error);
                    },
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    });
}
