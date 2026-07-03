async function downloadSubmission(data, prefix) {
  var json = JSON.stringify(data, null, 2);
  var stamp = data.submittedAt.replace(/[:.]/g, "-");
  var filename = prefix + "_" + stamp + ".json";

  if (window.showSaveFilePicker) {
    try {
      var handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "JSON file", accept: { "application/json": [".json"] } }]
      });
      var writable = await handle.createWritable();
      await writable.write(json);
      await writable.close();
      return;
    } catch (err) {
      if (err.name === "AbortError") return;
    }
  }

  var blob = new Blob([json], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
