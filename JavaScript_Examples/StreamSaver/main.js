function func() {
  const url =
    "http://192.168.2.138:8091/appcenter/tmaxos/binary-downloads/54fc2e04-815f-45ff-9c9e-702be46f8006";
  const filename = "tooffice.tai";

  const fileStream = streamSaver.createWriteStream(filename, {
    size: 617557791
  });

  fetch(url).then(response => {
    const readableStream = response.body;

    // more optimized
    if (window.WritableStream && readableStream.pipeTo) {
      return readableStream
        .pipeTo(fileStream)
        .then(() => console.log("done writing"));
    }

    console.log("cannot optimized.");
    window.writer = fileStream.getWriter();

    const reader = response.body.getReader();
    const pump = () =>
      reader.read().then(response => {
        console.log("downloading...");
        return response.done
          ? writer.close()
          : writer.write(response.value).then(pump);
      });

    pump();
  });
}
