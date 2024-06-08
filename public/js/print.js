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
            if (i == 3) {
                const dataUrl = canvas.toDataURL("image/jpeg");

                // printImg(dataUrl);
                // console.log(dataUrl);
                // const a = document.createElement("a");
                const img = document.createElement("img");
                img.src = dataUrl;
                PrintImage(dataUrl, img.naturalWidth, img.naturalHeight);
                // printDiv(img);
                // a.href = dataUrl;
                // a.download = "kolase_foto.jpg";
                // window.print();
                // const data = new FormData();
                // data.append("email", email);
                // $.ajaxSetup({
                //     headers: {
                //         "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                //             "content"
                //         ),
                //     },
                // });
                // $.ajax({
                //     url: "/send-mail",
                //     type: "POST",
                //     data: data,
                //     processData: false,
                //     contentType: false,
                //     success: function (response) {
                //         console.log("Response dari server : ", response);
                //         window.location.href = "/finish";
                //     },
                //     error: function (xhr, status, error) {
                //         console.error("Error : ", error);
                //     },
                // });
            }
        };
    }
};

function PrintImage(blobUrl, imgWidth, imgHeight) {
    var Pagelink = "about:blank";
    var pwa = window.open(Pagelink, "_new");
    pwa.document.open();
    pwa.document.write(ImageToPrint(blobUrl), imgWidth, imgHeight);
    pwa.document.close();
}

function ImageToPrint(blobUrl, imgWidth, imgHeight) {
    // window.innerWidth = imgWidth
    // window.innerHeight = imgHeight


    var customPaperWidth = imgWidth; // Lebar kertas kustom dalam piksel
    var customPaperHeight = imgHeight; // Tinggi kertas kustom dalam piksel

    return "<html><head><style type='text/css'>@media print { @page { size: " + customPaperWidth + "px; " + customPaperHeight + "px; } }</style><scri"+"pt>function step1(){\n" +
            "setTimeout('step2()', 10);}\n" +
            "function step2(){window.print();window.close()}\n" +
            "</scri" + "pt></head><body onload='step1()'>\n" +
            "<img src='" + blobUrl + "/></body></html>";
}


// function ImageToPrint(blobUrl, imgWidth, imgHeight) {
//     return "<html><head><style type='text/css'>@media print { @page { size: " + imgWidth + "px; " + imgHeight + "px; } }</style><scri"+"pt>function step1(){\n" +
//             "setTimeout('step2()', 10);}\n" +
//             "function step2(){window.print();window.close()}\n" +
//             "</scri" + "pt></head><body onload='step1()'>\n" +
//             "<img src='" + blobUrl + "'/></body></html>";
// }

