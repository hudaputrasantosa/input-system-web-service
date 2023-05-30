// Client side unique ID - This could and probably should move to server with UUID
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  
  document.getElementById("uploadBtn").addEventListener("click", () => {
    let postid = uuidv4();
    let inputElem = document.getElementById("imgfile");
    let file = inputElem.files[0];

    // Create new file so we can rename the file
    let extension = file.type === "image/jpeg" || file.type === "image/jpg" ? "jpeg" : "png";
    let blob = file.slice(0, file.size, `image/${extension}`);
    newFile = new File([blob], `img_${postid}.${extension}`, { type: `image/${extension}` });
    
    // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
    let formData = new FormData();
    formData.append("imgfile", newFile);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
  });

