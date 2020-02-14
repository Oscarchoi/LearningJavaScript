var localServer = "http://127.0.0.1:5500/";

function func() {
  download_blob(
    "http://192.168.2.138:8091/appcenter/tmaxos/binary-downloads/44fcb699-74eb-4216-8170-81382e64e8b1",
    "putty.tai"
  );
}

async function download_blob(url, fileName) {
  let response = await fetch(url);
  let reader = response.body.getReader();

  const contentLength = +response.headers.get("Content-Length");
  console.log(contentLength);
  let receivedLength = 0;

  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    receivedLength += value.length;
    console.log(`Received ${receivedLength} of ${contentLength}`);
  }
  let blob = new Blob(chunks);
  saveAs_blob(blob, fileName);
}

function listHeader(response) {
  console.log(JSON.stringify(response.headers));
}

function saveAs_blob(blob, filename) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.rel = "noopener";
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 100e3); // 100 sec
}
