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
    for (let i = 1; i <= 3; i++) {
        const foto = new Image();
        foto.src = photos[i - 1];
        foto.onload = function () {
            // Menggambar foto ke canvas
            context.drawImage(foto, x, y, photoWidth, photoHeight);
            // Perbarui posisi untuk foto berikutnya (kordinat x 0 agar posisi x nya tetap, tapi hanya vertikal yang berubah)
            x += 0;
            y += photoHeight + 10;
            // simpan file collage
            if (i === 3) {
                const dataUrl = canvas.toDataURL("image/jpeg");
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "kolase_foto.jpg";
                a.click();
                const data = new FormData();
                data.append("email", email);
                $.ajaxSetup({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                            "content"
                        ),
                    },
                });
                $.ajax({
                    url: "/send-mail",
                    type: "POST",
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        console.log("Response dari server : ", response);
                        window.location.href = "/finish";
                    },
                    error: function (xhr, status, error) {
                        console.error("Error : ", error);
                    },
                });
            }
        };
    }
};
