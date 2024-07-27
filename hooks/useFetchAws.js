async function useFetchAws(file, folderName) {
  const timeStamp = new Date().getTime().toString();
  const uniqueName = timeStamp + file.name;

  const response = await fetch("/api/awsS3", {
    method: "POST",
    body: JSON.stringify({
      type: file.type,
      key: `${folderName}/${uniqueName}`,
    }),
  });
  const { url } = await response.json();

  return url;
}

export default useFetchAws;
