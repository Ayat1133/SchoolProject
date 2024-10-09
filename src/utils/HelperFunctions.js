export const uppercaseFirstLetter = (input) => {
    const formatedInput = input?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return formatedInput;
  }

  export const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const date = new Date(inputDate);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
  
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
  
    const formattedDate = dd + "/" + mm + "/" + yyyy;
    return formattedDate;
  };

  export function convertPdfToBase64(file, maxSizeInBytes) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        const base64String = reader.result;
  
        // Base64 size estimation (since Base64 encoding inflates size by ~33%)
        const base64Size = Math.floor(base64String.length * 0.75);
  
        if (base64Size > maxSizeInBytes) {
          reject(new Error('PDF file exceeds the desired size limit.'));
          alert('PDF file exceeds the desired size limit.');
        } else {
          resolve(base64String);
        }
      };
      reader.onerror = function () {
        reject(new Error('Error reading the PDF file.'));
        alert('Error reading the PDF file.');
      };
      reader.readAsDataURL(file); // Convert the PDF file to Base64
    });
  }

  export const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };